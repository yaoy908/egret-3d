module egret3d {
    
    /**
    * @private
    */
    export class ParticleDirectionNode extends AnimationNode {

        public direction: Vector3D = new Vector3D(0, 20, 0);
        public type: number = ParticleType.PT_GRAVITY;
        constructor() {
            super();
            var var0: GLSL.VarRegister = new GLSL.VarRegister();
            var0.name = "attribute_direction";
            var0.size = 3;
            this.attributes.push(var0);
        }

        public buildGeomtry(geometry: Geometry, count: number) {
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            var dir: Vector3D = new Vector3D();
            this.direction.normalize();

            var var0: GLSL.VarRegister = this.attributes[0];
            switch (this.type) {
                case ParticleType.PT_GRAVITY:
                    for (var i: number = 0; i < count; ++i) {

                        for (var j: number = 0; j < vertices; ++j) {
                            index = i * vertices + j;
                            index = index * geometry.vertexAttLength + var0.offset;
                            geometry.verticesData[index + 0] = this.direction.x;
                            geometry.verticesData[index + 1] = this.direction.y;
                            geometry.verticesData[index + 2] = this.direction.z;
                        }
                    }
                    break;
                case ParticleType.PT_RANGE:
                    for (var i: number = 0; i < count; ++i) {
                        dir.x = Math.random() - 0.5;
                        dir.y = Math.random() - 0.5;
                        dir.z = Math.random() - 0.5;
                        dir.normalize();

                        for (var j: number = 0; j < vertices; ++j) {
                            index = i * vertices + j;
                            index = index * geometry.vertexAttLength + var0.offset;
                            geometry.verticesData[index + 0] = dir.x;
                            geometry.verticesData[index + 1] = dir.y;
                            geometry.verticesData[index + 2] = dir.z;
                        }
                    }
                    break;
            }
        }
    }
} 