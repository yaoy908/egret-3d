module egret3d {
        
    /**
    * @private
    */
    export class ParticleSizeGlobalNode extends AnimationNode {

        private static pointsCount: number = 32;
        private _floatData: Float32Array = new Float32Array(ParticleSizeGlobalNode.pointsCount * 2); 
        private _node: ParticleDataScaleBezier;
        constructor() {

            super();
            this.name = "ParticleSizeGlobalNode"; 

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_size_vs");
            //|sa,sc ea,ec|  每个段的形式
        }

        /**
        * @language zh_CN
        * 填充粒子初始旋转数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {

            this._node = <ParticleDataScaleBezier>data;
            var count: number = ParticleSizeGlobalNode.pointsCount;
            this._node.ctrlPoints.length = this._node.posPoints.length = count;

            var posPt: Point;
            var ctrlPt: Point;

            for (var i: number = 0; i < count; i++) {
                posPt = this._node.posPoints[i];
                ctrlPt = this._node.ctrlPoints[i];
                if (posPt && ctrlPt) {
                    this._floatData[i * 2 + 0] = posPt.x;
                    this._floatData[i * 2 + 1] = posPt.y;
                    this._floatData[i * 2 + 2] = ctrlPt.x;
                    this._floatData[i * 2 + 3] = ctrlPt.y;
                }
                else {
                    this._floatData[i * 2 + 0] = 0;
                    this._floatData[i * 2 + 1] = 0;
                    this._floatData[i * 2 + 2] = 0;
                    this._floatData[i * 2 + 3] = 0;
                }

            }
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

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            context3DProxy.uniform2fv(usage["uniform_size"].uniformIndex, this._floatData);
        }


    }
}  