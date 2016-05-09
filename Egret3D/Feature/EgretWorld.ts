module demo {
    export class EgretWorld{

        private _view: egret3d.View3D;
        private _cameraCtl: egret3d.LookAtController;
        private _cameraZoomer: EgretCameraZoomController;
        private _sceneLayer: egret3d.Object3D;
        private _sceneLoader: EgretSceneLoader;
        private _egret3DCanvas: egret3d.Egret3DCanvas;
        private _loadingUI: LoadingUI;
        private _sceneLoaded: boolean = false;
        private _lastProgress: number = -1;

        private _fps: egret3d.FPSCounter;

        private _lookFromTarget: egret3d.Vector3D;
        private _lookAtTarget: egret3d.Vector3D;

        private _startTime: number = 0;
        private _lastTime: number = 0;


        private static _instance: EgretWorld;

        public static getInstance(): EgretWorld {
            if (EgretWorld._instance == null) {
                EgretWorld._instance = new EgretWorld();
            }
            return EgretWorld._instance;
        }


        constructor() {
            this.initCanvas();
            this.initView();
            this.initCamera();

            this._sceneLayer = new egret3d.Object3D();
            this._sceneLoader = new EgretSceneLoader();
            this._view.addChild3D(this._sceneLayer);

            this._fps = new egret3d.FPSCounter();
            //start
            this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
            
            
        }

        public loadScene(name: string): void {
            this._sceneLoaded = false;
            this._loadingUI = new demo.LoadingUI();
            this._loadingUI.updatePanel(true, 0);
            this._sceneLoader.loadScene(name, this.onSceneLoaded, this);
        }

        private initCanvas(): void {
            this._egret3DCanvas = new egret3d.Egret3DCanvas();
            this._egret3DCanvas.x = 0;
            this._egret3DCanvas.y = 0;
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;
            this._egret3DCanvas.start();
        }


        private initView(): void {
            this._view = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
           
            this._view.backColor = 0x00000000;

            this._egret3DCanvas.addView3D(this._view);
            window.addEventListener("resize", (e: UIEvent) => this.onWindowsResize(e), true);
        }

        private onWindowsResize(e: UIEvent) {
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;

            this._view.width = window.innerWidth;
            this._view.height = window.innerHeight;
        }

        private initCamera(): void {
            this._cameraZoomer = new EgretCameraZoomController(this._view);
            this._lookFromTarget = new egret3d.Vector3D(0, 60, 0);
            this._lookAtTarget = new egret3d.Vector3D();

            this._view.camera3D.y = 60;
            this._cameraCtl = new egret3d.LookAtController(this._view.camera3D, new egret3d.Object3D());
            this._cameraCtl.distance = 100;
        }

        private onSceneLoaded(): void {

            this._sceneLoaded = true;
            this._sceneLayer.addChild(this._sceneLoader.container);
            if (EgretConfig.EnableCameraAnim == false) {
                this._sceneLoader.container.scale = new egret3d.Vector3D(5, 5, 5);
            }
            this._loadingUI.updatePanel(false, 1.0);
            if (EgretConfig.EnableCameraAnim) {
                this._cameraZoomer.addCameraAnims(this._sceneLoader.cameraAnims);
            }

            this._sceneLoader.dispose();
            this._sceneLoader = null;
            

        }


        private updateFrameData(): number {
            var time: number = new Date().getTime();
            if (this._startTime == 0) {
                time = 0;
                this._startTime = new Date().getTime();
            }
            else {
                this._lastTime = time;
                time = new Date().getTime() - this._startTime;
            }

            time /= 17;
            time /= 200;
            return time;
        }

        
        private update(e: egret3d.Event3D) {
            var delta: number = this.updateFrameData();

            if (this._sceneLoaded == false) {
                var progress: number = this._sceneLoader.calcProgress();
                if (this._lastProgress != progress) {
                    this._loadingUI.updatePanel(true, progress);
                    this._lastProgress = progress;
                }
            }
            else {
                this._fps.update();
                this._loadingUI.updateText(this._fps.fps);
                //this._lookFromTarget.setTo(Math.sin(delta) * 60, 60, Math.cos(delta) * 60);
                //this._lookAtTarget.setTo(this._lookFromTarget.x / 2, 50, this._lookFromTarget.z / 2);
                //this._view.camera3D.lookAt(this._lookFromTarget, this._lookAtTarget);
               
                this._cameraCtl.update();
            }
           
        }


    }
}