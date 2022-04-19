import { ServiceProto } from 'tsrpc-proto';
import { ReqRegisterRoomServer, ResRegisterRoomServer } from '../shared/protocols/hallServer/admin/PtlRegisterRoomServer';
import { ReqCreateRoom, ResCreateRoom } from '../shared/protocols/hallServer/PtlCreateRoom';
import { ReqListRooms, ResListRooms } from '../shared/protocols/hallServer/PtlListRooms';
import { ReqLogin, ResLogin } from '../shared/protocols/hallServer/PtlLogin';
import { ReqStartMatch, ResStartMatch } from '../shared/protocols/hallServer/PtlStartMatch';

export interface ServiceType {
    api: {
        "admin/RegisterRoomServer": {
            req: ReqRegisterRoomServer,
            res: ResRegisterRoomServer
        },
        "CreateRoom": {
            req: ReqCreateRoom,
            res: ResCreateRoom
        },
        "ListRooms": {
            req: ReqListRooms,
            res: ResListRooms
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "StartMatch": {
            req: ReqStartMatch,
            res: ResStartMatch
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "services": [
        {
            "id": 0,
            "name": "admin/RegisterRoomServer",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "CreateRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 2,
            "name": "ListRooms",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "Login",
            "type": "api"
        },
        {
            "id": 4,
            "name": "StartMatch",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "admin/PtlRegisterRoomServer/ReqRegisterRoomServer": {
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
        "admin/PtlRegisterRoomServer/ResRegisterRoomServer": {
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
        "PtlCreateRoom/ReqCreateRoom": {
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
        "PtlCreateRoom/ResCreateRoom": {
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
        "PtlListRooms/ReqListRooms": {
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
        "PtlListRooms/ResListRooms": {
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
        "PtlLogin/ReqLogin": {
            "type": "Interface"
        },
        "PtlLogin/ResLogin": {
            "type": "Interface"
        },
        "PtlStartMatch/ReqStartMatch": {
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
        "PtlStartMatch/ResStartMatch": {
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
        }
    }
};