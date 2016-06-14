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
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_bezier");

            this.fragment_ShaderName[ShaderPhaseType.start_fragment] = this.fragment_ShaderName[ShaderPhaseType.start_fragment] || [];
            this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_time_fs");

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
            //rate
            var rateValue: ConstValueShape = new ConstValueShape();
            rateValue.value = 1 / node.rate;
            this._rate = rateValue;
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

            var lifeArray: Array<number> = this._life.calculate(count);
            var speaceArray: Array<number> = this._rate.calculate(count);

            //使用bursts对speaceArray进行修正
            if (this._nodeData.bursts) {
                this.burstParticle(this._nodeData.bursts, speaceArray, count);
            }

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var bornTime: number = 0;
            var maxLife: number = 0;
            for (var i: number = 0; i < count; ++i) {

                //当前累加的间隔时间就是出生时间
                bornTime += speaceArray[i];
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
            this.particleAnimationState.loopTime = loopTime;

        }


        private burstParticle(bursts: Array<Point>, speaceArray: Array<number>, count: number): Array<number> {

            //sort bursts
            bursts.sort(function (a: Point, b: Point) {
                return a.x - b.x;
            });


            var burstPoint: Point;
            var bornTime: Array<number> = [];
            bornTime.length = count;
            var lastTime: number = 0;
            for (var i: number = 0; i < speaceArray.length; i++) {
                lastTime += speaceArray[i];
                bornTime[i] = lastTime;
            }

           

            for (var i: number = 0; i < bursts.length; i++) {
                burstPoint = bursts[i];
                //喷射时间超过了duration
                if (this._nodeData.loop == false && burstPoint.x >= this._nodeData.duration)
                    continue;

                for (var k: number = 0; k < burstPoint.y; k++) {
                    bornTime.push(burstPoint.x);
                }
            }

            bornTime.sort(function (a: number, b: number) {
                return a - b;
            });

            bornTime.length = count;

            lastTime = 0;
            for (var i: number = 0; i < count; i++) {
                speaceArray[i] = bornTime[i] - lastTime;
                lastTime = bornTime[i];
            }


            return speaceArray;
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