
import { Component, EditBox, instantiate, Label, Node, Prefab, ScrollView, _decorator } from 'cc';
import { Loading } from '../../prefabs/Loading/Loading';
import { NetUtil } from '../../scripts/models/NetUtil';
import { SceneUtil } from '../../scripts/models/SceneUtil';
import { UIUtil } from '../../scripts/models/UIUtil';
import { RoomListItem } from './prefabs/RoomListItem/RoomListItem';
const { ccclass, property } = _decorator;

@ccclass('MatchScene')
export class MatchScene extends Component {

    @property(Node)
    login!: Node;
    @property(EditBox)
    inputNickname!: EditBox;

    @property(Node)
    rooms!: Node;
    @property(ScrollView)
    roomList!: ScrollView;
    @property(Label)
    labelRoomSummary!: Label;

    @property(Loading)
    loading!: Loading;

    @property(Prefab)
    prefabRoomListItem!: Prefab;

    onLoad() {
        UIUtil.fitScreen();

        this.login.active = false;
        this.rooms.active = false;

        // 已登录，显示房间列表
        if (NetUtil.currentUser && NetUtil.sso) {
            this._initRooms();
        }
        // 未登录，去登录
        else {
            this.login.active = true;
        }
    }

    private async _initRooms() {
        // Clear
        this.labelRoomSummary.string = '';
        this.roomList.content!.removeAllChildren();

        // Init
        this.rooms.active = true;
        this._reloadRoomList();

        // 每 3 秒刷新一次列表
        this.schedule(() => {
            this._reloadRoomList();
        }, 3)
    }

    async onBtnLogin() {
        if (!this.inputNickname.string) {
            alert('名字不能为空');
            return;
        }

        this.loading.show('登录中...');
        let ret = await NetUtil.hallClient.callApi('Login', {
            nickname: this.inputNickname.string
        });
        this.loading.hide();

        if (!ret.isSucc) {
            alert(ret.err.message);
            return;
        }

        // 登录成功
        NetUtil.sso = ret.res.sso;
        NetUtil.currentUser = ret.res.user;
        this._initRooms();
    }

    private async _reloadRoomList() {
        let ret = await NetUtil.matchClient.callApi('ListRooms', {});
        if (!ret.isSucc) {
            return;
        }

        this.labelRoomSummary.string = `${ret.res.rooms.sum(v => v.userNum)} 人在线`
        this.roomList.content!.removeAllChildren();
        for (let roomInfo of ret.res.rooms) {
            let node = instantiate(this.prefabRoomListItem);
            this.roomList.content!.addChild(node);
            node.getComponent(RoomListItem)!.options = roomInfo;
        }
    }

    async onBtnCreateRoom() {
        let roomName = prompt('给房间取个名字', '');
        if (!roomName) {
            return;
        }

        this.loading.show('创建房间中...')
        let ret = await NetUtil.matchClient.callApi('CreateRoom', {
            roomName: roomName
        });
        this.loading.hide()

        if (!ret.isSucc) {
            alert(ret.err.message);
            return;
        }

        SceneUtil.loadScene('RoomScene', ret.res);
    }

    async onBtnMatch() {
        this.loading.show('匹配中...');
        let ret = await NetUtil.matchClient.callApi('StartMatch', {}, { timeout: 600000 });
        this.loading.hide();

        if (!ret.isSucc) {
            return alert(ret.err.message);
        }

        SceneUtil.loadScene('RoomScene', ret.res);
    }

}