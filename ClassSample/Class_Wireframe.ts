module egret3d {
    export class Class_Wireframe extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();
        private cubes: Array<Mesh> = new Array<Mesh>();

        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var cubeVer = [
                -100, 100, -100, 1.0, 0.0, 0.0, 1.0,       // 0
                100, 100, -100, 0.0, 1.0, 0.0, 1.0,     // 1
                -100, -100, -100, 0.0, 0.0, 1.0, 1.0,     // 2
                100, -100, -100, 1.0, 0.0, 0.0, 1.0,     // 3

                -100, 100, 100, 0.0, 1.0, 0.0, 1.0,     // 4
                100, 100, 100, 0.0, 0.0, 1.0, 1.0,         // 5
                -100, -100, 100, 1.0, 0.0, 0.0, 1.0,   // 6
                100, -100, 100, 0.0, 1.0, 0.0, 1.0,     // 7
            ];

            var cubeLineInx = [
                0, 1, 1, 3,    // 前
                0, 2, 2, 3,

                4, 6, 6, 7,    // 后
                4, 5, 5, 7,

                0, 4, 0, 1,    // 上
                4, 5, 1, 5,

                2, 3, 3, 7,    // 下    
                6, 7, 2, 6,

                0, 4, 4, 6,    // 左
                0, 2, 6, 2,

                3, 7, 1, 3,    // 右
                1, 5, 5, 7
            ];

            var geom: Geometry = new Geometry();
            geom.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_COLOR;
            geom.verticesData = cubeVer;
            geom.indexData = cubeLineInx;

            var wireframe: Wireframe = new Wireframe(geom);
            this.view1.addChild3D(wireframe);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}