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

        private delay: number = 0;
        private life: number = 0;
        private space: number = 0;
        private id: number = 0; 
        private duration: number = 0; 

        private tempTime: number = 0; 
        private numSpace: number = 0; 
        private timeIndex: number = 0;
        private currentTime: number = 0;

        public update(time: number, delay: number, geometry: Geometry, context: Context3DProxy) {

            //if (!this.follow) return;
            var index: number = 0;
            var vertices: number = geometry.vertexCount / this.count;

            for (var i: number = 0; i < this.count; ++i) {
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    this.timeIndex = index * geometry.vertexAttLength + 5;
                    index = index * geometry.vertexAttLength + this.attribute_followPosition.offsetIndex;

                    this.delay = geometry.verticesData[this.timeIndex + 0];
                    this.life = geometry.verticesData[this.timeIndex + 1] ;
                    this.space = geometry.verticesData[this.timeIndex + 2];
                    this.id = geometry.verticesData[this.timeIndex + 3];

                    this.tempTime = time * 0.001;

                    var numberSpace = this.id * this.space ;
                    this.tempTime = Math.max(this.tempTime - numberSpace - this.delay , 0.0);

                    if (this.particleAnimationState.loop == 0.0) {
                        this.duration = this.particleAnimationState.duration;
                        if (numberSpace > this.duration )
                        {
                            geometry.verticesData[index + 0] = this.particleAnimationState.followTarget.x;
                            geometry.verticesData[index + 1] = this.particleAnimationState.followTarget.y;
                            geometry.verticesData[index + 2] = this.particleAnimationState.followTarget.z;
                        }
                    } else {
                        this.duration = this.particleAnimationState.totalTime + this.space;//- this.particleAnimationState.delayLife;
                        this.tempTime = this.tempTime % this.duration;
                        //this.tempTime = Math.max(this.tempTime - numberSpace, 0.0);
                        if (this.tempTime - delay * 0.001 >= this.life || this.tempTime - delay * 0.001 <= 0.0 ) {
                            geometry.verticesData[index + 0] = this.particleAnimationState.followTarget.x;
                            geometry.verticesData[index + 1] = this.particleAnimationState.followTarget.y;
                            geometry.verticesData[index + 2] = this.particleAnimationState.followTarget.z;
                        } 
                    }
                }
            }
            if (true) {
                geometry.upload(context);
            }
        }
    }

} 