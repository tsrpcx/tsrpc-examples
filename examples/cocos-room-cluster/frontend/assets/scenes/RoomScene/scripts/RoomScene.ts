
import { Camera, Component, EditBox, instantiate, Label, Node, Prefab, Quat, RichText, tween, TweenSystem, UIOpacity, Vec2, _decorator } from 'cc';
import { WsClient } from 'tsrpc-browser';
import { Joystick } from '../../../prefabs/Joystick/Joystick';
import { Player } from '../../../prefabs/Player/Player';
import { FollowCamera } from '../../../scripts/components/FollowCamera';
import { NetUtil } from '../../../scripts/models/NetUtil';
import { SceneUtil } from '../../../scripts/models/SceneUtil';
import { ResJoinRoom } from '../../../scripts/shared/protocols/roomServer/PtlJoinRoom';
import { ServiceType } from '../../../scripts/shared/protocols/serviceProto_roomServer';
import { RoomData } from '../../../scripts/shared/types/RoomData';
import { RoomUserState } from '../../../scripts/shared/types/RoomUserState';
import { UserInfo } from '../../../scripts/shared/types/UserInfo';
const { ccclass, property } = _decorator;

const q4_1 = new Quat;
const v2_1 = new Vec2;

export interface RoomSceneParams {
    serverUrl: string,
    roomId: string,
    nickname?: string
}

@ccclass('RoomScene')
export class RoomScene extends Component {

    params!: RoomSceneParams;
    client!: WsClient<ServiceType>;
    selfPlayer?: Player
    currentUser!: UserInfo;
    roomData!: RoomData;

    @property(Joystick)
    joyStick!: Joystick;
    @property(Node)
    players!: Node;
    @property(Node)
    chatMsgs!: Node;
    @property(FollowCamera)
    followCamera!: FollowCamera;
    @property(EditBox)
    inputChat!: EditBox;
    @property(Node)
    playerNames!: Node;
    @property(Label)
    labelRoomName!: Label;
    @property(Label)
    labelRoomState!: Label;
    @property(Label)
    labelServerUrl!: Label;

    @property(Prefab)
    prefabPlayer!: Prefab;
    @property(Prefab)
    prefabChatMsgItem!: Prefab;
    @property(Prefab)
    prefabPlayerName!: Prefab;

    onLoad() {
        this.params = SceneUtil.sceneParams as RoomSceneParams;
        this.client = NetUtil.createRoomClient(this.params.serverUrl);
        this.labelRoomName.string = this.labelRoomState.string = '';
        this.labelServerUrl.string = this.params.serverUrl;

        this.client.listenMsg('serverMsg/Chat', v => {
            this._pushChatMsg(`<outline width=2><color=#00C113>${v.user.nickname}</color> <color=#000000>${v.content}</color></o>`)
        })
        this.client.listenMsg('serverMsg/UserStates', v => {
            for (let uid in v.userStates) {
                this._updateUserState(v.userStates[uid]);
            }
        })
        this.client.listenMsg('serverMsg/UserJoin', v => {
            this.roomData.users.push(v.user);
            this._pushChatMsg(`<outline width=2><color=#00C113>${v.user.nickname}</color> <color=#999999>加入了房间</color></o>`)
        })
        this.client.listenMsg('serverMsg/UserExit', v => {
            this.roomData.users.remove(v1 => v1.id === v.user.id);
            this.playerNames.getChildByName(v.user.id)?.removeFromParent();
            this.players.getChildByName(v.user.id)?.removeFromParent();
            this._pushChatMsg(`<outline width=2><color=#00C113>${v.user.nickname}</color> <color=#999999>离开了房间</color></o>`)
        })

        this.client.flows.postDisconnectFlow.push(v => {
            if (!v.isManual) {
                alert('连接断开');
                this.onBtnBack();
            }
            return v;
        })

        this.joyStick.options = {
            onOperate: v => {
                if (!this.selfPlayer) {
                    return;
                }
                this.selfPlayer.aniState = 'walking';
                this.selfPlayer.node.position = this.selfPlayer.node.position.add3f(v.x * 0.1, 0, -v.y * 0.1);
                this.selfPlayer.node.rotation = Quat.rotateY(q4_1, Quat.IDENTITY, Vec2.UNIT_X.signAngle(v2_1.set(v.x, v.y)) + Math.PI * 0.5)
            },
            onOperateEnd: () => {
                if (!this.selfPlayer) {
                    return;
                }
                this.selfPlayer.aniState = 'idle';
            },
            alwaysActive: true
        }

        // 定时刷新右上角房间状态
        this._ensureConnected().then(() => {
            this.schedule(() => { this._resetRoomState() }, 3)
        });

        // 定时向服务器上报状态
        this.schedule(() => {
            if (!this.selfPlayer) {
                return;
            }
            this.client.sendMsg('clientMsg/UserState', {
                aniState: this.selfPlayer.aniState,
                pos: this.selfPlayer.node.position,
                rotation: this.selfPlayer.node.rotation
            })
        }, 0.1)
    }

