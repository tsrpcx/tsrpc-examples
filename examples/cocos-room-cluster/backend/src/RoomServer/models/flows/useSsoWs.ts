import { WsServer } from "tsrpc";
import { RoomServerConn } from "../../RoomServer";

/**
 * 登录态校验，WebSocket 与 HTTP 不同，登录态直接存在 Connection 上
 */
export function useSsoWs(server: WsServer) {
    server.flows.preApiCallFlow.push(async call => {
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