module egret3d {
    export class Class_LoadRoler extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;
        private _roleLoader: MapLoader;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._roleLoader = new MapLoader("zhanshen", "MapConfig.xml", "resource/");
            this._roleLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadRoler, this);
            this.view1.addChild3D(this._roleLoader.container);
          
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private onLoadRoler(e: LoaderEvent3D) {

            var roler: Mesh = <Mesh>this._roleLoader.container.findObject3D( "ZS_20160713" );
           // var loadtex: URLLoader = new URLLoader("resource/matcap/screenshot_17.jpg");
           // loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadMatCapTexture, this);
            // loadtex["mat"] = roler.material ;

        }

        private onLoadMatCapTexture(e: LoaderEvent3D) {
            var mat: TextureMaterial = e.loader["mat"];
            mat.matcapTexture = e.loader.data;
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}