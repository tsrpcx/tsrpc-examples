import { ApiCall } from "tsrpc";
import { ReqSendChat, ResSendChat } from "../../../shared/protocols/roomServer/room/PtlSendChat";

export async function ApiSendChat(call: ApiCall<ReqSendChat, ResSendChat>) {
    // TODO
    call.error('API Not Implemented');
}