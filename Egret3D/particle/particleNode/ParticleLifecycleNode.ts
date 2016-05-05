module egret3d {
        
    /**
    * @private
    */
    export class ParticleLifecycleNode extends AnimationNode {

        /**
        * 出生时间
        */
        public startRange: any = [];
        
        /**
        * 存活时间
        */
        public lifeRange: any = [];
        
        public isLoop: boolean = true;

        private start: number = 0;
        private life: number = 0;

        constructor() {
            super();

            var var0: GLSL.VarRegister = new GLSL.VarRegister();
            var0.name = "attribute_lifecycle";
            var0.size = 3;
            this.attributes.push(var0);
        }

        public buildGeomtry(geometry: Geometry, count: number) {
            var startArray: number[] = Value.calculate(count, ValueType.constValue, this.startRange);
            var lifeArray: number[] = Value.calculate(count, ValueType.constValue, this.lifeRange);
            var compressValue: number = this.isLoop ? 1 : 0;

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var var0: GLSL.VarRegister = this.attributes[0];

            for (var i: number = 0; i < count; ++i) {
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + var0.offset;
                    geometry.verticesData[index + 0] = startArray[i];
                    geometry.verticesData[index + 1] = lifeArray[i];
                    geometry.verticesData[index + 2] = compressValue;
                }
            }
        }
    }
} 