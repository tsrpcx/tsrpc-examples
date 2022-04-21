import { ApiCall } from "tsrpc";
import { ReqRoomServerJoin, ResRoomServerJoin } from "../../../shared/protocols/matchServer/admin/PtlRoomServerJoin";

export async function ApiRoomServerJoin(call: ApiCall<ReqRoomServerJoin, ResRoomServerJoin>) {
    // TODO
    call.error('API Not Implemented');
}