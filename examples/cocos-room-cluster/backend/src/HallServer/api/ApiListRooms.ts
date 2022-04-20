import { ApiCall } from "tsrpc";
import { hallServer } from "../../hallServer";
import { ReqListRooms, ResListRooms } from "../../shared/protocols/hallServer/PtlListRooms";

export async function ApiListRooms(call: ApiCall<ReqListRooms, ResListRooms>) {
    let rooms = hallServer.roomServers.reduce((prev, next) => {
        if (next.state) {
            prev = prev.concat(next.state.rooms.map(v => ({
                name: v.name,
                userNum: v.userNum,
                serverUrl: next.url,
                roomId: v.id,
                updateTime: v.updateTime
            })))
        }
        return prev;
    }, [] as (ResListRooms['rooms'][0] & { updateTime: number })[])

    call.succ({
        rooms: rooms.orderByDesc(v => v.updateTime).slice(0, 100)
    })
}