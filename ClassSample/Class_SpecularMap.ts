module egret3d {
    export class Class_SpecularMap extends Class_View3D {

        private view1: View3D;

        private ctl; HoverController;
        protected plane: Mesh;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;
            this.ctl = new HoverController(view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this, this.update);

            this.plane = new Mesh(new PlaneGeometry(), new TextureMaterial());
            this.view1.addChild3D(this.plane);
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}