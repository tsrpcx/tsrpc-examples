import { ApiCall } from "tsrpc";
import { ReqPreJoinRoom, ResPreJoinRoom } from "../../../shared/protocols/hallServer-roomManager/roomServer/PtlPreJoinRoom";

export async function ApiPreJoinRoom(call: ApiCall<ReqPreJoinRoom, ResPreJoinRoom>) {
    // TODO
    call.error('API Not Implemented');
}