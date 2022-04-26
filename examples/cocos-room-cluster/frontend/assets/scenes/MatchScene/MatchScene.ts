
import { Component, EditBox, Label, Node, Prefab, ScrollView, _decorator } from 'cc';
import { Loading } from '../../prefabs/Loading/Loading';
import { NetUtil } from '../../scripts/models/NetUtil';
import { UIUtil } from '../../scripts/models/UIUtil';
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
        this.roomList.content.removeAllChildren();

        this.rooms.active = true;
        this.schedule(() => {
            this._reloadRoomList();
        }, 5)
        this._reloadRoomList();
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

    private async _reloadRoomList() { }

    onBtnCreateRoom() { }

    onBtnMatch() { }

}