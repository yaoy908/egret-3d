module egret3d {

    /**
     * @private
     * @language zh_CN
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum KeyCode {
        Key_BackSpace = 8,
        Key_Tab = 9,
        Key_Clear = 12,
        Key_Enter = 13,
        Key_Shift_L = 16,
        Key_Control_L = 17,
        Key_Alt_L = 18,
        Key_Pause,
        Key_CapsLock = 20,
        Key_Escape,
        Key_Space,
        Key_Prior,
        Key_Next,
        Key_End = 35,
        Key_Home = 36,
        Key_Left = 37,
        Key_Up = 38,
        Key_Right = 39,
        Key_Down = 40,
        Key_Select,
        Key_Print,
        Key_Execute,
        Key_Insert = 45,
        Key_Delete = 46,
        Key_Help,
        Key_0 = 48,
        Key_1,
        Key_2,
        Key_3,
        Key_4,
        Key_5,
        Key_6,
        Key_7,
        Key_8,
        Key_9,

        Key_A = 65,
        Key_B,
        Key_C,
        Key_D,
        Key_E,
        Key_F,
        Key_G,
        Key_H,
        Key_I,
        Key_J,
        Key_K,
        Key_L,
        Key_M,
        Key_N,
        Key_O,
        Key_P,
        Key_Q,
        Key_R,
        Key_S,
        Key_T,
        Key_U,
        Key_V,
        Key_W,
        Key_X,
        Key_Y,
        Key_Z,
        Key_KP_0 = 96,
        Key_KP_1,
        Key_KP_2,
        Key_KP_3,
        Key_KP_4,
        Key_KP_5,
        Key_KP_6,
        Key_KP_7,
        Key_KP_8,
        Key_KP_9 = 105,
        Key_Multiply = 106,
        Key_Add = 107,
        Key_Separator = 108,
        Key_Subtract = 109,
        Key_Decimal = 110,
        Key_Divide = 111,
        Key_F1 = 112,
        Key_F2 = 113,
        Key_F3 = 114,
        Key_F4,
        Key_F5,
        Key_F6,
        Key_F7,
        Key_F8,
        Key_F9,
        Key_F10,
        Key_F11,
        Key_F12 = 123,
        Key_F13,
        Key_F14,
        Key_F15,
        Key_F16,
        Key_F17,
        Key_F18,
        Key_F19,
        Key_F20,
        Key_F21,
        Key_F22,
        Key_F23,
        Key_F24,

        Key_Num_Lock,
        Key_Scroll_Lock,

        Key_Mouse_Left = 256,
        Key_Mouse_Right,
        Key_Mouse_Mid,
    }

    /**
     * @language zh_CN
     * @class egret3d.Input
     * @classdesc
     * 处理输入设备,鼠标.键盘.触摸。
     * @includeExample input/Input.ts
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Input {

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static canvas: Egret3DCanvas;

        /**
        * @language zh_CN
        * 当前鼠标X坐标。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseX: number = 0;
        /**
        * @language zh_CN
        * 当前鼠标Y坐标。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseY: number = 0;


        /**
        * @language zh_CN
        * 鼠标滚轮增量值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static wheelDelta: number = 0;

        /**
        * @language zh_CN
        * 鼠标X坐标的偏移值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseOffsetX: number = 0;
        /**
        * @language zh_CN
        * 鼠标Y坐标的偏移值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseOffsetY: number = 0;


        /**
        * @language zh_CN
        * 上一次鼠标X坐标。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseLastX: number = 0;
        /**
        * @language zh_CN
        * 上一次鼠标Y坐标。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseLastY: number = 0;

        private _time: number = 0;

        private _keyStatus: { [key: number]: boolean; } = {};

        private _listenerKeyClick: Array<any> = new Array<any>();
        private _listenerKeyUp: Array<any> = new Array<any>();
        private _listenerKeyDown: Array<any> = new Array<any>();

        private _mouseMoveFunc: Array<any> = new Array<any>();
        private _mouseOverFunc: Array<any> = new Array<any>();
        private _mouseWheelFunc: Array<any> = new Array<any>();

        private _ondeviceorientation: Array<any> = new Array<any>();
        private _ondevicemotion: Array<any> = new Array<any>();

        private _listenerGamepadButtons: Array<any> = new Array<any>();

        private _touchStartCallback: Array<any> = new Array<any>();
        private _touchEndCallback: Array<any> = new Array<any>();
        private _touchMoveCallback: Array<any> = new Array<any>();

        private _listenerSwipe: Array<any> = new Array<any>();



        /**
        * @language zh_CN
        * 游戏手柄Stick1事件侦听函数。
        * @version Egret 3.0
        * @platform Web,Native
        */
        private onGamepadStick1: Function = null;
        /**
        * @language zh_CN
        * 游戏手柄Stick2事件侦听函数。
        * @version Egret 3.0
        * @platform Web,Native
        */
        private onGamepadStick2: Function = null;

        private static _instance: Input = null;

        /**
        * @language zh_CN
        * 获取Input类对象的单例。
        * @returns Input
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static get instance(): Input {
            if (this._instance == null) {
                this._instance = new Input();
            }
            return this._instance;
        }
        /**
        * @language zh_CN
        * 创建一个新的 Input 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            window.addEventListener("mousewheel", (e: MouseWheelEvent) => this.mouseWheel(e));
            window.addEventListener("mousedown", (e: MouseEvent) => this.mouseStart(e));
            window.addEventListener("mouseup", (e: MouseEvent) => this.mouseEnd(e));
            window.addEventListener("mousemove", (e: MouseEvent) => this.mouseMove(e));
            window.addEventListener("mouseover", (e: MouseEvent) => this.mouseOver(e));
            window.addEventListener("keydown", (e: KeyboardEvent) => this.keyDown(e));
            window.addEventListener("keyup", (e: KeyboardEvent) => this.keyUp(e));

            if (this.canGame()) {
                window.addEventListener("gamepadconnected", (e: GamepadEvent) => this.ongamepadconnected(e));
                window.addEventListener("gamepaddisconnected", (e: GamepadEvent) => this.ongamepaddisconnected(e));
            }

            window.addEventListener("touchstart", (e: TouchEvent) => this.touchStart(e));
            window.addEventListener("touchend", (e: TouchEvent) => this.touchEnd(e));
            window.addEventListener("touchmove", (e: TouchEvent) => this.touchMove(e));
            window.addEventListener("touchcancel", (e: TouchEvent) => this.touchEnd(e));

            window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.ondeviceorientation(e));
            window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.detectShake(e));
        }

        /**
        * @language zh_CN
        * 添加鼠标移动事件的侦听器函数。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 处理鼠标移事件的侦听器函数
        * @param thisObject {any} 处理事件this对象  
        */
        public static addListenerMouseMove(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._mouseMoveFunc.push(datas);
        }

        /**
        * @language zh_CN
        * 添加鼠标脱离事件的侦听器函数。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 处理鼠标移事件的侦听器函数
        * @param thisObject {any} 处理事件this对象
        */
        public static addListenerMouseOver(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._mouseOverFunc.push(datas);
        }

        /**
        * @language zh_CN
        * 添加鼠标滚轮事件的侦听器函数。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 处理鼠标滚轮事件的侦听器函数
        */
        public static addListenerMouseWheel(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._mouseWheelFunc.push(datas);
        }

        /**
        * @language zh_CN
        * 添加键盘鼠标点击事件的侦听器函数。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 处理键盘鼠标点击事件的侦听器函数
        */
        public static addListenerKeyClick(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._listenerKeyClick.push(datas);
        }


        /**
        * @language zh_CN
        * 添加键盘鼠标弹起事件的侦听器函数。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 处理键盘鼠标弹起事件的侦听器函数
        */
        public static addListenerKeyUp(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._listenerKeyUp.push(datas);
        }

        /**
        * @language zh_CN
        * 添加键盘鼠标按下事件的侦听器函数。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 处理键盘鼠标按下事件的侦听器函数
        */
        public static addListenerKeyDown(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._listenerKeyDown.push(datas);
        }


        /**
        * @language zh_CN
        * 移动端手指划动的手势事件。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 手指划动划动的手势事件的侦听器函数
        */
        public static addListenerSwipe(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._listenerSwipe.push(datas);
        }

        /**
        * @language zh_CN
        * 添加设备旋转事件。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 设备旋转事件的侦听器函数
        */
        public static addListenerDeviceorientation(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._ondeviceorientation.push(datas);
        }

        /**
        * @language zh_CN
        * 添加设备移动事件。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 设备移动事件的侦听器函数
        */
        public static addListenerDevicemotion(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._ondevicemotion.push(datas);
        }

        /**
        * @language zh_CN
        * 添加游戏手柄按钮点击事件。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 游戏手柄点击事件的侦听器函数
        */
        public static addListenerGamePadButtons(callback: Function, thisObject: any) {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._listenerGamepadButtons.push(datas);
        }

        /**
        * @language zh_CN
        * 添加手指按下事件。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 手指按下事件的侦听函数
        */
        public static addTouchDownCallback(callback: Function, thisObject: any): void {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._touchStartCallback.push(datas);
        }

        /**
        * @language zh_CN
        * 添加手指弹起事件。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 手指弹起事件的侦听函数
        */
        public static addTouchUpCallback(callback: Function, thisObject: any): void {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._touchEndCallback.push(datas);
        }

        /**
        * @language zh_CN
        * 添加手指移动事件。
        * @version Egret 3.0
        * @platform Web,Native
        * @param callback {Function} 手指移动事件的侦听函数
        */
        public static addTouchMoveCallback(callback: Function, thisObject: any): void {
            var datas: any = {};
            datas.callback = callback;
            datas.thisObject = thisObject;
            Input.instance._touchMoveCallback.push(datas);
        }

        private _gp: boolean = false;
        private ongamepaddisconnected(e: GamepadEvent) {
            //Debug.instance.trace("Gamepad disconnected!");
            this._gp = false;
        }
        private ongamepadconnected(e: GamepadEvent) {
            //Debug.instance.trace("Gamepad connected!");
            this._gp = true;
        }

        /**
        * @language zh_CN
        * 游戏手柄按钮是否按下。
        * @version Egret 3.0
        * @platform Web,Native
        * @param index {number}
        * @returns {boolean}
        */
        private getGamepadButtonState(index: number): boolean {
            return navigator.getGamepads()[0].buttons[index].pressed;
        }

        /**
        * @language zh_CN
        * 游戏手柄摇杆方向 Stick1 。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Vector3D}
        */
        private getGamepadStick1(): Vector3D {
            return new Vector3D(navigator.getGamepads()[0].axes[0], navigator.getGamepads()[0].axes[1], 0);
        }

        /**
        * @language zh_CN
        * 游戏手柄摇杆方向 Stick2 。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Vector3D}
        */
        private getGamepadStick2(): Vector3D {
            return new Vector3D(navigator.getGamepads()[0].axes[2], navigator.getGamepads()[0].axes[3], 0);
        }



        private canGame(): boolean {
            return "getGamepads" in navigator;
        }


        /**
        * @language zh_CN
        * 更新游戏手柄信息。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static reportOnGamepad() {
            if (Input.instance.canGame() && Input.instance._gp) {

                if (Input.instance.onGamepadStick1 != null) {
                    Input.instance.onGamepadStick1(Input.instance.getGamepadStick1());
                }

                if (Input.instance.onGamepadStick2 != null) {
                    Input.instance.onGamepadStick2(Input.instance.getGamepadStick2());
                }


                for (var i: number = 0; i < Input.instance._listenerGamepadButtons.length; ++i) {
                    Input.instance._listenerGamepadButtons[i](Input.instance.getGamepadButtonState(i));
                }
            }
        }

        private printout(): void {

            var html = "";
            html += "id: " + navigator.getGamepads()[0].id + "<br/>";
            var len: number = navigator.getGamepads()[0].buttons.length;
            for (var i: number = 0; i < len; i++) {
                html += "Button " + (i + 1) + ": ";
                if (this.getGamepadButtonState(i)) html += " pressed";
                html += "<br/>";
            }

            var v: Vector3D = this.getGamepadStick1();

            html += "Stick 1" + ": " + v.x + "," + v.y + "<br/>";

            v = this.getGamepadStick2();
            html += "Stick 2" + ": " + v.x + "," + v.y + "<br/>";

            //Debug.instance.trace(html);
        }

        private detectShake(evt: DeviceMotionEvent) {

            var accl = evt.acceleration; //acceleration 排除重力影响的加速度  accelerationIncludingGravity(含重力的加速度)
            //x、y 和 z 轴方向加速
            if (accl.x > 1.5 || accl.y > 1.5 || accl.z > 1.5) {

            } else {

            }

            if (this._ondevicemotion && this._ondevicemotion.length > 0) {

                var x: number = Math.ceil(accl.x * 1000) / 1000;
                var y: number = Math.ceil(accl.y * 1000) / 1000;
                var z: number = Math.ceil(accl.z * 1000) / 1000;

                this._ondevicemotion[0](x, y, z);
            }
        }

        private _caheX: number;
        private _caheY: number;
        private _caheZ: number;

        private _delayX: number;
        private _delayY: number;
        private _delayZ: number;
        private _first: boolean = true;
        private _initAngle: Vector3D = new Vector3D();
        private ondeviceorientation(e: DeviceOrientationEvent) {
            //alpha rotation around the z-axis  between 0 and 360 degrees 
            //在围绕 z 轴旋转时（即左右旋转时），y 轴的度数差 0 到 360度 。
            //beta Rotation around the x-axis cause the beta angle to change. The range of beta is between -180 and 180 degrees 
            //在围绕 x 轴旋转时（即前后旋转时），z 轴的度数差 -180到180度。  
            //gamma The gamma angle is associated with the y-axis between -90 and 90 degrees 
            //在围绕 y 轴旋转时（即扭转设备时），z 轴的度数差 -90到90度。  


            if (this._ondeviceorientation && this._ondeviceorientation.length > 0) {

                var alpha: number = Math.round(e.alpha * 100) * 0.01;
                var beta: number = Math.round(e.beta * 100) * 0.01;
                var gamma: number = Math.round(e.gamma * 100) * 0.01;

                if (this._first) {
                    this._initAngle["x"] = alpha;
                    this._initAngle["y"] = beta;
                    this._initAngle["z"] = gamma;
                }

                this._delayX = alpha - this._caheX;
                this._delayY = beta - this._caheY;
                this._delayZ = gamma - this._caheZ;

                this._caheX = alpha;
                this._caheY = beta;
                this._caheZ = gamma;

                this._initAngle.x += this._delayX;
                this._initAngle.y += this._delayY;
                this._initAngle.z += this._delayZ;

                this._ondeviceorientation[0](this._initAngle);
            }
        }

        //屏幕翻转
        private onorientationchange(e) {

        }

        private onPinch(x: number, y: number, x1: number, y1: number) {
            this._oldPosition1 = new Point(x, y);
            this._oldPosition2 = new Point(x1, y1);

        }

        private onSwipe(x: number, y: number) {

            Input.mouseX = x;
            Input.mouseY = y;

            this._oldPosition1 = null;
            this._oldPosition2 = null;

            this._time = new Date().getTime();
        }

        private touchStart(e: TouchEvent) {

            e.preventDefault();

            var x1: number = e.targetTouches[0].clientX - Input.canvas.clientRect.left;
            var y1: number = e.targetTouches[0].clientY - Input.canvas.clientRect.top;

            if (e.targetTouches.length == 2) {

                var x2: number = e.targetTouches[1].clientX - Input.canvas.clientRect.left;
                var y2: number = e.targetTouches[1].clientY - Input.canvas.clientRect.top;

                this.onPinch(x1, y1, x2, y2);
            }
            else if (e.targetTouches.length == 1) {
                this.onSwipe(x1, y1);
            }

            for (var i: number = 0; i < this._touchStartCallback.length; i++) {
                this._touchStartCallback[i](e);
            }
        }

        private _oldPosition1: Point = null;
        private _oldPosition2: Point = null;

        private touchEnd(e: TouchEvent) {

            if (e.targetTouches.length > 1) {

                var x: number = e.targetTouches[0].clientX - Input.canvas.clientRect.left;
                var y: number = e.targetTouches[0].clientY - Input.canvas.clientRect.top;
                var x1: number = e.targetTouches[1].clientX - Input.canvas.clientRect.left;
                var y1: number = e.targetTouches[1].clientY - Input.canvas.clientRect.top;

                this.onPinch(x, y, x1, y1);
            }
            else if (e.targetTouches.length == 1) {

                this.onSwipe(e.targetTouches[0].clientX - Input.canvas.clientRect.left, e.targetTouches[0].clientY - Input.canvas.clientRect.top);
            }
            else {

                this._oldPosition1 = null;
                this._oldPosition2 = null;
                this._time = 0;
            }

            for (var i: number = 0; i < this._touchEndCallback.length; i++) {
                this._touchEndCallback[i].callback.call(this._touchEndCallback[i].thisObject, e);
            }
        }


        private touchMove(e: TouchEvent) {

            Input.mouseLastX = Input.mouseX;
            Input.mouseLastY = Input.mouseY;

            Input.mouseX = e.targetTouches[0].clientX - Input.canvas.clientRect.left;
            Input.mouseY = e.targetTouches[0].clientY - Input.canvas.clientRect.top;

            Input.mouseOffsetX = Input.mouseX - Input.mouseLastX;
            Input.mouseOffsetY = Input.mouseY - Input.mouseLastY;

            e.preventDefault();


            if (e.targetTouches.length > 1) {

                var newPosition1: Point = new Point(Input.mouseX, Input.mouseY);
                var newPosition2: Point = new Point(e.targetTouches[1].clientX - Input.canvas.clientRect.left, e.targetTouches[1].clientY - Input.canvas.clientRect.top);

                if (this._oldPosition1 == null)
                    this._oldPosition1 = newPosition1;
                if (this._oldPosition2 == null)
                    this._oldPosition2 = newPosition2;

                if (this.isEnlarge(this._oldPosition1, this._oldPosition2, newPosition1, newPosition2))
                    Input.wheelDelta = 120;
                else
                    Input.wheelDelta = -120;


                this._oldPosition1 = newPosition1;
                this._oldPosition2 = newPosition2;



                for (var i: number = 0; i < this._mouseWheelFunc.length; ++i) {
                    this._mouseWheelFunc[i]();
                }

            }
            else {
                for (var i: number = 0; i < this._listenerSwipe.length; i++) {
                    this._listenerSwipe[i].callback.call(this._listenerSwipe[i].thisObject, e);
                }
            };

            for (var i: number = 0; i < this._touchMoveCallback.length; i++) {
                this._touchMoveCallback[i].callback.call(this._touchMoveCallback[i].thisObject, e);
            }
        }      

        private mouseEnd(e: MouseEvent) {
            Input.mouseX = e.clientX - Input.canvas.clientRect.left;
            Input.mouseY = e.clientY - Input.canvas.clientRect.top;

            var k: number = Input.GetKeyCodeByMouseEventNumber(e.button);

            if (k != 0) {
                if (this._keyStatus[k]) {
                    for (var i: number = 0; i < this._listenerKeyClick.length; ++i) {
                        this._listenerKeyClick[i].callback.call(this._listenerKeyClick[i].thisObject, k);
                    }
                }

                this._keyStatus[k] = false;

                for (var i: number = 0; i < this._listenerKeyUp.length; ++i) {
                    this._listenerKeyUp[i].callback.call(this._listenerKeyUp[i].thisObject, k);
                }
            }
        }

        private mouseStart(e: MouseEvent) {

            Input.mouseX = e.clientX - Input.canvas.clientRect.left;
            Input.mouseY = e.clientY - Input.canvas.clientRect.top;

            var k: number = Input.GetKeyCodeByMouseEventNumber(e.button);

            if (k != 0) {
                this._keyStatus[k] = true;

                for (var i: number = 0; i < this._listenerKeyDown.length; ++i) {
                    this._listenerKeyDown[i].callback.call(this._listenerKeyDown[i].thisObject, k);
                }
            }
        }

        private mouseMove(e: MouseEvent) {
            Input.mouseLastX = Input.mouseX;
            Input.mouseLastY = Input.mouseY;

            Input.mouseX = e.clientX - Input.canvas.clientRect.left;
            Input.mouseY = e.clientY - Input.canvas.clientRect.top;

            Input.mouseOffsetX = Input.mouseX - Input.mouseLastX;
            Input.mouseOffsetY = Input.mouseY - Input.mouseLastY;

            for (var i: number = 0; i < this._mouseMoveFunc.length; ++i) {
                this._mouseMoveFunc[i].callback.call(this._mouseMoveFunc[i].thisObject, e);
            }
        }

        private mouseOver(e: MouseEvent) {
            for (var i: number = 0; i < this._mouseOverFunc.length; ++i) {
                this._mouseOverFunc[i].callback.call(this._mouseOverFunc[i].thisObject, e);
            }
        }

        private mouseWheel(e: MouseWheelEvent) {
            Input.wheelDelta = e.wheelDelta;

            for (var i: number = 0; i < this._mouseWheelFunc.length; ++i) {
                this._mouseWheelFunc[i].callback.call(this._mouseWheelFunc[i].thisObject, e);
            }
        }

        private keyDown(e: KeyboardEvent) {
            this._keyStatus[e.keyCode] = true;

            for (var i: number = 0; i < this._listenerKeyDown.length; ++i) {
                this._listenerKeyDown[i].callback.call(this._listenerKeyDown[i].thisObject, e.keyCode);
            }
        }

        private keyUp(e: KeyboardEvent) {
            if (this._keyStatus[e.keyCode]) {
                for (var i: number = 0; i < this._listenerKeyClick.length; ++i) {
                    this._listenerKeyClick[i].callback.call(this._listenerKeyClick[i].thisObject, e.keyCode);
                }
            }

            this._keyStatus[e.keyCode] = false;

            for (var i: number = 0; i < this._listenerKeyUp.length; ++i) {
                this._listenerKeyUp[i].callback.call(this._listenerKeyUp[i].thisObject, e.keyCode);
            }
        }

        //返回角度
        private GetSlideAngle(dx, dy) {
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }

        /**
        * @language zh_CN
        * 根据起点和终点返回方向
        * @param  startX {Number} 起点X坐标
        * @param  startY {Number} 起点Y坐标
        * @param  endX   {Number} 终点X坐标
        * @param  endY   {Number} 终点Y坐标
        * @returns result {number} 1：向上，2：向下，3：向左，4：向右,0：未滑动
        */
        public GetSlideDirection(startX: number, startY: number, endX: number, endY: number): number {
            var dy = startY - endY;
            var dx = endX - startX;
            var result = 0;

            //如果滑动距离太短
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return result;
            }

            var angle = this.GetSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
                result = 4;
            } else if (angle >= 45 && angle < 135) {
                result = 1;
            } else if (angle >= -135 && angle < -45) {
                result = 2;
            }
            else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }

            return result;
        }

        private isEnlarge(op1: Point, op2: Point, np1: Point, np2: Point): boolean {
            //函数传入上一次触摸两点的位置与本次触摸两点的位置计算出用户的手势
            var leng1 = Math.sqrt((op1.x - op2.x) * (op1.x - op2.x) + (op1.y - op2.y) * (op1.y - op2.y));
            var leng2 = Math.sqrt((np1.x - np2.x) * (np1.x - np2.x) + (np1.y - np2.y) * (np1.y - np2.y));

            if (leng1 < leng2) {
                //放大手势
                return true;
            } else {
                //缩小手势
                return false;
            }
        }

        /**
         * @language zh_CN
         * 获取鼠标事件枚举
         * @param  value {MouseEvent.number} 鼠标点击值
         * @returns result {KeyCode} 鼠标行为枚举
         */
        public static GetKeyCodeByMouseEventNumber(value: number): KeyCode {
            var k: KeyCode = 0;
            switch (value) {
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
    }
}
