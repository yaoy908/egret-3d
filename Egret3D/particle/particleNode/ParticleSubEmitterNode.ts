module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleSubEmitterNode
    * @classdesc
    * 粒子跟随效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleSubEmitterNode extends AnimationNode {

        /**
        * @language zh_CN
        * 跟随目标
        * @version Egret 3.0
        * @platform Web,Native
        */
      
       
        private particleAnimationState: ParticleAnimationState;
        private lifeCircles: Array<number>;

        constructor() {
            super();
            this.name = "ParticleSubEmitterNode";
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
        private count: number = 0;
        private position: Vector3D = new Vector3D();
        private event: ParticleEvent3D = new ParticleEvent3D(ParticleEvent3D.EMIT_PARTICLE_BIRTH);
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

            var positionOffsetIndex: number = this.particleAnimationState.emitter.positionNode.offsetIndex;
            var particleTime: number = animTime * 0.001 - this.particleAnimationState.emitter.data.life.delay;

            //没有跟随对象，使用自己
            var followTarget: Object3D = this.particleAnimationState.followTarget || this.particleAnimationState.emitter;
            for (var i: number = 0; i < this.count; ++i) {

                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + positionOffsetIndex;

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
                        //position
                        this.position.x = geometry.verticesData[index + 0];
                        this.position.y = geometry.verticesData[index + 1];
                        this.position.z = geometry.verticesData[index + 2];

                        this.event.target = this;
                        this.event.position = this.position;
                        this.dispatchEvent(this.event);
                    }
                }
            }


        }


        

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {

        }
    }

} 