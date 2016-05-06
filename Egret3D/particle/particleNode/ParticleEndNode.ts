module egret3d {
        
    /**
    * @private
    */
    export class ParticleEndNode extends AnimationNode {

        constructor() {
            super();
            this.name = "ParticleEndNode"; 
            this.vertex_ShaderName = "particle_end";
        }

        public build(geometry: Geometry, count: number) {
        }
    }
} 