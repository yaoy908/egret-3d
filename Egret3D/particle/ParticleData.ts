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
        Life,
        Distribute,
        RotationBirth,
        ScaleBirth,
        Geometry,
        //其他挂接节点
        FollowTarget,
        MoveSpeed,
        Acceleration,
        ScaleBezier,
        RotationSpeed,
        ColorOffset,
    }

    /**
     * @private
     * @class egret3d.ParticleData
     */
    export class ParticleData {

        public property: ParticleDataProperty = new ParticleDataProperty();
        public life: ParticleDataLife = new ParticleDataLife();
        public distribute: ParticleDataDistribute = new ParticleDataDistribute();
        public rotationBirth: ParticleDataRotationBirth = new ParticleDataRotationBirth();
        public scaleBirth: ParticleDataScaleBirth = new ParticleDataScaleBirth();
        public geometry: ParticleDataGeometry = new ParticleDataGeometry();

        public followTarget: ParticleDataFollowTarget;
        public moveSpeed: ParticleDataMoveSpeed;
        public acceleration: ParticleDataAcceleration;
        public scaleBesizer: ParticleDataScaleBezier;
        public rotationSpeed: ParticleDataRotationSpeed;
        public colorOffset: ParticleDataColorOffset;

        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
        }

        public validate(): void {
            this.property.validate();
            this.life.validate();
            this.distribute.validate();
            this.rotationBirth.validate();
            this.scaleBirth.validate();
            this.geometry.validate();

            if (this.moveSpeed) {
                this.moveSpeed.validate();
            }
            if (this.acceleration) {
                this.acceleration.validate();
            }
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
        public particleCount: number = -1;
        public loop: boolean = true;
        public bounds: Vector3D = new Vector3D(10, 10, 10);
       

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
        }
    } 


    export class ParticleDataLife extends ParticleDataNode{
        public rate: number = 10;
        public duration: number = 5;
        public lifeMax: number = 2;
        public lifeMin: number = 2;
        public delayMax: number = 0;
        public delayMin: number = 0;

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
            if (this.delayMin < 0) {
                this.delayMin = 0;
            }
            if (this.delayMax < this.delayMin) {
                this.delayMax = this.delayMin;
            }
            if (this.delayMax < 0) {
                this.delayMin = this.delayMax = 1;
            }
            //rate
            if (this.rate < 0) {
                this.rate = 10;
            }
            //duration
            if (this.duration < 0) {
                this.duration = 5;
            }
        }
    }

    export class ParticleDataDistribute extends ParticleDataNode {

        public static Point: number = 0;
        public static Cube: number = 1;

        //粒子分布类型
        public type: number = ParticleDataDistribute.Point;
        public point: Vector3D;
        public cubeW: number = 0;
        public cubeH: number = 0;
        public cubeD: number = 0;

        constructor() {
            super(ParticleDataNodeType.Distribute);
        }
        public validate(): void {
            if (this.type == ParticleDataDistribute.Point) {
                if (this.point == null) {
                    this.point = new Vector3D();
                }
            } else if (this.type == ParticleDataDistribute.Cube) {
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

        public static External: number = 0;
        public static Plane: number = 1;
        public static Cube: number = 2;
        public static Sphere: number = 3;

        //粒子模型
        public type: number = ParticleDataGeometry.Plane;
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
            if (this.type == ParticleDataGeometry.External)
                return;
            if (this.type == ParticleDataGeometry.Plane) {
                if (this.planeW < 0) {
                    this.planeW = 10;
                }
                if (this.planeH < 0) {
                    this.planeH = 10;
                }
            } else if (this.type == ParticleDataGeometry.Cube) {
                if (this.cubeW < 0) {
                    this.cubeW = 10;
                }
                if (this.cubeH < 0) {
                    this.cubeH = 10;
                }
                if (this.cubeD < 0) {
                    this.cubeD = 10;
                }
            } else if (this.type == ParticleDataGeometry.Sphere) {
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
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();

        constructor() {
            super(ParticleDataNodeType.MoveSpeed);
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

    export class ParticleDataAcceleration extends ParticleDataNode {
        //加速度
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();

        constructor() {
            super(ParticleDataNodeType.Acceleration);
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

    export class ParticleDataScaleBezier extends ParticleDataNode {
        //粒子缩放贝塞尔曲线
        public posPoints: Array<Point> = [];
        public ctrlPoints: Array<Point> = [];
        constructor() {
            super(ParticleDataNodeType.ScaleBezier);
        }

        public validate(): void {
            if (this.posPoints == null) {
                this.posPoints = [];
            }
            if (this.posPoints == null) {
                this.ctrlPoints = [];
            }
        }
    }



    export class ParticleDataRotationSpeed extends ParticleDataNode {
        //角速度
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();

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

    export class ParticleDataColorOffset extends ParticleDataNode {
        //粒子缩放贝塞尔曲线
        public colors: Array<Color> = [];
        public times: Array<number> = [];
        constructor() {
            super(ParticleDataNodeType.ColorOffset);
        }

        public validate(): void {
            if (this.colors == null) {
                this.colors = [];
            }
            if (this.times == null) {
                this.times = [];
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