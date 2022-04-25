import { uint } from "tsrpc"
import { UserInfo } from "./UserInfo"

export interface RoomData {
    id: string,
    name: string,
    /** 房间可容纳的最大人数 */
    maxUser: uint,
    /** 房间内的用户 */
    users: UserInfo[],
    /** 历史消息（只保留最近的 N 条） */
    messages: {
        user: UserInfo,
        time: Date,
        content: string
    }[],

    /**
     * 上一次空房的时间（undefined 代表房内有人）
     * 用于定时解散无人的房间
     */
    lastEmptyTime?: number
}