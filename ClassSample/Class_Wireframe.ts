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


            var width: number = 20;
            var height: number = 20;

            var row: number = 20;
            var col: number = 20;

            var geom: egret3d.Geometry = new egret3d.Geometry();
            geom.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0;
            geom.verticesData = new Array<number>();
            geom.indexData = new Array<number>();


            for (var i: number = 0; i < row; i++) {
                for (var j: number = 0; j < col; j++) {
                    var index: number = i * col + j;
                    index = index * geom.vertexAttLength;
                    geom.verticesData[index + 0] = width * j - width * col / 2;
                    geom.verticesData[index + 1] = 0;
                    geom.verticesData[index + 2] = height * i - height * row / 2;
                    geom.verticesData[index + 3] = 0;
                    geom.verticesData[index + 4] = 0;
                    geom.verticesData[index + 5] = 0;
                    geom.verticesData[index + 6] = 0;
                    geom.verticesData[index + 7] = 0;
                    geom.verticesData[index + 8] = 0;
                    geom.verticesData[index + 9] = 1;
                    geom.verticesData[index + 10] = 0;
                    geom.verticesData[index + 11] = 0;

                    if (j + 1 < col) {
                        geom.indexData.push(i * col + j);
                        geom.indexData.push(i * col + j + 1);
                    }

                    if (i + 1 < row) {
                        geom.indexData.push(i * col + j);
                        geom.indexData.push((i + 1) * col + j);
                    }
                }
            }


            var wir: egret3d.Wireframe = new egret3d.Wireframe(geom);

            this.view1.addChild3D(wir);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}