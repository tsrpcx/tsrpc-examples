import path from "path";
import { WsConnection, WsServer } from "tsrpc";
import { Room } from "../models/Room";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto_roomServer";
import { UserInfo } from "../shared/types/UserInfo";

export class RoomServer {
    readonly server = new WsServer(serviceProto, {
        port: parseInt(process.env['PORT'] || '3002'),
        // Remove this to use binary mode (remove from the client too)
        json: true
    });

    id2Room = new Map<string, Room>();
    rooms: Room[] = [];

    constructor() {
        // Flows
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
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));
    }

    async start() {
        await this.server.start();
    }
}

export type RoomServerConn = WsConnection<ServiceType> & {
    currentUser?: UserInfo;
    currentRoom?: Room;
};