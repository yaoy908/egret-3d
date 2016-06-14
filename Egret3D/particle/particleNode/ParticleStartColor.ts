module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleStartColor
    * @classdesc
    * 粒子起始颜色，用顶点色实现
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleStartColor extends AnimationNode {

        /**
        * @private
        */
        private _colorFrom: Color = new Color();
        private _colorTo: Color = new Color();
        private particleAnimationState: ParticleAnimationState;
        constructor() {
            super();
            this.name = "ParticleStartColor";
        }


        /**
        * @language zh_CN
        * 填充粒子发射器起始颜色
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            var node: ParticleDataProperty = <ParticleDataProperty>data;
            this._colorFrom.copyFrom(node.startColorFrom);
            this._colorTo.copyFrom(node.startColorTo);
        }

        private bornTime: number = 0;
        private life: number = 0;
        private id: number = 0;
        private timeIndex: number = 0;

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
            const vertexColorOffset: number = 3;//前面三个数据是xyz
            
            var vertices: number = geometry.vertexCount / count;
            var tempColor: Color = new Color();
            var index: number = 0;

            var timeOffsetIndex: number = this.particleAnimationState.emitter.timeNode.offsetIndex;
            var particleIndex: number = 0;

            var progress: number = 0;
            var duration: number = this.particleAnimationState.emitter.data.life.duration;

            for (var i: number = 0; i < count; ++i) {
                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                this.bornTime = geometry.verticesData[this.timeIndex + 0];          //出生时间
                //this.life = geometry.verticesData[this.timeIndex + 1];              //单次生命周期时间
                //this.id = geometry.verticesData[this.timeIndex + 2];              //下标(i)
                progress = this.bornTime / duration;
                progress = progress - Math.floor(progress);                         //取小数部分
                tempColor.lerp(this._colorFrom, this._colorTo, progress);
                tempColor.a /= 256;
                tempColor.r /= 256;
                tempColor.g /= 256;
                tempColor.b /= 256;


                


                for (var j: number = 0; j < vertices; ++j) {
                    
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + vertexColorOffset;

                    geometry.verticesData[index + 0] = tempColor.r;
                    geometry.verticesData[index + 1] = tempColor.g;
                    geometry.verticesData[index + 2] = tempColor.b;
                    geometry.verticesData[index + 3] = tempColor.a;
                }
            }

        }

        


    }
} 