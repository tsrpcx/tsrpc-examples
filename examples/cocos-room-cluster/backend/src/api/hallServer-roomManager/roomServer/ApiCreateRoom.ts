import { ApiCall } from "tsrpc";
import { ReqCreateRoom, ResCreateRoom } from "../../../shared/protocols/hallServer-roomManager/roomServer/PtlCreateRoom";

export async function ApiCreateRoom(call: ApiCall<ReqCreateRoom, ResCreateRoom>) {
    // TODO
    call.error('API Not Implemented');
}