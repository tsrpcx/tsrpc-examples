import { ApiCall } from "tsrpc";
import { roomServer } from "../../../roomServer";
import { ReqSendChat, ResSendChat } from "../../../shared/protocols/roomServer/room/PtlSendChat";
import { RoomServerConn } from "../../RoomServer";

export async function ApiSendChat(call: ApiCall<ReqSendChat, ResSendChat>) {
    const conn = call.conn as RoomServerConn;
    const room = conn.currentRoom;
    const currentUser = conn.currentUser!;
    if (!room) {
        return call.error('尚未加入房间');
    }

    // 私聊
    if (call.req.toUid) {
        const toConn = room.conns.find(v => v.currentUser!.id === call.req.toUid);
        if (!toConn) {
            return call.error('要私聊的对象不在房间中');
        }
        // 发给自己和对方
        roomServer.server.broadcastMsg('room/serverMsg/Chat', {
            time: new Date,
            content: call.req.content,
            user: currentUser,
            isPrivate: true
        }, [conn, toConn])
    }
    // 群发
    else {
        // 发给房间内的所有人
        room.broadcastMsg('room/serverMsg/Chat', {
            time: new Date,
            content: call.req.content,
            user: currentUser
        })
    }

    call.succ({})
}