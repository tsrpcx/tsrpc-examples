
import { Component, Quat, Vec2, _decorator } from 'cc';
import { Joystick } from '../../../prefabs/Joystick/Joystick';
import { Player } from '../../../prefabs/Player/Player';
const { ccclass, property } = _decorator;

const q4_1 = new Quat;
const v2_1 = new Vec2;

@ccclass('RoomScene')
export class RoomScene extends Component {

    @property(Joystick)
    joyStick!: Joystick;

    @property(Player)
    player!: Player;

    onLoad() {
        this.joyStick.options = {
            onOperate: v => {
                this.player.state = 'walking';
                this.player.node.position = this.player.node.position.add3f(v.x * 0.1, 0, -v.y * 0.1);
                this.player.node.rotation = Quat.rotateY(q4_1, Quat.IDENTITY, Vec2.UNIT_X.signAngle(v2_1.set(v.x, v.y)) + Math.PI * 0.5)
            },
            onOperateEnd: () => {
                this.player.state = 'idle';
            },
            alwaysActive: true
        }
    }

    onBtnAction(e: any, state: 'wave' | 'punch') {
        this.joyStick.onTouchEnd();
        this.player.state = state;        
    }

}