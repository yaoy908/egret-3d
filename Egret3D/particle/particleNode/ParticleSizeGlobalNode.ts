module egret3d {
        
    /**
    * @private
    */
    export class ParticleSizeGlobalNode extends AnimationNode {

        public colorSegment: Float32Array = new Float32Array( 16 ); 
        constructor() {

            super();
            this.name = "ParticleSizeGlobalNode"; 

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_size_vs");
            
            //this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment] = this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment] || [];
            //this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment].push("particle_color_fs");

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
            this.colorSegment[0] = this.getGpuVec4(0.0, 64.0, 128.0, 256.0);
            this.colorSegment[1] = 0.0;
            this.colorSegment[2] = 0.0;
            this.colorSegment[3] = 0.0;
            this.colorSegment[4] = 0.0;
            this.colorSegment[5] = 0.0;
            this.colorSegment[6] = 0.0;
            this.colorSegment[7] = 0.0;
            this.colorSegment[8] = 0.0;
            this.colorSegment[9] = 0.0;
            this.colorSegment[10] = 0.0;
            this.colorSegment[11] = 0.0;

            this.colorSegment[12] = 0.0;
            this.colorSegment[13] = 0.0;
            this.colorSegment[14] = 0.0;
            this.colorSegment[15] = 0.0;
        }

        /**
        * @private
        */
        public update(time: number, delay: number, geometry: Geometry, passUsage: PassUsage, context: Context3DProxy) {
            context.uniform1fv(passUsage["uniform_size"].uniformIndex, this.colorSegment);
        }

        public getGpuVec4(r: number, g: number, b: number, a: number): number {
            //return Math.floor(px * 254) * 0x1000000 + Math.floor(py * 254) * 0x10000 + Math.floor(pcx * 254) * 0x100 + pcy;
            return a * 256*256*256 + r * 256*256 + g * 256 + b;
        }
    }
} 