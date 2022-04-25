import { ApiCall } from "tsrpc";
import { ReqLogin, ResLogin } from "../../shared/protocols/roomServer/PtlLogin";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    // TODO
    call.error('API Not Implemented');
}