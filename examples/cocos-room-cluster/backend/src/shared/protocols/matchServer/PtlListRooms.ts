import { uint } from "tsrpc";
import { BaseConf, BaseRequest, BaseResponse } from "../base";

export interface ReqListRooms extends BaseRequest {

}

export interface ResListRooms extends BaseResponse {
    rooms: {
        name: string,
        userNum: uint,
        serverUrl: string,
        roomId: string
    }[]
}

export const conf: BaseConf = {

}