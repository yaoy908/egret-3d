module egret3d {
    export class Class_Wireframe extends Class_View3D {

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

            var wir: egret3d.Wireframe = new egret3d.Wireframe();
            wir.material.diffuseColor = 0xffff00;
            this.view1.addChild3D(wir);

            var geom: egret3d.Geometry = wir.geometry;

            var width: number = 20;
            var height: number = 20;

            var row: number = 200;
            var col: number = 200;

            for (var i: number = 0; i < row; i++) {
                for (var j: number = 0; j < col; j++) {
                    var index: number = i * col + j;
                    geom.setVerticesForIndex(index, egret3d.VertexFormat.VF_POSITION, [width * j - width * col / 2, 0, height * i - height * row / 2]);

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

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }
    

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}