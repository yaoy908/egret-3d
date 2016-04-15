module egret3d {
    export class Class_QuadTree extends Class_View3D {

        private view1: View3D;
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



            var cubeVer = [
                -20, 20, -20, 1.0, 0.0, 0.0, 1.0,       // 0
                20, 20, -20, 0.0, 1.0, 0.0, 1.0,        // 1
                -20, -20, -20, 0.0, 0.0, 1.0, 1.0,      // 2
                20, -20, -20, 1.0, 0.0, 0.0, 1.0,       // 3

                -20, 20, 20, 0.0, 1.0, 0.0, 1.0,        // 4
                20, 20, 20, 0.0, 0.0, 1.0, 1.0,         // 5
                -20, -20, 20, 1.0, 0.0, 0.0, 1.0,       // 6
                20, -20, 20, 0.0, 1.0, 0.0, 1.0,        // 7
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

            var position: Vector3D = new Vector3D();

            var wireframe: Wireframe;

            for (var i: number = 0; i < 100; i++) {
                wireframe = new Wireframe(geom);
                position.setTo((Math.random() - 0.5) * 2000, 0, (Math.random() - 0.5) * 2000);
                wireframe.position = position;
                this.view1.addChild3D(wireframe);
            }


            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.view1.scene.createQuadTree();

        }

        public update(e: Event3D) {
            this.cameraCtl.update();

        }
    }
}