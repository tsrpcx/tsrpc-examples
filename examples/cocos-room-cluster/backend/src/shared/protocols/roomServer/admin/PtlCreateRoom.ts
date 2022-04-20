
export interface ReqCreateRoom {
    adminToken: string,
    creator: {
        uid: string,
        nickname: string
    }
    roomName: string
}

export interface ResCreateRoom {
    roomId: string
}