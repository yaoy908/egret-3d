module egret3d {
    export class Class_Geometry extends Class_View3D {

        private cube: Mesh;
        private ctl: HoverController;
        constructor() {
            super();
            var img: HTMLImageElement = <HTMLImageElement>document.getElementById("mon");
            var tex: ImageTexture = new ImageTexture(img);
            var mat: TextureMaterial = new TextureMaterial(tex);
            //var mat: ColorMaterial = new ColorMaterial(0xff0000);
            //var geometery: CubeGeometry = new CubeGeometry();
            var geometery: SphereGeometry = new SphereGeometry(10,12,25);
            this.cube = new Mesh(geometery, mat);
            mat.gloss = 1.0

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0;
            this._egret3DCanvas.addView3D(view1);
            view1.addChild3D(this.cube);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            var lights: LightGroup = new LightGroup();
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xffffffff;
            lights.addLight(dirLight);
            this.cube.material.lightGroup = lights;

            this.ctl = new HoverController(view1.camera3D,null ,45,5000);

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

        }

        public update(e: Event3D) {
            this.ctl.update();
            this.cube.rotationY += 0.5;
          //  this.cube.rotationX += 0.5;
        }

    }
}