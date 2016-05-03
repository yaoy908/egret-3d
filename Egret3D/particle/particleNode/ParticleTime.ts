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
            this.vertex_ShaderName = "particle_time";

            this.attribute_time = new GLSL.VarRegister();
            this.attribute_time.name = "attribute_time";
            this.attribute_time.size = 4;
            this.attributes.push(this.attribute_time);
        }

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
                this.particleAnimationState.totalTime = Math.max(this.particleAnimationState.totalTime, maxCycle);

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