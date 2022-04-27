
import { Camera, Color, Component, Node, SkeletalAnimation, SkinnedMeshRenderer, Vec3, _decorator } from 'cc';
import { PlayerAniState } from '../../scripts/shared/types/RoomUserState';
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

    labelName!: Node;
    camera!: Camera;

    private _aniState: PlayerAniState = 'idle';
    public get aniState(): PlayerAniState {
        return this._aniState;
    }
    public set aniState(v: PlayerAniState) {
        if (this._aniState === v) {
            return;
        }
        this._aniState = v;

        this.unscheduleAllCallbacks();
        this.ani.crossFade(v, 0.5);

        if (v === 'wave') {
            this.scheduleOnce(() => {
                this.aniState = 'idle';
            }, 4.73)
        }

        if (v === 'punch') {
            this.scheduleOnce(() => {
                this.aniState = 'idle';
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