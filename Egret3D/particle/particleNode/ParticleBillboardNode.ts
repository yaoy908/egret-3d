module egret3d {
    export class ParticleBillboardNode extends AnimationNode {

        public enableX: boolean = true;

        public enableY: boolean = true;

        public enableZ: boolean = true;

        constructor() {
            super();
            this.attributeName = "attribute_billboardXYZ";
            this.attributeLenght = 1;
        }

        public buildGeomtry(geometry: Geometry, count: number) {
            var f: number = (this.enableX ? 1 : 0) + (this.enableY ? 10 : 0) + (this.enableZ ? 100 : 0);
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            for (var i: number = 0; i < count; ++i) {
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.offset;
                    geometry.verticesData[index] = f;
                }
            }
        }
    }
} 