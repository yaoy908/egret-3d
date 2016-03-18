module egret3d {
    export class Class_PointLight extends Class_View3D {

        private plane: Mesh;
        protected view1: View3D;

        private lights: LightGroup = new LightGroup();

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.view1 = view1;
            var texLoad: URLLoader = new URLLoader("resource/chahu/Plane001.esm");
            texLoad.onLoadComplete = (e) => this.ontextload(e);

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected ontextload(e: URLLoader) {

            var mat: TextureMaterial = new TextureMaterial();
            mat.ambientPower = 1.0;
            var mesh: Mesh = new Mesh(e.data, mat);
            this.plane = mesh;
            this.view1.addChild3D(mesh);
        }


        public update(e: Event3D) {

        }

    }
}