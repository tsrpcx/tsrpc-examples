import { ApiCall } from "tsrpc";
import { UserUtil } from "../../models/UserUtil";
import { ReqLogin, ResLogin } from "../../shared/protocols/roomServer/PtlLogin";
import { RoomServerConn } from "../RoomServer";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    let user = await UserUtil.parseSso(call.req.sso);
    if (!user) {
        return call.error('登录失败');
    }

    (call.conn as RoomServerConn).currentUser = user;
    call.succ({ user: user });
}