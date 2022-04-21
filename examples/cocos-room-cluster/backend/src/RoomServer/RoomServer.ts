import chalk from "chalk";
import path from "path";
import { HttpClient, WsConnection, WsServer } from "tsrpc";
import { BackConfig } from "../models/BackConfig";
import { useAdminToken } from "../models/flows/useAdminToken";
import { serviceProto as serviceProto_matchServer } from "../shared/protocols/serviceProto_matchServer";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto_roomServer";
import { UserInfo } from "../shared/types/UserInfo";
import { useCleanConn } from "./models/flows/useCleanConn";
import { useSsoWs } from "./models/flows/useSsoWs";
import { Room } from "./models/Room";

export interface RoomServerOptions {
    port: number,
    thisServerUrl: string,
    matchServerUrl: string
}

export class RoomServer {
    readonly server = new WsServer(serviceProto, {
        port: this.options.port,
        // Remove this to use binary mode (remove from the client too)
        json: true
    });
    readonly logger = this.server.logger;

    id2Room = new Map<string, Room>();
    rooms: Room[] = [];

    constructor(public readonly options: RoomServerOptions) {
        // Flows
        useAdminToken(this.server);
        useSsoWs(this.server);
        useCleanConn(this.server);
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

        this.logger.log(chalk.cyan('正在加入 MatchServer: ' + this.options.matchServerUrl));
        let client = new HttpClient(serviceProto_matchServer, {
            server: this.options.matchServerUrl
        })
        let ret = await client.callApi('admin/RoomServerJoin', {
            adminToken: BackConfig.adminToken,
            serverUrl: this.options.thisServerUrl
        });
        if (!ret.isSucc) {
            this.logger.error('MatchServer 加入失败', ret.err);
            return;
        }
        if (!this.matchServerConn) {
            this.logger.error('MatchServer 加入成功, 但缺少 matchServerConn');
            return;
        }
        this.logger.log(chalk.green('MatchServer 加入成功'));
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