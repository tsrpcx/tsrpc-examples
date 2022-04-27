
// import { Color, Component, EditBox, instantiate, Label, Node, Prefab, ScrollView, Sprite, _decorator } from 'cc';
// import { WsClient } from 'tsrpc-browser';
// import { NetUtil } from '../../../scripts/models/NetUtil';
// import { SceneUtil } from '../../../scripts/models/SceneUtil';
// import { ResJoin } from '../../../scripts/shared/protocols/roomServer/room/PtlJoin';
// import { ServiceType } from '../../../scripts/shared/protocols/serviceProto_roomServer';
// import { RoomData } from '../../../scripts/shared/types/RoomData';
// import { SendToItem, SendToItemOptions } from '../prefabs/SendToItem/SendToItem';
// const { ccclass, property } = _decorator;

// export interface RoomSceneParams {
//     roomId: string,
//     serverUrl: string
// }

// @ccclass('RoomScene2')
// export class RoomScene2 extends Component {

//     params!: RoomSceneParams;
//     client!: WsClient<ServiceType>;

//     currentSendTo!: Omit<SendToItemOptions, 'onClick'>;

//     @property(ScrollView)
//     msgList!: ScrollView;
//     @property(Label)
//     labelTopRight!: Label;
//     @property(Node)
//     btnSendTo!: Node;
//     @property(EditBox)
//     inputSendContent!: EditBox;
//     @property(Node)
//     popupUserList!: Node;

//     @property(Prefab)
//     prefabSelfMsgItem!: Prefab;
//     @property(Prefab)
//     prefabOtherMsgItem!: Prefab;
//     @property(Prefab)
//     prefabSystemMsgItem!: Prefab;
//     @property(Prefab)
//     prefabSendToItem!: Prefab;

//     onLoad() {
//         this.params = SceneUtil.sceneParams as RoomSceneParams;
//         this.client = NetUtil.createRoomClient(this.params.serverUrl);

//         this.init();
//     }

//     async init() {
//         let ret = await this._connect();
//         if (!ret.isSucc) {
//             alert(ret.errMsg);
//             SceneUtil.loadScene('MatchScene', {});
//             return;
//         }

//         this.labelTopRight.string = `${ret.res.roomData.users.length} 人`;

//         this.currentSendTo = { name: '所有人' }
//         this._initSendToList([
//             this.currentSendTo,
//             ...ret.res.roomData.users.map(v => ({
//                 name: v.nickname,
//                 uid: v.id
//             }))
//         ]);
//         this._resetBtnSendTo();
//     }

//     private async _connect(): Promise<{ isSucc: true, res: ResJoin } | { isSucc: false, errMsg: string }> {
//         // Connect
//         let resConnect = await this.client.connect();
//         if (!resConnect.isSucc) {
//             return { isSucc: false, errMsg: '连接到服务器失败: ' + resConnect.errMsg };
//         }

//         // Login
//         let retLogin = await this.client.callApi('Login', { sso: NetUtil.sso! });
//         if (!retLogin.isSucc) {
//             return { isSucc: false, errMsg: '登录失败: ' + resConnect.errMsg };
//         }

//         // JoinRoom
//         let retJoin = await this.client.callApi('room/Join', {
//             roomId: this.params.roomId
//         });
//         if (!retJoin.isSucc) {
//             return { isSucc: false, errMsg: '加入房间失败: ' + retJoin.err.message };
//         }

//         return { isSucc: true, res: retJoin.res };
//     }

//     private _initMsgList(messages: RoomData['messages']) {

//     }

//     private _initSendToList(list: Omit<SendToItemOptions, 'onClick'>[]) {
//         this.msgList.content!.removeAllChildren();
//         const wrapper = this.popupUserList.getChildByName('list')!;
//         list.forEach(v => {
//             let node = instantiate(this.prefabSendToItem);
//             wrapper.addChild(node);
//             node.getComponent(SendToItem)!.options = {
//                 ...v,
//                 onClick: v => {
//                     this.currentSendTo = {
//                         name: v.name,
//                         uid: v.uid
//                     }
//                     this._resetBtnSendTo();
//                 }
//             }
//         });
//     }

//     private _resetBtnSendTo() {
//         this.btnSendTo.getComponent(Sprite)!.color = new Color(this.currentSendTo.uid ? '#FF8888' : '#E8E8E8')
//         this.btnSendTo.getChildByName('Label')!.getComponent(Label)!.color = new Color(this.currentSendTo.uid ? '#FFFFFF' : '#525252')
//     }

//     onBtnSendTo() {

//     }

// }