module egret3d {

    /**
    * @private
    */
    export class ParticleTime extends AnimationNode {

        /**
        * 所有单位粒子出生延迟时间
        */
        private _delay: ValueShape;

        /**
        * 所有单位粒子的生命周期
        */
        private _life: ValueShape;

        /**
        * 所有单位粒子的发射间隔
        */
        private _rate: ValueShape;

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

            var delayArray:Array<number> = this.particleAnimationState.delayArray = this._delay.calculate(count);
            var lifeArray: Array<number> = this.particleAnimationState.lifeArray = this._life.calculate(count);
            var rateArray: Array<number> = this.particleAnimationState.rateArray = this._rate.calculate(count);

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var currentPeace: number = 0;           //当前累加的间隔时间
            var unitTotalLife: number = 0;          //每个粒子单元从0开始到最后一个循环结束的时间
            for (var i: number = 0; i < count; ++i) {

                var delayTime: number = delayArray[i];
                var lifeTime: number = lifeArray[i];
                currentPeace += rateArray[i];

                unitTotalLife = this.particleAnimationState.duration + delayTime + lifeTime;
                var lifeCount: number = Math.floor((unitTotalLife - delayTime - currentPeace)  / lifeTime);
                unitTotalLife = lifeCount * lifeTime + currentPeace + delayTime;
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_time.offsetIndex;

                    geometry.verticesData[index + 0] = currentPeace + delayTime;//出生时间
                    geometry.verticesData[index + 1] = lifeTime;                //单次生命周期时间
                    geometry.verticesData[index + 2] = unitTotalLife ;          //从0开始计数到循环到最后一次结束的总时间
                    geometry.verticesData[index + 3] = i;                       //下标
                }
            }
            //粒子一个完整的周期为最后一个粒子走完周期
            this.particleAnimationState.totalTime = unitTotalLife;

        }


        public init(data:ParticleData): void {
            //delay
            var delayValue: ConstRandomValueShape = new ConstRandomValueShape();
            delayValue.max = data.delayMax;
            delayValue.min = data.delayMin;
            this._delay = delayValue;
            //life
            var lifeValue: ConstRandomValueShape = new ConstRandomValueShape();
            lifeValue.max = data.lifeMax;
            lifeValue.min = data.lifeMin;
            this._life = lifeValue;
            //rate
            var rateValue: ConstValueShape = new ConstValueShape();
            rateValue.value = 1 / data.rate;
            this._rate = rateValue;
        }
    }
} 