module egret3d {
    export class Class_WaveWater  extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected lights: LightGroup = new LightGroup();
        protected matPlane: TextureMaterial;

        private terrainMethod: TerrainARGBMethod;
        constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view1);
            this.ctl = new HoverController(this.view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.preloadComplete();
        }

        private preloadComplete() {

            var cubeTexture: CubeTexture = CubeTexture.createCubeTexture(
                <HTMLImageElement>document.getElementById("f"),
                <HTMLImageElement>document.getElementById("b"),
                <HTMLImageElement>document.getElementById("l"),
                <HTMLImageElement>document.getElementById("r"),
                <HTMLImageElement>document.getElementById("u"),
                <HTMLImageElement>document.getElementById("d")
            );

            var waterWaveMethod: WaterWaveMethod = new WaterWaveMethod();

            this.matPlane = new TextureMaterial();
            this.matPlane.repeat = true;
            this.matPlane.diffusePass.addMethod(waterWaveMethod);
            //this.matPlane.diffusePass.addMethod(waterNormal);
            //this.matPlane.diffusePass.addMethod(env);

            //waterNormal.normalTextureA = CheckerboardTexture.texture;
            //waterNormal.normalTextureB = CheckerboardTexture.texture;
            //env.environmentTexture = cubeTexture;

            var cmesh: Mesh = new Mesh(new SphereGeometry(5000, 30, 30), new CubeTextureMaterial(cubeTexture));
            cmesh.material.cullMode = ContextConfig.FRONT;
            this.view1.addChild3D(cmesh);
            cmesh.y = 200.0

            var mesh: Mesh = new Mesh(new PlaneGeometry(10000, 10000, 120, 80, 4.0, 4.0), this.matPlane);
            this.view1.addChild3D(mesh);
            //this.matPlane.ambientColor = 0xffffff;
            //this.matPlane.drawMode = DrawMode.LINES;

            //var lights: LightGroup = new LightGroup();
            //var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            //lights.addLight(dirLight);

            var loadtex: URLLoader = new URLLoader("resource/effect/water/ocean.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadDiffuse, this);
            loadtex["mat"] = this.matPlane;

            //var loadtex: URLLoader = new URLLoader("resource/effect/water/waterNormal.png");
            //loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadNormal_0, this);
            //loadtex["mat"] = waterNormal;
            
            //var loadtex: URLLoader = new URLLoader("resource/effect/water/Waves_backface_normal.jpg");
            //loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadNormal_1, this);
            //loadtex["mat"] = waterNormal;

        }

        protected onLoadDiffuse(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        //protected onLoadNormal_0(e: LoaderEvent3D) {
        //    e.loader["mat"].normalTextureA = e.loader.data;
        //}

        //protected onLoadNormal_1(e: LoaderEvent3D) {
        //    e.loader["mat"].normalTextureB = e.loader.data;
        //}

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}