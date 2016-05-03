module egret3d {
        
    /**
    * @private
    */
    export class ParticleScaleByLifeNode extends AnimationNode {

        public start: ValueShape = new ConstValueShape();
        public end: ValueShape = new ConstValueShape();
        public allChange: boolean = true;

        private attribute_Scale: GLSL.VarRegister
        constructor() {

            super();
            this.name = "ParticleScaleByLifeNode"; 
            this.vertex_ShaderName = "particle_ScaleByLife";

            this.attribute_Scale = new GLSL.VarRegister();
            this.attribute_Scale.name = "attribute_ScaleByLife";
            this.attribute_Scale.size = 2;
            this.attributes.push(this.attribute_Scale);

        }

        public build(geometry: Geometry, count: number) {

            var index: number = 0;
            var vertices: number = geometry.vertexCount / count;
            var startData: any[] = this.start.calculate(count);
            var endData: any[] = this.end.calculate(count);
        
            for (var i: number = 0; i < count; ++i) {
                var startScale: number = startData[i]; 
                var endScale: number = endData[i] ; 
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_Scale.offsetIndex;
                   
                    geometry.verticesData[index + 0] = startScale;
                    geometry.verticesData[index + 1] = endScale;
                }
            }

        }
    }
} 