import { UserInfo } from "../../../types/UserInfo"
import { BaseConf } from "../../base"

export interface ReqCreateRoom {
    adminToken: string,
    creator: UserInfo,
    roomName: string
}

export interface ResCreateRoom {
    roomId: string
}

export const conf: BaseConf = {
    allowGuest: true
}