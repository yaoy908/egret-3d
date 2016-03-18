module egret3d {

    /**
	* @private
    * @language zh_CN
    * @class egret3d.EventManager
    * @classdesc
    * 事件管理。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EventManager {

        /**
         * @language zh_CN
         * 主画布
         * @version Egret 3.0
         * @platform Web,Native
         */
        private _canvas: Egret3DCanvas;

        private _mouseEvent3D: MouseEvent3D;

        /**
         * @language zh_CN
         * 渲染视图群
         * @version Egret 3.0
         * @platform Web,Native
         */
        private get _view3ds(): Array<View3D> {
            return this._canvas.view3Ds;
        }


        /**
        * @language zh_CN
        * 构造函数
        * @param view 渲染视图
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(canvas: Egret3DCanvas) {
            this._canvas = canvas;
            this._canvas.view3Ds
            this._mouseEvent3D = new MouseEvent3D();

            Input.instance.addListenerKeyClick((code: number) => this.onMouseClick(code));
            Input.instance.addListenerKeyDown((code: number) => this.onMouseDown(code));
            Input.instance.addListenerKeyUp((code: number) => this.onMouseUp(code));
            Input.instance.addListenerMouseMove((e: MouseEvent) => this.onMouseMove(e));
            Input.instance.addListenerMouseOver((e: MouseEvent) => this.onMouseOver(e));
            Input.instance.addTouchStartCallback((e: TouchEvent) => this.onTouchStart(e));
            Input.instance.addTouchEndCallback((e: TouchEvent) => this.onTouchEnd(e));
            Input.instance.addTouchMoveCallback((e: TouchEvent) => this.onTouchMove(e));
        }

        /**
        * @language zh_CN
        * 清理EventManager
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onClear(): void {
            this._canvas = null;
        }
        /**
        * @language zh_CN
        * 清除绑定关系。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onClearListeners() {

        }
        /**
         * @language zh_CN
         * 分发事件。
         * @param e 事件参数
         * @param e 事件类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        private sendEvent(e: any, typeStr: string): void {
            var canvas = this._canvas;
            if (!canvas) {
                return;
            }
            var len: number = this._view3ds.length;
            for (var i = 0; i < len; i++) {
                var view = this._view3ds[i];
                if (!view.entityCollect || !view.entityCollect.mousePickList) {
                    continue;
                }
                var collect = view.entityCollect.mousePickList;
                var ret: Array<IRender> = Picker.pickObject3DList(canvas, view, view.camera3D, collect);
                for (var i: number = 0; i < ret.length; i++) {
                    this._mouseEvent3D.eventType = typeStr;
                    this._mouseEvent3D.data = e;
                    this._mouseEvent3D.currentTarget = ret[i];
                    this._mouseEvent3D.pickResult = ret[i].pickResult;
                    ret[i].dispatchEvent(this._mouseEvent3D);
                }
            }
        }
        /**
        * @language zh_CN
        * 鼠标触发判断。
        * @param code KeyCode枚举类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        private isMouseTrigger(e: any): boolean {
            var code: number;
            if (typeof e == "MouseEvent") {
                Input.instance.GetKeyCodeByMouseEventNumber(e.button);
            } else {
                code = e;
            }
            return code === KeyCode.Key_Mouse_Right || code == KeyCode.Key_Mouse_Left;
        }
        private onTouchMove(e: TouchEvent) {
            //if (!this._collect) return;
            //var ret: Array<IRender> = Picker.pickObject3DList(this._view, this._camera, this._collect.mousePickList);
            //var event: Event3D;
            //for (var i: number = 0; i < ret.length; i++) {
            //    event = new Event3D(Event3D.TOUCH_MOVE, e);
            //    event.currentTarget = ret[i];
            //    //event.data = e;
            //    ret[i].dispatchEvent(event);
            //}
        }
        private onTouchEnd(e: TouchEvent) {
            //if (!this._collect) return;
            //var ret: Array<IRender> = Picker.pickObject3DList(this._view, this._camera, this._collect.mousePickList);
            //var event: Event3D;
            //for (var i: number = 0; i < ret.length; i++) {
            //    event = new Event3D(Event3D.TOUCH_END, e);
            //    event.currentTarget = ret[i];
            //    //event.data = e;
            //    ret[i].dispatchEvent(event);
            //}
        }
        private onTouchStart(e: TouchEvent) {
            //if (!this._collect) return;
            //var ret: Array<IRender> = Picker.pickObject3DList(this._view, this._camera, this._collect.mousePickList);
            //var event: Event3D;
            //for (var i: number = 0; i < ret.length; i++) {
            //    event = new Event3D(Event3D.TOUCH_START, e);
            //    event.currentTarget = ret[i];
            //    //event.data = e;
            //    ret[i].dispatchEvent(event);
            //}
        }
        private onMouseClick(code: number) {
            if (!this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_CLICK);
        }
        private onMouseDown(code: number) {
            if (!this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_DOWN);
        }
        private onMouseUp(code: number) {
            if (!this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_UP);
        }
        private onMouseMove(e: MouseEvent) {
            this.sendEvent(e, MouseEvent3D.MOUSE_MOVE);
        }
        private onMouseOver(e: MouseEvent) {
            this.sendEvent(e, MouseEvent3D.MOUSE_OVER);
        }
    }
}   