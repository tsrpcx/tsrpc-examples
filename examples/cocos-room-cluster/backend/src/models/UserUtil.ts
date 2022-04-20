import { UserInfo } from "../shared/types/UserInfo";

// 登录态 SSO 的编解码
// 这里简单起见，使用未加密的 JSON 字符串
// 你可以根据自己的需要，改为加密字符串，或者服务端 Session Key 等
export class UserUtil {

    static async createSso(user: UserInfo): Promise<string> {
        return JSON.stringify(user);
    }

    static async parseSso(sso: string): Promise<UserInfo | undefined> {
        try {
            return JSON.parse(sso);
        }
        catch {
            return undefined;
        }
    }

}