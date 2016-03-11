module egret3d_dev {
    /**
     * @language zh_CN
     * @class egret3d.CylinderGeometry
     * @classdesc
     * CylinderGeometry类 表示圆柱体</p>
     *
     * 示例：</p>
     * 用 CylinderGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理)</p>
     <pre>
     var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.CylinderGeometry(), new egret3d.TextureMaterial() );
     </pre>
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/CylinderGeometry.ts
     */
    export class CylinderGeometry extends Geometry {

        /**
        * @language zh_CN
        * 构造函数
        */
        constructor() {
            super();

            this.buildGeomtry();
        }

        /**
        * @language zh_CN
        * 生成网格
        */
        public buildGeomtry() {
            this.useVertexFormat(VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_COLOR | VertexFormat.VF_UV | VertexFormat.VF_UV2);

            this.verticesData = new Array<number>();
            this.indexData = new Array<number>();

            var m_nSegments: number = 20;
            var m_rRadius: number = 100;
            var m_rHeight: number = 200;

            var nCurrentSegment: number = 20;

            var rDeltaSegAngle: number = (2.0 * Math.PI / m_nSegments);
            var rSegmentLength: number = 1.0 / m_nSegments;

            for (nCurrentSegment = 0; nCurrentSegment <= m_nSegments; nCurrentSegment++) {
                var x0: number = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);

                var z0: number = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);

                this.verticesData.push(
                    x0, 0.0 + (m_rHeight / 2.0), z0, x0, 0.0, z0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                    x0, 0.0 - (m_rHeight / 2.0), z0, x0, 0.0, z0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            }

            var len_base = this.verticesData.length / 14;
            //console.log(str);
            var topCenter = this.verticesData.length;
            this.verticesData.push(0.0, 0.0 + (m_rHeight / 2.0), 0.0, 0.0, 1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            //for (nCurrentSegment = 0; nCurrentSegment <= m_nSegments; nCurrentSegment++) {
            //    var x0: number = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);
            //    var z0: number = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);

            //    this.verticesData.push(x0, 0.0 + (m_rHeight / 2.0), z0, 0.0, 1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            //}
            var buttomCenter = this.verticesData.length;
            this.verticesData.push(0.0, 0.0 - (m_rHeight / 2.0), 0.0, 0.0, -1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            //for (nCurrentSegment = m_nSegments; nCurrentSegment >= 0; nCurrentSegment--) {
            //    var x0: number = m_rRadius * Math.sin(nCurrentSegment * rDeltaSegAngle);
            //    var z0: number = m_rRadius * Math.cos(nCurrentSegment * rDeltaSegAngle);

            //    this.verticesData.push(x0, 0.0 - (m_rHeight / 2.0), z0, 0.0, -1.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            //}

            for (var i = 0; i < len_base; i++) {
                if ((i & 1) != 0) {
                    this.indexData.push(

                        i,
                        i + 1 >= len_base ? i + 1 - len_base : i + 1,
                        i + 2 >= len_base ? i + 2 - len_base : i + 2,

                        topCenter,
                        i,
                        i + 2 >= len_base ? i + 2 - len_base : i + 2

                    );
                } else {
                    this.indexData.push(

                        i + 1 >= len_base ? i + 1 - len_base : i + 1,
                        i,
                        i + 2 >= len_base ? i + 2 - len_base : i + 2,


                        i,
                        buttomCenter,
                        i + 2 >= len_base ? i + 2 - len_base : i + 2

                    );
                }
            }


            var subGeometry: SubGeometry = new SubGeometry();
            subGeometry.geometry = this;
            subGeometry.start = 0;
            subGeometry.count = this.indexData.length;
            this.subGeometrys.push(subGeometry);
        }
    }
} 