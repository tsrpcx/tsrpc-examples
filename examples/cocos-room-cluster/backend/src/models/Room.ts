import { RoomServerConn } from "../RoomServer/RoomServer";
import { MsgUpdateRoomInfo } from "../shared/protocols/roomServer/roomMsg/MsgUpdateRoomInfo";

export class Room {

    info!: MsgUpdateRoomInfo

    broadcastMsg() { }

    join(conn: RoomServerConn) { }

    leave(uid: string) { }

}