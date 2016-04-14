module egret3d {
        
    /**
    * @private
    */
    export class ParticleSpeedNode extends AnimationNode {

        public minSpeed: number = 200;
        public maxSpeed: number = 500;

        public minAccelerSpeed: number = 0;
        public maxAccelerSpeed: number = 0;

        constructor() {
            super();

            var var0: GLSL.VarRegister = new GLSL.VarRegister();
            var0.name = "attribute_speed";
            var0.size = 2;
            this.attributes.push(var0);
        }

        public buildGeomtry(geometry: Geometry, count: number) {

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;


            var var0: GLSL.VarRegister = this.attributes[0];

            for (var i: number = 0; i < count; ++i) {

                var speed: number = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
                var acceler: number = Math.random() * (this.maxAccelerSpeed - this.minAccelerSpeed) + this.minAccelerSpeed;
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + var0.offset;

                    geometry.verticesData[index + 0] = speed;
                    geometry.verticesData[index + 1] = acceler;
                }
            }
        }
    }
} 