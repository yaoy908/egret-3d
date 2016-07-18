﻿module egret3d {

    /**
     * @class egret3d.View3D
     * @classdesc
     * 渲染视图。</p>
     * view3D 是整个3D引擎的渲染视口，可以控制渲染窗口的大小，渲染的方式。</p>
     * 可以设置不同的相机 Camera3D。</p>
     * 交换不同的场景元素 Scene3D 。</p>
     * 当前的View3D中会有一个Scene3D的节点和一个Camera3D来进行场景中的渲染。
     * 整个渲染的主循环通过 update  。</p>
     * Engre3DCanvas 中的View3D列表会主动调用View3D的update,加入了Engre3DCanvas中的View3D列表后不需要使用者update
     * @includeExample View3D.ts
     * @see egret3d.Camera3D
     * @see egret3d.Scene3D
     * @see egret3d.Egret3DCanvas
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class View3D {

        //public stage: Stage = new Stage();
        //protected _QuadPool: QuadPool = new QuadPool();

        protected _viewPort: Rectangle = new Rectangle();
        protected _camera: Camera3D;
        protected _scene: Scene3D = new Scene3D();
        protected _render: RenderBase;

        protected _scissorRect: Rectangle = new Rectangle();
        protected _viewMatrix: Matrix4_4 = new Matrix4_4();

        protected _entityCollect: EntityCollect;
        protected _backColor: Vector3D = new Vector3D(0.3, 0.3, 0.6, 1.0);

        protected _cleanParmerts: number = Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT; 
        private _sizeDiry: boolean = false;

        protected _backImg: HUD;
        protected _huds: Array<HUD> = new Array<HUD>();

        protected _index: number; 
        protected _numberEntity: number; 

        protected _postList: IPost[] = []; 
        protected _postHUD: HUD ; 
        protected _postProcessing: PostProcessing; 
        /**
        * @language zh_CN
        * 构建一个view3d对象
        * @param x 视口的屏幕x坐标
        * @param y 视口的屏幕y坐标
        * @param width 视口的屏幕宽度
        * @param height 视口的屏幕高度
        * @param camera 摄像机 默认参数为null，会在内部新建一个CameraType.perspective 类型的Camera3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(x: number, y: number, width: number, height: number, camera: Camera3D = null) {
            this._entityCollect = new EntityCollect();
            this._entityCollect.root = this._scene;

            this._render = new MultiRender(PassType.diffusePass);

            this._camera = camera || new Camera3D(CameraType.perspective);
            this._camera.name = "MainCamera";
            this._scene.addChild3D(this._camera);

            this._viewPort.x = x;
            this._viewPort.y = y;
            this._viewPort.width = width;
            this._viewPort.height = height;
            this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
            this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
        }

        public get render(): RenderBase {
            return this._render; 
        }

        public set render(render: RenderBase) {
            this._render = render; 
        }

        public set post( list:any[] ) {
            this._postList = list; 
            if (list.length > 0) {
                this._postProcessing = this._postProcessing || new PostProcessing();
                this._postHUD = this._postHUD || new HUD(0,0,512,512);
                this._postHUD.fsShader = "hud_H_fs";
            }
        }

        /**
        * @language zh_CN
        * 设置是否清除背景缓冲颜色 和 深度
        * @param cleanColor 是否清除背景缓冲颜色
        * @param cleanDepth 是否清除背景缓冲深度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public blender(cleanColor:boolean, cleanDepth:boolean) {
            this._cleanParmerts = (cleanColor ? Context3DProxy.gl.COLOR_BUFFER_BIT : 0) | (cleanDepth ? Context3DProxy.gl.DEPTH_BUFFER_BIT : 0);
        }

                
        /**
        * @language zh_CN
        * 设置view3d背景颜色
        * @param value  颜色值 a r g b
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set backColor(value: number) {
            this._backColor.w = (value >> 24 & 0xff) / 255;
            this._backColor.x = (value >> 16 & 0xff) / 255;
            this._backColor.y = (value >> 8 & 0xff) / 255;
            this._backColor.z = (value & 0xff) / 255;
        }
                        
        /**
        * @language zh_CN
        * 获取view3d背景颜色
        * @returns number 颜色值 a r g b
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get backColor(): number {
            return (this._backColor.w * 255 << 24) | (this._backColor.x * 255 << 16) | (this._backColor.y * 255 << 8) | (this._backColor.z * 255);
        }

        public set backImage(tex: ITexture) {
            if (tex) {
                this._backImg = this._backImg || new HUD();
                this._backImg.diffuseTexture = tex; 
                this._backImg.x = this.x;
                this._backImg.y = this.y;
                this._backImg.width = this.width;
                this._backImg.height = this.height;
            }
        }

        public get backImage(): ITexture {
            return this._backImg.diffuseTexture ;
        }

        /**
        * @language zh_CN
        * 获取View3d中的渲染摄像机
        * @returns Camera3D 当前View3D的摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get camera3D(): Camera3D {
            return this._camera;
        }
        
        /**
        * @language zh_CN
        * 设置View3d中的渲染摄像机
        * @param value 当前View3D的摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set camera3D(value: Camera3D) {
            this._camera = value;

            this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
            this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

        }
        
        /**
        * @language zh_CN
        * 获取View3d中的场景对象
        * @returns Scene3D 场景对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scene(): Scene3D {
            return this._scene;
        }
                
        /**
        * @language zh_CN
        * 设置View3d中的场景对象
        * @param sc 当前View3D的场景对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scene(sc: Scene3D) {
            this._scene = sc;
         
        }
                
        /**
        * @language zh_CN
        * 设置当前视口的屏幕x坐标
        * @param x 视口的屏幕x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            this._viewPort.x = value;
            this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

            if (this._backImg) {
                this._backImg.x = value;
            }
        }
                
                
        /**
        * @language zh_CN
        * 获得当前视口的屏幕x坐标
        * @returns number 视口的屏幕x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {
            return this._viewPort.x;
        }
                
        /**
        * @language zh_CN
        * 设置当前视口的屏幕y坐标
        * @param y 视口的屏幕y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            this._viewPort.y = value;
            this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

            if (this._backImg) {
                this._backImg.y = value;
            }
        }
                
                
        /**
        * @language zh_CN
        * 获得当前视口的屏幕y坐标
        * @returns number 视口的屏幕y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {
            return this._viewPort.y;
        }
                
        /**
        * @language zh_CN
        * 设置视口的屏幕宽度
        * @param width 视口的屏幕宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            this._viewPort.width = value;
            this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
            this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

            if (this._backImg) {
                this._backImg.width = value;
            }
        }
                
        /**
        * @language zh_CN
        * 获取视口的屏幕宽度
        * @returns number 视口的屏幕宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._viewPort.width;
        }
                
        /**
        * @language zh_CN
        * 设置视口的屏幕高度
        * @param width 视口的屏幕高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            this._viewPort.height = value;
            this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
            this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            if (this._backImg) {
                this._backImg.height = value;
            }
        }
                
        /**
        * @language zh_CN
        * 获取视口的屏幕高度
        * @returns number 视口的屏幕高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this._viewPort.height;
        }

        /**
        * @language zh_CN
        * 获取视口数据 x y width height
        * @returns Rectangle 视口数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get viewPort(): Rectangle {
            return this._viewPort;
        }
                        
        /**
        * @private
        * @language zh_CN
        * 获取View3D的数据收集对象
        * @returns EntityCollect 数据收集对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get entityCollect(): EntityCollect {
            return this._entityCollect;
        }
        
                        
        /**
        * @language zh_CN
        * 添加一个Object3D对象进场景根节点
        * @param child3d Object3D需要添加的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild3D(child3d: Object3D) {
            this._scene.addChild3D(child3d);
        }
                
        /**
        * @language zh_CN
        * 从场景根节点中移除一个Object3D对象
        * @param child3d 需要移除的Object3D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChild3D(child3d: Object3D) {
            this._scene.removeChild3D(child3d);
        }
        
        /**
        * @language zh_CN
        * 检测x y 是否在当前视口内
        * @param x  x 坐标。 
        * @param y  y 坐标。 
        */
        public inView3D(x: number, y: number) {
            return this._viewPort.inner(x, y);
        }

        /**
        * @language zh_CN
        * 添加 HUD 到渲染列表中
        * @param hud 需要增加的HUD
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addHUD(hud: HUD) {
            if (this._huds.indexOf(hud) == -1) {
                hud.viewPort = this._viewPort;
                this._huds.push(hud);
            }
        }

        /**
        * @language zh_CN
        * 查找HUD
        * @param name hud 名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findHud(name: string): HUD {
            for (var i: number = 0; i < this._huds.length; ++i) {
                if (this._huds[i].name == name) {
                    return this._huds[i];
                }
            }
            return null;
        }

        /**
        * @language zh_CN
        * 在渲染列表中删除一个HUD
        * @param hud 需要删除的HUD
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delHUD(hud: HUD) {
            var index: number = this._huds.indexOf(hud);
            if (index >= 0 && index < this._huds.length) {
                this._huds.splice(index, 1);
            }
        }

        /**
        * @private
        */
        private _renderItem: IRender;
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public a: number = 0;
        public update(time: number, delay: number) {
            this._camera.viewPort = this._viewPort;
            this._entityCollect.update(this._camera);

            //------------------
            this.updateObject3D(this._scene.root, time, delay);
            //this._numberEntity = this._entityCollect.renderList.length;
            //for (this._index = 0; this._index < this._numberEntity; this._index++) {
            //    this._renderItem = this._entityCollect.renderList[this._index];
            //    this._renderItem.update(time, delay, this._camera);
            //}
            //------------------
            //this._render.update(time, delay, this._entityCollect, this._camera);

            Egret3DCanvas.context3DProxy.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            Egret3DCanvas.context3DProxy.setScissorRectangle(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

            if (ShadowCast.instance.shadowRender[0]) {

                MathUtil.CALCULATION_QUATERNION.fromEulerAngles(0, this.a++, 0);
                var v = new Vector3D(0, -1, -1);
                MathUtil.CALCULATION_QUATERNION.transformVector(v, ShadowCast.instance.dir);

                ShadowCast.instance.shadowRender[0].draw(time, delay, Egret3DCanvas.context3DProxy, this._entityCollect, ShadowCast.instance.shadowCamera, this._viewPort, true);
            }

            if (this._cleanParmerts & Context3DProxy.gl.COLOR_BUFFER_BIT) {
                Egret3DCanvas.context3DProxy.clearColor(this._backColor.x, this._backColor.y, this._backColor.z, this._backColor.w);
            }

            Egret3DCanvas.context3DProxy.clear(this._cleanParmerts);

            if (this._backImg) {
                this._backImg.draw(Egret3DCanvas.context3DProxy);
            }

            if (this._postList.length > 0){
                this._postProcessing.postItem = this._postList; 
                this._postProcessing.drawFrameBuffer(time, delay, Egret3DCanvas.context3DProxy, this._entityCollect, this._camera, this._viewPort);
                this._postHUD.diffuseTexture = this._postProcessing.endTexture;
                //this._postHUD.viewPort = this._viewPort ;
                this._postHUD.draw(Egret3DCanvas.context3DProxy);
            } else {
                this._render.draw(time, delay, Egret3DCanvas.context3DProxy, this._entityCollect, this._camera, this._viewPort);
            }

            for (var i: number = 0; i < this._huds.length; ++i) {
                this._huds[i].draw(Egret3DCanvas.context3DProxy);
            }
        
        }

        private updateObject3D(object3d: Object3D, time: number, delay: number) {
            if (object3d) {
                object3d.update(time, delay, this.camera3D)
                for (var i: number = 0; i < object3d.childs.length; ++i) {
                    this.updateObject3D(object3d.childs[i], time, delay);
                }
            }
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