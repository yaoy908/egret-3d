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

        private _canvas: Egret3DCanvas;

        private _mouseEvent3D: MouseEvent3D;
        private _touchEvent3D: TouchEvent3D;


        private get _view3ds(): Array<View3D> {
            return this._canvas.view3Ds;
        }


        /**
        * @language zh_CN
        * 构造函数
        * @param canvas 画布
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(canvas: Egret3DCanvas) {
            this._canvas = canvas;
            this._canvas.view3Ds
            this._mouseEvent3D = new MouseEvent3D();
            this._touchEvent3D = new TouchEvent3D();

            Input.addListenerKeyClick((code: number) => this.onMouseClick(code), this);
            Input.addListenerKeyDown((code: number) => this.onMouseDown(code), this);
            Input.addListenerKeyUp((code: number) => this.onMouseUp(code), this);
            Input.addListenerMouseMove((e: MouseEvent) => this.onMouseMove(e), this);
            Input.addListenerMouseOver((e: MouseEvent) => this.onMouseOver(e), this);
            Input.addTouchDownCallback((e: TouchEvent) => this.onTouchDown(e), this);
            Input.addTouchUpCallback((e: TouchEvent) => this.onTouchUp(e), this);
            Input.addTouchMoveCallback((e: TouchEvent) => this.onTouchMove(e), this);
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
         * @param e {any} 事件参数
         * @param typeStr {string} 事件类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        private sendEvent(e: any, typeStr: string, func: Function): void {
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
                var len = ret.length;
                var render: IRender = null;
                var dis: number = Number.MAX_VALUE;
                var temp_dis: number = 0;
                var object3d: Mesh = null;
                var mouseChilder: boolean = false;
                for (var i: number = 0; i < len; i++) {
                    object3d = <Mesh>ret[i];
                    temp_dis = Vector3D.distance(object3d.globalPosition, view.camera3D.globalPosition);
                    if (temp_dis < dis) {
                        dis = temp_dis;
                        render = ret[i];
                    }

                    if (object3d.mouseChilder) {
                        mouseChilder = object3d.mouseChilder;
                    }
                }

                if (ret.length > 0) {

                    if (ret.length == 1 && render) {
                        render.dispatchEvent(func.call(this, typeStr, e, render));
                    }
                    else {

                        if (mouseChilder) {
                            ret = Picker.pickObject3DList(canvas, view, view.camera3D, ret, true);
                            dis = Number.MAX_VALUE;
                            len = ret.length;
                            if (len <= 0) {
                                if (render) {
                                    render.dispatchEvent(func.call(this, typeStr, e, render));
                                }
                            }
                            else {
                                render = null;
                                for (var i: number = 0; i < len; i++) {
                                    object3d = <Mesh>ret[i];
                                    temp_dis = Vector3D.distance(object3d.globalPosition, view.camera3D.globalPosition);
                                    if (temp_dis < dis) {
                                        dis = temp_dis;
                                        render = ret[i];
                                    }
                                }
                                if (render) {
                                    render.dispatchEvent(func.call(this, typeStr, e, render));
                                }
                            }
                        }
                        else {
                            if (render) {
                                render.dispatchEvent(func.call(this, typeStr, e, render));
                            }
                        }
                    }
                }
                
            }
        }

        private initMouseEvent3D(typeStr: string, e: any, render: IRender): MouseEvent3D {
            this._mouseEvent3D.eventType = typeStr;
            this._mouseEvent3D.data = e;
            this._mouseEvent3D.currentTarget = render;
            this._mouseEvent3D.pickResult = render.pickResult;
            return this._mouseEvent3D;
        }
        private initTouchEvent3D(typeStr: string, e: any, render: IRender): TouchEvent3D {
            this._touchEvent3D.eventType = typeStr;
            this._touchEvent3D.data = e;
            this._touchEvent3D.currentTarget = render;
            this._touchEvent3D.pickResult = render.pickResult;
            return this._touchEvent3D;
        }


        /**
        * @language zh_CN
        * 鼠标触发判断。
        * @param e {any}
        * @version Egret 3.0
        * @platform Web,Native
        */
        private isMouseTrigger(e: any): boolean {
            var code: number;
            if (typeof e == "MouseEvent") {
                Input.GetKeyCodeByMouseEventNumber(e.button);
            } else {
                code = e;
            }
            return code === KeyCode.Key_Mouse_Right || code == KeyCode.Key_Mouse_Left;
        }

        private onTouchMove(e: TouchEvent) {
            this.sendEvent(e, TouchEvent3D.TOUCH_MOVE, this.initTouchEvent3D);
        }
        private onTouchUp(e: TouchEvent) {
            this.sendEvent(e, TouchEvent3D.TOUCH_UP, this.initTouchEvent3D);
        }
        private onTouchDown(e: TouchEvent) {
            this.sendEvent(e, TouchEvent3D.TOUCH_DOWN, this.initTouchEvent3D);
        }
        private onMouseClick(code: number) {
            if (!this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_CLICK, this.initMouseEvent3D);
        }
        private onMouseDown(code: number) {
            if (!this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_DOWN, this.initMouseEvent3D);
        }
        private onMouseUp(code: number) {
            if (!this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_UP, this.initMouseEvent3D);
        }
        private onMouseMove(e: MouseEvent) {
            this.sendEvent(e, MouseEvent3D.MOUSE_MOVE, this.initMouseEvent3D);
        }
        private onMouseOver(e: MouseEvent) {
            this.sendEvent(e, MouseEvent3D.MOUSE_OVER, this.initMouseEvent3D);
        }
    }
}   