module egret3d {
        
    /**
    * @private
    */
    export class ParticleSizeGlobalNode extends AnimationNode {

        private _floatCompressData: Float32Array;
        private _node: ParticleDataScaleBezier;
        constructor() {

            super();
            this.name = "ParticleSizeGlobalNode"; 

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_size_vs");
            //|sa,sc ea,ec|  每个段的形式
        }

        private decompressFloat(min: number, range: number, mergeFloat: number, pts:Array<number>) {
            var convert_1_4096:number = 1.0 / 4096.0;
            var value2:number = mergeFloat - Math.floor(mergeFloat);
            var value1: number = mergeFloat - value2;
            value1 *= convert_1_4096;
            value1 *= range;
            value2 *= range;
            value1 += min;
            value2 += min;
            pts.push(value1);
            pts.push(value2);
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
            this._floatCompressData = this._node.data.compress();

            //____
            //var posPt: Point;
            //var ctrlPt: Point;
            //var bezier: BezierData = this._node.data;
            //var count: number = BezierData.PointCount / 2;
            //this._floatData = new Float32Array(BezierData.PointCount * 2);
            //for (var i: number = 0; i < count; i++) {
            //    posPt = bezier.posPoints[i];
            //    ctrlPt = bezier.ctrlPoints[i];
            //    if (posPt && ctrlPt) {
            //        this._floatData[i * 4 + 0] = posPt.x;
            //        this._floatData[i * 4 + 1] = posPt.y;
            //        this._floatData[i * 4 + 2] = ctrlPt.x;
            //        this._floatData[i * 4 + 3] = ctrlPt.y;
            //    }
            //    else {
            //        this._floatData[i * 4 + 0] = 0;
            //        this._floatData[i * 4 + 1] = 0;
            //        this._floatData[i * 4 + 2] = 0;
            //        this._floatData[i * 4 + 3] = 0;
            //    }

            //}


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
            context3DProxy.uniform1fv(usage["uniform_size_compressed"].uniformIndex, this._floatCompressData);
        }


    }
}  