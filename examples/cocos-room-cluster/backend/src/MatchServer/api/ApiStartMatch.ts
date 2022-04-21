import { ApiCall } from "tsrpc";
import { ReqStartMatch, ResStartMatch } from "../../shared/protocols/matchServer/PtlStartMatch";

export async function ApiStartMatch(call: ApiCall<ReqStartMatch, ResStartMatch>) {
    // TODO
    call.error('API Not Implemented');
}