
import { Camera, Color, Component, Node, SkeletalAnimation, SkinnedMeshRenderer, Vec3, _decorator } from 'cc';
const { ccclass, property } = _decorator;

const v3_1 = new Vec3;

@ccclass('Player')
export class Player extends Component {

    @property(SkeletalAnimation)
    ani!: SkeletalAnimation;
    @property(SkinnedMeshRenderer)
    mesh!: SkinnedMeshRenderer;
    @property(Node)
    namePos!: Node;
    @property(Node)
    labelName!: Node;
    @property(Camera)
    camera!: Camera;

    private _scheduler?: any;

    private _state: PlayerState = 'idle';
    public get state(): PlayerState {
        return this._state;
    }
    public set state(v: PlayerState) {
        if (this._state === v) {
            return;
        }
        this._state = v;

        this.unscheduleAllCallbacks();
        this.ani.crossFade(v, 0.5);

        if (v === 'wave') {
            this.scheduleOnce(() => {
                this.state = 'idle';
            }, 4.73)
        }

        if (v === 'punch') {
            this.scheduleOnce(() => {
                this.state = 'idle';
            }, 2.27)
        }
    }

    public get color(): Color {
        return this.mesh.material!.getProperty('mainColor') as Color;
    }
    public set color(v: Color) {
        this.mesh.material!.setProperty('mainColor', v);
    }

    update() {
        if (this.labelName && this.camera) {
            this.camera.convertToUINode(this.namePos.worldPosition, this.labelName.parent!, v3_1);
            this.labelName.setPosition(v3_1);

            Vec3.transformMat4(v3_1, this.namePos.worldPosition, this.camera.camera.matView);
            const ratio = 10 / Math.abs(v3_1.z) + 0.5;
            this.labelName.setScale(ratio, ratio, 1);
        }
    }

}

export type PlayerState = 'idle' | 'walking' | 'wave' | 'punch';