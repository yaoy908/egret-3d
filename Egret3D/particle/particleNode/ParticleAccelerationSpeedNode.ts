module egret3d {
        
    /**
    * @private
    */
    export class ParticleAccelerationSpeedNode extends AnimationNode {

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