import { ApiCall } from "tsrpc";
import { ReqExitRoom, ResExitRoom } from "../../shared/protocols/roomServer/PtlExitRoom";

export async function ApiExitRoom(call: ApiCall<ReqExitRoom, ResExitRoom>) {
    // TODO
    call.error('API Not Implemented');
}