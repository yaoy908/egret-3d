module egret3d_dev {
    export class Class_Mesh extends Class_View3D{

        private cube: Mesh;
        constructor() {
            super();

            var mat: ColorMaterial = new ColorMaterial(0xff0000);
            var geometery: CubeGeometry = new CubeGeometry();
            this.cube = new Mesh(geometery, mat);

            var view1: View3D = new View3D(0, 0, 200, 200);
            view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffff0000;
            this._egret3DCanvas.addView3D(view1);

            var view2: View3D = new View3D(0, 200, 200, 200);
            view2.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view2.backColor = 0xff00ff00;
            this._egret3DCanvas.addView3D(view2);

            var view3: View3D = new View3D(200, 0, 200, 200);
            view3.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view3.backColor = 0xff0000ff;
            this._egret3DCanvas.addView3D(view3);

            var view4: View3D = new View3D(200,200, 200, 200);
            view4.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view4.backColor = 0xffff00ff;
            this._egret3DCanvas.addView3D(view4);

            view1.addChild3D(this.cube);
            view2.addChild3D(this.cube);
            view3.addChild3D(this.cube);
            view4.addChild3D(this.cube);

            this._egret3DCanvas.start();

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, (e) => this.update(e));
        }

        public update(e: Event3D) {
            console.log(e.time);

            this.cube.rotationY += 0.5;
        }

    }
}