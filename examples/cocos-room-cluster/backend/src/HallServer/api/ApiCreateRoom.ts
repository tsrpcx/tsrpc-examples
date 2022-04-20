import { ApiCall, TsrpcError } from "tsrpc";
import { hallServer } from "../../hallServer";
import { BackConfig } from "../../models/BackConfig";
import { ReqCreateRoom, ResCreateRoom } from "../../shared/protocols/hallServer/PtlCreateRoom";

export async function ApiCreateRoom(call: ApiCall<ReqCreateRoom, ResCreateRoom>) {
    // 挑选一个人数最少的 RoomServer
    let server = hallServer.roomServers.filter(v => v.state).orderBy(v => v.state!.userNum)[0];
    if (!server) {
        return call.error('没有可用的 RoomServer', { type: TsrpcError.Type.ServerError });
    }

    if (!call.req.roomName) {
        return call.error('请输入房间名称');
    }

    // RPC
    let op = await server.conn.callApi('admin/CreateRoom', {
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

    call.succ({
        serverUrl: server.url,
        roomId: op.res.roomId
    })
}