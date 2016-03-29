module egret3d {
    
    /**
    * @class egret3d.Egret3DCanvas
    * @classdesc
    * 3dCanvas 是一个3d渲染画布 它继承EventDispatcher 可以监听部分事件。
    * 如：Event3D.ENTER_FRAME 每帧响应回调事件
    * 一个3d渲染画布里面有多个view3d ，
    * 多个view3d进行渲染
    * @includeExample Egret3DCanvas.ts
    * @see egret3d.EventDispatcher
    * @see egret3d.View3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Egret3DCanvas extends EventDispatcher {
            
        /**
        * @private
        */
        static context3DProxy: Context3DProxy;
                    
        /**
        * @private
        */
        public clientRect: ClientRect;
        private canvas3DRectangle: Rectangle = new Rectangle();

        private canvas: HTMLCanvasElement;

        private view3DS: Array<View3D> = new Array<View3D>();
        private sizeDiry: boolean = true;


        private _enterFrameEvent3D: Event3D;

        protected _time: number = 0;
        protected _delay: number = 0;
        protected _timeDate: Date = null;
        protected _envetManager: EventManager;
                            
        /**
        * @language zh_CN
        * 构造一个Egret3DCanvas对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(blend2D: boolean = false) {
            super();
            ShaderUtil.instance.load();
            this._envetManager = new EventManager(this);
            this.canvas = document.createElement("canvas");
            this.canvas.style.position = "absolute";
            this.canvas.style.zIndex = "0";

            if (document.getElementsByClassName("egret-player").length > 0) {
                document.getElementsByClassName("egret-player")[0].appendChild(this.canvas);
            }
            else {
                document.body.appendChild(this.canvas);
            }

            this.canvas.id = "egret3D";
            this.canvas.oncontextmenu = function () {
                return false;
            };

            Egret3DCanvas.context3DProxy = new egret3d.Context3DProxy();

            Context3DProxy.gl = <WebGLRenderingContext>this.canvas.getContext("experimental-webgl");

            if (!Context3DProxy.gl)
                Context3DProxy.gl = <WebGLRenderingContext>this.canvas.getContext("webgl");

            if (!Context3DProxy.gl)
                alert("you drivers not suport webgl");

            Egret3DCanvas.context3DProxy.register();
            console.log("this.context3D ==>", Context3DProxy.gl);

            this.clientRect = this.canvas.getBoundingClientRect();
            Input.canvas = this;
            this.initEvent();
        }

        private initEvent() {
            this._enterFrameEvent3D = new Event3D(Event3D.ENTER_FRAME);
            this._enterFrameEvent3D.target = this;
        }
                                    
        /**
        * @language zh_CN
        * 设置 Egret3DCanvas 的x坐标
        * @param x x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            if (this.canvas3DRectangle.x != value)
                this.resize(value, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
        }
                                            
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 的x坐标
        * @returns number 返回x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {
            return this.canvas3DRectangle.x;
        }

        /**
        * @language zh_CN
        * 设置 Egret3DCanvas 的y坐标
        * @param y y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            if (this.canvas3DRectangle.y != value)
                this.resize(this.canvas3DRectangle.x, value, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
        }
                                                    
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 的y坐标
        * @returns number 返回y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {
            return this.canvas3DRectangle.y;
        }
        
        /**
        * @language zh_CN
        * 设置 Egret3DCanvas 的宽度
        * @param value Egret3DCanvas 的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            if (this.canvas3DRectangle.width != value)
                this.resize(this.canvas3DRectangle.x, this.canvas3DRectangle.y, value, this.canvas3DRectangle.height);
        }
                                                            
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 的宽度
        * @returns number 返回Egret3DCanvas 的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this.canvas3DRectangle.width;
        }
                
        /**
        * @language zh_CN
        * 设置 Egret3DCanvas 的高度
        * @param value Egret3DCanvas 的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            if (this.canvas3DRectangle.height != value)
                this.resize(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, value);
        }
                                                                    
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 的高度
        * @returns number 返回Egret3DCanvas 的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this.canvas3DRectangle.height;
        }
                                                                            
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 所有的view3d
        * @returns Array<View3D> 返回Egret3DCanvas view3ds列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get view3Ds(): Array<View3D> {
            return this.view3DS;
        }
                                                                                    
        /**
        * @language zh_CN
        * Egret3DCanvas 中 增加一个view3d
        * @param view3D 增加的渲染视口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addView3D(view3D: View3D) {
            var index: number = this.view3DS.indexOf(view3D);
            if (index == -1)
                this.view3DS.push(view3D);
        }
                                                                                            
        /**
        * @language zh_CN
        * Egret3DCanvas 中 移除一个view3d
        * @param view3D 移除的渲染视口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeView3D(view3D: View3D) {
            var index: number = this.view3DS.indexOf(view3D);
            if (index != -1)
                this.view3DS.splice(index);
        }

        /**
        * @language zh_CN
        * Egret3DCanvas 开始启动
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start() {
            this.update(0);
        }

       
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(delay: number) {

            this._timeDate = new Date();
            this._delay = this._timeDate.getTime() - this._time;
            this._time = this._timeDate.getTime();


            this._enterFrameEvent3D.time += this._time;
            this._enterFrameEvent3D.delay = this._delay;
            this.dispatchEvent(this._enterFrameEvent3D);

            Context3DProxy.gl.enable(ContextConfig.BLEND);
            Context3DProxy.gl.enable(ContextConfig.CULL_FACE);
            Context3DProxy.gl.enable(Context3DProxy.gl.SCISSOR_TEST);

            View3D._contex3DProxy.viewPort(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
            View3D._contex3DProxy.setScissorRectangle(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);

            CameraManager.instance.update(this._time, this._delay);
            for (var i: number = 0; i < this.view3DS.length; i++) {
                this.view3DS[i].update(this._time, this._delay);
            }

            requestAnimationFrame((delay) => this.update(delay));
        }

        /**
        * @language zh_CN
        * 初始化,并创建显示区域的后台缓冲大小。
        * @param GPU_CONFIG
        * @param canvasRec
        * @event call
        */
        private resize(x: number, y: number, width: number, height: number) {
            this.canvas3DRectangle.x = x;
            this.canvas3DRectangle.y = y;
            this.canvas3DRectangle.width = width;
            this.canvas3DRectangle.height = height;
            ContextConfig.canvasRectangle = this.canvas3DRectangle;
            this.canvas.style.left = this.canvas3DRectangle.x.toString() + "px";
            this.canvas.style.top = this.canvas3DRectangle.y.toString() + "px";
            this.canvas.width = this.canvas3DRectangle.width;
            this.canvas.height = this.canvas3DRectangle.height;
        }
    }
}