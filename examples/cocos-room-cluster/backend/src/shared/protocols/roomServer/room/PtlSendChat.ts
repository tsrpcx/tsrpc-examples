import { BaseConf, BaseRequest, BaseResponse } from "./../../base";

export interface ReqSendChat extends BaseRequest {
    content: string,
    /** 私聊信息，发给指定用户 */
    toUid?: string
}

export interface ResSendChat extends BaseResponse {

}

export const conf: BaseConf = {

}