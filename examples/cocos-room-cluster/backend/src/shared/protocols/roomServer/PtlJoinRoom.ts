import { BaseConf, BaseRequest, BaseResponse } from "./../base";
import { MsgUpdateRoomInfo } from "./roomMsg/MsgUpdateRoomInfo";

export interface ReqJoinRoom extends BaseRequest {
    roomId: string
}

export interface ResJoinRoom extends BaseResponse {
    roomInfo: MsgUpdateRoomInfo
}

export const conf: BaseConf = {
    allowGuest: true
}