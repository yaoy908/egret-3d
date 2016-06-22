module egret3d {
    export class Class_NewScene extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        private node: Object3D;

        private xielong: Mesh;
        private binglong: Mesh;
        private Dummy001: Object3D;
        private mapLoader: MapLoader;
        protected lights: LightGroup = new LightGroup();

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, 1105, 554);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;
            view1.camera3D.far = 1000000;

            var d: DirectLight = new DirectLight(new Vector3D(0.0, 1.0, 0.0));
            d.ambient = 0x32327D;
            this.lights.addLight(d);


            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 8000;
            this.cameraCtl.rotationX = 60;

            var wir: egret3d.Wireframe = new egret3d.Wireframe();
            wir.material.diffuseColor = 0xffffff;
            wir.material.ambientColor = 0xffffff;
            //this.view1.addChild3D(wir);

            var geom: egret3d.Geometry = wir.geometry;

            var width: number = 200;
            var height: number = 200;

            var row: number = 10;
            var col: number = 10;

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

            //var box: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial());
            //this.view1.addChild3D(box);

            //var m: Mesh = new Mesh(new PlaneGeometry(), new TextureMaterial());
            //this.view1.addChild3D(m);
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            //var load: URLLoader = new URLLoader("resource/laohu/body_12.esm");
            //load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);


            //this._line[0] = this.buildSemicircleLien(egret3d.Vector3D.X_AXIS, 80, 25, 180, 180, 0xffff00);
            //this.view1.addChild3D(this._line[0]);
            //this._line[1] = this.buildSemicircleLien(egret3d.Vector3D.Y_AXIS, 80, 25, 180, 180, 0xffffffff);
            //this.view1.addChild3D(this._line[1]);
            //this._line[2] = this.buildSemicircleLien(egret3d.Vector3D.Z_AXIS, 80, 25, 180, 270, 0xffffffff);
            //this.view1.addChild3D(this._line[2]);

            //var load: URLLoader = new URLLoader("resource/scene/main/MapConfig.xml");
            //load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onXMLLoad, this);
            var tar: Vector3D = new Vector3D();
            this.view1.camera3D.object3DToScreenRay(new Vector3D(0, 0, 0), tar);
            this.mapLoader = new MapLoader("main");

            this.view1.addChild3D(this.mapLoader.container);
            this.node = this.mapLoader.container;

            this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.OnMapLoad, this);

            Input.addEventListener(KeyEvent3D.KEY_DOWN, this.onKeyDown_Test, this);
        }

        private onKeyDown_Test(e: KeyEvent3D): void {
            if (e.keyCode == KeyCode.Key_Enter) {
                this.xielong = <Mesh>this.node.findObject3D("Xielong_boss");
                this.binglong = <Mesh>this.node.findObject3D("binglong");
                this.xielong.enableCulling = false;
                this.binglong.enableCulling = false;
                this.xielong.animation.play("Xielong_boss_guochang.eam");
                this.binglong.animation.play("binglong_guochang.eam");
                for (var i: number = 0; i < this.mapLoader.propertyAnims.length; ++i) {
                    this.mapLoader.propertyAnims[i].timePosition = 0;
                    this.mapLoader.propertyAnims[i].play();
                }
            }
            else if (e.keyCode == KeyCode.Key_1) {
                this.box1.visible = !this.box1.visible;

                var camrea: egret3d.Camera3D;

                camrea = this.view1.camera3D;

                this.cameraCtl.target = this.view1.camera3D = this.oldCamrea;

                this.oldCamrea = camrea;
            }
            else if (e.keyCode == KeyCode.Key_P) {
                this.isUpdate = !this.isUpdate;

                if (this.isUpdate == true) {
                    this.xielong.animation.speed = 1;
                    this.binglong.animation.speed = 1;
                }
                else {
                    this.xielong.animation.speed = 0;
                    this.binglong.animation.speed = 0;
                }
            }
        }

        private box1: egret3d.Mesh;
        private oldCamrea: egret3d.Camera3D;
        private isUpdate: boolean = true;
        private OnMapLoad(e: LoaderEvent3D) {
            var camrea: Camera3D = <Camera3D>this.node.findObject3D("剧情摄像机");
            //var camrea: Camera3D = <Camera3D>this.node.findObject3D("Main Camera");
            camrea.far = 1000000;
            camrea.aspectRatio = this.view1.width / this.view1.height;
            camrea.updateViewport(this.view1.x, this.view1.y, this.view1.width, this.view1.height);

            var box111: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 100), new egret3d.ColorMaterial(0xff0000));
            box111.z = 100;
            this.box1 = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 200), new egret3d.ColorMaterial(0x00ff00));
            this.box1.addChild(box111);
            this.box1.material.ambientColor = 0xffffff;
            camrea.addChild(this.box1);

            //this.xielong = <Mesh>this.node.findObject3D("Xielong_boss");
            //this.binglong = <Mesh>this.node.findObject3D("binglong");
            //this.xielong.animation.play("Xielong_boss_guochang.eam");
            //this.binglong.animation.play("binglong_guochang.eam");
            //for (var i: number = 0; i < this.mapLoader.propertyAnims.length; ++i) {
            //    this.mapLoader.propertyAnims[i].play();
            //}

            //this.oldCamrea = this.view1.camera3D;
            //this.cameraCtl.target = this.view1.camera3D = camrea;


            this.oldCamrea = camrea;
        }

        private _line: Array<egret3d.Wireframe> = new Array<egret3d.Wireframe>();

        protected onLoad(e: LoaderEvent3D) {
            var m: Mesh = new Mesh(e.loader.data, new TextureMaterial());
            this.view1.addChild3D(m);
        }

        private a: number = 0;
        public update(e: Event3D) {

            if (this.box1 && this.box1.visible) {
                this.cameraCtl.update();
            }
            if (!this.isUpdate) {
                return;
            }

            //
            //if (this.xielong) {
            //    this.a++;
            //    this.view1.camera3D.rotationY++;
            //}

            //if (this.xielong) {
            //    this.xielong.animation.update(e.time, e.delay, this.xielong.geometry);
            //}

            //if (this.binglong) {
            //    this.binglong.animation.update(e.time, e.delay, this.binglong.geometry);
            //}

            for (var i: number = 0; i < this.mapLoader.propertyAnims.length; ++i) {
                this.mapLoader.propertyAnims[i].update(e.delay);
            }
        }
    }
}