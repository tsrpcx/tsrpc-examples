import path from "path";
import { HttpServer, WsClient } from "tsrpc";
import { UserUtil } from "../models/UserUtil";
import { MsgUpdateRoomState } from "../shared/protocols/roomServer/admin/MsgUpdateRoomState";
import { serviceProto } from "../shared/protocols/serviceProto_hallServer";
import { ServiceType as ServiceType_Room } from "../shared/protocols/serviceProto_roomServer";
import { UserInfo } from "../shared/types/UserInfo";

export class HallServer {
    readonly server = new HttpServer(serviceProto, {
        port: 3000,
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
        this.server.flows.preApiCallFlow.push(async call => {
            call.currentUser = call.req.sso ? await UserUtil.parseSso(call.req.sso) : undefined;

            // 需要登录的接口：前置登录态判定
            if (!call.service.conf?.allowGuest) {
                if (!call.currentUser) {
                    call.error('你还未登录', { code: 'NEED_LOGIN' });
                    return undefined;
                }
            }

            if (call.currentUser) {
                call.logger.prefixs.push(`[uid=${call.currentUser.id}]`);
            }

            return call;
        });
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));
    }

    async start() {
        await this.server.start();
    }
}

declare module 'tsrpc' {
    export interface ApiCall {
        /** 只要协议配置的 `allowGuest` 不为 `true`，则必定有值 */
        currentUser?: UserInfo;
    }
}