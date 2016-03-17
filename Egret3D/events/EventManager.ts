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
         * 是否初始化
         * @version Egret 3.0
         * @platform Web,Native
         */
        private isInit: boolean = false;
        /**
         * @language zh_CN
         * 主画布
         * @version Egret 3.0
         * @platform Web,Native
         */
        private _canvas: Egret3DCanvas;
        /**
        * @language zh_CN
        * 事件管理对象组
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _eventers: Array<EventManagerData>;
        /**
        * @language zh_CN
        * 事件管理对象接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get eventers(): Array<EventManagerData> {
            if (this._eventers === null || this._eventers === undefined) {
                this._eventers = new Array<EventManagerData>();
            }
            return this._eventers;
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
        }
        /**
        * @language zh_CN
        * 完成画布初始化和视图初始化后调用， 初始化EventManager
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onInit(): void {
            if (this.isInit) {
                return;
            }
            var length = this._canvas.view3Ds.length;
            var array = this.eventers;
            for (var i = 0; i < length; i++) {
                var data: EventManagerData = new EventManagerData(this._canvas, this._canvas.view3Ds[i]);
                array.push(data);
            }
            this.isInit = true;
        }
        /**
        * @language zh_CN
        * 刷新EventManager
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onUpdate(): void {
            this.onClear();
            var length = this._canvas.view3Ds.length;
            for (var i = 0; i < length; i++) {
                var data: EventManagerData = new EventManagerData(this._canvas, this._canvas.view3Ds[i]);
                this.eventers.push(data);
            }
        }
        /**
        * @language zh_CN
        * 清理EventManager
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onClear(): void {
            var length = this._eventers.length;
            for (var i = 0; i < length; i++) {
                this._eventers[i].onClearListeners();
                this._eventers[i] = null;
            }
            this._eventers = null;
        }
    }

    /**
	* @private
    * @language zh_CN
    * @class egret3d.EventManager
    * @classdesc
    * 事件数据。
    * @version Egret 3.0
    * @platform Web,Native
    */
    class EventManagerData {
        /**
         * @language zh_CN
         * 持有_view的画布
         * @version Egret 3.0
         * @platform Web,Native
         */
        private _canvas: Egret3DCanvas;
        /**
         * @language zh_CN
         * 渲染画布
         * @version Egret 3.0
         * @platform Web,Native
         */
        private _view: View3D;
        /**
        * @language zh_CN
        * 构造函数
        * @param canvas 画布
        * @param view 画布的渲染视图
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(canvas: Egret3DCanvas, view: View3D) {
            this._canvas = canvas;
            this._view = view;
            Input.instance.addListenerKeyClick((code: number) => this.onMouseClick(code));
            Input.instance.addListenerKeyDown((code: number) => this.onMouseDown(code));
            Input.instance.addListenerKeyUp((code: number) => this.onMouseUp(code));
            Input.instance.addListenerMouseMove((e: MouseEvent) => this.onMouseMove(e));
            Input.instance.addTouchStartCallback((e: TouchEvent) => this.onTouchStart(e));
            Input.instance.addTouchEndCallback((e: TouchEvent) => this.onTouchEnd(e));
            Input.instance.addTouchMoveCallback((e: TouchEvent) => this.onTouchMove(e));
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
        private sendEvent(e: any, typeStr: string, collect: Array<IRender>): void {
            var ret: Array<IRender> = Picker.pickObject3DList(this._canvas, this._view, this._view.camera3D, collect);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(typeStr, e);
                //event.data = code;
                event.currentTarget = ret[i];
                ret[i].dispatchEvent(event);
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
            if (!this._view.entityCollect || !this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_CLICK, this._view.entityCollect.mousePickList);
        }
        private onMouseDown(code: number) {
            if (!this._view.entityCollect || !this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_DOWN, this._view.entityCollect.mousePickList);
        }
        private onMouseUp(code: number) {
            if (!this._view.entityCollect || !this.isMouseTrigger(code)) return;
            this.sendEvent(code, MouseEvent3D.MOUSE_UP, this._view.entityCollect.mousePickList);

        }
        private onMouseMove(e: MouseEvent) {
            if (!this._view.entityCollect) return;
            this.sendEvent(e, MouseEvent3D.MOUSE_MOVE, this._view.entityCollect.mousePickList);
        }


    }
}   