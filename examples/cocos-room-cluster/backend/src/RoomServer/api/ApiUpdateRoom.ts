import { ApiCall } from "tsrpc";
import { ReqUpdateRoom, ResUpdateRoom } from "../../shared/protocols/roomServer/PtlUpdateRoom";

export async function ApiUpdateRoom(call: ApiCall<ReqUpdateRoom, ResUpdateRoom>) {
    // TODO
    call.error('API Not Implemented');
}