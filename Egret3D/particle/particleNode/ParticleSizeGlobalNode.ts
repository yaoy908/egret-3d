module egret3d {
        
    /**
    * @private
    */
    export class ParticleSizeGlobalNode extends AnimationNode {

        public colorSegment: Float32Array = new Float32Array(64); 
        public points: Point[] = []; 
        constructor() {

            super();
            this.name = "ParticleSizeGlobalNode"; 

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_size_vs");
            
            //this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment] = this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment] || [];
            //this.frament_ShaderName[ShaderPhaseType.muilt_end_fragment].push("particle_color_fs");

            this.points.push(new Point(0, 0));
            this.points.push(new Point(0, 1));
            this.points.push(new Point(0.5, 2));
            this.points.push(new Point(0.55, 2));

            this.points.push(new Point(0.55, 2));
            this.points.push(new Point(0.56, 2));
            this.points.push(new Point(1.0, 0.2));
            this.points.push(new Point(1.0, 0.2));
            //|sa,sc ea,ec|  每个段的形式
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
            for (var i: number = 0; i < 32; i++){
                if (this.points.length > i) {
                    this.colorSegment[i * 2] = this.points[i].x;
                    this.colorSegment[i * 2 + 1] = this.points[i].y;
                }
                else {
                    this.colorSegment[i * 2] = 0 ;
                    this.colorSegment[i * 2 + 1] = 0;
                }
            }
        }

        /**
        * @private
        */
        public update(time: number, delay: number, geometry: Geometry) {
        }

        /**
        * @private
        */
        public activePass(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            context3DProxy.uniform2fv(usage["uniform_size"].uniformIndex, this.colorSegment);
        }


    }
}  