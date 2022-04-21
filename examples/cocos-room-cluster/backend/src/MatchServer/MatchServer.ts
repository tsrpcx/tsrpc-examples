import chalk from "chalk";
import path from "path";
import { ApiCallHttp, HttpServer, PrefixLogger, TsrpcError, WsClient } from "tsrpc";
import { BackConfig } from "../models/BackConfig";
import { useSso } from "../models/flows/useSso";
import { ReqStartMatch, ResStartMatch } from "../shared/protocols/matchServer/PtlStartMatch";
import { MsgUpdateRoomState } from "../shared/protocols/roomServer/admin/MsgUpdateRoomState";
import { serviceProto } from "../shared/protocols/serviceProto_matchServer";
import { serviceProto as serviceProto_roomServer, ServiceType as ServiceType_Room } from "../shared/protocols/serviceProto_roomServer";

export class MatchServer {
    readonly server = new HttpServer(serviceProto, {
        port: 3001,
        // Remove this to use binary mode (remove from the client too)
        json: true
    });
    readonly logger = this.server.logger;

    /** 已注册的 RoomServer */
    readonly roomServers: {
        url: string,
        client: WsClient<ServiceType_Room>,
        state?: MsgUpdateRoomState
    }[] = [];

    constructor() {
        // Flows
        // 前置鉴别登录态
        useSso(this.server);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));
    }

    async start() {
        await this.server.start();

        // 定时 log 播报房间状态
        setInterval(() => {
            this.logger.log(`
[MatchServer 状态播报]
  - 已连接 RoomServer=${this.roomServers.count(v => !!v.state)}
  - 连接中 RoomServer=${this.roomServers.count(v => !v.state)}
  - 房间总数=${this.roomServers.sum(v => v.state?.rooms.length ?? 0)}
  - 房内用户数=${this.roomServers.sum(v => v.state?.rooms.sum(v => v.userNum) ?? 0)}
`);
        }, 5000);

        // 定时执行匹配
        this.startMatch();
    }

    async joinRoomServer(serverUrl: string): Promise<void> {
        // 已经注册过
        if (this.roomServers.some(v => v.url === serverUrl)) {
            return;
        }

        // Create
        let client = new WsClient(serviceProto_roomServer, {
            server: serverUrl,
            logger: new PrefixLogger({
                logger: this.logger,
                prefixs: [chalk.bgCyan.white(`RS|${serverUrl}`)]
            }),
            heartbeat: {
                interval: 5000,
                timeout: 5000
            },
            logMsg: false
        });

        // Push
        let roomServer: MatchServer['roomServers'][number] = {
            url: serverUrl,
            client: client
        }
        this.roomServers.push(roomServer);

        // Flows
        client.flows.postDisconnectFlow.push(v => {
            this.roomServers.remove(v1 => v1.client === client);
            return v;
        });
        client.listenMsg('admin/UpdateRoomState', msg => {
            roomServer.state = msg;
        });

        try {
            // Connect
            let op = await client.connect();
            if (!op.isSucc) {
                throw new TsrpcError(op.errMsg);
            }

            // Auth as MatchServer
            let op2 = await client.callApi('admin/Auth', {
                adminToken: BackConfig.adminToken,
                type: 'MatchServer'
            });
            if (!op2.isSucc) {
                client.disconnect();
                throw op2.err;
            }
        }
        catch (e: unknown) {
            this.roomServers.remove(v => v.url === serverUrl);
            throw e;
        }

        this.logger.log(chalk.green(`Room server joined: ${serverUrl}, roomServers.length=${this.roomServers.length}`))
    }

    // #region 匹配相关
    /** 待匹配队列 */
    matchQueue = new Map<string, ApiCallHttp<ReqStartMatch, ResStartMatch>>();

    async startMatch() {
        await this._doMatch().catch(e => {
            this.server.logger.error('[MatchError]', e);
        })

        setTimeout(() => { this.startMatch() }, BackConfig.matchServer.intervalMatch)
    }


    /**
     * 执行一次匹配
     */
    private async _doMatch() {
        this.logger.log(`匹配开始，匹配人数=${this.matchQueue.size}`);
        let succNum = 0;

        // 优先匹配更早开始匹配的房间
        let matchingRooms = this.roomServers.map(v => {
            let rooms = v.state?.rooms ?? [];
            return rooms.map(v1 => ({
                ...v1,
                serverUrl: v.url,
                roomServerClient: v.client
            }))
        }).flat().orderBy(v => v.startMatchTime);

        this.matchQueue.forEach((call, uid) => {
            // 连接已断开，不再匹配
            if (!call.conn.httpRes.writable) {
                this.matchQueue.delete(uid);
                return;
            }

            // 尝试匹配
            let roomIndex = matchingRooms.findIndex(v => v.userNum < BackConfig.roomServer.maxRoomUserNum);
            // 匹配成功
            if (roomIndex > -1) {
                let room = matchingRooms[roomIndex]
                ++room.userNum;
                if (room.userNum >= BackConfig.roomServer.maxRoomUserNum) {
                    matchingRooms.splice(roomIndex, 1);
                }
                call.succ({
                    serverUrl: room.serverUrl,
                    roomId: room.id
                })
                ++succNum;
            }
        })

        this.logger.log(`匹配结束，成功匹配人数=${succNum}`)
    }
    // #endregion

}