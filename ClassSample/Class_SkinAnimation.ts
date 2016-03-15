module egret3d_dev {
    export class Class_SkinAnimation extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var load: URLLoader = new URLLoader("resource/laohu/Mon_04.esm");
            load.onLoadComplete = (e: URLLoader) => this.onLoad(e, "Mon_04");

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, (e) => this.update(e));
        }

        protected onLoad(e: URLLoader, name: string) {
            if (name == "Mon_04") {
                var mat: ColorMaterial = new ColorMaterial(0xff0000);
                var ge: Geometry = e.data;
                var mesh: Mesh = new Mesh(e.data, mat);

                if (ge.vertexFormat & VertexFormat.VF_SKIN) {
                    mesh.animation = new SkeletonAnimation(ge.skeleton);
                }
                this.view1.addChild3D(mesh);

                var lights: LightGroup = new LightGroup();
                var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
                dirLight.diffuse = 0xff0000ff;
                lights.addLight(dirLight);
                mesh.material.lightGroup = lights;
                this.laohu = mesh;

                var img: HTMLImageElement = <HTMLImageElement>document.getElementById("mon");
                var tex: ImageTexture = new ImageTexture(img);

                mesh.material.diffuseTexture = tex;
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
            if (this.laohu) {
                this.laohu.rotationY++;
            }
        }
    }
}