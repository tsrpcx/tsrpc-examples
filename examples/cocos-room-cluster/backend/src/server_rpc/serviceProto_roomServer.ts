import { ServiceProto } from 'tsrpc-proto';
import { MsgUpdateRoomState } from '../shared/protocols/roomServer/admin/MsgUpdateRoomState';
import { ReqAuth, ResAuth } from '../shared/protocols/roomServer/admin/PtlAuth';
import { ReqCreateRoom, ResCreateRoom } from '../shared/protocols/roomServer/admin/PtlCreateRoom';
import { ReqPreJoinRoom, ResPreJoinRoom } from '../shared/protocols/roomServer/admin/PtlPreJoinRoom';
import { ReqExitRoom, ResExitRoom } from '../shared/protocols/roomServer/PtlExitRoom';
import { ReqJoinRoom, ResJoinRoom } from '../shared/protocols/roomServer/PtlJoinRoom';
import { ReqUpdateRoom, ResUpdateRoom } from '../shared/protocols/roomServer/PtlUpdateRoom';
import { MsgChat } from '../shared/protocols/roomServer/roomMsg/MsgChat';
import { MsgUpdateRoomInfo } from '../shared/protocols/roomServer/roomMsg/MsgUpdateRoomInfo';

export interface ServiceType {
    api: {
        "admin/Auth": {
            req: ReqAuth,
            res: ResAuth
        },
        "admin/CreateRoom": {
            req: ReqCreateRoom,
            res: ResCreateRoom
        },
        "admin/PreJoinRoom": {
            req: ReqPreJoinRoom,
            res: ResPreJoinRoom
        },
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
        "admin/UpdateRoomState": MsgUpdateRoomState,
        "roomMsg/Chat": MsgChat,
        "roomMsg/UpdateRoomInfo": MsgUpdateRoomInfo
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "services": [
        {
            "id": 0,
            "name": "admin/UpdateRoomState",
            "type": "msg"
        },
        {
            "id": 1,
            "name": "admin/Auth",
            "type": "api"
        },
        {
            "id": 2,
            "name": "admin/CreateRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "admin/PreJoinRoom",
            "type": "api",
            "conf": {}
        },
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
        "admin/MsgUpdateRoomState/MsgUpdateRoomState": {
            "type": "Interface"
        },
        "admin/PtlAuth/ReqAuth": {
            "type": "Interface"
        },
        "admin/PtlAuth/ResAuth": {
            "type": "Interface"
        },
        "admin/PtlCreateRoom/ReqCreateRoom": {
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
        "admin/PtlCreateRoom/ResCreateRoom": {
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
        "admin/PtlPreJoinRoom/ReqPreJoinRoom": {
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
        "admin/PtlPreJoinRoom/ResPreJoinRoom": {
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