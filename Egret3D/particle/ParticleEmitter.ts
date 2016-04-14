module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.EmitterType
    * @classdesc
    * 发射器类型枚举
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum EmitterType {
                
        /**
        * @language zh_CN
        * 线性发射器 由一个长度值进行计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        ET_LINE,
                        
        /**
        * @language zh_CN
        * 平面发射器 由一个长度值和宽度值进行计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        ET_PLANE,
                                
        /**
        * @language zh_CN
        * 立方体发射器 一个空心的立方体 由一个长度值、宽度值、高度值进行计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        ET_CUBE_PLANE,
                                        
        /**
        * @language zh_CN
        * 立方体发射器 一个实心的立方体 由一个长度值、宽度值、高度值进行计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        ET_CUBE,
                                                
        /**
        * @language zh_CN
        * 球形发射器 一个空心的球形 由一个半径值进行计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        ET_SPHERE_PLANE,
                                                
        /**
        * @language zh_CN
        * 球形发射器 一个实心的立方体 由一个半径值进行计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        ET_SPHERE,
                                                
        /**
        * @language zh_CN
        * 圆柱发射器 一个实心的立方体 由一个半径、高度值进行计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        ET_CYLINDER_PLANE,
                                                
        /**
        * @language zh_CN
        * 圆柱发射器 一个实心的立方体 由一个半径、高度值进行计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        ET_CYLINDER,
    }

    /**
    * @language zh_CN
    * @class egret3d.ParticleType
    * @classdesc
    * 粒子类型枚举，分为两种粒子类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleType {
        
        /**
        * @language zh_CN
        * 重力粒子 特点：向同一方向运动
        * @version Egret 3.0
        * @platform Web,Native
        */
        PT_GRAVITY,
                
        /**
        * @language zh_CN
        * 范围粒子 特点：所有粒子随范围运动
        * @version Egret 3.0
        * @platform Web,Native
        */
        PT_RANGE,
    }
   
     /**
    * @class egret3d.ParticleEmitter
    * @classdesc
    * 粒子发射器 有多种发射器类型 还分为两种粒子类型，重力粒子只朝一个方向运动，范围粒子是随范围运动
    * @version Egret 3.0
    * @platform Web,Native 
    */
    export class ParticleEmitter extends Mesh {

        public count: number = 0;
        public geomNode: Geometry;
        public nodeCollection: AnimaNodeCollection = new AnimaNodeCollection();

        protected _position_node: ParticlePositionNode = new ParticlePositionNode();
        protected _lifecycle_node: ParticleLifecycleNode = new ParticleLifecycleNode();
        protected _dir_node: ParticleDirectionNode = new ParticleDirectionNode();
        protected _speed_node: ParticleSpeedNode = new ParticleSpeedNode();
        protected _isChangeBuild: boolean = false;

        
        /**
        * @language zh_CN
        * 构造函数 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor(geometry: Geometry, material: MaterialBase, count: number) {
            super(null, material);
            this.animation = new ParticleAnimation(this.nodeCollection);

            this.geomNode = geometry;
            this.count = count;
            this.geometry = new Geometry();
            this.createNode();
            this.geometry.nodeCollection = this.nodeCollection;
            this.material.blendMode = BlendMode.ADD;

            this.particleType = ParticleType.PT_RANGE;

            this.build();
        }

                
        /**
        * @language zh_CN
        * 设置粒子类型
        * @param type 粒子类型
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public set particleType(type: ParticleType) {
            if (this._dir_node) {
                this._dir_node.type = type;
            }
        }
                        
        /**
        * @language zh_CN
        * 获取粒子类型
        * @returns ParticleType  粒子类型
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public get particleType(): ParticleType {
            if (this._dir_node) {
                return this._dir_node.type;
            }
            return ParticleType.PT_GRAVITY;
        }

        /**
        * @language zh_CN
        * 设置粒子发射器类型
        * @param type 粒子发射器类型
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public set emitterType(type: EmitterType) {
            if (this._position_node) {
                this._position_node.type = type;
                this._isChangeBuild = true;
            }
        }
                                
        /**
        * @language zh_CN
        * 获取粒子发射器类型
        * @returns EmitterType  粒子发射器类型
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public get emitterType(): EmitterType {
            if (this._position_node) {
                return this._position_node.type;
            }

            return EmitterType.ET_CUBE;
        }
        
        /**
        * @language zh_CN
        * 设置粒子发射器宽度
        * @param width 粒子发射器宽度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setWidth(width: number) {
            if (this._position_node) {
                this._position_node.parameters[0] = width;
                this._isChangeBuild = true;
            }
        }
        
        /**
        * @language zh_CN
        * 获取粒子发射器宽度
        * @returns number 粒子发射器宽度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public getWidth():number {
            if (this._position_node) {
                return this._position_node.parameters[0];
            }
            return 0;
        }
                
        /**
        * @language zh_CN
        * 设置粒子发射器高度
        * @param height 粒子发射器高度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setHeight(height: number) {
            if (this._position_node) {
                this._position_node.parameters[1] = height;
                this._isChangeBuild = true;
            }
        }
                
        /**
        * @language zh_CN
        * 获取粒子发射器高度
        * @returns number 粒子发射器高度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public getHeight(): number {
            if (this._position_node) {
                return this._position_node.parameters[1];
            }
            return 0;
        }
                
        /**
        * @language zh_CN
        * 设置粒子发射器深度
        * @param depth 粒子发射器深度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setDepth(depth: number) {
            if (this._position_node) {
                this._position_node.parameters[2] = depth;
                this._isChangeBuild = true;
            }
        }
                        
        /**
        * @language zh_CN
        * 获取粒子发射器深度
        * @returns number 粒子发射器深度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public getDepth(): number {
            if (this._position_node) {
                return this._position_node.parameters[2];
            }
            return 0;
        }

        /**
        * @language zh_CN
        * 设置粒子出生时间范围 单位毫秒
        * @param min 最小范围
        * @param max 最大范围
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setStartTime(min: number, max: number) {
            if (this._lifecycle_node) {
                this._lifecycle_node.startRange = [min, max];
                this._isChangeBuild = true;
            }
        }

        /**
        * @language zh_CN
        * 设置粒子存活时间范围 单位毫秒
        * @param min 最小范围
        * @param max 最大范围
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setLifeTime(min: number, max: number) {
            if (this._lifecycle_node) {
                this._lifecycle_node.lifeRange = [min, max];
                this._isChangeBuild = true;
            }
        }
                        
        /**
        * @language zh_CN
        * 设置粒子是否循环播放
        * @param l 循环为true
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public set loop(l: boolean) {
            if (this._lifecycle_node) {
                this._lifecycle_node.isLoop = l;
                this._isChangeBuild = true;
            }
        }
                                
        /**
        * @language zh_CN
        * 获取粒子是否循环播放
        * @returns boolean 循环为true
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public get loop(): boolean {
            if (this._lifecycle_node) {
                return this._lifecycle_node.isLoop;
            }
            return false;
        }
                                
        /**
        * @language zh_CN
        * 设置粒子速度范围
        * @param min 最小速度
        * @param max 最大速度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setSpeed(min: number, max: number) {
            if (this._speed_node) {
                this._speed_node.minSpeed = min;
                this._speed_node.maxSpeed = max;
                this._isChangeBuild = true;
            }
        }

                                        
        /**
        * @language zh_CN
        * 获取粒子速度范围
        * @returns any [最小速度, 最大速度]
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public getSpeed(): any {
            if (this._speed_node) {
                return [this._speed_node.minSpeed, this._speed_node.maxSpeed];
            }
            return [0, 0];
        }
                                        
        /**
        * @language zh_CN
        * 设置粒子加速度范围
        * @param min 最小加速度
        * @param max 最大加速度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setAccelerSpeed(min: number, max: number) {
            if (this._speed_node) {
                this._speed_node.minAccelerSpeed = min;
                this._speed_node.maxAccelerSpeed = max;
                this._isChangeBuild = true;
            }
        }
                                                
        /**
        * @language zh_CN
        * 获取粒子加速度范围
        * @returns any [最小加速度, 最大加速度]
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public getAccelerSpeed():any {
            if (this._speed_node) {
                return [this._speed_node.minAccelerSpeed, this._speed_node.maxAccelerSpeed];
            }
        }

        protected createNode() {

            this._position_node.parameters = [500, 500, 500];
            this._lifecycle_node.startRange = [0, 1000];
            this._lifecycle_node.lifeRange = [1000, 5000];
            this._lifecycle_node.isLoop = true;

            this.nodeCollection.addNode(this._position_node);
            this.nodeCollection.addNode(this._lifecycle_node);
            this.nodeCollection.addNode(this._dir_node);
            this.nodeCollection.addNode(this._speed_node);

            this.geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_UV0 | VertexFormat.VF_COLOR;
            this.nodeCollection.calculate(this.geometry.vertexAttLength);


            this.geometry.vertexAttLength = this.nodeCollection.numberOfVertices;
            this.geometry.vertexSizeInBytes = this.nodeCollection.vertexSizeInBytes;
        }

        protected build() {
            var vertexIndex: number = 0;
            var vertexArray: Array<number> = new Array<number>();
            this.geometry.verticesData = new Array<number>();
            for (var i: number = 0; i < this.count; ++i) {
                for (var j: number = 0; j < this.geomNode.vertexCount; ++j) {
                    for (var k: number = 0; k < this.geometry.vertexAttLength; ++k) {
                        this.geometry.verticesData.push(0);
                    }
                    vertexIndex = i * this.geomNode.vertexCount + j;
                    vertexArray.length = 0;
                    this.geomNode.getVertexForIndex(j, this.geometry.vertexFormat, vertexArray);
                    for (var k: number = 0; k < vertexArray.length; ++k) {
                        this.geometry.verticesData[vertexIndex * this.geometry.vertexAttLength + k] = vertexArray[k];
                    }
                }
            }

            this.geometry.indexData = new Array<number>();
            for (var i: number = 0; i < this.count; ++i) {
                for (var j: number = 0; j < this.geomNode.indexData.length; ++j) {
                    this.geometry.indexData[i * this.geomNode.indexData.length + j] = this.geomNode.indexData[j] + i * this.geomNode.vertexCount;
                }
            }

            for (var i: number = 0; i < this.nodeCollection.nodes.length; ++i) {
                this.nodeCollection.nodes[i].buildGeomtry(this.geometry, this.count);
            }

            this.buildBoundBox();
            this.animation.play();
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            if (this._isChangeBuild) {
                this.build();
                this._isChangeBuild = false;
            }
        }
    }
}