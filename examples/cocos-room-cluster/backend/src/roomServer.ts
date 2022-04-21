import { RoomServer } from "./RoomServer/RoomServer";

export const roomServer = new RoomServer({
    // 可改为通过环境变量调整配置参数
    matchServerUrl: 'http://127.0.0.1:3001',
    thisServerUrl: 'ws://127.0.0.1:3002'
});

// Entry function
async function main() {
    await roomServer.init();
    await roomServer.start();
}
main();