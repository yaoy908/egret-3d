module egret3d_dev {
    export class Class_DirectLight extends Class_View3D {

        private cube: Mesh;
        constructor() {
            super();


            var mat: ColorMaterial = new ColorMaterial(0xff0000);
            //mat.drawMode = DrawMode.LINE_STRIP;
            var geometery: CylinderGeometry = new CylinderGeometry();
            this.cube = new Mesh(geometery, mat);


            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;

            this._egret3DCanvas.addView3D(view1);

            view1.addChild3D(this.cube);

            var lights: LightGroup = new LightGroup();
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xff0000ff;
            lights.addDirectLight(dirLight);
            this.cube.material.lightGroup = lights;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, (e) => this.update(e));
        }

        public update(e: Event3D) {
            console.log(e.time);

            this.cube.rotationY += 0.5;
            this.cube.rotationX += 0.5;

        }

    }
}