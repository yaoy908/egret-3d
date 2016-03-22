module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.TouchEvent3D
    * @classdesc
    * MouseEvent3D 是所有引擎中可操作触摸事件节点 的事件类型标记。
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class TouchEvent3D extends Event3D {
       /**
        * @language zh_CN
        * TOUCH_MOVE 常量定义 onTouchMove 事件对象的 type 属性的值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        static TOUCH_MOVE: string = "onTouchMove";
        /**
        * @language zh_CN
        * TOUCH_END 常量定义 onTouchEnd 事件对象的 type 属性的值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        static TOUCH_UP: string = "onTouchUp";
        /**
        * @language zh_CN
        * TOUCH_START 常量定义 onTouchStart 事件对象的 type 属性的值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        static TOUCH_DOWN: string = "onTouchDown";

        private _pickResult: PickResult;
        /**
         * @language zh_CN
         * 获取射线拣选见过。
         * @returns {PickResult}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get pickResult(): PickResult {
            return this._pickResult;
        }
        /**
         * @language zh_CN
         * 设置射线拣选见过。
         * @param value {PickResult}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set pickResult(value: PickResult) {
            this._pickResult = value;
        }
    }
} 