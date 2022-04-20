import { BaseConf, BaseRequest, BaseResponse } from "../base";

export interface ReqUpdateRoom extends BaseRequest {
    roomId: string,
    roomName: string
}

export interface ResUpdateRoom extends BaseResponse {

}

export const conf: BaseConf = {

}