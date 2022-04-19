import { CodeTemplate, TsrpcConfig } from 'tsrpc-cli';

const tsrpcConf: TsrpcConfig = {
    // Generate ServiceProto
    proto: [
        // Proto for user
        {
            ptlDir: 'src/shared/protocols/hallServer', // Protocol dir
            output: 'src/shared/protocols/serviceProto_hallServer.ts', // Path for generated ServiceProto
            ignore: 'src/shared/protocols/hallServer/admin/**' // User proto ignore admin
        },
        {
            ptlDir: 'src/shared/protocols/roomServer', // Protocol dir
            output: 'src/shared/protocols/serviceProto_roomServer.ts', // Path for generated ServiceProto
            ignore: 'src/shared/protocols/roomServer/admin/**' // User proto ignore admin
        },

        // Proto for server RPC
        {
            ptlDir: 'src/shared/protocols/hallServer', // Protocol dir
            output: 'src/server_rpc/serviceProto_hallServer.ts', // Path for generated ServiceProto
            apiDir: 'src/api/hallServer',   // API dir
            docDir: 'docs/hallServer',     // API documents dir
            ptlTemplate: CodeTemplate.getExtendedPtl(),
            // msgTemplate: CodeTemplate.getExtendedMsg(),
        },
        {
            ptlDir: 'src/shared/protocols/roomServer', // Protocol dir
            output: 'src/server_rpc/serviceProto_roomServer.ts', // Path for generated ServiceProto
            apiDir: 'src/api/roomServer',   // API dir
            docDir: 'docs/roomServer',     // API documents dir
            ptlTemplate: CodeTemplate.getExtendedPtl(),
            // msgTemplate: CodeTemplate.getExtendedMsg(),
        },
    ],
    // Sync shared code
    sync: [
        // {
        //     from: 'src/shared',
        //     to: '../frontend/src/shared',
        //     type: 'symlink'     // Change this to 'copy' if your environment not support symlink
        // }
    ],
    // Dev server
    dev: {
        autoProto: true,        // Auto regenerate proto
        autoSync: true,         // Auto sync when file changed
        autoApi: true,          // Auto create API when ServiceProto updated
        watch: 'src',           // Restart dev server when these files changed
        entry: 'src/index.ts',  // Dev server command: node -r ts-node/register {entry}
    },
    // Build config
    build: {
        autoProto: true,        // Auto generate proto before build
        autoSync: true,         // Auto sync before build
        autoApi: true,          // Auto generate API before build
        outDir: 'dist',         // Clean this dir before build
    }
}
export default tsrpcConf;