module egret3d {
    export class Class_SkinAnimationShadow extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.far = 1500 ;
            view1.camera3D.near = 500;
            view1.camera3D.cameraType = CameraType.orthogonal; 
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var load: URLLoader = new URLLoader("resource/laohu/Mon_04.esm");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);


            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.0, -0.6, 0.2));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            //var po: PointLight = new PointLight(0xffffff);
            //po.y = 200;
            //po.z = 200;
            //this.lights.addLight(po);

            //var spo: SpotLight = new SpotLight(0xffffff);
            //spo.rotationX = 90;
            //spo.y = 200;
            //this.lights.addLight(spo);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            //----------------debug---------------
            var debugHUD: HUD = new HUD(0, 0, 512, 512);
            this.view1.addHUD(debugHUD);
            debugHUD.diffuseTexture = this.view1.render.renderTexture;
            //----------------debug---------------

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected mat: TextureMaterial;
        protected onLoad(e:LoaderEvent3D) {
            var img: HTMLImageElement = <HTMLImageElement>document.getElementById("mon");
            var tex: ImageTexture = new ImageTexture(img);

            var mat: TextureMaterial = new TextureMaterial();
            mat.gloss = 10.0;
            mat.ambientColor = 0xf8f8f8;
            mat.specularLevel = 1.0;
            this.mat = mat;
            var ge: Geometry = e.loader.data;
            var mesh: Mesh = new Mesh(ge, mat);

            this.view1.addChild3D(mesh);

            mesh.material.lightGroup = this.lights;
            mesh.material.castShadow = true;

            this.laohu = mesh;

            var loadtex: URLLoader = new URLLoader("resource/laohu/Mon_04.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;
            var load: URLLoader = new URLLoader("resource/laohu/Bonezero.eam");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onAnimation, this);
            load["mesh"] = mesh;
            this.cameraCtl.lookAtObject = mesh;

        }

        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        protected onAnimation(e: LoaderEvent3D) {
            var clip: SkeletonAnimationClip = e.loader.data;
            clip.animationName = "xxxx";
            var mesh: Mesh = e.loader["mesh"];
            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip);
            mesh.animation.skeletonAnimationController.play(clip.animationName);

            mesh = new Mesh(new CubeGeometry(20, 20, 20), null);
            this.view1.addChild3D(mesh);

            //e.loader["mesh"].animation.addSkeletonAnimationClip(clip);
            //e.loader["mesh"].animation.play(name);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}