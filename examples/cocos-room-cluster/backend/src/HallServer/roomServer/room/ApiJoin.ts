import { ApiCall } from "tsrpc";
import { ReqJoin, ResJoin } from "../../../shared/protocols/roomServer/room/PtlJoin";

export async function ApiJoin(call: ApiCall<ReqJoin, ResJoin>) {
    // TODO
    call.error('API Not Implemented');
}