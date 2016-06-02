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

        private count: number = 0;
        private particleAnimationState: ParticleAnimationState; 
        private lifeCircles: Array<number>;

        private _followPosition: boolean = false;
        private _followRotation: boolean = false;
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

        }

        /**
        * @language zh_CN
        * 填充粒子跟随属性
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            var node: ParticleDataProperty = <ParticleDataProperty>data;
            this._followPosition = node.followPosition;
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
            
        }

        private bornTime: number = 0;
        private life: number = 0;
        private unitTotalLife: number = 0;
        private id: number = 0; 
        private timeIndex: number = 0;

        /**
        * @language zh_CN
        * 顶点数据是否需要重新upload
        * @version Egret 3.0
        * @platform Web,Native
        */
        private geometryDirty: boolean;

        public update(time: number, delay: number, geometry: Geometry) {

            this.geometryDirty = false;
            if (!this.particleAnimationState.followTarget)
                return;
            if (!this._followPosition && !this._followRotation)
                return;
            //time += delay;

            //先重置成-1，然后每帧检测每个粒子的上一帧的所属出身次数和下一帧的出身次数，判定是否要刷新他的初始位置
            if (this.lifeCircles == null) {
                this.lifeCircles = [];
                for (var i: number = 0; i < this.count; i++) {
                    this.lifeCircles[i] = -1;
                }
            }

            var delayArray: Array<number> = this.particleAnimationState.delayArray;
            var lifeArray: Array<number> = this.particleAnimationState.lifeArray;
            var rateArray: Array<number> = this.particleAnimationState.rateArray;


            var index: number = 0;
            var vertices: number = geometry.vertexCount / this.count;
            var particleIndex: number = 0;
            var changed: boolean = false;

            var timeOffsetIndex: number = this.particleAnimationState.emitter.timeNode.offsetIndex;
            for (var i: number = 0; i < this.count; ++i) {

                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;

                this.bornTime = geometry.verticesData[this.timeIndex + 0];          //出生时间
                this.life = geometry.verticesData[this.timeIndex + 1];              //单次生命周期时间
                this.unitTotalLife = geometry.verticesData[this.timeIndex + 2];     //从0开始计数到循环到最后一次结束的总时间
                //this.id = geometry.verticesData[this.timeIndex + 3];                //下标(i)

                var curCircleIndex: number = -1;
                var particleTime: number = time * 0.001;
                if (particleTime >= this.bornTime) {
                    //粒子超时了，并且不需要继续循环
                    if (particleTime > this.unitTotalLife && !this.particleAnimationState.loop)
                        continue;

                    curCircleIndex = Math.floor((particleTime - this.bornTime) / lifeArray[i]);
                    if (curCircleIndex != this.lifeCircles[i]) {
                        this.lifeCircles[i] = curCircleIndex;
                        changed = true;
                        for (var j: number = 0; j < vertices; ++j) {
                            index = particleIndex + j;
                            index = index * geometry.vertexAttLength + this.attribute_followPosition.offsetIndex;
                            if (this._followPosition) {
                                geometry.verticesData[index + 0] = this.particleAnimationState.followTarget.x;
                                geometry.verticesData[index + 1] = this.particleAnimationState.followTarget.y;
                                geometry.verticesData[index + 2] = this.particleAnimationState.followTarget.z;
                            }

                            index = particleIndex + j;
                            index = index * geometry.vertexAttLength + this.attribute_followRotation.offsetIndex;
                            if (this._followRotation) {
                                geometry.verticesData[index + 0] = this.particleAnimationState.followTarget.rotationX * Math.PI / 180;
                                geometry.verticesData[index + 1] = this.particleAnimationState.followTarget.rotationY * Math.PI / 180;
                                geometry.verticesData[index + 2] = this.particleAnimationState.followTarget.rotationZ * Math.PI / 180;
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