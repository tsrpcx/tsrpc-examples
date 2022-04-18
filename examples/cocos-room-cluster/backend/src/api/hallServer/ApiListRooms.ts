import { ApiCall } from "tsrpc";
import { ReqListRooms, ResListRooms } from "../../shared/protocols/hallServer/PtlListRooms";

export async function ApiListRooms(call: ApiCall<ReqListRooms, ResListRooms>) {
    // TODO
    call.error('API Not Implemented');
}