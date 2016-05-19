module egret3d {
    export class Class_LightAndNormal extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected matPlane: TextureMaterial;
        protected lights: LightGroup = new LightGroup();
        private _p: PointLight;
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

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._p = new PointLight( 0xffcccc );
            this._p.y = 100 ;
            this._p.intensity = 1;
            //this._p.ambient = 0x6666cc;
            //this._p.ambient = 0x32327D;
           this.lights.addLight(this._p);

            var d: DirectLight = new DirectLight(new Vector3D(0.0, 1.0, 0.0));
            d.ambient = 0x32327D;
            // this.lights.addLight(d);

            this.matPlane = new TextureMaterial();
            this.matPlane.lightGroup = this.lights;
            this.matPlane.specularLevel = 10.0 ;
            this.matPlane.gloss = 10.0;

            this.matPlane.repeat = true;
            this.matPlane.uvRectangle(0, 0, 2.0, 2.0);

            //this.plane = new Mesh(new SphereGeometry(300, 120, 120), this.matPlane);
            //this.plane = new Mesh(new CubeGeometry(150, 120, 120), this.matPlane);
            this.plane = new Mesh(new PlaneGeometry(500,500), this.matPlane);
            this.view1.addChild3D(this.plane);

           

            var loadtex: URLLoader = new URLLoader("resource/floor/brick-diffuse.jpg");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadDiffuse, this);
            loadtex["mat"] = this.matPlane;

            var loadtex: URLLoader = new URLLoader("resource/floor/brick-normal.jpg");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadNormal, this);
            loadtex["mat"] = this.matPlane;

            var loadtex: URLLoader = new URLLoader("resource/floor/brick-specular.jpg");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadSpecular, this);
            loadtex["mat"] = this.matPlane;

        }

        protected onLoadDiffuse(e:LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        protected onLoadNormal(e: LoaderEvent3D) {
            e.loader["mat"].normalTexture = e.loader.data;
            //mat.normalTexture.useMipmap = false;
            //mat.normalTexture.smooth = false;
        }

        protected onLoadSpecular(e: LoaderEvent3D) {
            e.loader["mat"].specularTexture = e.loader.data;
            //mat.normalTexture.useMipmap = false;
            //mat.normalTexture.smooth = false;
        }

        private angle: number = 0;
        public update(e: Event3D) {
            this.ctl.update();
            this.angle+=0.01;
            this._p.x = Math.sin(this.angle ) * 250 ;
            this._p.z = Math.cos(this.angle) * 250 ;
        }
    }
}