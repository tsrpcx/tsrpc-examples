import { ApiCall } from "tsrpc";
import { UserUtil } from "../../models/UserUtil";
import { roomServer } from "../../roomServer";
import { ReqJoinRoom, ResJoinRoom } from "../../shared/protocols/roomServer/PtlJoinRoom";
import { RoomServerConn } from "../RoomServer";

export async function ApiJoinRoom(call: ApiCall<ReqJoinRoom, ResJoinRoom>) {
    const conn = call.conn as RoomServerConn;

    // 解析登录态
    if (!conn.currentUser) {
        conn.currentUser = call.req.sso ? await UserUtil.parseSso(call.req.sso) : undefined;
        if (!conn.currentUser) {
            return call.error('你还未登录', { code: 'NEED_LOGIN' });
        }
        conn.logger.prefixs.push(`[userId=${conn.currentUser.id}]`);
    }

    let room = roomServer.id2Room.get(call.req.roomId);
    if (!room) {
        return call.error('房间不存在');
    }

    // 已经在房间中
    if (conn.currentRoom) {
        // 重复进入房间
        if (conn.currentRoom === room) {
            return call.succ({ roomInfo: room.info });
        }
        // 从已有房间中退出
        conn.currentRoom.leave(conn.currentUser.id);
    }

    room.join(conn);
    conn.currentRoom = room;

    // Return success
    call.succ({ roomInfo: room.info });
}