import { ApiCall } from "tsrpc";
import { roomServer } from "../../../roomServer";
import { ReqJoin, ResJoin } from "../../../shared/protocols/roomServer/room/PtlJoin";
import { RoomServerConn } from "../../RoomServer";

export async function ApiJoin(call: ApiCall<ReqJoin, ResJoin>) {
    let room = roomServer.id2Room.get(call.req.roomId);
    if (!room) {
        return call.error('房间不存在');
    }

    if (room.data.users.length >= room.data.maxUser) {
        return call.error('该房间已满员');
    }

    const conn = call.conn as RoomServerConn;
    const currentUser = conn.currentUser!;

    // 用户已经在本房间中，可能是通过其它设备登录，踢出旧连接
    let existedConns = room.conns.filter(v => v.currentUser!.id === currentUser.id);
    existedConns.forEach(v => {
        room!.leave(v)
    });
    // 用户正在其它房间中，从已有房间中退出
    if (conn.currentRoom) {
        conn.currentRoom.leave(conn);
    }

    room.conns.push(conn);
    room.data.users.push(currentUser);
    conn.currentRoom = room;
    room.listenMsgs(conn);
    room.data.lastEmptyTime = undefined;

    room.broadcastMsg('room/serverMsg/UserJoin', {
        time: new Date,
        user: currentUser
    })

    call.succ({ roomData: room.data });
}