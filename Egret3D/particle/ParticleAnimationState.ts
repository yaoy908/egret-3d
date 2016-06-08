module egret3d {
    
    /**
     * @language zh_CN
     * @class egret3d.ParticleAnimationState
     * @classdesc
     * 粒子动画状态机
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ParticleAnimationState implements IAnimationState {
                
        /**
        * @language zh_CN
        * 动画状态机名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string;
                                                        
        /**
        * @language zh_CN
        * 动画效果节点列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animNodes: AnimationNode[];
                                                                
        /**
        * @language zh_CN
        * 动画关键帧列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public keyFrames: AnimationCurve[];
                                        
        /**
        * @language zh_CN
        * 新增顶点个数总量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public numberOfVertices: number = 0;
                                                
        /**
        * @language zh_CN
        * 新增顶点的长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertexSizeInBytes: number = 0 ;
                        
        /**
        * @language zh_CN
        * 动画状态机顶点着色器文件名列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertex_shaders: { [shaderPhaseType: number]: string[] } = {};
                                
        /**
        * @language zh_CN
        * 动画状态机片段着色器文件名列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fragment_shaders: { [shaderPhaseType: number]: string[] } = {};
                                                
        /**
        * @language zh_CN
        * 粒子总持续时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public totalTime: number = 0;
                                                        
        /**
        * @private
        * @language zh_CN
        * 最大粒子数量(初始化geometry用)
        * @version Egret 3.0
        * @platform Web,Native
        */
        public maxCount: number = 0;

        /**
        * @language zh_CN
        * 粒子是否循环 1.0是循环 0.0是不循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loop: number = 1.0;  //0.0/1.0

        /**
        * @language zh_CN
        * 粒子持续时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public duration: number = 5.0;

        /**
        * @language zh_CN
        * 是否反转 1.0是反转 0.0是不反转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public reverse: number = 1.0;//0.0/1.0
        
        /**
        * @language zh_CN
        * 跟随的目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public followTarget: Object3D = null;

        /**
        * @private
        */
        public delayArray: Array<number>;
        /**
        * @private
        */
        public lifeArray: Array<number>;
        /**
        * @private
        */
        public rateArray: Array<number>;

        /**
        * @private
        */
        private _emitter: ParticleEmitter;

        /**
        * @language zh_CN
        * 构造函数
        * @param name 粒子动画状态名
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(name: string, emitter:ParticleEmitter) {
            this._emitter = emitter;
            this.name = name;

            this.animNodes = [];
            this.keyFrames = [];
        }

         /**
        * @language zh_CN
        * 获取发射器
        * @return ParticleEmitter
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get emitter(): ParticleEmitter {
            return this._emitter;
        }

        /**
        * @language zh_CN
        * 添加动画功能节点
        * 添加继承 animNodeBase 功能节点 例如粒子的 加速度功能节点，匀速功能节点
        * @param node 节点对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addNode(node: AnimationNode) {
            node.state = this ;
            this.animNodes.push(node);
        }

        /**
        * @language zh_CN
        * 移除动画功能节点
        * 删除指定的动画功能节点，但是不能动态删除，需要进行 功能重置
        * @param node 节点对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeNode(node: AnimationNode) {
            var index: number = this.animNodes.indexOf(node);
            if (index != -1)
                this.animNodes.splice(index, 1);
        }

         /**
        * @language zh_CN
        * 清空分配好的动画节点
        * @param node 节点对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clean() {
            this.animNodes.length = 0; 
        }

        //private addShaderPhase(shaderPhase: { [shaderPhase: number]: string[] }) {
        //    var names: string[];
        //    var phase: any; 
        //    for (phase in shaderPhase) {
        //        names = <string[]>shaderPhase[phase];
        //        for (var i: number = 0; i < names.length; i++) {
        //            this.vertex_shaders[phase] = this.vertex_shaders[phase] || [];
        //            this.vertex_shaders[phase].push(names[i]);
        //        }
        //    }
        //}

        private addShaderPhase(sourcePhase: { [shaderPhase: number]: string[] }, targetPhase: { [shaderPhase: number]: string[] }) {
            var names: string[];
            var phase: any;
            for (phase in sourcePhase) {
                names = <string[]>sourcePhase[phase];
                for (var i: number = 0; i < names.length; i++) {
                    targetPhase[phase] = targetPhase[phase] || [];
                    targetPhase[phase].push(names[i]);
                }
            }
        }

        /**
        * @language zh_CN
        * 计算节点
        * @private 
        */
        public calculate(geometry: Geometry) {
            //this.vertex_shaders[ShaderPhaseType.local_vertex] = [];
            //this.fragment_shaders[ShaderPhaseType.diffuse_fragment] = [];
            for (var i: number = 0; i < this.animNodes.length; i++) {
                this.addShaderPhase(this.animNodes[i].vertex_ShaderName, this.vertex_shaders);
                this.addShaderPhase(this.animNodes[i].fragment_ShaderName, this.fragment_shaders);

                var offsetIndex: number = geometry.vertexAttLength;
                for (var j: number = 0; j < this.animNodes[i].attributes.length; ++j) {
                    if (this.animNodes[i].attributes[j].size > 0) {
                        this.animNodes[i].attributes[j].offsetIndex = offsetIndex;
                        geometry.vertexAttLength += this.animNodes[i].attributes[j].size;
                        geometry.vertexSizeInBytes += this.animNodes[i].attributes[j].size * 4;
                        geometry.subGeometrys[0].preAttList.push(this.animNodes[i].attributes[j]);
                    }
                    offsetIndex = geometry.vertexAttLength;
                }
            }
        }
                
        /**
        * @language zh_CN
        * @private 
        */
        public fill(geometry: Geometry, maxParticle: number) {
            for (var i: number = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].build(geometry, maxParticle);
            }
        }
        
        /**
        * @language zh_CN
        * @private 
        */
        public update(time: number, delay: number, geometry: Geometry) {
            for (var i: number = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].update(time, delay, geometry);
            }
        }

        private _particleProperty: Float32Array = new Float32Array(6);

         /**
        * @language zh_CN
        * @private 
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            var scaleData: Vector3D;
            if (this._emitter.isFollowParticle && this._emitter.followTarget) {
                scaleData = this._emitter.followTarget.globalScale;
            }
            else {
                scaleData = this._emitter.globalScale;
            }

            //
            this._particleProperty[0] = animTime * 0.001;
            this._particleProperty[1] = this.loop;
            this._particleProperty[2] = this._emitter.isFollowParticle ? 1 : 0;
            this._particleProperty[3] = scaleData.x;
            this._particleProperty[4] = scaleData.y;
            this._particleProperty[5] = scaleData.z;

            context3DProxy.uniform1fv(usage["uniform_particleProperty"].uniformIndex, this._particleProperty);
            for (var i: number = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].activeState(time, animTime, delay, animDelay, usage, geometry, context3DProxy);
            }
        }


    }
}