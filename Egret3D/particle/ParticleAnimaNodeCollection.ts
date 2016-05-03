////module egret3d {

////    /**
////     * @private
////     * @language zh_CN
////     * @class egret3d.AnimaNodeCollection
////     * @classdesc
////     * 动画功能节点收集器
////     * 动画功能的收集，整理，初始化容器，一般在粒子系统里使用
////     * @version Egret 3.0
////     * @platform Web,Native
////     * @includeExample animation/AnimaNodeCollection.ts
////     */
////    export class ParticleAnimaNodeCollection {

////        /**
////        * @language zh_CN
////        * 动画节点容器
////        * @priavte 
////        */
////        public nodes: Array<AnimationNode> = new Array<AnimationNode>();

////        public enableBillboardX: boolean = true;

////        public enableBillboardY: boolean = true;

////        public enableBillboardZ: boolean = true;

////        //public startColor: Vector3D = new Vector3D(1, 1, 1);

////        //public endColor: Vector3D = new Vector3D(1, 1, 1);

////        //public startScale: Vector3D = new Vector3D(1, 1, 1);

////        //public endScale: Vector3D = new Vector3D(1, 1, 1);

////        //public startRot: Vector3D = new Vector3D();

////        //public endRot: Vector3D = new Vector3D();

////        /**
////        * @language zh_CN
////        * 顶点数
////        * @priavte 
////        */
////        public numberOfVertices: number;

////        /**
////        * @language zh_CN
////        * 顶点字节大小
////        * @priavte 
////        */
////        public vertexSizeInBytes: number;
        
////        /**
////        * @language zh_CN
////        * @priavte 
////        */
////        private _nodeData: Float32Array;

////        /**
////        * @language zh_CN
////        * @priavte 
////        */
////        private _vertexAttributes: Object = {};

////        /**
////        * @language zh_CN
////        * 构造函数
////        * @priavte 
////        */
////        constructor() {
////            this.nodes = new Array<AnimationNode>();
////        }

     

////        /**
////        * @language zh_CN
////        * 获取节点容器
////        * 获取整体的功能节点列表
////        * @return 节点容器
////        */
////        public getNodes(): Array<AnimationNode> {
////            return this.nodes;
////        }

////        /**
////     * @language zh_CN
////     * 设置粒子初始旋转
////     * @param rot 旋转角度值
////     * @version Egret 3.0
////     * @platform Web,Native 
////     */
////        public setStartRot(rot: Vector3D) {
////            this.nodeCollection.startRot.copyFrom(rot);
////        }

////        /**
////        * @language zh_CN
////        * 设置粒子初始旋转
////        * @param x X旋转角度值
////        * @param y Y旋转角度值
////        * @param z Z旋转角度值
////        * @version Egret 3.0
////        * @platform Web,Native 
////        */
////        public setStartRotXYZ(x: number, y: number, z: number) {
////            this.nodeCollection.startRot.setTo(x, y, z);
////        }


////        /**
////        * @language zh_CN
////        * 获取粒子初始旋转
////        * @returns Vector3D 旋转角度值
////        * @version Egret 3.0
////        * @platform Web,Native 
////        */
////        public getStartRot(): Vector3D {
////            return this.nodeCollection.startRot;
////        }


////        /**
////        * @language zh_CN
////        * 设置粒子死亡时旋转
////        * @param rot 旋转角度值
////        * @version Egret 3.0
////        * @platform Web,Native 
////        */
////        public setEndRot(rot: Vector3D) {
////            this.nodeCollection.endRot.copyFrom(rot);
////        }

////        /**
////        * @language zh_CN
////        * 设置粒子死亡时旋转
////        * @param x X旋转角度值
////        * @param y Y旋转角度值
////        * @param z Z旋转角度值
////        * @version Egret 3.0
////        * @platform Web,Native 
////        */
////        public setEndRotXYZ(x: number, y: number, z: number) {
////            this.nodeCollection.endRot.setTo(x, y, z);
////        }

////        /**
////        * @language zh_CN
////        * 获取粒子死亡时旋转
////        * @returns Vector3D 旋转角度值
////        * @version Egret 3.0
////        * @platform Web,Native 
////        */
////        public getEndRot(): Vector3D {
////            return this.nodeCollection.endRot;
////        }

////        /**
////        * @language zh_CN
////        * 设置粒子运动方向 只有重力粒子才有方向
////        * @param dir 粒子运动方向
////        * @version Egret 3.0
////        * @platform Web,Native 
////        */
////        public setDirection(dir: Vector3D) {
////            if (this._dir_node) {
////                this._dir_node.direction.copyFrom(dir);
////                this._isChangeBuild = true;
////            }
////        }

////        /**
////        * @language zh_CN
////        * 设置粒子运动方向 只有重力粒子才有方向
////        * @param x X运动方向值
////        * @param y Y运动方向值
////        * @param z Z运动方向值
////        * @version Egret 3.0
////        * @platform Web,Native 
////        */
////        public setDirectionXYZ(x: number, y: number, z: number) {
////            if (this._dir_node) {
////                this._dir_node.direction.setTo(x, y, z);
////                this._isChangeBuild = true;
////            }
////        }

////        /**
////        * @language zh_CN
////        * 获取粒子运动方向 只有重力粒子才有方向
////        * @returns Vector3D运动方向值
////        * @version Egret 3.0
////        * @platform Web,Native 
////        */
////        public getDirection(): Vector3D {
////            if (this._dir_node) {
////                return this._dir_node.direction;
////            }
////            return new Vector3D();
////        }
////    }
////}

