module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.MouseEvent3D
    * @classdesc
    * MouseEvent3D 是所有引擎中可操作鼠标事件节点 的事件类型标记。
    * @includeExample events/Event3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MouseEvent3D extends Event3D {
        /**
         * @language zh_CN
         * MOUSE_CLICK 常量定义 onClick 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        static MOUSE_CLICK: string = "onClick";
        /**
         * @language zh_CN
         * MOUSE_DOWN 常量定义 onMouseDown 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        static MOUSE_DOWN: string = "onMouseDown";
        /**
         * @language zh_CN
         * MOUSE_UP 常量定义 onMouseUp 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        static MOUSE_UP: string = "onMouseUp";
        /**
         * @language zh_CN
         * MOUSE_MOVE 常量定义 onMouseMove 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        static MOUSE_MOVE: string = "onMouseMove";
        /**
         * @language zh_CN
         * MOUSE_OVER 常量定义 onMouseMove 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        static MOUSE_OVER: string = "onMouseOver";

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