module egret3d_dev {

   /**
   * @language zh_CN
   * @class egret3d_dev.Event3D
   * @classdesc
   * MouseEvent3D 是所有引擎中可操作鼠标事件节点 的事件类型标记。
   * @includeExample events/Event3D.ts
   * @version Egret 3.0
   * @platform Web,Native
   */
    export class MouseEvent3D extends Event3D{
        static MOUSE_MOVE: string = "MOUSE_MOVE";
        static MOUSE_OVER: string = "MOUSE_OVER";
        static MOUSE_OUT: string = "MOUSE_OUT";

        static MOUSE_LEFT_CLICK: string = "MOUSE_LEFT_CLICK";
        static MOUSE_LEFT_UP: string = "MOUSE_LEFT_UP";
        static MOUSE_LEFT_DOWN: string = "MOUSE_LEFT_DOWN";

        static MOUSE_RIGHT_CLICK: string = "MOUSE_RIGHT_CLICK";
        static MOUSE_RIGHT_UP: string = "MOUSE_RIGHT_UP";
        static MOUSE_RIGHT_DOWN: string = "MOUSE_RIGHT_DOWN";

        static TOUCH_START: string = "TOUCH_START";
        static TOUCH_END: string = "TOUCH_END";
    }
}