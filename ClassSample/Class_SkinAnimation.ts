module egret3d {
    export class Class_SkinAnimation extends Class_View3D {

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

            var load: URLLoader = new URLLoader("resource/laohu/Mon_04.esm");
            load.onLoadComplete = (e: URLLoader) => this.onLoad(e, "Mon_04");




            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, (e) => this.update(e));
        }

        protected ontextload(e: URLLoader, mat: TextureMaterial) {
            mat.diffuseTexture = e.data;
        }

        protected onLoad(e: URLLoader, name: string) {
            if (name == "Mon_04") {
                var img: HTMLImageElement = <HTMLImageElement>document.getElementById("mon");
                var tex: ImageTexture = new ImageTexture(img);

                var mat: TextureMaterial = new TextureMaterial(null);
                mat.shininess = 20.0;
                mat.ambientColor = 0xffffff;
                mat.ambientPower = 0.5;

                var ge: Geometry = e.data;
                var mesh: Mesh = new Mesh(e.data, mat);

                var texLoad: URLLoader = new URLLoader("resource/dx_logo.dds");
                texLoad.onLoadComplete = (e) => this.ontextload(e, mat);


                if (ge.vertexFormat & VertexFormat.VF_SKIN) {
                    mesh.animation = new SkeletonAnimation(ge.skeleton);
                }
                this.view1.addChild3D(mesh);

                mesh.material.lightGroup = this.lights;
                this.laohu = mesh;


                var load: URLLoader = new URLLoader("resource/laohu/Bonezero.eam");
                load.onLoadComplete = (e: URLLoader) => this.onAnimation(e, "Bonezero", mesh);
            } 
        }

        protected onAnimation(e: URLLoader, name: string, mesh: Mesh) {
            var clip: SkeletonAnimationClip = e.data;
            clip.animationName = name;
            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip);
            mesh.animation.skeletonAnimationController.play(name);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}