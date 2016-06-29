module egret3d {

    /**
    * @private
    */
    export class ParticleTime extends AnimationNode {

        private _nodeData: ParticleDataLife;
        /**
        * 所有单位粒子的生命周期
        */
        private _life: ValueShape;

        private attribute_time: GLSL.VarRegister;
        private _animationState: ParticleAnimationState;

       

        constructor() {
            super();

            this.name = "ParticleSpeedNode";

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_bezier");
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_time_vs");

            this.fragment_ShaderName[ShaderPhaseType.start_fragment] = this.fragment_ShaderName[ShaderPhaseType.start_fragment] || [];
            this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_time_fs");

            this.fragment_ShaderName[ShaderPhaseType.diffuse_fragment] = this.fragment_ShaderName[ShaderPhaseType.diffuse_fragment] || [];
            this.fragment_ShaderName[ShaderPhaseType.diffuse_fragment].push("particle_diffuse_fragment");

            this.attribute_time = new GLSL.VarRegister();
            this.attribute_time.name = "attribute_time";
            this.attribute_time.size = 3;
            this.attributes.push(this.attribute_time);
        }


        /**
        * @language zh_CN
        * 填充粒子生命周期数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            var node: ParticleDataLife = this._nodeData = <ParticleDataLife>data;
            //life
            var lifeValue: ConstRandomValueShape = new ConstRandomValueShape();
            lifeValue.max = node.lifeMax;
            lifeValue.min = node.lifeMin;
            this._life = lifeValue;


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

            this._animationState = <ParticleAnimationState>this.state;
            var emission: ParticleDataEmission = this._animationState.emitter.data.emission;

            var lifeArray: Array<number> = this._life.calculate(count);
            
            var bornTimeArray: Array<number>;
            if (emission.type == ParticleValueType.Const) {
                bornTimeArray = this.createBornTimeConst(count, emission);
            } else {
                bornTimeArray = this.createBornTimeBezier(count, emission);
            }
            //排序
            bornTimeArray.sort(function (a: number, b: number) {
                return a - b;
            });
            //略去多余的部分
            bornTimeArray.length = count;

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
           
            var maxLife: number = 0;
            var bornTime: number = 0;
            for (var i: number = 0; i < count; ++i) {

                //当前累加的间隔时间就是出生时间
                bornTime = bornTimeArray[i];
                var lifeTime: number = lifeArray[i];

                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_time.offsetIndex;

                    geometry.verticesData[index + 0] = bornTime;                        //出生时间
                    geometry.verticesData[index + 1] = lifeTime;                            //单次生命周期时间
                    geometry.verticesData[index + 2] = i;                                   //下标
                    maxLife = Math.max(maxLife, lifeTime);
                }
            }

            var loopTime: number = maxLife;
            if (bornTime > maxLife) {
                loopTime = bornTime;
            }

            //粒子一个完整的周期为最后一个粒子走完周期
            this._animationState.loopTime = loopTime;

        }

        /**
        * private
        * 出生时间创建(const)
        */
        private createBornTimeConst(count:number, emission:ParticleDataEmission): Array<number> {
            var bornTimeArray: Array<number> = [];
            
            var speace: number = 1 / emission.rate;
            for (var i: number = 0; i < count; i++) {
                bornTimeArray.push(i * speace + speace);//i + 1
            }
            //使用bursts对speaceArray进行修正
            if (emission.bursts) {
                bornTimeArray = this.burstParticle(emission.bursts, bornTimeArray, count);
            }
            return bornTimeArray;
        }

        /**
         * private
         * 出生时间创建(bezier);
         */
        private createBornTimeBezier(count: number, emission: ParticleDataEmission): Array<number> {
            var bornTimeArray: Array<number> = [];
            var data: BezierData = emission.bezier;
            //采用的算法为：
            //1，将duration划分为每1s10帧，然后获得总帧数totalFrame
            //2，根据totalFrame遍历循环，计算每个frame对应的curveValue数据：particleCount += curveValue/10;
            //3，取出particleCount中的超过整数部分，记为particleCountInt
            //4，根据particleCountInt在这个frame中，插入对应数量的bornTime，平均分配
            //5，particleCount减去particleCountInt获得小数部分
            //6，执行逻辑2
            const PerSecFrame: number = 10;
            const FrameTime: number = 1000 / PerSecFrame;
            const duration: number = this._nodeData.duration * 1000;
            const TotalFrame: number = Math.ceil(this._nodeData.duration * 1000 / FrameTime);

            var currentTime: number = 0;
            var rateValue: number = 0;
            var insertCount: number = 0;
            var totalInsertCount: number = 0;

            while (totalInsertCount < count) {
                currentTime += FrameTime;
                rateValue += data.calc((currentTime % duration) / duration) / PerSecFrame;
                if (rateValue >= 1) {
                    insertCount = Math.floor(rateValue);
                    totalInsertCount += insertCount;
                    for (var i: number = 0; i < insertCount; i++) {
                        bornTimeArray.push((currentTime + i * FrameTime / insertCount) / 1000);
                    }
                    rateValue -= insertCount;
                }
                        
            }
            //使用bursts对speaceArray进行修正
            if (emission.bursts) {
                bornTimeArray = this.burstParticle(emission.bursts, bornTimeArray, count);
            }
            return bornTimeArray;
        }
        

        /**
        * private
        * 插入粒子爆炸生成
        */
        private burstParticle(bursts: Array<Point>, bornTimeArray: Array<number>, count: number): Array<number> {

            //sort bursts
            bursts.sort(function (a: Point, b: Point) {
                return a.x - b.x;
            });

            var duration: number = this._nodeData.duration;
            var burstLife: Array<number> = [];
            var burstPoint: Point;
            for (var i: number = 0; i < bursts.length; i++) {
                burstPoint = bursts[i];
                for (var k: number = 0; k < burstPoint.y; k++) {
                    burstLife.push(burstPoint.x);
                }
            }

            var maxTime: number = bornTimeArray[bornTimeArray.length - 1];
            var loopCount: number = 1;
            if (this._nodeData.loop) {
                loopCount = Math.ceil(maxTime / this._nodeData.duration);
            }
            for (var i: number = 0, count = burstLife.length; i < count; i++)
            {
                var tempTime: number = burstLife[i];
                for (var btCt: number = 0; btCt < loopCount; btCt++) {
                    bornTimeArray.push(btCt * duration + tempTime);
                }
            }

            
            return bornTimeArray;
        }


         /**
        * @language zh_CN
        * 获取时间节点在geometry的顶点数据中偏移量
        * @return number
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get offsetIndex(): number {
            return this.attribute_time.offsetIndex;
        }

    }
} 