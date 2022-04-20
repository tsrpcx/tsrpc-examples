import { ApiCall } from "tsrpc";
import { ReqAuth, ResAuth } from "../../../shared/protocols/roomServer/admin/PtlAuth";

export async function ApiAuth(call: ApiCall<ReqAuth, ResAuth>) {
    // TODO
    call.error('API Not Implemented');
}