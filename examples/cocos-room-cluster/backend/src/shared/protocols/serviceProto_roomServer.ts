import { ServiceProto } from 'tsrpc-proto';
import { ReqExitRoom, ResExitRoom } from './roomServer/PtlExitRoom';
import { ReqJoinRoom, ResJoinRoom } from './roomServer/PtlJoinRoom';
import { ReqUpdateRoom, ResUpdateRoom } from './roomServer/PtlUpdateRoom';
import { MsgChat } from './roomServer/roomMsg/MsgChat';
import { MsgUpdateRoomInfo } from './roomServer/roomMsg/MsgUpdateRoomInfo';

export interface ServiceType {
    api: {
        "ExitRoom": {
            req: ReqExitRoom,
            res: ResExitRoom
        },
        "JoinRoom": {
            req: ReqJoinRoom,
            res: ResJoinRoom
        },
        "UpdateRoom": {
            req: ReqUpdateRoom,
            res: ResUpdateRoom
        }
    },
    msg: {
        "roomMsg/Chat": MsgChat,
        "roomMsg/UpdateRoomInfo": MsgUpdateRoomInfo
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 1,
    "services": [
        {
            "id": 4,
            "name": "ExitRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "JoinRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "UpdateRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "roomMsg/Chat",
            "type": "msg"
        },
        {
            "id": 8,
            "name": "roomMsg/UpdateRoomInfo",
            "type": "msg"
        }
    ],
    "types": {
        "PtlExitRoom/ReqExitRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ]
        },
        "../base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "sso",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "PtlExitRoom/ResExitRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ]
        },
        "../base/BaseResponse": {
            "type": "Interface"
        },
        "PtlJoinRoom/ReqJoinRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ]
        },
        "PtlJoinRoom/ResJoinRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ]
        },
        "PtlUpdateRoom/ReqUpdateRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ]
        },
        "PtlUpdateRoom/ResUpdateRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ]
        },
        "roomMsg/MsgChat/MsgChat": {
            "type": "Interface"
        },
        "roomMsg/MsgUpdateRoomInfo/MsgUpdateRoomInfo": {
            "type": "Interface"
        }
    }
};