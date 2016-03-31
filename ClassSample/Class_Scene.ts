module egret3d {
    export class Class_Scene extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var load: URLLoader = new URLLoader("resource/scene/foliage/FOL_Foliage_01.esm");

            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);

            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected mat: TextureMaterial;
        protected onLoad(e: LoaderEvent3D) {

            var mat: TextureMaterial = new TextureMaterial();
            mat.shininess = 0.1;
            mat.specularColor = 0; 
            mat.ambientColor = 0xffffff;
            this.mat = mat;
            var ge: Geometry = e.loader.data;
            var mesh: Mesh = new Mesh(ge, mat);

            if (ge.vertexFormat & VertexFormat.VF_SKIN) {
                mesh.animation = new SkeletonAnimation(ge.skeleton);
            }
            this.view1.addChild3D(mesh);

            mesh.material.lightGroup = this.lights;
            this.laohu = mesh;

            var loadtex: URLLoader = new URLLoader("resource/scene/foliage/Foliage_01.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;
        }

        protected onLoadTexture(e:LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}