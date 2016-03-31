module egret3d {
    export class Class_Import extends Class_View3D {

        private box: Mesh;
        private view1: View3D;
        private lights: LightGroup;
        private ctl; HoverController;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;


            this.lights = new LightGroup();
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xffffffff;
            this.lights.addLight(dirLight);


            var load: URLLoader = new URLLoader("resource/chahu/Teapot001.esm");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);

            var loa1d: URLLoader = new URLLoader("resource/chahu/Plane001.esm");
            loa1d.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);

            this.ctl = new HoverController(view1.camera3D);

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected onLoad(e: LoaderEvent3D) {
            var mat: ColorMaterial = new ColorMaterial(0xcccccc);
            var mesh: Mesh = new Mesh(e.loader.data, mat);
            this.view1.addChild3D(mesh);
            mesh.material.lightGroup = this.lights;
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}