import { ApiCall } from "tsrpc";
import { ReqExit, ResExit } from "../../../shared/protocols/roomServer/room/PtlExit";
import { RoomServerConn } from "../../RoomServer";

export async function ApiExit(call: ApiCall<ReqExit, ResExit>) {
    const conn = call.conn as RoomServerConn;
    if (conn.currentRoom) {
        conn.currentRoom.leave(conn);
    }

    call.succ({});
}