import { ApiCall } from "tsrpc";
import { ReqRegister, ResRegister } from "../../shared/protocols/hallServer/admin/PtlRegisterRoomServer";

export async function ApiRegister(call: ApiCall<ReqRegister, ResRegister>) {
    // TODO
    call.error('API Not Implemented');
}