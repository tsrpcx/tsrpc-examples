import { ServiceProto } from 'tsrpc-proto';
import { MsgUpdateRoomState } from './roomServer/admin/MsgUpdateRoomState';
import { ReqAuth, ResAuth } from './roomServer/admin/PtlAuth';
import { ReqCreateRoom, ResCreateRoom } from './roomServer/admin/PtlCreateRoom';
import { ReqLogin, ResLogin } from './roomServer/PtlLogin';
import { ReqExit, ResExit } from './roomServer/room/PtlExit';
import { ReqJoin, ResJoin } from './roomServer/room/PtlJoin';
import { ReqSendChat, ResSendChat } from './roomServer/room/PtlSendChat';
import { MsgChat } from './roomServer/room/serverMsg/MsgChat';
import { MsgUserExit } from './roomServer/room/serverMsg/MsgUserExit';
import { MsgUserJoin } from './roomServer/room/serverMsg/MsgUserJoin';

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
        "Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "room/Exit": {
            req: ReqExit,
            res: ResExit
        },
        "room/Join": {
            req: ReqJoin,
            res: ResJoin
        },
        "room/SendChat": {
            req: ReqSendChat,
            res: ResSendChat
        }
    },
    msg: {
        "admin/UpdateRoomState": MsgUpdateRoomState,
        "room/serverMsg/Chat": MsgChat,
        "room/serverMsg/UserExit": MsgUserExit,
        "room/serverMsg/UserJoin": MsgUserJoin
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
            "type": "api",
            "conf": {
                "allowGuest": true
            }
        },
        {
            "id": 2,
            "name": "admin/CreateRoom",
            "type": "api",
            "conf": {
                "allowGuest": true
            }
        },
        {
            "id": 3,
            "name": "Login",
            "type": "api",
            "conf": {
                "allowGuest": true
            }
        },
        {
            "id": 4,
            "name": "room/Exit",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "room/Join",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "room/SendChat",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "room/serverMsg/Chat",
            "type": "msg"
        },
        {
            "id": 8,
            "name": "room/serverMsg/UserExit",
            "type": "msg"
        },
        {
            "id": 9,
            "name": "room/serverMsg/UserJoin",
            "type": "msg"
        }
    ],
    "types": {
        "admin/MsgUpdateRoomState/MsgUpdateRoomState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "connNum",
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
                                    "id": 5,
                                    "name": "maxUserNum",
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
                },
                {
                    "id": 1,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "MatchServer"
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
                    "id": 0,
                    "name": "adminToken",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "creator",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                },
                {
                    "id": 2,
                    "name": "roomName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../../types/UserInfo/UserInfo": {
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
                    "name": "nickname",
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
                    "id": 0,
                    "name": "roomId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlLogin/ReqLogin": {
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
                    "name": "sso",
                    "type": {
                        "type": "String"
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
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                }
            ]
        },
        "../base/BaseResponse": {
            "type": "Interface"
        },
        "room/PtlExit/ReqExit": {
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
        "room/PtlExit/ResExit": {
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
        "room/PtlJoin/ReqJoin": {
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
        "room/PtlJoin/ResJoin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "roomData",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoomData/RoomData"
                    }
                }
            ]
        },
        "../../types/RoomData/RoomData": {
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
                    "name": "maxUser",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 3,
                    "name": "users",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../../types/UserInfo/UserInfo"
                        }
                    }
                },
                {
                    "id": 4,
                    "name": "messages",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "user",
                                    "type": {
                                        "type": "Reference",
                                        "target": "../../types/UserInfo/UserInfo"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "time",
                                    "type": {
                                        "type": "Date"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "content",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "id": 5,
                    "name": "lastEmptyTime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "startMatchTime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "updateTime",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "room/PtlSendChat/ReqSendChat": {
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
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "toUid",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "room/PtlSendChat/ResSendChat": {
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
        "room/serverMsg/MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                },
                {
                    "id": 2,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "isPrivate",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                }
            ]
        },
        "room/serverMsg/MsgUserExit/MsgUserExit": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                }
            ]
        },
        "room/serverMsg/MsgUserJoin/MsgUserJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                }
            ]
        }
    }
};