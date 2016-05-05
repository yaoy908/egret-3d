module egret3d {
    /**
    * @private
    */
    export class ParticlePositionNode extends AnimationNode {

        public type: number = EmitterType.ET_CYLINDER;
        public parameters: any = [500, 500, 500];

        constructor() {
            super();

            var var0: GLSL.VarRegister = new GLSL.VarRegister();
            var0.name = "attribute_offset";
            var0.size = 3;
            this.attributes.push(var0);
        }

        protected getType(): number {
            switch (this.type) {
                case EmitterType.ET_LINE:
                    return ValueType.line;
                case EmitterType.ET_PLANE:
                    return ValueType.plane;
                case EmitterType.ET_CUBE_PLANE:
                    return ValueType.cube3D;
                case EmitterType.ET_CUBE:
                    return ValueType.cube3D;
                case EmitterType.ET_SPHERE_PLANE:
                    return ValueType.sphere_plane;
                case EmitterType.ET_SPHERE:
                    return ValueType.sphere;
                case EmitterType.ET_CYLINDER_PLANE:
                    return ValueType.cylinder;
                case EmitterType.ET_CYLINDER:
                    return ValueType.cylinder;
            }
            return ValueType.cube3D;
        }

        public buildGeomtry(geometry: Geometry, count: number) {

            var positionArray: Vector3D[] = Value.calculate(count, this.getType(), this.parameters);
            var position: Vector3D;
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var var0: GLSL.VarRegister = this.attributes[0];

            for (var i: number = 0; i < count; ++i) {
                position = positionArray[i];
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + var0.offset;
                    geometry.verticesData[index + 0] = position.x;
                    geometry.verticesData[index + 1] = position.y;
                    geometry.verticesData[index + 2] = position.z;
                }
            }
        }
    }
} 