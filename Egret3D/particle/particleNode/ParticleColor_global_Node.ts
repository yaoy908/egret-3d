module egret3d {
        
    /**
    * @private
    */
    export class ParticleColor_global_Node extends AnimationNode {

        private _color: Float32Array = new Float32Array( 16 ); 
        constructor() {

            super();
            this.name = "ParticleColor_global_Node"; 

            this.frament_ShaderName[ShaderPhaseType.end_fragment] = this.frament_ShaderName[ShaderPhaseType.end_fragment] || [];
            this.frament_ShaderName[ShaderPhaseType.end_fragment].push("particle_color");
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

        }
    }
} 