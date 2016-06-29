module egret3d {
    export class MainEnter {

        protected _egret3DCanvas: Egret3DCanvas;
        protected _mainView: View3D;
        protected cameraCtl: LookAtController;

        protected _mapLoader: MapLoader;

        protected _Bone001: Object3D;
        constructor() {
            this._egret3DCanvas = new Egret3DCanvas();
            this._egret3DCanvas.x = 0;
            this._egret3DCanvas.y = 0;
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;
            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._mainView = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this._mainView.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            this._mainView.backColor = 0xff7f7f00;

            this._egret3DCanvas.addView3D(this._mainView);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this._mainView.backImage = tex;

            this.cameraCtl = new LookAtController(this._mainView.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var cube: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial());
            this._mainView.addChild3D(cube);

            Input.addEventListener(Event3D.RESIZE, this.onResize, this);
            this._mainView.addChild3D(this.createWireframe(200, 200, 10, 10));

            this._mapLoader = new MapLoader("zhanchuan", "MapConfig.xml", "resource/zhangsheng/");
            this._mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMapLoad, this);
            this._mainView.addChild3D(this._mapLoader.container);
        }

        protected onMapLoad(e: LoaderEvent3D) {
            this._Bone001 = this._mapLoader.container.findObject3D("Bone001");
            this._Bone001.proAnimation.play();
        }

        protected update(e: Event3D) {
            this.cameraCtl.update();
        }

        protected onResize(e: Event3D) {
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;

            this._mainView.width = this._egret3DCanvas.width;
            this._mainView.height = this._egret3DCanvas.height;
        }

        protected createWireframe(width: number, height: number, row: number, col: number):Wireframe {
            var wir: egret3d.Wireframe = new egret3d.Wireframe();
            wir.material.diffuseColor = 0xffffff;
            wir.material.ambientColor = 0xffffff;
            var geom: egret3d.Geometry = wir.geometry;

            var width: number = width;
            var height: number = height;

            var row: number = row;
            var col: number = col;

            var point_row: number = row + 1;
            var point_col: number = col + 1;

            var vb: Array<number> = new Array<number>();
            var ib: Array<number> = new Array<number>();

            for (var i: number = 0; i < point_row; ++i) {
                vb.push(-width * col / 2, 0, height * i - height * row / 2);
                vb.push(width * col / 2, 0, height * i - height * row / 2);
            }

            for (var i: number = 0; i < point_col; ++i) {
                vb.push(width * i - width * col / 2, 0, height * col / 2);
                vb.push(width * i - width * col / 2, 0, -height * col / 2);
            }

            for (var i: number = 0; i < vb.length / 3; ++i) {
                ib.push(i);
            }

            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);
            geom.setVertexIndices(0, ib);
            return wir;
        }
    }
}