import { MatchServer } from "./MatchServer/MatchServer";

export const matchServer = new MatchServer();

// Entry function
async function main() {
    await matchServer.init();
    await matchServer.start();
}
main();

