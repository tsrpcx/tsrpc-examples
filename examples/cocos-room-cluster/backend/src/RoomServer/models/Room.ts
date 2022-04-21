import { RoomServerConn } from "../RoomServer";
import { MsgUpdateRoomState } from "../../shared/protocols/roomServer/admin/MsgUpdateRoomState";
import { MsgUpdateRoomInfo } from "../../shared/protocols/roomServer/roomMsg/MsgUpdateRoomInfo";


export class Room {

    info!: MsgUpdateRoomInfo;
    get state(): MsgUpdateRoomState['rooms'][number] {
        throw new Error('')
    }

    broadcastMsg() { }

    join(conn: RoomServerConn) { }

    leave(uid: string) { }

}