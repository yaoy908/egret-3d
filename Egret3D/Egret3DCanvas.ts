module egret3d {
    export class Egret3DCanvas extends EventDispatcher {
        static context3DProxy: Context3DProxy;
 
        public clientRect: ClientRect;
        private canvas3DRectangle: Rectangle = new Rectangle();

        private canvas: HTMLCanvasElement;

        private view3DS: Array<View3D> = new Array<View3D>();
        private sizeDiry: boolean = true;


        private _enterFrameEvent3D: Event3D;

        protected _time: number = 0;
        protected _delay: number = 0;
        protected _timeDate: Date = null;

        constructor(blend2D: boolean = false) {
            super();
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

            Egret3DCanvas.context3DProxy .register();
            console.log("this.context3D ==>", Context3DProxy.gl);

            this.clientRect = this.canvas.getBoundingClientRect();
            Input.instance.canvas = this;
            this.initEvent();
        }

        public initEvent() {
            this._enterFrameEvent3D = new Event3D(Event3D.ENTER_FRAME);
            this._enterFrameEvent3D.target = this;
        }

        public set x(value: number) {
            if (this.canvas3DRectangle.x != value)
                this.resize(value, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
        }


        public get x(): number {
            return this.canvas3DRectangle.x;
        }

        public set y(value: number) {
            if (this.canvas3DRectangle.y != value)
                this.resize(this.canvas3DRectangle.x, value, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
        }

        public get y(): number {
            return this.canvas3DRectangle.y;
        }

        public set width(value: number) {
            if (this.canvas3DRectangle.width != value)
                this.resize(this.canvas3DRectangle.x, this.canvas3DRectangle.y, value, this.canvas3DRectangle.height);
        }

        public get width(): number {
            return this.canvas3DRectangle.width;
        }

        public set height(value: number) {
            if (this.canvas3DRectangle.height != value)
                this.resize(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, value);
        }

        public get height(): number {
            return this.canvas3DRectangle.height;
        }
     

        public addView3D(view3D: View3D) {
            var index: number = this.view3DS.indexOf(view3D);
            if (index==-1)
                this.view3DS.push(view3D);
        }

        public removeView3D(view3D: View3D) {
            var index: number = this.view3DS.indexOf(view3D);
            if (index != -1)
                this.view3DS.splice(index);
        }

        public start() {
            this.update(0);
        }

        public update(delay: number) {

            this._timeDate = new Date();
            this._delay = this._timeDate.getTime() - this._time;
            this._time = this._timeDate.getTime();


            this._enterFrameEvent3D.time += this._time;
            this._enterFrameEvent3D.delay = this._delay;
            this.dispatchEvent( this._enterFrameEvent3D );

            Context3DProxy.gl.enable(ContextConfig.BLEND);
            Context3DProxy.gl.enable(ContextConfig.CULL_FACE);
            Context3DProxy.gl.enable(Context3DProxy.gl.SCISSOR_TEST);

            View3D._contex3DProxy.viewPort(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
            View3D._contex3DProxy.setScissorRectangle(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);

            for (var i: number = 0; i < this.view3DS.length; i++){
                this.view3DS[i].update(this._time, this._delay);
            }

            View3D._contex3DProxy.flush();
            requestAnimationFrame((delay) => this.update(delay));
        }

        /**
        * @language zh_CN
        * 初始化,并创建显示区域的后台缓冲大小。
        * @param GPU_CONFIG
        * @param canvasRec
        * @event call
        */
        private resize(x:number,y:number,width:number,height:number) {
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