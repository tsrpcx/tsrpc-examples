import { ServiceProto } from 'tsrpc-proto';
import { ReqRegister, ResRegister } from './hallServer-roomManager/PtlRegister';
import { MsgUpdateRoomState } from './hallServer-roomManager/roomServer/MsgUpdateRoomState';
import { ReqCreateRoom, ResCreateRoom } from './hallServer-roomManager/roomServer/PtlCreateRoom';
import { ReqPreJoinRoom, ResPreJoinRoom } from './hallServer-roomManager/roomServer/PtlPreJoinRoom';
import { ReqCreateRoom as ReqCreateRoom_1, ResCreateRoom as ResCreateRoom_1 } from './hallServer/PtlCreateRoom';
import { ReqListRooms, ResListRooms } from './hallServer/PtlListRooms';
import { ReqStartMatch, ResStartMatch } from './hallServer/PtlStartMatch';
import { ReqExitRoom, ResExitRoom } from './roomServer/PtlExitRoom';
import { ReqJoinRoom, ResJoinRoom } from './roomServer/PtlJoinRoom';
import { ReqUpdateRoomInfo, ResUpdateRoomInfo } from './roomServer/PtlUpdateRoomInfo';
import { MsgChat } from './roomServer/roomMsg/MsgChat';
import { MsgUpdateRoomInfo } from './roomServer/roomMsg/MsgUpdateRoomInfo';

export interface ServiceType {
    api: {
        "hallServer-roomManager/Register": {
            req: ReqRegister,
            res: ResRegister
        },
        "hallServer-roomManager/roomServer/CreateRoom": {
            req: ReqCreateRoom,
            res: ResCreateRoom
        },
        "hallServer-roomManager/roomServer/PreJoinRoom": {
            req: ReqPreJoinRoom,
            res: ResPreJoinRoom
        },
        "hallServer/CreateRoom": {
            req: ReqCreateRoom_1,
            res: ResCreateRoom_1
        },
        "hallServer/ListRooms": {
            req: ReqListRooms,
            res: ResListRooms
        },
        "hallServer/StartMatch": {
            req: ReqStartMatch,
            res: ResStartMatch
        },
        "roomServer/ExitRoom": {
            req: ReqExitRoom,
            res: ResExitRoom
        },
        "roomServer/JoinRoom": {
            req: ReqJoinRoom,
            res: ResJoinRoom
        },
        "roomServer/UpdateRoomInfo": {
            req: ReqUpdateRoomInfo,
            res: ResUpdateRoomInfo
        }
    },
    msg: {
        "hallServer-roomManager/roomServer/UpdateRoomState": MsgUpdateRoomState,
        "roomServer/roomMsg/Chat": MsgChat,
        "roomServer/roomMsg/UpdateRoomInfo": MsgUpdateRoomInfo
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "services": [
        {
            "id": 0,
            "name": "hallServer-roomManager/Register",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "hallServer-roomManager/roomServer/UpdateRoomState",
            "type": "msg"
        },
        {
            "id": 2,
            "name": "hallServer-roomManager/roomServer/CreateRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "hallServer-roomManager/roomServer/PreJoinRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "hallServer/CreateRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "hallServer/ListRooms",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "hallServer/StartMatch",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "roomServer/ExitRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 8,
            "name": "roomServer/JoinRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 9,
            "name": "roomServer/UpdateRoomInfo",
            "type": "api",
            "conf": {}
        },
        {
            "id": 10,
            "name": "roomServer/roomMsg/Chat",
            "type": "msg"
        },
        {
            "id": 11,
            "name": "roomServer/roomMsg/UpdateRoomInfo",
            "type": "msg"
        }
    ],
    "types": {
        "hallServer-roomManager/PtlRegister/ReqRegister": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "base/BaseRequest": {
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
        "hallServer-roomManager/PtlRegister/ResRegister": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface"
        },
        "hallServer-roomManager/roomServer/MsgUpdateRoomState/MsgUpdateRoomState": {
            "type": "Interface"
        },
        "hallServer-roomManager/roomServer/PtlCreateRoom/ReqCreateRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "hallServer-roomManager/roomServer/PtlCreateRoom/ResCreateRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "hallServer-roomManager/roomServer/PtlPreJoinRoom/ReqPreJoinRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "hallServer-roomManager/roomServer/PtlPreJoinRoom/ResPreJoinRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "hallServer/PtlCreateRoom/ReqCreateRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "hallServer/PtlCreateRoom/ResCreateRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "hallServer/PtlListRooms/ReqListRooms": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "hallServer/PtlListRooms/ResListRooms": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "hallServer/PtlStartMatch/ReqStartMatch": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "hallServer/PtlStartMatch/ResStartMatch": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "roomServer/PtlExitRoom/ReqExitRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "roomServer/PtlExitRoom/ResExitRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "roomServer/PtlJoinRoom/ReqJoinRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "roomServer/PtlJoinRoom/ResJoinRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "roomServer/PtlUpdateRoomInfo/ReqUpdateRoomInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "roomServer/PtlUpdateRoomInfo/ResUpdateRoomInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "roomServer/roomMsg/MsgChat/MsgChat": {
            "type": "Interface"
        },
        "roomServer/roomMsg/MsgUpdateRoomInfo/MsgUpdateRoomInfo": {
            "type": "Interface"
        }
    }
};