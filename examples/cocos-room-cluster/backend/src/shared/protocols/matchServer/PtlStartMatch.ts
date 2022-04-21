import { uint } from "tsrpc-proto";
import { BaseConf, BaseRequest, BaseResponse } from "../base";

export interface ReqStartMatch extends BaseRequest {

}

export interface ResStartMatch extends BaseResponse {
    serverUrl: string,
    roomId: uint
}

export const conf: BaseConf = {

}