import { RoomServer } from "./RoomServer/RoomServer";

const port = parseInt(process.env['PORT'] || '3002');
export const roomServer = new RoomServer({
    // 可改为通过环境变量调整配置参数
    port: port,
    matchServerUrl: 'http://127.0.0.1:3001',
    thisServerUrl: 'ws://127.0.0.1:' + port
});

// Entry function
async function main() {
    await roomServer.init();
    await roomServer.start();
}
main();