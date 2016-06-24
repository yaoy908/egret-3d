module egret3d {
    /**
    * @language zh_CN
    * 粒子数据节点类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleDataNodeType {
        //以下类型必须有
        Property,
        Emission,
        Life,
        Shape,
        RotationBirth,
        ScaleBirth,
        Geometry,
        MoveSpeed,
        //其他挂接节点
        FollowTarget,
        ScaleBezier,
        RotationSpeed,
        ColorOffset,
        //Acceleration,
    }

    /**
    * @language zh_CN
    * 粒子数据类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleValueType{
        Const,
        RandomConst,
        OneBezier,
        TwoBezier,
    }

    /**
    * @language zh_CN
    * 粒子的几何形状
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleGeometryType {
        External,
        Plane,
        Cube,
        Sphere,
    }


    /**
    * @language zh_CN
    * 粒子的几何形状
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleRenderModeType {
        Billboard,
        StretchedBillboard,
        HorizontalBillboard,
        VerticalBillboard,
        Mesh,
    }


    /**
    * @language zh_CN
    * 粒子出生颜色
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleBirthColorType {
        Const,
        RandomConst,
        OneGradients,
        TwoGradients,
    }



    /**
     * @private
     * @class egret3d.ParticleData
     */
    export class ParticleData {

        public property: ParticleDataProperty = new ParticleDataProperty();
        public emission: ParticleDataEmission = new ParticleDataEmission();
        public life: ParticleDataLife = new ParticleDataLife();
        public shape: ParticleDataShape = new ParticleDataShape();
        public rotationBirth: ParticleDataRotationBirth = new ParticleDataRotationBirth();
        public scaleBirth: ParticleDataScaleBirth = new ParticleDataScaleBirth();
        public geometry: ParticleDataGeometry = new ParticleDataGeometry();
        public moveSpeed: ParticleDataMoveSpeed = new ParticleDataMoveSpeed();

        public followTarget: ParticleDataFollowTarget;
        public scaleBesizer: ParticleDataScaleBezier;
        public rotationSpeed: ParticleDataRotationSpeed;
        public colorOffset: ParticleDataColorOffset;

        public materialData: MaterialSphereData;
        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
        }

        public validate(): void {
            this.property.validate();
            this.emission.validate();
            this.life.validate();
            this.shape.validate();
            this.rotationBirth.validate();
            this.scaleBirth.validate();
            this.geometry.validate();
            this.moveSpeed.validate();

           
            if (this.scaleBesizer) {
                this.scaleBesizer.validate();
            }
            if (this.rotationSpeed) {
                this.rotationSpeed.validate();
            }
            if (this.colorOffset) {
                this.colorOffset.validate();
            }
            if (this.followTarget) {
                this.followTarget.validate();
            }
        }
    }


    export class ParticleDataNode {
        protected _nodeType: number;
        constructor(node:number) {
            this._nodeType = node;
        }
        public get nodeType(): number {
            return this._nodeType;
        }
    }

    /**
    * @language zh_CN
    * 粒子的基础属性
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataProperty extends ParticleDataNode {
        public particleCount: number = 10;

        public bounds: Vector3D = new Vector3D(10, 10, 10);
        public blendMode: BlendMode = BlendMode.ADD;
        //初始颜色
        public colorType: number = ParticleBirthColorType.Const;
        public colorConst1: Color = new Color(255, 255, 255, 255);
        public colorConst2: Color = new Color(255, 255, 255, 255);
        public colorGradients1: ColorGradients;
        public colorGradients2: ColorGradients;
        //重力
        public gravity: number = 0;

        public rotation: Vector3D = new Vector3D(0, 0, 0, 1);
        public scale: Vector3D = new Vector3D(1, 1, 1, 1);
        public position: Vector3D = new Vector3D(0, 0, 0, 1);

        //render mode
        public renderMode: number = ParticleRenderModeType.Billboard;


        constructor() {
            super(ParticleDataNodeType.Property);
        }

        public validate(): void {
            if(this.bounds == null) {
                this.bounds = new Vector3D(10, 10, 10);
            }
            if (this.bounds.x < 0) {
                this.bounds.x = 1;
            }
            if (this.bounds.y < 0) {
                this.bounds.y = 1;
            }
            if (this.bounds.z < 0) {
                this.bounds.z = 1;
            }
            if (this.particleCount < 0) {
                this.particleCount = 10;
            }
            if (this.colorConst1 == null) {
                this.colorConst1 = new Color(255, 255, 255, 255);
            }
            if (this.colorConst2 == null) {
                this.colorConst2 = new Color(255, 255, 255, 255);
            }
            if (this.colorType == ParticleBirthColorType.OneGradients || this.colorType == ParticleBirthColorType.TwoGradients) {
                if (this.colorGradients1 == null) {
                    this.colorGradients1 = new ColorGradients();
                }
            }
            if (this.colorType == ParticleBirthColorType.TwoGradients) {
                if (this.colorGradients2 == null) {
                    this.colorGradients2 = new ColorGradients();
                }
            }

            if (this.rotation == null) {
                this.rotation = new Vector3D(0, 0, 0, 1);
            }
            if (this.scale == null) {
                this.scale = new Vector3D(1, 1, 1, 1);
            }
            if (this.position == null) {
                this.rotation = new Vector3D(0, 0, 0, 1);
            }
        }
    } 

    export class ParticleDataEmission extends ParticleDataNode {
        public rate: number = 10;
        public type: number = ParticleValueType.Const;
        public bursts: Array<Point>;
        public bezier: BezierData = new BezierData();
        constructor() {
            super(ParticleDataNodeType.Emission);
        }

        public validate(): void {
            if (this.rate < 0) {
                this.rate = 0.00001;
            }
            if (this.type == ParticleValueType.OneBezier) {
                if (this.bezier == null) {
                    this.bezier = new BezierData();
                }
                this.bezier.validate();
            }
        }
    }


    export class ParticleDataLife extends ParticleDataNode{
       
        public duration: number = 5;
        public lifeMax: number = 2;
        public lifeMin: number = 2;
        public delay: number = 0;
        public loop: boolean = true;
        

        constructor() {
            super(ParticleDataNodeType.Life);
        }
        public validate(): void {
            //life
            if (this.lifeMin < 0) {
                this.lifeMin = 0;
            }
            if (this.lifeMax < this.lifeMin) {
                this.lifeMax = this.lifeMin;
            }
            if (this.lifeMax < 0) {
                this.lifeMin = this.lifeMax = 1;
            }
            //delay
            if (this.delay < 0) {
                this.delay = 0;
            }
            //duration
            if (this.duration < 0) {
                this.duration = 5;
            }
           
        }
    }

    export class ParticleDataShape extends ParticleDataNode {

        public static Point: number = 0;
        public static Cube: number = 1;
        public static Sphere: number = 2;
        public static HemiSphere: number = 3;
        public static Cone: number = 4;
        //粒子分布类型
        public type: number = ParticleDataShape.Cube;
        public randomDirection: boolean = false;

        //正方体
        public cubeW: number = 0;
        public cubeH: number = 0;
        public cubeD: number = 0;

        //球型
        public sphereRadius: number = 10;

        //半球
        public hemiSphereRaiuds: number = 10;
        //圆筒状
        public coneHeight: number = 10;
        public coneRadiusBottom: number = 2;
        public coneRadiusTop: number = 4;

        constructor() {
            super(ParticleDataNodeType.Shape);
        }
        public validate(): void {
            if (this.type == ParticleDataShape.Cube) {
                if (this.cubeW < 0) {
                    this.cubeW = 0;
                }
                if (this.cubeH < 0) {
                    this.cubeH = 0;
                }
                if (this.cubeD < 0) {
                    this.cubeD = 0;
                }
            }
            else if (this.type == ParticleDataShape.Sphere) {
                if (this.sphereRadius < 0) {
                    this.sphereRadius = 10;
                }
            }
        }
    }










    export class ParticleDataRotationBirth extends ParticleDataNode {
        //初始角度
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();

        constructor() {
            super(ParticleDataNodeType.RotationBirth);
        }
        public validate(): void {
            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = new Vector3D();
            }
            if (this.min.x > this.max.x) {
                this.min.x = this.max.x;
            }
            if (this.min.y > this.max.y) {
                this.min.y = this.max.y;
            }
            if (this.min.z > this.max.z) {
                this.min.z = this.max.z;
            }
        }
    }



    export class ParticleDataScaleBirth extends ParticleDataNode {
        //初始缩放值
        public max: Vector3D = new Vector3D(1, 1, 1);
        public min: Vector3D = new Vector3D(1, 1, 1);

        constructor() {
            super(ParticleDataNodeType.ScaleBirth);
        }
        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D(1, 1, 1);
            }
            if (this.min == null) {
                this.min = new Vector3D(1, 1, 1);
            }
            if (this.min.x > this.max.x) {
                this.min.x = this.max.x;
            }
            if (this.min.y > this.max.y) {
                this.min.y = this.max.y;
            }
            if (this.min.z > this.max.z) {
                this.min.z = this.max.z;
            }

        }
    }


    export class ParticleDataGeometry extends ParticleDataNode {



        //粒子模型
        public type: number = ParticleGeometryType.Plane;
        public planeW: number = 10;
        public planeH: number = 10;

        public cubeW: number = 10;
        public cubeH: number = 10;
        public cubeD: number = 10;

        public sphereRadius: number = 10;
        public sphereSegW: number = 6;
        public sphereSegH: number = 6;

        constructor() {
            super(ParticleDataNodeType.Geometry);
        }
        public validate(): void {
            if (this.type == ParticleGeometryType.External)
                return;
            if (this.type == ParticleGeometryType.Plane) {
                if (this.planeW < 0) {
                    this.planeW = 10;
                }
                if (this.planeH < 0) {
                    this.planeH = 10;
                }
            } else if (this.type == ParticleGeometryType.Cube) {
                if (this.cubeW < 0) {
                    this.cubeW = 10;
                }
                if (this.cubeH < 0) {
                    this.cubeH = 10;
                }
                if (this.cubeD < 0) {
                    this.cubeD = 10;
                }
            } else if (this.type == ParticleGeometryType.Sphere) {
                if (this.sphereRadius < 0) {
                    this.sphereRadius = 10;
                }
                if (this.sphereSegW < 0) {
                    this.sphereSegW = 4;
                }
                if (this.sphereSegH < 0) {
                    this.sphereSegH = 4;
                }
            }

        }
    }

    
    


    export class ParticleDataMoveSpeed extends ParticleDataNode {
       
        //初始速度
        public max: number = 0;
        public min: number = 0;
        //叠加速度
        public velocityOver: VelocityOverLifeTimeData;
        //速度限制
        public velocityLimit: VelocityLimitLifeTimeData;
        //加速度
        public velocityForce: VelocityForceLifeTimeData;

        constructor() {
            super(ParticleDataNodeType.MoveSpeed);
        }

        public validate(): void {
            if (this.velocityOver) {
                this.velocityOver.validate();
            }
            if (this.velocityLimit) {
                this.velocityLimit.validate();
            }
            if (this.velocityForce) {
                this.velocityForce.validate();
            }
        }
    }


    export class VelocityLimitLifeTimeData{
        public type: number = ParticleValueType.Const;
        public max: number = 0;
        public min: number = 0;

        public bezier1: BezierData = new BezierData();
        public bezier2: BezierData = new BezierData();

        constructor() {
        }

        public validate(): void {
            if (this.max < 0) {
                this.max = 0;
            }
            if (this.min > this.max) {
                this.min = this.max;
            }

            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }               
                this.bezier2.validate();
            }

        }
    }


    export class VelocityOverLifeTimeData {
        public type: number = ParticleValueType.Const;
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();
        public worldSpace: boolean = false;

        public xBezier1: BezierData = new BezierData();
        public yBezier1: BezierData = new BezierData();
        public zBezier1: BezierData = new BezierData();
                                   
        public xBezier2: BezierData = new BezierData();
        public yBezier2: BezierData = new BezierData();
        public zBezier2: BezierData = new BezierData();

        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = new Vector3D();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier1 == null) {
                    this.xBezier1 = new BezierData();
                }
                if (this.yBezier1 == null) {
                    this.yBezier1 = new BezierData();
                }
                if (this.zBezier1 == null) {
                    this.zBezier1 = new BezierData();
                }

                this.xBezier1.validate();
                this.yBezier1.validate();
                this.zBezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier2 == null) {
                    this.xBezier2 = new BezierData();
                }
                if (this.yBezier2 == null) {
                    this.yBezier2 = new BezierData();
                }
                if (this.zBezier2 == null) {
                    this.zBezier2 = new BezierData();
                }
                this.xBezier2.validate();
                this.yBezier2.validate();
                this.zBezier2.validate();
            }

        }
    }


    export class VelocityForceLifeTimeData {
        public type: number = ParticleValueType.Const;
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();
        public worldSpace: boolean = false;

        public xBezier1: BezierData = new BezierData();
        public yBezier1: BezierData = new BezierData();
        public zBezier1: BezierData = new BezierData();

        public xBezier2: BezierData = new BezierData();
        public yBezier2: BezierData = new BezierData();
        public zBezier2: BezierData = new BezierData();

        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = new Vector3D();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier1 == null) {
                    this.xBezier1 = new BezierData();
                }
                if (this.yBezier1 == null) {
                    this.yBezier1 = new BezierData();
                }
                if (this.zBezier1 == null) {
                    this.zBezier1 = new BezierData();
                }

                this.xBezier1.validate();
                this.yBezier1.validate();
                this.zBezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier2 == null) {
                    this.xBezier2 = new BezierData();
                }
                if (this.yBezier2 == null) {
                    this.yBezier2 = new BezierData();
                }
                if (this.zBezier2 == null) {
                    this.zBezier2 = new BezierData();
                }
                this.xBezier2.validate();
                this.yBezier2.validate();
                this.zBezier2.validate();
            }

        }
    }


    //export class ParticleDataAcceleration extends ParticleDataNode {
    //    //加速度
    //    public max: Vector3D = new Vector3D();
    //    public min: Vector3D = new Vector3D();
    //    public accelerationWorld: boolean = false;

    //    constructor() {
    //        super(ParticleDataNodeType.Acceleration);
    //    }

    //    public validate(): void {
    //        if (this.max == null) {
    //            this.max = new Vector3D();
    //        }
    //        if (this.min == null) {
    //            this.min = new Vector3D();
    //        }
    //        if (this.min.x > this.max.x) {
    //            this.min.x = this.max.x;
    //        }
    //        if (this.min.y > this.max.y) {
    //            this.min.y = this.max.y;
    //        }
    //        if (this.min.z > this.max.z) {
    //            this.min.z = this.max.z;
    //        }
    //    }
    //}

    export class ParticleDataScaleBezier extends ParticleDataNode {
        //粒子缩放贝塞尔曲线
        public data: BezierData = new BezierData();
        constructor() {
            super(ParticleDataNodeType.ScaleBezier);
        }

        public validate(): void {
            if (this.data == null) {
                this.data = new BezierData();
            }
            this.data.validate();
        }
    }



    export class ParticleDataRotationSpeed extends ParticleDataNode {
        //角速度
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();
        
        public type: number = ParticleValueType.Const;

        public bezier1: BezierData = new BezierData();
        public bezier2: BezierData = new BezierData();
        constructor() {
            super(ParticleDataNodeType.RotationSpeed);
        }


        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = new Vector3D();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }

        }
    }

    export class ParticleDataColorOffset extends ParticleDataNode {
        //粒子颜色变化贝塞尔曲线
        public data: ColorGradients = new ColorGradients();
        constructor() {
            super(ParticleDataNodeType.ColorOffset);
        }

        public validate(): void {
            if (this.data.colors == null) {
                this.data.colors = [];
            }
            if (this.data.times == null) {
                this.data.times = [];
            }
        }
    }

    export class ParticleDataFollowTarget extends ParticleDataNode {
        //跟随
        public followRotation: boolean = true;
        public followScale: boolean = true;

        constructor() {
            super(ParticleDataNodeType.FollowTarget);
        }

        public validate(): void {
           
        }
    }










    
}