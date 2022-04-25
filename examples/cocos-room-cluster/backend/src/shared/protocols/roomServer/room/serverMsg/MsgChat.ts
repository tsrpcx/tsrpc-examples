import { UserInfo } from "../../../../types/UserInfo";

export interface MsgChat {
    time: Date,
    user: UserInfo,
    content: string,
    /** 私聊信息 */
    isPrivate?: boolean
}

// export const conf = {}