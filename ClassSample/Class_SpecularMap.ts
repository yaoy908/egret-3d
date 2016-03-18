module egret3d {
    export class Class_SpecularMap extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected matPlane: TextureMaterial;
        protected lights: LightGroup = new LightGroup();
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

            var po: DirectLight = new DirectLight(new Vector3D(-0.8,1.0,0.0));
            po.y = 50;
            po.intensity = 0.7 ; 
            this.lights.addLight(po);

            this.matPlane = new TextureMaterial();
            this.matPlane.lightGroup = this.lights;
            this.matPlane.ambientPower = 0.3;
            this.matPlane.repeat = true;
            this.plane = new Mesh(new PlaneGeometry(1000,1000,10,10,2,2), this.matPlane);
            this.view1.addChild3D(this.plane);

            var loadDiffuse: URLLoader = new URLLoader("resource/floor/WOOD_1.png");
            loadDiffuse.onLoadComplete = (e: URLLoader) => this.onLoadDiffuse(e, this.matPlane);

            var loadNormal: URLLoader = new URLLoader("resource/floor/wood_1N.png");
            loadNormal.onLoadComplete = (e: URLLoader) => this.onLoadNormal(e, this.matPlane);

            var loadSpeular: URLLoader = new URLLoader("resource/floor/wood_1S.png");
            loadSpeular.onLoadComplete = (e: URLLoader) => this.onLoadSpecular(e, this.matPlane);

            

        }

        protected onLoadDiffuse(load: URLLoader, mat: TextureMaterial) {
            mat.diffuseTexture = load.data;
        }

        protected onLoadNormal(load: URLLoader, mat: TextureMaterial) {
            mat.normalTexture = load.data;
        }

        protected onLoadSpecular(load: URLLoader, mat: TextureMaterial) {
            mat.specularTexture = load.data;
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}