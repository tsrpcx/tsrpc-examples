import path from "path";
import { HttpServer, WsClient } from "tsrpc";
import { useSso } from "../models/flows/useSso";
import { UserUtil } from "../models/UserUtil";
import { MsgUpdateRoomState } from "../shared/protocols/roomServer/admin/MsgUpdateRoomState";
import { serviceProto } from "../shared/protocols/serviceProto_matchServer";
import { ServiceType as ServiceType_Room } from "../shared/protocols/serviceProto_roomServer";
import { UserInfo } from "../shared/types/UserInfo";

export class MatchServer {
    readonly server = new HttpServer(serviceProto, {
        port: 3001,
        // Remove this to use binary mode (remove from the client too)
        json: true
    });

    /** 已注册的 RoomServer */
    readonly roomServers: {
        url: string,
        conn: WsClient<ServiceType_Room>,
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
    }
}