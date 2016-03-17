module egret3d {
    export class Class_MouseEvent extends Class_View3D {

        private cube: Mesh;
        //private mouse3DManager: Mouse3DManager;
        private view1: View3D;
        constructor() {
            super();
            var img: HTMLImageElement = <HTMLImageElement>document.getElementById("mon");
            var tex: ImageTexture = new ImageTexture(img);
            var mat: TextureMaterial = new TextureMaterial(tex);
            //var mat: ColorMaterial = new ColorMaterial(0xff0000);
            var geometery: SphereGeometry = new SphereGeometry();
            this.cube = new Mesh(geometery, mat);


            this.cube.mouseEnable = true;
            //this.cube.addEventListener(MouseEvent3D.MOUSE_DOWN, this, this.onMouseDown);
            //this.cube.addEventListener(MouseEvent3D.MOUSE_UP, this, this.onMouseUp);
            //this.cube.addEventListener(MouseEvent3D.MOUSE_CLICK, this, this.onClick);
            //this.cube.addEventListener(MouseEvent3D.MOUSE_MOVE, this, this.onMouseMove);


            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view1);
            this.view1.addChild3D(this.cube);

            var lights: LightGroup = new LightGroup();
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xff0000ff;
            lights.addLight(dirLight);
            this.cube.material.lightGroup = lights;
            var eventManager: EventManager = new EventManager(this._egret3DCanvas);
            eventManager.onInit();
            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this, this.update);
            this._egret3DCanvas.removeEventListener(Event3D.ENTER_FRAME, this, this.update);

        }

        private onMouseDown(code: number): void {
            console.log("OnMouseDown");
        }
        private onMouseUp(code: number): void {
            console.log("onMouseUp");
        }
        private onClick(code: number): void {
            console.log("onClick");
        }
        private onMouseMove(e: MouseEvent): void {
            console.log("onMouseMove");
        }
        public update(e: Event3D) {
            //this.mouse3DManager.update(this.view1.entityCollect);
            this.cube.rotationY = this.cube.rotationY + 0.5;
            this.cube.rotationX = this.cube.rotationX + 0.5;
        }
    }




}