
import { Component, Label, _decorator } from 'cc';
import { SceneUtil } from '../../../../scripts/models/SceneUtil';
import { ResListRooms } from '../../../../scripts/shared/protocols/matchServer/PtlListRooms';
const { ccclass, property } = _decorator;

export type RoomListItemOptions = ResListRooms['rooms'][number];
@ccclass('RoomListItem')
export class RoomListItem extends Component {

    @property(Label)
    labelName!: Label;
    @property(Label)
    labelInfo!: Label;

    private _options!: RoomListItemOptions;
    public get options(): RoomListItemOptions {
        return this._options!;
    }
    public set options(v: RoomListItemOptions) {
        this._options = v;

        this.labelName.string = v.name;
        this.labelInfo.string = `人数：${v.userNum} / ${v.maxUserNum}`
    }

    onBtnJoin() {
        SceneUtil.loadScene('RoomScene', {
            serverUrl: this._options.serverUrl,
            roomId: this._options.roomId
        })
    }

}
