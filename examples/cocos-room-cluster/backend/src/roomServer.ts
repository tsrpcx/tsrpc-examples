import { RoomServer } from "./RoomServer/RoomServer";

export const roomServer = new RoomServer();

// Entry function
async function main() {
    await roomServer.init();
    await roomServer.start();
}
main();