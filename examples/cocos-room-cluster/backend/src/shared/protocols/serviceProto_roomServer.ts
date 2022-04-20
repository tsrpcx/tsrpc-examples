import { ServiceProto } from 'tsrpc-proto';
import { MsgUpdateRoomState } from './roomServer/admin/MsgUpdateRoomState';
import { ReqAuth, ResAuth } from './roomServer/admin/PtlAuth';
import { ReqCreateRoom, ResCreateRoom } from './roomServer/admin/PtlCreateRoom';
import { ReqExitRoom, ResExitRoom } from './roomServer/PtlExitRoom';
import { ReqJoinRoom, ResJoinRoom } from './roomServer/PtlJoinRoom';
import { ReqUpdateRoom, ResUpdateRoom } from './roomServer/PtlUpdateRoom';
import { MsgChat } from './roomServer/roomMsg/MsgChat';
import { MsgUpdateRoomInfo } from './roomServer/roomMsg/MsgUpdateRoomInfo';

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
    "version": 2,
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
            "type": "api"
        },
        {
            "id": 3,
            "name": "ExitRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "JoinRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "UpdateRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "roomMsg/Chat",
            "type": "msg"
        },
        {
            "id": 7,
            "name": "roomMsg/UpdateRoomInfo",
            "type": "msg"
        }
    ],
    "types": {
        "admin/MsgUpdateRoomState/MsgUpdateRoomState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "userNum",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 1,
                    "name": "rooms",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "id",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "name",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "userNum",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                },
                                {
                                    "id": 3,
                                    "name": "startMatchTime",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    },
                                    "optional": true
                                },
                                {
                                    "id": 4,
                                    "name": "updateTime",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "admin/PtlAuth/ReqAuth": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "adminToken",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "admin/PtlAuth/ResAuth": {
            "type": "Interface"
        },
        "admin/PtlCreateRoom/ReqCreateRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "adminToken",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "creator",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "uid",
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 1,
                                "name": "nickname",
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 1,
                    "name": "roomName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "admin/PtlCreateRoom/ResCreateRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "roomId",
                    "type": {
                        "type": "String"
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
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "roomId",
                    "type": {
                        "type": "String"
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
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "roomId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "roomName",
                    "type": {
                        "type": "String"
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