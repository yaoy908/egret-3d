module egret3d_dev {
    export class Class_DirectLight extends Class_View3D {

        private cube: Mesh;
        private mouse3DManager: Mouse3DManager;
        private view1: View3D;
        constructor() {
            super();


            var mat: ColorMaterial = new ColorMaterial(0xff0000);
            //mat.drawMode = DrawMode.LINE_STRIP;
            var geometery: CubeGeometry = new CubeGeometry();
            this.cube = new Mesh(geometery, mat);


            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;

            this.mouse3DManager = new Mouse3DManager(this.view1.camera3D, this.view1);

            this._egret3DCanvas.addView3D(this.view1);

            this.cube.addEventListener(Event3D.MOUSE_DOWN, (code) => { console.log("按下事件"); });
            this.cube.addEventListener(Event3D.MOUSE_CLICK, (code) => { console.log("点击事件"); });
            this.cube.addEventListener(Event3D.MOUSE_UP, (code) => { console.log("松开事件"); });
            this.cube.addEventListener(Event3D.MOUSE_MOVE, (e) => { console.log("鼠标移动"); });

            this.cube.mouseEnable = true;
            this.view1.addChild3D(this.cube);

            var lights: LightGroup = new LightGroup();
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xff0000ff;
            lights.addDirectLight(dirLight);
            this.cube.material.lightGroup = lights;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, (e) => this.update(e));
        }

        public update(e: Event3D) {
            this.mouse3DManager.update(this.view1.entityCollect);
            //this.cube.rotationY += 0.5;
            //this.cube.rotationX += 0.5;

        }

    }
}