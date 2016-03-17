module egret3d {
    export class Class_PointLight extends Class_View3D{

        private plane: Mesh;
        protected view1: View3D;

        private lights: LightGroup = new LightGroup();
        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth , window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.view1 = view1;
            var texLoad: URLLoader = new URLLoader("resource/chahu/Plane001.esm");
            texLoad.onLoadComplete = (e) => this.ontextload(e);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var po: PointLight = new PointLight(0xffffff);
            po.y = 200;
            po.z = 200;
            this.lights.addLight(po);

            var pointMesh: Mesh = new Mesh(new SphereGeometry(false, 15, 25, 25), new ColorMaterial());
            pointMesh.y = 200;
            pointMesh.z = 200;
            this.view1.addChild3D(pointMesh);

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, (e) => this.update(e));
        }

        protected ontextload(e: URLLoader) {

            var mat: TextureMaterial = new TextureMaterial();
            mat.ambientPower = 0.2;
            mat.lightGroup = this.lights; 
            //mat.drawMode = DrawMode.POINTS; 
            var mesh: Mesh = new Mesh(e.data, mat);
            mesh.scale = new Vector3D(5.0,5.0,5.0);
            this.plane = mesh;
            this.view1.addChild3D(mesh);
        }


        public update(e: Event3D) {
            this.cameraCtl.update();
        }

    }
}