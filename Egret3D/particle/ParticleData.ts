module egret3d {

    /**
    * @language zh_CN
    * 粒子所使用的模型类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleGeometryType {
        //面片
        PLANE,
        //立方体
        CUBE,
        //球体
        SPHERE
    }

    export enum ParticleDistributeType {
        //点
        Point,
        //立方体
        CUBE,
    }

    /**
     * @private
     * @class egret3d.ParticleData
     */
    export class ParticleData {
        public lifeMax: number = 2;
        public lifeMin: number = 2;
        public delayMax: number = 0;
        public delayMin: number = 0;
        public particleCount: number = -1;
        public rate: number = 10;
        public loop: boolean = true;
        public duration: number = 5;
        public bounds: Vector3D = new Vector3D(10, 10, 10);
        //粒子分布类型
        public distributeType: number = ParticleDistributeType.Point;
        public dstbPoint: Vector3D;
        public dstbCubeW: number = 0;
        public dstbCubeH: number = 0;
        public dstbCubeD: number = 0;
        //粒子模型
        public geometryType: number = ParticleGeometryType.PLANE;
        public geomPlaneW: number = 10;
        public geomPlaneH: number = 10;

        public geomCubeW: number = 10;
        public geomCubeH: number = 10;
        public geomCubeD: number = 10;

        public geomSphereRadius: number = 10;
        public geomSphereSegW: number = 6;
        public geomSphereSegH: number = 6;

        //初始角度
        public birthRotationMax: Vector3D = new Vector3D();
        public birthRotationMin: Vector3D = new Vector3D();
        //初始缩放值
        public birthSizeMax: Vector3D = new Vector3D(1,1,1);
        public birthSizeMin: Vector3D = new Vector3D(1,1,1);
        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {

        }

        public validate(): void {
            //distribute
            if (this.distributeType == ParticleDistributeType.Point) {
                if (this.dstbPoint == null) {
                    this.dstbPoint = new Vector3D();
                }
            } else if (this.distributeType == ParticleDistributeType.CUBE) {
                if (this.dstbCubeW < 0) {
                    this.dstbCubeW = 0;
                }
                if (this.dstbCubeH < 0) {
                    this.dstbCubeH = 0;
                }
                if (this.dstbCubeD < 0) {
                    this.dstbCubeD = 0;
                }
            }
            
            //geometry size
            if (this.geometryType == ParticleGeometryType.PLANE) {
                if (this.geomPlaneW < 0) {
                    this.geomPlaneW = 10;
                }
                if (this.geomPlaneH < 0) {
                    this.geomPlaneH = 10;
                }
            } else if (this.geometryType == ParticleGeometryType.CUBE) {
                if (this.geomCubeW < 0) {
                    this.geomCubeW = 10;
                }
                if (this.geomCubeH < 0) {
                    this.geomCubeH = 10;
                }
                if (this.geomCubeD < 0) {
                    this.geomCubeD = 10;
                }
            } else if (this.geometryType == ParticleGeometryType.SPHERE) {
                if (this.geomSphereRadius < 0) {
                    this.geomSphereRadius = 10;
                }
                if (this.geomSphereSegW < 4) {
                    this.geomSphereSegW = 4;
                }
                if (this.geomSphereSegH < 4) {
                    this.geomSphereSegH = 4;
                }
            }
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

            //bounds
            if (this.bounds == null) {
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
            //birth rotation
            if (this.birthRotationMax == null) {
                this.birthRotationMax = new Vector3D();
            }
            if (this.birthRotationMin == null) {
                this.birthRotationMin = new Vector3D();
            }
            if (this.birthRotationMin.x < this.birthRotationMax.x) {
                this.birthRotationMin.x = this.birthRotationMax.x;
            }
            if (this.birthRotationMin.y < this.birthRotationMax.y) {
                this.birthRotationMin.y = this.birthRotationMax.y;
            }
            if (this.birthRotationMin.z < this.birthRotationMax.z) {
                this.birthRotationMin.z = this.birthRotationMax.z;
            }
            //birth size
            if (this.birthSizeMax == null) {
                this.birthSizeMax = new Vector3D(1,1,1);
            }
            if (this.birthSizeMin == null) {
                this.birthSizeMin = new Vector3D(1,1,1);
            }
            if (this.birthSizeMin.x < this.birthSizeMax.x) {
                this.birthSizeMin.x = this.birthSizeMax.x;
            }
            if (this.birthSizeMin.y < this.birthSizeMax.y) {
                this.birthSizeMin.y = this.birthSizeMax.y;
            }
            if (this.birthSizeMin.z < this.birthSizeMax.z) {
                this.birthSizeMin.z = this.birthSizeMax.z;
            }




        }
    }

}