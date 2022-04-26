
import { Component, Label, _decorator } from 'cc';
const { ccclass, property } = _decorator;

export interface SendToItemOptions {
    name: string,
    /** 为空代表 “所有人” */
    uid?: string,
    onClick: (options: SendToItemOptions) => void;
}

@ccclass('SendToItem')
export class SendToItem extends Component {

    @property(Label)
    labelName!: Label;


    private _options!: SendToItemOptions;
    public get options(): SendToItemOptions {
        return this._options;
    }
    public set options(v: SendToItemOptions) {
        this._options = v;
        this.labelName.string = v.name;
    }

    onClick() {
        this._options.onClick(this._options);
    }

}