import { WsServer } from "tsrpc";
import { roomServer } from "../../../roomServer";
import { RoomServerConn } from "../../RoomServer";

/** MatchServer 断开后清理 */
export function useCleanConn(server: WsServer<any>) {
    server.flows.postDisconnectFlow.push(v => {
        let conn = v.conn as RoomServerConn;
        if (conn.matchServer) {
            clearInterval(conn.matchServer.intervalSendState)
            if (roomServer.matchServerConn === conn) {
                roomServer.matchServerConn = undefined;
            }
        }

        return v;
    })
}