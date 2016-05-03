module egret3d {

    /**
    * @private
    */
    export class ParticleRotation extends AnimationNode {
      
        public rotations: ValueShape = new Vec3ConstValueShape();
        private attribute_time: GLSL.VarRegister;
        private particleAnimationState: ParticleAnimationState;
        private rotationMat: Matrix4_4 = new Matrix4_4();
        constructor() {
            super();

            this.name = "ParticleRotation";
        }

        public build(geometry: Geometry, count: number) {

            this.particleAnimationState = <ParticleAnimationState>this.state;
            var rotationArray: Vector3D[] = this.rotations.calculate(count);
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            var pos: Vector3D = new Vector3D();
            for (var i: number = 0; i < count; ++i) {
                var rot: Vector3D = rotationArray[i]; 
                this.rotationMat.identity();
                this.rotationMat.rotation(rot.x, rot.y, rot.z);
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength ;

                    pos.x = geometry.verticesData[index + 0];
                    pos.y = geometry.verticesData[index + 1];
                    pos.z = geometry.verticesData[index + 2];

                    this.rotationMat.transformVector4(pos, pos);

                    geometry.verticesData[index + 0] = pos.x;
                    geometry.verticesData[index + 1] = pos.y;
                    geometry.verticesData[index + 2] = pos.z;
                }
            }

        }
    }
} 