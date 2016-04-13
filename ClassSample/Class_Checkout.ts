module egret3d {
    export class Class_Checkout extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;

        private meshList: Array<Mesh> = new Array<Mesh>();
        private stats: Stats = new Stats();

        constructor() {
            super();
            

            this.stats.domElement.style.position = 'absolute'; //绝对坐标  
            this.stats.domElement.style.left = '0px';// (0,0)px,左上角  
            this.stats.domElement.style.top = '0px';


            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff0f7fff;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var load: URLLoader = new URLLoader("resource/xiaoqiao/body_27.esm");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);

            //var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            //dirLight.diffuse = 0xffffff;
            //this.lights.addLight(dirLight);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);


            var e = document.getElementById("main");
            e.appendChild(this.stats.domElement);
        }

        protected mat: TextureMaterial;
        protected onLoad(e: LoaderEvent3D) {

            var mat: TextureMaterial = new TextureMaterial();
            mat.shininess = 10.0;
            mat.ambientColor = 0xffffff;
            this.mat = mat;
            var ge: Geometry = e.loader.data;
            var mesh: Mesh = new Mesh(ge, mat);

            this.view1.addChild3D(mesh);

            mesh.material.lightGroup = this.lights;
            this.laohu = mesh;

            var loadtex: URLLoader = new URLLoader("resource/xiaoqiao/hero_27.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;
            var load: URLLoader = new URLLoader("resource/xiaoqiao/body_27.eam");
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

            var rol: number = 10;
            var col: number = 10;
            var crol: number = 0;
            var ccol: number = 0;

            for (var i: number = 0; i < rol * col; ++i) {

                ccol = i % col;
                crol = Math.floor(i / col);

                this.meshList.push(e.loader["mesh"].clone());
                this.view1.addChild3D(this.meshList[i]);
                this.meshList[i].animation.play(name);

                this.meshList[i].x = crol * 100 - rol * 100 / 2;
                this.meshList[i].z = ccol * 100 - col * 100 / 2;
            }
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
            this.stats.update();
        }
    }
}