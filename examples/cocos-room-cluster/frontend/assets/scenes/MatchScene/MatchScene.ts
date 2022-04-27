
import { Component, EditBox, instantiate, Label, Prefab, ScrollView, _decorator } from 'cc';
import { Loading } from '../../prefabs/Loading/Loading';
import { NetUtil } from '../../scripts/models/NetUtil';
import { SceneUtil } from '../../scripts/models/SceneUtil';
import { RoomListItem } from './prefabs/RoomListItem/RoomListItem';
const { ccclass, property } = _decorator;

@ccclass('MatchScene')
export class MatchScene extends Component {

    @property(EditBox)
    inputNickname!: EditBox;
    @property(ScrollView)
    roomList!: ScrollView;
    @property(Label)
    labelRoomSummary!: Label;

    @property(Loading)
    loading!: Loading;

    @property(Prefab)
    prefabRoomListItem!: Prefab;

    onLoad() {
        // Clean
        this.labelRoomSummary.string = '';

        this.inputNickname.string = '无名氏' + (Math.random() * 100000 | 0);

        // 轮询刷新房间列表
        this.schedule(() => {
            this._reloadRoomList();
        }, 1);
        this._reloadRoomList();
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
            node.getComponent(RoomListItem)!.options = {
                room: roomInfo,
                onClick: v => {
                    SceneUtil.loadScene('RoomScene', {
                        ...v,
                        nickname: this.inputNickname.string
                    });
                }
            };
        }
    }

    async onBtnCreateRoom() {
        if (!this.inputNickname.string) {
            return alert('先给自己取个名字吧~');
        }

        this.loading.show('创建房间中...')
        let ret = await NetUtil.matchClient.callApi('CreateRoom', {
            roomName: `${this.inputNickname.string}的房间`
        });
        this.loading.hide()

        if (!ret.isSucc) {
            alert(ret.err.message);
            return;
        }

        SceneUtil.loadScene('RoomScene', {
            ...ret.res,
            nickname: this.inputNickname.string
        });
    }

    async onBtnMatch() {
        this.loading.show('匹配中...');
        let ret = await NetUtil.matchClient.callApi('StartMatch', {}, { timeout: 10000 });
        this.loading.hide();

        if (!ret.isSucc) {
            return alert('暂时没有可加入的房间，稍后再试试吧~');
        }

        SceneUtil.loadScene('RoomScene', {
            ...ret.res,
            nickname: this.inputNickname.string
        });
    }

}