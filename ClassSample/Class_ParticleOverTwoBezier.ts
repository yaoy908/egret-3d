module egret3d {
    export class Class_ParticleOverTwoBezier extends Class_View3D {

        protected view1: View3D;

        protected cameraCrl: LookAtController;
        private particle: ParticleEmitter;

        private cube: Mesh; 
        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            this.cube = new Mesh(new CubeGeometry(10, 40, 10), null);
            this.view1.addChild3D(this.cube);

            var mat: TextureMaterial = new TextureMaterial();
            mat.bothside = true;
            mat.ambientColor = 0xffffff;

            var data: ParticleData = new ParticleData();
            data.geometry.planeW = data.geometry.planeH = 30;

            //var follow: ParticleDataFollowTarget = new ParticleDataFollowTarget();
            //data.followTarget = follow;


            var life: ParticleDataLife = data.life;
            life.lifeMax = 4;
            life.lifeMin = 4;
            life.rate = 20;
            life.duration = 5;
            life.delay = 0.5;
            life.loop = true;

            var property: ParticleDataProperty = data.property;
            property.particleCount = 100;
            property.startColorFrom.setTo(255, 255, 255, 255);
            property.startColorTo.setTo(255, 255, 255, 255);
            //property.gravity = 10;

            var speed: ParticleDataMoveSpeed = data.moveSpeed;
            speed.max = 50;
            speed.min = 50;

            var velocityOver: VelocityOverLifeTimeData = new VelocityOverLifeTimeData();
            speed.velocityOver = velocityOver;
            speed.velocityOver.type = ParticleDataMoveSpeed.TwoBezier;

            //___bezier1
            var xBezier: BezierData = new BezierData(BezierData.PointCount);
            xBezier.posPoints.push(new Point(0, 0));
            xBezier.posPoints.push(new Point(0.3, 60));
            xBezier.posPoints.push(new Point(0.35, 60));
            xBezier.posPoints.push(new Point(1.0, -40));
           
            xBezier.ctrlPoints.push(new Point(0, 20));
            xBezier.ctrlPoints.push(new Point(0.35, 60));
            xBezier.ctrlPoints.push(new Point(0.36, 60));
            xBezier.ctrlPoints.push(new Point(1.0, -40));
            speed.velocityOver.xBezier1 = xBezier;

            var yBezier: BezierData = new BezierData(BezierData.PointCount);
            yBezier.posPoints.push(new Point(0, 0));
            yBezier.posPoints.push(new Point(0, 0));
            yBezier.ctrlPoints.push(new Point(1, 0));
            yBezier.ctrlPoints.push(new Point(1, 0));
            speed.velocityOver.yBezier1 = yBezier;

            var zBezier: BezierData = new BezierData(BezierData.PointCount);
            zBezier.posPoints.push(new Point(0, 0));
            zBezier.posPoints.push(new Point(0, 0));
            zBezier.ctrlPoints.push(new Point(1, 0));
            zBezier.ctrlPoints.push(new Point(1, 0));
            speed.velocityOver.zBezier1 = zBezier;

            //___bezier2
            var xBezier2: BezierData = new BezierData(BezierData.PointCount);
            xBezier2.posPoints.push(new Point(0, 0));
            xBezier2.posPoints.push(new Point(0.3, 15));
            xBezier2.posPoints.push(new Point(0.35, 15));
            xBezier2.posPoints.push(new Point(1.0, -10));

            xBezier2.ctrlPoints.push(new Point(0, 5));
            xBezier2.ctrlPoints.push(new Point(0.35, 15));
            xBezier2.ctrlPoints.push(new Point(0.36, 15));
            xBezier2.ctrlPoints.push(new Point(1.0, -10));
            speed.velocityOver.xBezier2= xBezier2;

            var yBezier2: BezierData = new BezierData(BezierData.PointCount);
            yBezier2.posPoints.push(new Point(0, 0));
            yBezier2.posPoints.push(new Point(0, 0));
            yBezier2.ctrlPoints.push(new Point(1, 0));
            yBezier2.ctrlPoints.push(new Point(1, 0));
            speed.velocityOver.yBezier2 = yBezier2;

            var zBezier2: BezierData = new BezierData(BezierData.PointCount);
            zBezier2.posPoints.push(new Point(0, 0));
            zBezier2.posPoints.push(new Point(0, 0));
            zBezier2.ctrlPoints.push(new Point(1, 0));
            zBezier2.ctrlPoints.push(new Point(1, 0));
            speed.velocityOver.zBezier2 = zBezier2;

            //__bezier end




            var colorOffset: ParticleDataColorOffset = new ParticleDataColorOffset();
            data.colorOffset = colorOffset;
            colorOffset.colors.push(new Color(255.0, 0.0, 0.0, 255.0));
            colorOffset.colors.push(new Color(0.0, 255.0, 0.0, 255.0));
            colorOffset.colors.push(new Color(0.0, 0.0, 255.0, 255.0));
            colorOffset.colors.push(new Color(0.0, 255.0, 0.0, 255.0));
            colorOffset.colors.push(new Color(255.0, 0.0, 0.0, 128.0));
            colorOffset.colors.push(new Color(255.0, 0.0, 0.0, 0.0));
            colorOffset.times.push(0.0);
            colorOffset.times.push(0.2);
            colorOffset.times.push(0.4);
            colorOffset.times.push(0.6);
            colorOffset.times.push(0.7);
            colorOffset.times.push(1.0);


            this.particle = new ParticleEmitter(data, null, mat);

            this.view1.addChild3D(new AxisMesh(200));

            this.particle.play();
            this.view1.addChild3D(this.particle);

            
           
            //this.particle.followTarget = this.cube ;


            var vv: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            vv.type = "submit";
            vv.value = "rest";
            document.body.appendChild(vv);
            vv.onmousedown = (e: MouseEvent) => this.mouseDown(e);

            var loadtex: URLLoader = new URLLoader("resource/effect/rect.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;
        }
        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        protected mouseDown(e: MouseEvent) {
            this.particle.play();
        }

        private angle: number = 0; 
        public update(e: Event3D) {
            this.cameraCrl.update();
            this.angle += 0.001;
            this.cube.x = Math.cos(this.angle * 0.4) * 200;
            this.cube.z = Math.sin(this.angle * 0.4) * 200;

            //this.cube.rotationY = this.angle * 20;
            this.cube.rotationZ = this.angle * 10;

            var scale: number = Math.sin(this.angle * 0.4);
            scale = 2 * Math.abs(scale);
            //this.cube.scale = new Vector3D(scale, scale, scale);

            this.cube.rotationX = 0;
            this.cube.rotationY = 90;
            this.cube.rotationZ = this.angle * 1000;
        }

    }
} 