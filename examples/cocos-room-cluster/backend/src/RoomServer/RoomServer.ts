import chalk from "chalk";
import path from "path";
import { HttpClient, WsConnection, WsServer } from "tsrpc";
import { BackConfig } from "../models/BackConfig";
import { Room } from "./models/Room";
import { serviceProto as serviceProto_matchServer } from "../shared/protocols/serviceProto_matchServer";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto_roomServer";
import { UserInfo } from "../shared/types/UserInfo";

export interface RoomServerOptions {
    thisServerUrl: string,
    matchServerUrl: string
}

export class RoomServer {
    readonly server = new WsServer(serviceProto, {
        port: parseInt(process.env['PORT'] || '3002'),
        // Remove this to use binary mode (remove from the client too)
        json: true
    });
    readonly logger = this.server.logger;

    id2Room = new Map<string, Room>();
    rooms: Room[] = [];

    constructor(public readonly options: RoomServerOptions) {
        // 前置鉴别登录态
        this.server.flows.preApiCallFlow.push(async call => {
            const conn = call.conn as RoomServerConn;
            // 需要登录的接口：前置登录态判定
            if (!call.service.conf?.allowGuest) {
                if (!conn.currentUser) {
                    call.error('你还未登录', { code: 'NEED_LOGIN' });
                    return undefined;
                }
            }

            return call;
        });

        // MatchServer 断开后清理
        this.server.flows.postDisconnectFlow.push(v => {
            let conn = v.conn as RoomServerConn;
            if (conn.matchServer) {
                clearInterval(conn.matchServer.intervalSendState)
                if (this.matchServerConn === conn) {
                    this.matchServerConn = undefined;
                }
            }

            return v;
        })
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));
    }

    async start() {
        await this.server.start();

        // 启动成功后，定时检测加入匹配服务
        setInterval(() => { this.joinMatchServer() }, 5000);
        this.joinMatchServer();
    }

    /**
     * 注册到 MatchServer
     */
    async joinMatchServer() {
        // 防止重复连接
        if (this.matchServerConn || this._isJoiningMatchServer) {
            return;
        }

        this.logger.log(chalk.cyan('Starting join match server: ' + this.options.matchServerUrl));
        let client = new HttpClient(serviceProto_matchServer, {
            server: this.options.matchServerUrl
        })
        let ret = await client.callApi('admin/RoomServerJoin', {
            adminToken: BackConfig.adminToken,
            serverUrl: this.options.thisServerUrl
        });
        if (!ret.isSucc) {
            this.logger.error('Join match server failed.', ret.err);
            return;
        }
        if (!this.matchServerConn) {
            this.logger.warn('Join match server succ, but not matchServerConn');
            return;
        }
        this.logger.log(chalk.green('Join match server succ.'));
    }
    private _isJoiningMatchServer?: boolean;
    matchServerConn?: RoomServerConn;
}

export type RoomServerConn = WsConnection<ServiceType> & {
    currentUser?: UserInfo;
    currentRoom?: Room;
    matchServer?: {
        intervalSendState: ReturnType<typeof setInterval>;
    }
};