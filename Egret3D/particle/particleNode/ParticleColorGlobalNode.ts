module egret3d {
        
    /**
    * @private
    */
    export class ParticleColorGlobalNode extends AnimationNode {

        public colorSegment: Float32Array = new Float32Array( 16 ); 
        constructor() {

            super();
            this.name = "ParticleColorGlobalNode"; 

            
            //this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            //this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("bezier");

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
            this.colorSegment[0] = this.getGpuColor(255.0, 0.0, 0.0, 255.0);
            this.colorSegment[1] = this.getGpuColor(0.0, 255.0, 0.0, 255.0);
            this.colorSegment[2] = this.getGpuColor(0.0, 0.0, 255.0, 255.0);
            this.colorSegment[3] = this.getGpuColor(0.0, 255.0, 255.0, 255.0);
            this.colorSegment[4] = this.getGpuColor(255.0, 255.0, 255.0, 0.0);
            this.colorSegment[5] = 0.0;
            this.colorSegment[6] = 0.0;
            this.colorSegment[7] = 0.0;

            this.colorSegment[8] = 0.0;
            this.colorSegment[9] = 0.2;
            this.colorSegment[10] = 0.5;
            this.colorSegment[11] = 0.8;
            this.colorSegment[12] = 1.0;
            this.colorSegment[13] = 0.0;
            this.colorSegment[14] = 0.0;
            this.colorSegment[15] = 0.0;
        }

        /**
        * @private
        */
        public update(time: number, delay: number, geometry: Geometry, passUsage: PassUsage, context: Context3DProxy) {
            context.uniform1fv(passUsage["uniform_colorTransform"].uniformIndex, this.colorSegment);
        }

        public getGpuColor(r: number, g: number, b: number, a: number): number {
            return a * 0x1000000 + r * 0x10000 + g * 0x100 + b;
        }
    }
} 