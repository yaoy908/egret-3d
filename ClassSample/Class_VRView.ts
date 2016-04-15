module egret3d {
    export class Class_VRView extends Class_View3D {

        private plane: Mesh;
        protected view1: View3D;

        protected cameraCrl: LookAtController;
        constructor() {
            super();
            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new VRView3D(0, 0, 800, 400);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            var texLoad: URLLoader = new URLLoader("resource/chahu\\Plane001.esm");
            texLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.ontextload, this);


            var load: URLLoader = new URLLoader("resource/lt11/body_12.esm");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);

        }

        protected ontextload(e: LoaderEvent3D) {

            var mesh: Mesh = new Mesh(e.loader.data, new TextureMaterial());
            this.plane = mesh;

            var m: Mesh = mesh.clone();

            this.view1.addChild3D(mesh);
        }

        protected onLoad(e: LoaderEvent3D) {
            var mat: TextureMaterial = new TextureMaterial();
            var ge: Geometry = e.loader.data;
            var mesh: Mesh = new Mesh(ge, mat);
            this.view1.addChild3D(mesh);

            var loadtex: URLLoader = new URLLoader("resource/lt11/hero_12.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;
            var load: URLLoader = new URLLoader("resource/lt11/body_12.eam");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onAnimation, this);
            load["mesh"] = mesh;
        }

        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        protected onAnimation(e: LoaderEvent3D) {
            var clip: SkeletonAnimationClip = e.loader.data;
            clip.animationName = name;
            e.loader["mesh"].animation.addSkeletonAnimationClip(clip);
            e.loader["mesh"].animation.play(name);
        }

        public update(e: Event3D) {
            this.cameraCrl.update();
        }

    }
} 