    private async _ensureConnected(): Promise<ResJoinRoom> {
        let ret = await this._connect();
        if (!ret.isSucc) {
            alert(ret.errMsg);
            this.onBtnBack();
            return new Promise(rs => { });
        }

        return ret.res;
    }
    private async _connect(): Promise<{ isSucc: true, res: ResJoinRoom } | { isSucc: false, errMsg: string }> {
        // Connect
        let resConnect = await this.client.connect();
        if (!resConnect.isSucc) {
            return { isSucc: false, errMsg: '连接到服务器失败: ' + resConnect.errMsg };
        }

        // JoinRoom
        let retJoin = await this.client.callApi('JoinRoom', {
            roomId: this.params.roomId,
            nickname: this.params.nickname || '无名氏'
        });
        if (!retJoin.isSucc) {
            return { isSucc: false, errMsg: '加入房间失败: ' + retJoin.err.message };
        }

        this.currentUser = retJoin.res.currentUser;
        this.roomData = retJoin.res.roomData;
        this.labelRoomName.string = retJoin.res.roomData.name;

        return { isSucc: true, res: retJoin.res };
    }

    private _resetRoomState() {
        this.labelRoomState.string = `人数: ${this.players.children.length}\nPing: ${this.client.lastHeartbeatLatency}ms`
    }

    onBtnAction(e: any, state: 'wave' | 'punch') {
        if (!this.selfPlayer) {
            return;
        }
        this.joyStick.onTouchEnd();
        this.selfPlayer.aniState = state;
    }

    async onBtnSendChat() {
        if (!this.inputChat.string) {
            return;
        }

        const content = this.inputChat.string;
        let ret = await this.client.callApi('SendChat', {
            content: content
        });
        this.inputChat.string = '';

        if (!ret.isSucc) {
            this.inputChat.string = content;
            return;
        }
    }
    async onInputChatReturn() {
        await this.onBtnSendChat();
        this.inputChat.focus();
    }

    private _pushChatMsg(richText: string) {
        let node = instantiate(this.prefabChatMsgItem);
        this.chatMsgs.addChild(node);
        node.getComponent(RichText)!.string = richText;

        // 3 秒后消失
        tween(node.getComponent(UIOpacity)!).delay(3).to(1, { opacity: 0 }).call(() => {
            node.removeFromParent()
        }).start();
    }

    onBtnBack() {
        this.client.disconnect();
        SceneUtil.loadScene('MatchScene', {});
    }

    private _updateUserState(state: RoomUserState) {
        let node = this.players.getChildByName(state.uid);

        // Create Player
        if (!node) {
            node = instantiate(this.prefabPlayer);
            node.name = state.uid;
            this.players.addChild(node);
            const player = node.getComponent(Player)!;
            node.setPosition(state.pos.x, state.pos.y, state.pos.z);
            node.setRotation(state.rotation.x, state.rotation.y, state.rotation.z, state.rotation.w);

            let nodeName = instantiate(this.prefabPlayerName);
            nodeName.name = state.uid;
            this.playerNames.addChild(nodeName);
            nodeName.getComponent(Label)!.string = this.roomData.users.find(v => v.id === state.uid)?.nickname || '???';

            player.camera = this.followCamera.getComponent(Camera)!;
            player.labelName = nodeName;
            player.aniState = state.aniState;

            if (state.uid === this.currentUser.id) {
                this.selfPlayer = player;
                this.followCamera.focusTarget = node.getChildByName('focusTarget')!;
            }

            return;
        }

        // 自己不需要插值
        if (state.uid === this.currentUser.id) {
            return;
        }

        node.getComponent(Player)!.aniState = state.aniState;
        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(node.position as any);
        const startRot = node!.rotation.clone();
        tween(node.position).to(0.1, state.pos, {
            onUpdate: (v, ratio) => {
                node!.position = node!.position;
                node!.rotation = Quat.slerp(node!.rotation, startRot, state.rotation, ratio!)
            }
        }).tag(99).start();
    }

    onDestroy() {
        TweenSystem.instance.ActionManager.removeAllActionsByTag(99);
    }

}