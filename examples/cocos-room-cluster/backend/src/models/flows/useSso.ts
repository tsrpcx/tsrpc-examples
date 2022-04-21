import { HttpServer } from "tsrpc";
import { UserInfo } from "../../shared/types/UserInfo";
import { UserUtil } from "../UserUtil";

// HTTP 解析登陆态
export function useSso(server: HttpServer<any>) {
    server.flows.preApiCallFlow.push(async call => {
        call.conn.currentUser = call.currentUser = call.req.sso ? await UserUtil.parseSso(call.req.sso) : undefined;

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

declare module 'tsrpc' {
    export interface ApiCall {
        /** 只要协议配置的 `allowGuest` 不为 `true`，则必定有值 */
        currentUser?: UserInfo;
    }
    export interface BaseConnection {
        /** 只要协议配置的 `allowGuest` 不为 `true`，则必定有值 */
        currentUser?: UserInfo;
    }
}