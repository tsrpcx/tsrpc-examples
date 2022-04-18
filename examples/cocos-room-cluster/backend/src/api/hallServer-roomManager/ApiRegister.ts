import { ApiCall } from "tsrpc";
import { ReqRegister, ResRegister } from "../../shared/protocols/hallServer-roomManager/PtlRegister";

export async function ApiRegister(call: ApiCall<ReqRegister, ResRegister>) {
    // TODO
    call.error('API Not Implemented');
}