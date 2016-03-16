module egret3d {
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
        static _contex3DProxy: Context3DProxy = new Context3DProxy();

        protected _viewPort: Rectangle = new Rectangle();
        protected _camera: Camera3D = new Camera3D();
        protected _scene: Scene3D = new Scene3D();
        protected _render: RenderBase;

        protected _aspectRatio: number = 1;
        protected _scissorRect: Rectangle = new Rectangle();
        protected _viewMatrix: Matrix4_4 = new Matrix4_4();

        protected _entityCollect: EntityCollect;
        protected _backColor: Vector3D = new Vector3D(0.3, 0.3, 0.6, 1.0);

        private _sizeDiry: boolean = false;
        constructor(x: number, y: number, width: number, height: number) {

            ShaderUtil.instance.load();

            this._entityCollect = new EntityCollect();
            this._entityCollect.root = this._scene;
            this._render = new DefaultRender();

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        public set backColor(value: number) {
            this._backColor.w = value >> 24 & 255;
            this._backColor.x = value >> 16 & 255;
            this._backColor.y = value >> 8 & 255;
            this._backColor.z = value & 255;
        }

        public get camera3D(): Camera3D {
            return this._camera;
        }

        public set camera3D(value: Camera3D) {
            this._camera = value;
        }

        public get scene(): Scene3D {
            return this._scene;
        }

        public set scene(sc) {
            this._scene = sc;
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
            this._viewPort.width = value;
            this._aspectRatio = this._viewPort.width / this._viewPort.height;
            this._camera.aspectRatio = this._aspectRatio;
        }

        public get width(): number {
            return this._viewPort.width;
        }

        public set height(value: number) {
            this._viewPort.height = value;
            this._aspectRatio = this._viewPort.width / this._viewPort.height;
            this._camera.aspectRatio = this._aspectRatio;
        }

        public get height(): number {
            return this._viewPort.height;
        }

        public get entityCollect(): EntityCollect {
            return this._entityCollect;
        }

        public addChild3D(child3d: Object3D) {
            this._scene.addChild3D(child3d);
        }

        public removeChild3D(child3d: Object3D) {
            this._scene.removeChild3D(child3d);
        }

        public update(time: number, delay: number) {
            this._entityCollect.update(this._camera);

            View3D._contex3DProxy.viewPort(this._viewPort.x, ContextConfig.canvasRectangle.height - this._viewPort.height - this._viewPort.y, this._viewPort.width, this._viewPort.height);
            View3D._contex3DProxy.setScissorRectangle(this._viewPort.x, ContextConfig.canvasRectangle.height - this._viewPort.height - this._viewPort.y, this._viewPort.width, this._viewPort.height);

            View3D._contex3DProxy.clearColor(this._backColor.x, this._backColor.y, this._backColor.z, this._backColor.w);
            View3D._contex3DProxy.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);

            this._render.draw(time, delay, View3D._contex3DProxy, this._entityCollect, this._camera);

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