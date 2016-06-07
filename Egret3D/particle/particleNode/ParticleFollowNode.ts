module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleFollowNode
    * @classdesc
    * 粒子跟随效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleFollowNode extends AnimationNode {
                
        /**
        * @language zh_CN
        * 跟随目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        private attribute_followPosition: GLSL.VarRegister;
        private attribute_followRotation: GLSL.VarRegister;
        private attribute_followScale: GLSL.VarRegister;

        private count: number = 0;
        private particleAnimationState: ParticleAnimationState; 
        private lifeCircles: Array<number>;

        private _followRotation: boolean = false;
        private _followScale: boolean = false;
        constructor() {
            super();
            this.name = "ParticleFollowNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_follow_vs");

            this.attribute_followPosition = new GLSL.VarRegister();
            this.attribute_followPosition.name = "attribute_followPosition";
            this.attribute_followPosition.size = 3;
            this.attributes.push(this.attribute_followPosition);

            this.attribute_followRotation = new GLSL.VarRegister();
            this.attribute_followRotation.name = "attribute_followRotation";
            this.attribute_followRotation.size = 3;
            this.attributes.push(this.attribute_followRotation);

            this.attribute_followScale = new GLSL.VarRegister();
            this.attribute_followScale.name = "attribute_followScale";
            this.attribute_followScale.size = 3;
            this.attributes.push(this.attribute_followScale);

        }

        /**
        * @language zh_CN
        * 填充粒子跟随属性
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            var node: ParticleDataFollowTarget = <ParticleDataFollowTarget>data;
            this._followScale = node.followScale;
            this._followRotation = node.followRotation;
        }

        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {
            this.count = count;
            this.particleAnimationState = <ParticleAnimationState>this.state;
            //先重置成-1，然后每帧检测每个粒子的上一帧的所属出身次数和下一帧的出身次数，判定是否要刷新他的初始位置
            this.lifeCircles = [];
            for (var i: number = 0; i < this.count; i++) {
                this.lifeCircles[i] = -1;
            }
        }

        private bornTime: number = 0;
        private life: number = 0;
        private id: number = 0; 
        private timeIndex: number = 0;

        /**
        * @language zh_CN
        * 顶点数据是否需要重新upload
        * @version Egret 3.0
        * @platform Web,Native
        */
        private geometryDirty: boolean = false;

        /**
        * @language zh_CN
        * @param animTime 动画当前时间（单位为ms）
        * @param delay  这一帧的时间跨度
        * @param geometry 几何对象
        * 顶点数据是否需要重新upload
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(animTime: number, delay: number, geometry: Geometry) {
            //保留原来的geometryDirty为true的属性
            this.geometryDirty = this.geometryDirty;
            //非循环的粒子生命周期达上限
            var loop: boolean = this.particleAnimationState.emitter.data.life.loop;
            var maxLife: number = this.particleAnimationState.loopTime + this.particleAnimationState.emitter.data.life.duration;
            if (!loop && (animTime * 0.001 >= maxLife)) {
                return;
            }

            //animTime += delay;

           

            var index: number = 0;
            var vertices: number = geometry.vertexCount / this.count;
            var particleIndex: number = 0;
            var changed: boolean = false;

            var timeOffsetIndex: number = this.particleAnimationState.emitter.timeNode.offsetIndex;
            var particleTime: number = animTime * 0.001 - this.particleAnimationState.emitter.data.life.delay;
            
            //没有跟随对象，使用自己
            var followTarget: Object3D = this.particleAnimationState.followTarget || this.particleAnimationState.emitter;
            for (var i: number = 0; i < this.count; ++i) {

                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;

                this.bornTime = geometry.verticesData[this.timeIndex + 0];          //出生时间
                this.life = geometry.verticesData[this.timeIndex + 1];              //单次生命周期时间
                //this.id = geometry.verticesData[this.timeIndex + 2];                //下标(i)

                var curCircleIndex: number = -1;
                
                if (particleTime >= this.bornTime) {
                    //粒子超时了，并且不需要继续循环
                    if (particleTime > (this.bornTime + this.life) && !loop)
                        continue;

                    curCircleIndex = Math.floor((particleTime - this.bornTime) / this.particleAnimationState.loopTime);
                    if (curCircleIndex != this.lifeCircles[i]) {
                        this.lifeCircles[i] = curCircleIndex;
                        changed = true;
                        for (var j: number = 0; j < vertices; ++j) {
                            //position
                            index = particleIndex + j;
                            index = index * geometry.vertexAttLength + this.attribute_followPosition.offsetIndex;
                            if (true) {
                                geometry.verticesData[index + 0] = followTarget.globalPosition.x;
                                geometry.verticesData[index + 1] = followTarget.globalPosition.y;
                                geometry.verticesData[index + 2] = followTarget.globalPosition.z;
                            }
                            //rotation
                            index = particleIndex + j;
                            index = index * geometry.vertexAttLength + this.attribute_followRotation.offsetIndex;
                            if (this._followRotation) {
                                geometry.verticesData[index + 0] = followTarget.globalRotationX * MathUtil.DEGREES_TO_RADIANS;
                                geometry.verticesData[index + 1] = followTarget.globalRotationY * MathUtil.DEGREES_TO_RADIANS;
                                geometry.verticesData[index + 2] = followTarget.globalRotationZ * MathUtil.DEGREES_TO_RADIANS;
                            } else {
                                geometry.verticesData[index + 0] = 0;
                                geometry.verticesData[index + 1] = 0;
                                geometry.verticesData[index + 2] = 0;
                            }
                            //scale
                            index = particleIndex + j;
                            index = index * geometry.vertexAttLength + this.attribute_followScale.offsetIndex;
                            if (this._followScale) {
                                geometry.verticesData[index + 0] = followTarget.globalScaleX;
                                geometry.verticesData[index + 1] = followTarget.globalScaleY;
                                geometry.verticesData[index + 2] = followTarget.globalScaleZ;
                            } else {
                                geometry.verticesData[index + 0] = 0;
                                geometry.verticesData[index + 1] = 0;
                                geometry.verticesData[index + 2] = 0;
                            }

                        }
                    }
                }
            }

            this.geometryDirty = changed;
        }

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            if (this.geometryDirty) {
                geometry.geometry.upload(context3DProxy);
                this.geometryDirty = false;
            }
        }
    }

} 