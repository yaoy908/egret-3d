module egret3d {
        
    /**
    * @private
    */
    export class ParticleColorGlobalNode extends AnimationNode {

        private _color: Float32Array = new Float32Array( 16 ); 
        constructor() {

            super();
            this.name = "ParticleColorGlobalNode"; 

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_color_vs");
            
            this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment] = this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment] || [];
            this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment].push("particle_color_fs");

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
            this._color[0] = this.getGpuColor(1.0, 0.0, 0.0, 1.0);
            this._color[1] = this.getGpuColor(0.0, 1.0, 0.0, 1.0);
            this._color[2] = this.getGpuColor(0.0, 0.0, 1.0, 1.0);
            this._color[3] = this.getGpuColor(0.0, 1.0, 1.0, 1.0);
            this._color[4] = this.getGpuColor(1.0, 1.0, 1.0, 0.0);
            this._color[5] = 0.0 ;
            this._color[6] = 0.0 ;
            this._color[7] = 0.0;

            this._color[8] = 0.0;
            this._color[9] = 0.2;
            this._color[10] = 0.5;
            this._color[11] = 0.8;
            this._color[12] = 1.0;
            this._color[13] = 0.0;
            this._color[14] = 0.0;
            this._color[15] = 0.0;
        }

        /**
        * @private
        */
        public update(time: number, delay: number, geometry: Geometry, passUsage: PassUsage, context: Context3DProxy) {
            context.uniform1fv(passUsage["uniform_colorTransform"].uniformIndex,  this._color);
        }

        public getGpuColor(r: number, g: number, b: number, a: number): number {
            return a * 1000000.0 + r * 10000.0 + g * 100.0 + b;
        }
    }
} 