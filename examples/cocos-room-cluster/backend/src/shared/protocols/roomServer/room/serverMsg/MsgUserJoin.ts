import { UserInfo } from "../../../../types/UserInfo"

/** 系统消息 */
export interface MsgUserJoin {
    time: Date,
    user: UserInfo
}

// export const conf = {}