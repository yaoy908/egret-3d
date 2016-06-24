module egret3d {
    export class Class_ParticleParser extends Class_View3D {

        private _view3D: View3D;
        private _cameraCrl: LookAtController;

        private _particle: ParticleEmitter;
        private _cube: Mesh;
        private _xmlLoader: URLLoader;
        private _particleData: ParticleData;
        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this._view3D = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this._cameraCrl = new LookAtController(this._view3D.camera3D, new Object3D());
            this._cameraCrl.distance = 100;

            this._xmlLoader = new URLLoader("resource/particle/config.xml", URLLoader.DATAFORMAT_TEXT);
            this._xmlLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onGotParticleXml, this);

            //view1.addChild3D(new AxisMesh(20));
        }

        private onGotParticleXml(e: LoaderEvent3D): void {
            this._xmlLoader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onGotParticleXml, this);
            var text: string = this._xmlLoader.data;
            this._particleData = new ParticleXmlParser().parse(text);
            var loadtex: URLLoader = new URLLoader("resource/particle/" + this._particleData.materialData.diffuseTextureName);//sponza_flag.jpg
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
        }

        protected onLoadTexture(e: LoaderEvent3D) {
            this.createParticle(e.loader.data);
        }

        private createParticle(texture:ITexture): void {

            //this.view1.addChild3D(this.cube);

            this._cube = new Mesh(new CubeGeometry(40, 40, 40), null);

            var mat: TextureMaterial = new TextureMaterial();
            mat.ambientColor = 0xffffff;
            mat.diffuseColor = 0xffffff;
            mat.specularColor = 0xffffff;
            mat.diffuseTexture = texture;


            this._particle = new ParticleEmitter(this._particleData, null, mat);


            this._particle.play();
            this._view3D.addChild3D(this._particle);

            this._particle.followTarget = this._cube;

           

          

        }




        private angle: number = 0;
        public update(e: Event3D) {
            this._cameraCrl.update();
            //this.obj.rotationY++;
            this.angle += 0.01;

        }

    }
}