///**
//        * @language zh_CN
//        * 设置粒子类型
//        * @param type 粒子类型
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public set particleType(type: ParticleType) {
//    if (this._dir_node) {
//        this._dir_node.type = type;
//    }
//}

//        /**
//        * @language zh_CN
//        * 获取粒子类型
//        * @returns ParticleType  粒子类型
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public get particleType(): ParticleType {
//    if (this._dir_node) {
//        return this._dir_node.type;
//    }
//    return ParticleType.PT_GRAVITY;
//}

//        /**
//        * @language zh_CN
//        * 设置粒子发射器类型
//        * @param type 粒子发射器类型
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public set emitterType(type: EmitterType) {
//    if (this._position_node) {
//        this._position_node.type = type;
//        this._isChangeBuild = true;
//    }
//}

//        /**
//        * @language zh_CN
//        * 获取粒子发射器类型
//        * @returns EmitterType  粒子发射器类型
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public get emitterType(): EmitterType {
//    if (this._position_node) {
//        return this._position_node.type;
//    }

//    return EmitterType.ET_CUBE;
//}
//   /**
//        * @language zh_CN
//        * 设置粒子发射器宽度
//        * @param width 粒子发射器宽度
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public setWidth(width: number) {
//            if (this._position_node) {
//                this._position_node.parameters[0] = width;
//                this._isChangeBuild = true;
//            }
//        }

//        /**
//        * @language zh_CN
//        * 获取粒子发射器宽度
//        * @returns number 粒子发射器宽度
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public getWidth():number {
//            if (this._position_node) {
//                return this._position_node.parameters[0];
//            }
//            return 0;
//        }

//        /**
//        * @language zh_CN
//        * 设置粒子发射器高度
//        * @param height 粒子发射器高度
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public setHeight(height: number) {
//            if (this._position_node) {
//                this._position_node.parameters[1] = height;
//                this._isChangeBuild = true;
//            }
//        }

//        /**
//        * @language zh_CN
//        * 获取粒子发射器高度
//        * @returns number 粒子发射器高度
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public getHeight(): number {
//            if (this._position_node) {
//                return this._position_node.parameters[1];
//            }
//            return 0;
//        }

//        /**
//        * @language zh_CN
//        * 设置粒子发射器深度
//        * @param depth 粒子发射器深度
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public setDepth(depth: number) {
//            if (this._position_node) {
//                this._position_node.parameters[2] = depth;
//                this._isChangeBuild = true;
//            }
//        }

//        /**
//        * @language zh_CN
//        * 获取粒子发射器深度
//        * @returns number 粒子发射器深度
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public getDepth(): number {
//            if (this._position_node) {
//                return this._position_node.parameters[2];
//            }
//            return 0;
//        }

//        /**
//        * @language zh_CN
//        * 设置粒子出生时间范围 单位毫秒
//        * @param min 最小范围
//        * @param max 最大范围
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public setStartTime(min: number, max: number) {
//            if (this._lifecycle_node) {
//                this._lifecycle_node.startRange = [min, max];
//                this._isChangeBuild = true;
//            }
//        }

//        /**
//        * @language zh_CN
//        * 设置粒子存活时间范围 单位毫秒
//        * @param min 最小范围
//        * @param max 最大范围
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public setLifeTime(min: number, max: number) {
//            if (this._lifecycle_node) {
//                this._lifecycle_node.lifeRange = [min, max];
//                this._isChangeBuild = true;
//            }
//        }

//        /**
//        * @language zh_CN
//        * 设置粒子是否循环播放
//        * @param l 循环为true
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public set loop(l: boolean) {
//            if (this._lifecycle_node) {
//                this._lifecycle_node.isLoop = l;
//                this._isChangeBuild = true;
//            }
//        }

//        /**
//        * @language zh_CN
//        * 获取粒子是否循环播放
//        * @returns boolean 循环为true
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public get loop(): boolean {
//            if (this._lifecycle_node) {
//                return this._lifecycle_node.isLoop;
//            }
//            return false;
//        }

//        /**
//        * @language zh_CN
//        * 设置粒子速度范围
//        * @param min 最小速度
//        * @param max 最大速度
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public setSpeed(min: number, max: number) {
//            if (this._speed_node) {
//                this._speed_node.minSpeed = min;
//                this._speed_node.maxSpeed = max;
//                this._isChangeBuild = true;
//            }
//        }


//        /**
//        * @language zh_CN
//        * 获取粒子速度范围
//        * @returns any [最小速度, 最大速度]
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public getSpeed(): any {
//            if (this._speed_node) {
//                return [this._speed_node.minSpeed, this._speed_node.maxSpeed];
//            }
//            return [0, 0];
//        }

//        /**
//        * @language zh_CN
//        * 设置粒子加速度范围
//        * @param min 最小加速度
//        * @param max 最大加速度
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public setAccelerSpeed(min: number, max: number) {
//            if (this._speed_node) {
//                this._speed_node.minAccelerSpeed = min;
//                this._speed_node.maxAccelerSpeed = max;
//                this._isChangeBuild = true;
//            }
//        }

//        /**
//        * @language zh_CN
//        * 获取粒子加速度范围
//        * @returns any [最小加速度, 最大加速度]
//        * @version Egret 3.0
//        * @platform Web,Native 
//        */
//        public getAccelerSpeed():any {
//            if (this._speed_node) {
//                return [this._speed_node.minAccelerSpeed, this._speed_node.maxAccelerSpeed];
//            }
//        }