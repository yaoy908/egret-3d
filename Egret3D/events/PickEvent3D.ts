module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.PickEvent3D
    * @classdesc
    * MouseEvent3D 是所有引擎中可操作鼠标事件节点 的事件类型标记。
    * @includeExample events/PickEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PickEvent3D extends Event3D {

        /**
         * @language zh_CN
         * PICK_CLICK 点击拣选事件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_CLICK: string = "onPickClick";

        /**
         * @language zh_CN
         * PICK_DOWN  按下拣选事件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_DOWN: string = "onPickDown";

        /**
         * @language zh_CN
         * MOUSE_UP 常量定义 onMouseUp 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_UP: string = "onPickUp";

        /**
         * @language zh_CN
         * MOUSE_MOVE 常量定义 onMouseMove 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_MOVE: string = "onPickMove";

        /**
         * @language zh_CN
         * MOUSE_OVER 常量定义 onMouseWheel 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_WHEEL: string = "onPickWheel";

        private _pickResult: PickResult;

        /**
         * @language zh_CN
         * 获取射线拣选结果。
         * @returns {PickResult}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get pickResult(): PickResult {
            return this._pickResult;
        }
        /**
         * @language zh_CN
         * 设置射线拣选结果。
         * @param value {PickResult}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set pickResult(value: PickResult) {
            this._pickResult = value;
        }
    }
}