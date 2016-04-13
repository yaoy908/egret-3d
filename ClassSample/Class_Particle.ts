module egret3d {
    export class Class_Particle extends Class_View3D {

        private plane: Mesh;
        protected view1: View3D;

        protected cameraCrl: LookAtController;
        constructor() {
            super();
            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            var mat: TextureMaterial = new TextureMaterial();

            var particle: ParticleSystem = new ParticleSystem(new CubeGeometry(100, 100, 0), mat, 100);

            this.view1.addChild3D(particle);


            this.view1.addChild3D(new Mesh(new PlaneGeometry(1000, 1000), new TextureMaterial()));

            var loadtex: URLLoader = new URLLoader("resource/effect/star_0004.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;
            mat.blendMode = BlendMode.ADD;
        }

        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;

        }

        public update(e: Event3D) {
            this.cameraCrl.update();
        }

    }
} 