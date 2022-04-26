import { ResolutionPolicy, screen, view } from "cc";

/** UI 相关 */
export class UIUtil {

    private static _isFitScreenExecuted = false;
    /** 同时适配横屏和竖屏 */
    static fitScreen() {
        // 确保只运行一次
        if (this._isFitScreenExecuted) {
            return;
        }
        this._isFitScreenExecuted = true;
        console.log('fitScreen')

        const onWindowResize = () => {
            view.setResolutionPolicy(screen.windowSize.width > screen.windowSize.height ? ResolutionPolicy.SHOW_ALL : ResolutionPolicy.FIXED_WIDTH)
        }
        window.addEventListener('resize', onWindowResize);
        onWindowResize();
    }

}