import { ApiCall } from "tsrpc";
import { matchServer } from "../../matchServer";
import { BackConfig } from "../../models/BackConfig";
import { ReqCreateRoom, ResCreateRoom } from "../../shared/protocols/matchServer/PtlCreateRoom";

export async function ApiCreateRoom(call: ApiCall<ReqCreateRoom, ResCreateRoom>) {
    // 参数校验
    if (!call.req.roomName) {
        return call.error('请输入房间名称');
    }

    // 挑选一个人数最少的 RoomServer
    let roomServer = matchServer.roomServers.filter(v => v.state).orderBy(v => v.state!.connNum)[0];
    if (!roomServer) {
        return call.error('没有可用的房间服务器');
    }

    // RPC -> RoomServer
    let op = await roomServer.client.callApi('admin/CreateRoom', {
        adminToken: BackConfig.adminToken,
        creator: {
            uid: call.currentUser!.id,
            nickname: call.currentUser!.nickname
        },
        roomName: call.req.roomName
    })
    if (!op.isSucc) {
        return call.error(op.err);
    }

    // Return
    call.succ({
        serverUrl: roomServer.url,
        roomId: op.res.roomId
    })
}