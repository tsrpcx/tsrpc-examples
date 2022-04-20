import { ApiCall } from "tsrpc";
import { ReqJoinRoom, ResJoinRoom } from "../../shared/protocols/roomServer/PtlJoinRoom";

export async function ApiJoinRoom(call: ApiCall<ReqJoinRoom, ResJoinRoom>) {
    // TODO
    call.error('API Not Implemented');
}