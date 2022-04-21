import { HallServer } from "./HallServer/HallServer";

export const hallServer = new HallServer();

// Entry function
async function main() {
    await hallServer.init();
    await hallServer.start();
}
main();

