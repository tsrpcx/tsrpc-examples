import path from "path";
import { HttpServer } from "tsrpc";
import { useSso } from "../models/flows/useSso";
import { serviceProto } from "../shared/protocols/serviceProto_hallServer";
import { UserInfo } from "../shared/types/UserInfo";

export class HallServer {
    readonly server = new HttpServer(serviceProto, {
        port: 3000,
        // Remove this to use binary mode (remove from the client too)
        json: true
    });

    constructor() {
        // Flows
        // 前置鉴别登录态
        useSso(this.server);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));
    }

    async start() {
        await this.server.start();
    }
}