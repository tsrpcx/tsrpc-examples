import { HttpServer } from "tsrpc";
import { UserUtil } from "../UserUtil";

export function useSso(server: HttpServer<any>) {
    server.flows.preApiCallFlow.push(async call => {
        call.currentUser = call.req.sso ? await UserUtil.parseSso(call.req.sso) : undefined;

        // 需要登录的接口：前置登录态判定
        if (!call.service.conf?.allowGuest) {
            if (!call.currentUser) {
                call.error('你还未登录', { code: 'NEED_LOGIN' });
                return undefined;
            }
        }

        if (call.currentUser) {
            call.logger.prefixs.push(`[uid=${call.currentUser.id}]`);
        }

        return call;
    });
}