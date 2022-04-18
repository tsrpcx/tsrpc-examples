import { ApiCall } from "tsrpc";
import { ReqUpdateRoomInfo, ResUpdateRoomInfo } from "../../shared/protocols/roomServer/PtlUpdateRoomInfo";

export async function ApiUpdateRoomInfo(call: ApiCall<ReqUpdateRoomInfo, ResUpdateRoomInfo>) {
    // TODO
    call.error('API Not Implemented');
}