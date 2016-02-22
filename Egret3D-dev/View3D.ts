module egret3d_dev{
    /**
     * @class egret3d.View3D
     * @classdesc
     * 渲染视图。</p>
     * view3D 是整个3D引擎的渲染视口，可以控制渲染窗口的大小，渲染的方式。</p>
     * 可以设置不同的相机 camera3D。</p>
     * 交换不同的场景元素 scene3D 。</p>
     * skyBox需要在这里直接设置，有cube sky 和 sphere sky。</p>
     * 整个渲染的主循环通过 render  。</p>
     * @see egret3d.camera3d
     * @see egret3d.scene3D
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class View3D {
        protected _viewPort: Rectangle = new Rectangle() ; 
        protected _camera: Camera3D;
        protected _scene: Scene3D;
        //protected _render: RenderBase;

        protected _aspectRatio: number = 1;
        protected _scissorRect: Rectangle = new Rectangle();
        protected _viewMatrix: Matrix4_4 = new Matrix4_4();

        constructor( ) {
        }

        public set x(value: number) {
            this._viewPort.x = value; 
        }

        public get x(): number {
            return this._viewPort.x;
        }

        public set y(value: number) {
            this._viewPort.y = value;
        }

        public get y(): number {
            return this._viewPort.y;
        }

        public set width(value: number) {
            this._viewPort.width = value ;
        }

        public get width(): number {
            return this._viewPort.width ;
        }

        public set height(value: number) {
            this._viewPort.height = value;
        }

        public get height(): number {
            return this._viewPort.height;
        }

        public update(time: number, delay: number) {

        }


























     

        /**
        * @language zh_CN
        * 请求全屏
        */
        public static requestFullScreen() {
            var dom: HTMLElement = document.documentElement;
            if (dom.requestFullscreen) {
                dom.requestFullscreen();
            } else if (dom.webkitRequestFullScreen) {
                dom.webkitRequestFullScreen();
            }
        }
        
        /**
        * @language zh_CN
        * 退出全屏
        */
        public static exitFullscreen() {
            var de: Document = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        }
    }
}