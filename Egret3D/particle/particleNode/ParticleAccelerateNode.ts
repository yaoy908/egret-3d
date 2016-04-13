module egret3d {
    export class ParticleAccelerateNode extends AnimationNode {

        public accelerate: Vector3D = new Vector3D(0, 0, 0);

        constructor() {
            super();
            this.attributeName = "attribute_accele";
            this.attributeLenght = 3;
        }

        public buildGeomtry(geometry: Geometry, count: number) {
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            for (var i: number = 0; i < count; ++i) {
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.offset;
                    geometry.verticesData[index + 0] = this.accelerate.x;
                    geometry.verticesData[index + 1] = this.accelerate.y;
                    geometry.verticesData[index + 2] = this.accelerate.z;
                }
            }
        }
    }
}  