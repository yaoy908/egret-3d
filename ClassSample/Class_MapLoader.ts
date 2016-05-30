module egret3d {
    export class Class_MapLoader extends Class_View3D {

        protected view1: View3D;
        private _mapLoader: EgretMapLoader;
        protected cameraCrl: LookAtController;
        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);
            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            //加载地图
            this._mapLoader = new EgretMapLoader();
            this._mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onSceneLoaded, this);
            this._mapLoader.loadScene("TowerDefense");
        }

        //加载完毕
        private onSceneLoaded(e: LoaderEvent3D): void {
            this._mapLoader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onSceneLoaded, this);
            this.view1.addChild3D(this._mapLoader.container);
            var loadtex: URLLoader = new URLLoader("resource/matcap/12719-ambientocclusion.jpg");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadMatCapTexture, this);
        }

        protected onLoadMatCapTexture(e: LoaderEvent3D) {
            //e.loader["mat"].matcapTexture = e.loader.data;
            //var meshList: Mesh[] = this._mapLoader.meshMap.getValues();
            //for (var i: number = 0; i < meshList.length; i++) {
            //    meshList[i].material.matcapTexture = e.loader.data; 
            //}
        }

        //获取进度信息
        private update(e: Event3D) {
            console.log("加载：" + this._mapLoader.calcProgress);
            this.cameraCrl.update();
        }

    }
} 