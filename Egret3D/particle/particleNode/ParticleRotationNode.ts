module egret3d {
        
    /**
    * @private
    */
    export class ParticleRotationNode extends AnimationNode {

        public rotation: ValueShape = new ConstRandomValueShape();

        private attribute_Rotation: GLSL.VarRegister
        constructor() {

            super();
            this.name = "ParticleRotationNode"; 

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_Rotation");

            this.attribute_Rotation = new GLSL.VarRegister();
            this.attribute_Rotation.name = "attribute_Rotation";
            this.attribute_Rotation.size = 1;
            this.attributes.push(this.attribute_Rotation);

            (<ConstRandomValueShape>this.rotation).min = -180;
            (<ConstRandomValueShape>this.rotation).max = 180;

        }
        
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {
            var index: number = 0;
            var vertices: number = geometry.vertexCount / count;
            var data: any[] = this.rotation.calculate(count);
        
            for (var i: number = 0; i < count; ++i) {
                var rot: number = data[i] ; 
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_Rotation.offsetIndex;
                   
                    geometry.verticesData[index + 0] = rot;
                }
            }

        }
    }
} 