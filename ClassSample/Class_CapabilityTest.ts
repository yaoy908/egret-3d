module egret3d {
    export class Class_CapabilityTest extends Class_View3D {

        private view1: View3D;

        private cameraCtl: LookAtController;

        private mesh: Mesh;
        private meshList: Array<Mesh> = [];
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            var load: URLLoader = new URLLoader("resource/modle/sunce/body_6.esm");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEsm, this);


            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private onEsm(e: LoaderEvent3D) {
            var mesh: Mesh = new Mesh(e.loader.data, new TextureMaterial());
            //this.view1.addChild3D(mesh);

            var load: URLLoader = new URLLoader("resource/modle/sunce/hero_06.png");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onTexture, this);
            load["mat"] = mesh.material;

            load = new URLLoader("resource/modle/sunce/attack1.eam");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEam, this);
            load["mesh"] = mesh;
            load["name"] = "attack1";

            load = new URLLoader("resource/modle/sunce/idle_1.eam");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEam, this);
            load["mesh"] = mesh;
            load["name"] = "idle_1";

            load = new URLLoader("resource/modle/sunce/run_1.eam");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEam, this);
            load["mesh"] = mesh;
            load["name"] = "run_1";
            this.taskCount = 3;
            this.mesh = mesh;
        }

        private onTexture(e: LoaderEvent3D) {
            var mat: TextureMaterial = e.loader["mat"];
            mat.diffuseTexture = e.loader.data;
        }

        private taskCount: number = 0;
        private onEam(e: LoaderEvent3D) {
            var mesh: Mesh = e.loader["mesh"];
            var anima: SkeletonAnimationClip = e.loader.data;
            anima.animationName = e.loader["name"];

            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(anima);
            //mesh.animation.play(anima.animationName);
            this.taskCount--;

            if (this.taskCount <= 0) {
                this.onComplete();
            }
        }
        
        private onComplete() {

            var width: number = 200;
            var height: number = 300;

            for (var i: number = 0; i < 100; ++i) {

                var row: number = i / 10;
                var col: number = i % 10;


                var mesh: Mesh = this.mesh.clone();
                this.meshList.push(mesh);
                this.view1.addChild3D(mesh);
                mesh.x = row * height - 10 * height / 2;
                mesh.z = col * width - 10 * width / 2;

                var idx: number = Math.random() * 3;
                idx = Math.floor(idx);
                mesh.animation.play(mesh.animation.skeletonAnimationController.animStateNames[idx]);
            }
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}