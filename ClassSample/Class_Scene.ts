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
            load.onLoadComplete = (e: URLLoader) => this.onLoad(e, "FOL_Foliage_01");


            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            var po: PointLight = new PointLight(0xffffff);
            po.y = 200;
            po.z = 200;
            this.lights.addLight(po);

            var spo: SpotLight = new SpotLight(0xffffff);
            spo.rotationX = 90;
            spo.y = 200;
            //this.lights.addLight(spo);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected mat: TextureMaterial;
        protected onLoad(e: URLLoader, name: string) {
            if (name == "FOL_Foliage_01") {

                var mat: TextureMaterial = new TextureMaterial();
                mat.shininess = 20.0;
                mat.ambientColor = 0xffffff;
                mat.ambientPower = 0.5;
                this.mat = mat;
                var ge: Geometry = e.data;
                var mesh: Mesh = new Mesh(e.data, mat);

                if (ge.vertexFormat & VertexFormat.VF_SKIN) {
                    mesh.animation = new SkeletonAnimation(ge.skeleton);
                }
                this.view1.addChild3D(mesh);

                mesh.material.lightGroup = this.lights;
                this.laohu = mesh;

                var loadtex: URLLoader = new URLLoader("resource/scene/foliage/Foliage_01.png");
                loadtex.onLoadComplete = (e: URLLoader) => this.onLoadTexture(e, mat, "Mon_04");
            }
        }

        protected onLoadTexture(e: URLLoader, mat: TextureMaterial, name: string) {
            mat.diffuseTexture = e.data;
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}