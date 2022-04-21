import { ApiCall, TerminalColorLogger, WsClient } from "tsrpc";
import { matchServer } from "../../../matchServer";
import { BackConfig } from "../../../models/BackConfig";
import { ReqRegisterRoomServer, ResRegisterRoomServer } from "../../../shared/protocols/matchServer/admin/PtlRegisterRoomServer";
import { serviceProto } from "../../../shared/protocols/serviceProto_roomServer";
import { MatchServer } from "../../MatchServer";

let nextRoomIndex = 1;

export async function ApiRegisterRoomServer(call: ApiCall<ReqRegisterRoomServer, ResRegisterRoomServer>) {
    // 鉴权
    if (call.req.adminToken !== BackConfig.adminToken) {
        return call.error('非法操作');
    }

    // 已经注册过
    if (matchServer.roomServers.some(v => v.url === call.req.serverUrl)) {
        return call.succ({})
    }

    // Create
    let client = new WsClient(serviceProto, {
        server: call.req.serverUrl,
        logger: new TerminalColorLogger({
            pid: `RoomServer${nextRoomIndex++}`
        }),
        heartbeat: {
            interval: 5000,
            timeout: 5000
        }
    });

    // Flows
    client.flows.postDisconnectFlow.push(v => {
        matchServer.roomServers.remove(v1 => v1.conn === client);
        return v;
    });
    client.listenMsg('admin/UpdateRoomState', msg => {
        roomServer.state = msg;
    });

    // Connect
    let op = await client.connect();
    if (!op.isSucc) {
        return call.error(op.errMsg);
    }

    // Auth
    let op2 = await client.callApi('admin/Auth', { adminToken: call.req.adminToken });
    if (!op2.isSucc) {
        return call.error(op2.err);
    }

    // Succ
    let roomServer: MatchServer['roomServers'][number] = {
        url: call.req.serverUrl,
        conn: client
    }
    // 已经注册过或并发请求
    if (matchServer.roomServers.some(v => v.url === call.req.serverUrl)) {
        client.disconnect();
        return call.succ({})
    }
    matchServer.roomServers.push(roomServer);

    call.succ({});
}