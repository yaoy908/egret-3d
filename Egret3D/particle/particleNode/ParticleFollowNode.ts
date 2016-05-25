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
        //public follow: Object3D;
        private attribute_followPosition: GLSL.VarRegister;
        private attribute_followRotation: GLSL.VarRegister;

        private count: number = 0;
        private particleAnimationState: ParticleAnimationState; 
        private lifeCircles: Array<number>;
        constructor() {
            super();
            this.name = "ParticleFollowNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_follow_vs");

            this.attribute_followPosition = new GLSL.VarRegister();
            this.attribute_followPosition.name = "attribute_followPosition";
            this.attribute_followPosition.size = 3;
            this.attributes.push(this.attribute_followPosition);

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
        private duration: number = 0; 

        private tempTime: number = 0; 
        private numSpace: number = 0; 
        private timeIndex: number = 0;
        private currentTime: number = 0;

        public update(time: number, delay: number, geometry: Geometry, passUsage: PassUsage,context: Context3DProxy) {

            if (!this.particleAnimationState.followTarget) {
                return;
            }
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
            for (var i: number = 0; i < this.count; ++i) {

                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + 5;

                this.bornTime = geometry.verticesData[this.timeIndex + 0];          //出生时间
                this.life = geometry.verticesData[this.timeIndex + 1];              //单次生命周期时间
                this.unitTotalLife = geometry.verticesData[this.timeIndex + 2];     //从0开始计数到循环到最后一次结束的总时间
                //this.id = geometry.verticesData[this.timeIndex + 3];                //下标(i)

                var curCircleIndex: number = -1;
                var particleTime: number = time * 0.001;// - this.particleAnimationState.startTime;
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
                            this.timeIndex = index * geometry.vertexAttLength + 5;
                            index = index * geometry.vertexAttLength + this.attribute_followPosition.offsetIndex;
                            geometry.verticesData[index + 0] = this.particleAnimationState.followTarget.x;
                            geometry.verticesData[index + 1] = this.particleAnimationState.followTarget.y;
                            geometry.verticesData[index + 2] = this.particleAnimationState.followTarget.z;
                        }
                    }
                }
            }

            if (changed) {
                geometry.upload(context);
            }
        }
    }

} 