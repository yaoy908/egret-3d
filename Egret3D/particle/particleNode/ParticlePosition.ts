module egret3d {

    /**
    * @private
    */
    export class ParticlePosition extends AnimationNode {

      
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