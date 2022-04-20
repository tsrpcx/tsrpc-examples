import { UserInfo } from "../../types/UserInfo";
import { BaseConf } from "../base";

export interface ReqLogin {
    nickname: string
}

export interface ResLogin {
    sso: string,
    user: UserInfo
}

export const conf: BaseConf = {
    allowGuest: true
}