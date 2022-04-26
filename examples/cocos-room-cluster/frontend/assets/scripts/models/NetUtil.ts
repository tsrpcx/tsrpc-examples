import { WECHAT } from 'cc/env';
import { HttpClient as HttpClient_Browser, WsClient as WsClient_Browser } from 'tsrpc-browser';
import { HttpClient as HttpClient_Miniapp, WsClient as WsClient_Miniapp } from 'tsrpc-miniapp';
import { serviceProto as serviceProto_hall, ServiceType as ServiceType_Hall } from '../shared/protocols/serviceProto_hallServer';
import { serviceProto as serviceProto_match, ServiceType as ServiceType_Match } from '../shared/protocols/serviceProto_matchServer';
import { serviceProto as serviceProto_room, ServiceType as ServiceType_Room } from '../shared/protocols/serviceProto_roomServer';
import { UserInfo } from '../shared/types/UserInfo';

/** 网络请求相关 */
export class NetUtil {

    static sso?: string;
    static currentUser?: UserInfo;

    private static _hallClient?: HttpClient_Browser<ServiceType_Hall> | HttpClient_Miniapp<ServiceType_Hall>;
    /** Hall Server */
    static get hallClient(): NonNullable<typeof NetUtil._hallClient> {
        if (!this._hallClient) {
            this._hallClient = new (WECHAT ? HttpClient_Miniapp : HttpClient_Browser)(serviceProto_hall, {
                server: 'http://127.0.0.1:3000',
                // json: true,
                logger: console
            });

            // Flows
            this._hallClient.flows.preCallApiFlow.push(v => {
                if (this.sso) {
                    (v.req as any).sso = this.sso
                }
                return v;
            })
        }

        return this._hallClient;
    }

    private static _matchClient?: HttpClient_Browser<ServiceType_Match> | HttpClient_Miniapp<ServiceType_Match>;
    /** Match Server */
    static get matchClient(): NonNullable<typeof NetUtil._matchClient> {
        if (!this._matchClient) {
            this._matchClient = new (WECHAT ? HttpClient_Miniapp : HttpClient_Browser)(serviceProto_match, {
                server: 'http://127.0.0.1:3000',
                // json: true,
                logger: console
            });

            // Flows
            this._matchClient.flows.preCallApiFlow.push(v => {
                if (this.sso) {
                    (v.req as any).sso = this.sso
                }
                return v;
            })
        }

        return this._matchClient;
    }

    /** Room Server */
    static createRoomClient(serverUrl: string): WsClient_Browser<ServiceType_Room> | WsClient_Miniapp<ServiceType_Room> {
        return new (WECHAT ? WsClient_Miniapp : WsClient_Browser)(serviceProto_room, {
            server: serverUrl,
            heartbeat: {
                interval: 5000,
                timeout: 5000
            },
            // json: true,
            logger: console
        })
    }

}

(window as any).NetUtil = NetUtil;