import { BaseRequest, BaseResponse, BaseConf } from "./../base";

export interface ReqJoinRoom extends BaseRequest {
    roomId: string
}

export interface ResJoinRoom extends BaseResponse {
    
}

export const conf: BaseConf = {
    
}