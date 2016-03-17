module egret3d {

    /**
	* @private
    * @language zh_CN
    * @class egret3d_dev.Mouse3DManager
    * @classdesc
    * 鼠标事件管理。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Mouse3DManager {
        public static left_mouse_over: string = "left_mouse_over";
        public static left_mouse_down: string = "left_mouse_down";
        public static left_mouse_up: string = "left_mouse_up";
        public static left_mouse_click: string = "left_mouse_click";

        public static right_mouse_over: string = "right_mouse_over";
        public static right_mouse_down: string = "right_mouse_down";
        public static right_mouse_up: string = "right_mouse_up";
        public static right_mouse_click: string = "right_mouse_click";

        public static middle_mouse_over: string = "middle_mouse_over";
        public static middle_mouse_down: string = "middle_mouse_down";
        public static middle_mouse_up: string = "middle_mouse_up";
        public static middle_mouse_click: string = "middle_mouse_click";

        public static mouse_move: string = "mouse_move";

        public type: string;
        public data: PickResult;

        private _camera: Camera3D;
        private _collect: CollectBase;
        private _view: View3D;
        private _canvas: Egret3DCanvas;

        /**
        * @language zh_CN
        * 创建一个新的 Mouse3DManager 对象。
        * @param camera {Camera3D}
        * @param collect {CollectBase}
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(camera: Camera3D, view: View3D, canvas: Egret3DCanvas) {

            this._camera = camera;
            this._view = view;
            this._canvas = canvas;

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
        * 判断是否为鼠标触发。
        * @param code {KeyCode}
        * @version Egret 3.0
        * @platform Web,Native
        */
        private isMouseTriggerByKeyCode(code: KeyCode): boolean {
            return code === KeyCode.Key_Mouse_Right || code == KeyCode.Key_Mouse_Left;
        }
        private isMouseTriggerByMouseEvent(e: MouseEvent): boolean {
            return this.isMouseTriggerByKeyCode(this.getKeyCode(e));
        }
        private getKeyCode(e: MouseEvent): number {
            var k: KeyCode = 0;
            switch (e.button) {
                case 0:
                    k = KeyCode.Key_Mouse_Left;
                    break;
                case 2:
                    k = KeyCode.Key_Mouse_Right;
                    break;
                case 1:
                    k = KeyCode.Key_Mouse_Mid;
                    break;
            }
            return k;
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
            if (!this._collect || !this.isMouseTriggerByKeyCode(code)) return;
            this.sendEvent(code, Event3D.MOUSE_CLICK);
            //var ret: Array<IRender> = Picker.pickObject3DList(this._view, this._camera, this._collect.mousePickList);
            //var event: Event3D;
            //for (var i: number = 0; i < ret.length; i++) {
            //    event = new Event3D(Event3D.MOUSE_CLICK, code);
            //    //event.data = code;
            //    event.currentTarget = ret[i];
            //    ret[i].dispatchEvent(event);
            //}
        }
        private onMouseDown(code: number) {
            console.log("onMouseDown");
            if (!this._collect || !this.isMouseTriggerByKeyCode(code)) return;
            this.sendEvent(code, Event3D.MOUSE_DOWN);
            //if (!this._collect) return;
            //var ret: Array<IRender> = Picker.pickObject3DList(this._view, this._camera, this._collect.mousePickList);
            //var event: Event3D;
            //for (var i: number = 0; i < ret.length; i++) {
            //    event = new Event3D(Event3D.MOUSE_DOWN, code);
            //    event.currentTarget = ret[i];
            //    //event.data = code;
            //    ret[i].dispatchEvent(event);
            //}
        }
        private onMouseUp(code: number) {
            if (!this._collect || !this.isMouseTriggerByKeyCode(code)) return;
            this.sendEvent(code, Event3D.MOUSE_UP);
            //if (!this._collect) return;
            //var ret: Array<IRender> = Picker.pickObject3DList(this._view, this._camera, this._collect.mousePickList);
            //var event: Event3D;
            //for (var i: number = 0; i < ret.length; i++) {
            //    event = new Event3D(Event3D.MOUSE_UP, code);
            //    event.currentTarget = ret[i];
            //    //event.data = code;
            //    ret[i].dispatchEvent(event);
            //}
        }
        private onMouseMove(e: MouseEvent) {
            if (!this._collect) return;
            this.sendEvent(e, Event3D.MOUSE_MOVE);
            //var ret: Array<IRender> = Picker.pickObject3DList(this._view, this._camera, this._collect.mousePickList);
            //var event: Event3D;
            //for (var i: number = 0; i < ret.length; i++) {
            //    event = new Event3D(Event3D.MOUSE_MOVE, e);
            //    event.currentTarget = ret[i];
            //    //event.data = e;
            //    ret[i].dispatchEvent(event);
            //}
        }

        /**
       * @language zh_CN
       * 分发事件。
       * @param e 
       * @version Egret 3.0
       * @platform Web,Native
       */
        private sendEvent(e: any, typeStr: string): void {
            var ret: Array<IRender> = Picker.pickObject3DList(this._canvas, this._view, this._camera, this._collect.mousePickList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(typeStr, e);
                //event.data = code;
                event.currentTarget = ret[i];
                ret[i].dispatchEvent(event);
            }
        }
        public update(collect: CollectBase) {
            this._collect = collect;
        }
    }
}  