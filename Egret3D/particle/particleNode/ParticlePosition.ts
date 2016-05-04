module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticlePosition
    * @classdesc
    * 粒子位置效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticlePosition extends AnimationNode {

        /**
        * @private
        */
        public positions: ValueShape = new Vec3ConstValueShape();

        private particleAnimationState: ParticleAnimationState;
        private attribute_offsetPosition: GLSL.VarRegister;
        constructor() {
            super();
            this.name = "ParticlePosition";

            this.attribute_offsetPosition = new GLSL.VarRegister();
            this.attribute_offsetPosition.name = "attribute_offsetPosition";
            this.attribute_offsetPosition.size = 3;
            this.attributes.push(this.attribute_offsetPosition);
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
            var posArray: Vector3D[] = this.positions.calculate(count);
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            for (var i: number = 0; i < count; ++i) {
                var pos: Vector3D = posArray[i]; 
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_offsetPosition.offsetIndex;

                    geometry.verticesData[index + 0] += pos.x;
                    geometry.verticesData[index + 1] += pos.y;
                    geometry.verticesData[index + 2] += pos.z;
                }
            }

        }
    }
} 