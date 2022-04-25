import { RoomData } from "../../../types/RoomData";
import { BaseConf, BaseRequest, BaseResponse } from "./../../base";

export interface ReqJoin extends BaseRequest {
    roomId: string
}

export interface ResJoin extends BaseResponse {
    roomData: RoomData
}

export const conf: BaseConf = {

}