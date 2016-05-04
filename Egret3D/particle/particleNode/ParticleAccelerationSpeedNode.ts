module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleAccelerationSpeedNode
    * @classdesc
    * 粒子加速度效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleAccelerationSpeedNode extends AnimationNode {
        
        /**
        * @private
        */
        public speedShape: ValueShape = new Vec3ConstRandomValueShape();
        private attribute_accelerationSpeed: GLSL.VarRegister
        constructor() {
            super();
            this.name = "ParticleAccelerationSpeedNode"; 
            this.vertex_ShaderName = "particle_accelerationSpeed";

            this.attribute_accelerationSpeed = new GLSL.VarRegister();
            this.attribute_accelerationSpeed.name = "attribute_accelerationSpeed";
            this.attribute_accelerationSpeed.size = 3;
            this.attributes.push(this.attribute_accelerationSpeed);
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
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var data: any[] = this.speedShape.calculate(count);
            for (var i: number = 0; i < count; ++i) {
                var accSpeed: Vector3D = data[i] ; 
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_accelerationSpeed.offsetIndex;

                    geometry.verticesData[index + 0] = accSpeed.x;
                    geometry.verticesData[index + 1] = accSpeed.y;
                    geometry.verticesData[index + 2] = accSpeed.z;
                }
            }
        }
    }
} 