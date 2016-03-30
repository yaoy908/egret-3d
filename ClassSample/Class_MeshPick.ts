module egret3d {
    export class Class_MeshPick extends Class_View3D {

        private cube: Mesh;
        private cube1: Mesh;
        protected cameraCtl: LookAtController;
        constructor() {
            super();

            var mat: ColorMaterial = new ColorMaterial(0xffff0000);
            var geometery: CubeGeometry = new CubeGeometry();
            this.cube = new Mesh(geometery, mat);


            var mat: ColorMaterial = new ColorMaterial(0xffffff00);
            this.cube1 = new Mesh(geometery, mat);


            var view1: View3D = new View3D(0, 0, 800, 600);
            view1.camera3D.lookAt(new Vector3D(0, 0, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 100;

            view1.addChild3D(this.cube);
            view1.addChild3D(this.cube1);
            this.cube1.z = 100;

            this._egret3DCanvas.start();

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.cube.enablePick = true;
            this.cube1.enablePick = true;

            this.cube.addEventListener(MouseEvent3D.MOUSE_CLICK, (e) => this.onClick(e, this.cube), this);
            this.cube1.addEventListener(MouseEvent3D.MOUSE_CLICK, (e) => this.onClick(e, this.cube1), this);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }

        protected onClick(e: MouseEvent3D, mesh: Mesh) {
            if (mesh == this.cube) {
                console.log("onclick  cube 1");
            }
            else {
                console.log("onclick  cube 2");
            }
        }

    }
}