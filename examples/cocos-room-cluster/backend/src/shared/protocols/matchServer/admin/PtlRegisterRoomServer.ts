import { BaseConf } from "../../base";

export interface ReqRegisterRoomServer {
    /** RoomServer 的连接地址 */
    serverUrl: string,
    /** Token 用于鉴权 */
    adminToken: string
}

export interface ResRegisterRoomServer {

}