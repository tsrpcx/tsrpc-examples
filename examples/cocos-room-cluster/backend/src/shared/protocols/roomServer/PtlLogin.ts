import { UserInfo } from "../../types/UserInfo";
import { BaseConf, BaseRequest, BaseResponse } from "./../base";

export interface ReqLogin extends BaseRequest {
    sso: string
}

export interface ResLogin extends BaseResponse {
    user: UserInfo
}

export const conf: BaseConf = {
    allowGuest: true
}