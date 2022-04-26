import { PrefixLogger } from "tsrpc";
import { roomServer } from "../../roomServer";
import { MsgUpdateRoomState } from "../../shared/protocols/roomServer/admin/MsgUpdateRoomState";
import { ServiceType } from "../../shared/protocols/serviceProto_roomServer";
import { RoomData } from "../../shared/types/RoomData";
import { RoomServerConn } from "../RoomServer";

export class Room {

    data: RoomData;
    conns: RoomServerConn[] = [];
    logger: PrefixLogger;

    constructor(data: RoomData) {
        this.data = data;

        this.logger = new PrefixLogger({
            logger: roomServer.logger,
            prefixs: [`[Room ${data.id}]`],
        });
    }

    get state(): MsgUpdateRoomState['rooms'][number] {
        return {
            id: this.data.id,
            name: this.data.name,
            userNum: this.conns.length,
            maxUserNum: this.data.maxUser,
            /** 为 undefined 代表不在匹配中 */
            startMatchTime: this.data.startMatchTime,
            // 房间信息的最后更新时间
            updateTime: this.data.updateTime
        }
    }

    /** 房间内广播 */
    broadcastMsg<T extends keyof ServiceType['msg']>(msgName: T, msg: ServiceType['msg'][T]) {
        return roomServer.server.broadcastMsg(msgName, msg, this.conns);
    }

    listenMsgs(conn: RoomServerConn) {
        // TODO
    }
    unlistenMsgs(conn: RoomServerConn) {
        // TODO
    }

    leave(conn: RoomServerConn) {
        const currentUser = conn?.currentUser!;
        this.logger.log('[UserLeave]', currentUser?.id);

        this.conns.removeOne(v => v === conn);
        this.data.users.removeOne(v => v.id === currentUser.id);
        this.data.updateTime = Date.now();

        if (conn) {
            conn.currentRoom = undefined;
            this.unlistenMsgs(conn);
        }

        if (currentUser) {
            this.broadcastMsg('room/serverMsg/UserExit', {
                time: new Date,
                user: currentUser!
            })
        }

        if (this.conns.length === 0) {
            this.data.lastEmptyTime = Date.now();
        }
    }

    destroy() {
        this.logger.log('[Destroy]');
    }

}