import { ServiceProto } from 'tsrpc-proto';
import { ReqCreateRoom, ResCreateRoom } from './hallServer/PtlCreateRoom';
import { ReqListRooms, ResListRooms } from './hallServer/PtlListRooms';
import { ReqLogin, ResLogin } from './hallServer/PtlLogin';
import { ReqStartMatch, ResStartMatch } from './hallServer/PtlStartMatch';

export interface ServiceType {
    api: {
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
    "version": 1,
    "services": [
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
        "../base/BaseResponse": {
            "type": "Interface"
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