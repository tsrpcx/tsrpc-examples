import { ApiCall } from "tsrpc";
import * as uuid from "uuid";
import { UserUtil } from "../../models/UserUtil";
import { ReqLogin, ResLogin } from "../../shared/protocols/hallServer/PtlLogin";
import { UserInfo } from "../../shared/types/UserInfo";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    let uid = uuid.v4();
    let user: UserInfo = {
        id: uid,
        nickname: call.req.nickname
    };
    let sso = await UserUtil.createSso(user)

    call.succ({ sso, user })
}