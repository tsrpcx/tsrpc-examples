import { ApiCall } from "tsrpc";
import { ReqExit, ResExit } from "../../../shared/protocols/roomServer/room/PtlExit";

export async function ApiExit(call: ApiCall<ReqExit, ResExit>) {
    // TODO
    call.error('API Not Implemented');
}