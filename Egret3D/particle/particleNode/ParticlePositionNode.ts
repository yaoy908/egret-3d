module egret3d {
    export class ParticlePositionNode extends AnimationNode {

        public type: number = ValueType.cube3D;
        public parameters: any = [];

        constructor() {
            super();
            this.attributeName = "attribute_offset";
            this.attributeLenght = 3;
        }

        public buildGeomtry(geometry: Geometry, count: number) {
            var positionArray: Vector3D[] = Value.calculate(count, this.type, this.parameters);
            var position: Vector3D;
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            for (var i: number = 0; i < count; ++i) {
                position = positionArray[i];
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.offset;
                    geometry.verticesData[index + 0] = position.x;
                    geometry.verticesData[index + 1] = position.y;
                    geometry.verticesData[index + 2] = position.z;
                }
            }
        }
    }
} 