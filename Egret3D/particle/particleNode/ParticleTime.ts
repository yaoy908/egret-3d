module egret3d {

    /**
    * @private
    */
    export class ParticleTime extends AnimationNode {

        /**
        * 发射器的生命周期 粒子发射器的持续时间
        */
        public duration: number = 1.0;

        /**
        * 所有单位粒子出生延迟时间
        */
        public delay: ValueShape = new ConstValueShape();

        /**
        * 所有单位粒子的生命周期
        */
        public life: ValueShape = new ConstValueShape();

        /**
        * 所有单位粒子的生命周期
        */
        public rate: ValueShape = new ConstValueShape();

        private attribute_time: GLSL.VarRegister;
        private particleAnimationState: ParticleAnimationState;
        constructor() {
            super();

            this.name = "ParticleSpeedNode";

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_time_vs");

            this.frament_ShaderName[ShaderPhaseType.start_fragment] = this.frament_ShaderName[ShaderPhaseType.start_fragment] || [];
            this.frament_ShaderName[ShaderPhaseType.start_fragment].push("particle_time_fs");

            this.attribute_time = new GLSL.VarRegister();
            this.attribute_time.name = "attribute_time";
            this.attribute_time.size = 4;
            this.attributes.push(this.attribute_time);
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

            this.particleAnimationState = <ParticleAnimationState>this.state;

            var startArray: number[] = this.delay.calculate(count);
            var lifeArray: number[] = this.life.calculate(count);
            var speaceArray: number[] = this.rate.calculate(count);

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            for (var i: number = 0; i < count; ++i) {

                var delayTime: number = startArray[i];
                var lifeTime: number = lifeArray[i];
                var rateTime: number = speaceArray[i];
                var id: number = i;
                var maxSpace: number = rateTime * i;
                var maxCycle: number = maxSpace + lifeTime;

                this.particleAnimationState.maxSpace = Math.max(this.particleAnimationState.maxSpace, maxSpace);
                if (this.particleAnimationState.totalTime < maxCycle) {
                    this.particleAnimationState.totalTime = maxCycle;
                    this.particleAnimationState.delayLife = lifeTime; 
                }

                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_time.offsetIndex;

                    geometry.verticesData[index + 0] = delayTime;
                    geometry.verticesData[index + 1] = lifeTime;
                    geometry.verticesData[index + 2] = rateTime ;
                    geometry.verticesData[index + 3] = i;
                }
            }

        }
    }
} 