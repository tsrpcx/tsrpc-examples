import { ObjectId } from 'mongodb';
import { ApiCall } from "tsrpc";
import { Global } from "../models/Global";
import { ReqUpdatePost, ResUpdatePost } from "../shared/protocols/PtlUpdatePost";

export async function ApiUpdatePost(call: ApiCall<ReqUpdatePost, ResUpdatePost>) {
    let { _id, ...rest } = call.req.update;

    let op = await Global.collection('Post').updateOne({
        _id: _id
    }, {
        $set: {
            ...rest,
            update: {
                uid: 'xxx',
                time: new Date()
            }
        }
    });

    call.succ({
        matchedCount: op.matchedCount
    })
}