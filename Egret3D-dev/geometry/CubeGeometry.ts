module egret3d_dev {
    /**
     * @language zh_CN
     * @class egret3d.CubeGeometry
     * @classdesc
     * CubeGeometry类 表示立方体</p>
     *
     * 示例：</p>
     * 用 CubeGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理）; </p>
     <pre>
      var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.CubeGeometry(), new egret3d.TextureMaterial() );
     </pre>
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/CubeGeometry.ts
     */
    export class CubeGeometry extends Geometry {

        /**
        * @language zh_CN
        * Cube宽度
        *  
        */
        public width: number = 80;

        /**
        * @language zh_CN
        * Cube高度
        *  
        */
        public height: number = 80;

        /**
        * @language zh_CN
        * Cube深度
        *  
        */
        public depth: number = 80;

        /**
        * @language zh_CN
        * 构造函数
        * @param width 宽度
        * @param height 高度
        * @param depth 深度
        */
        constructor(width: number = 80, height: number = 80, depth: number = 80 ) {
            super();
            this.width = width;
            this.height = height;
            this.depth = depth;
            this.buildGeomtry();
        }

        /**
        * @language zh_CN
        * 生成网格
        */
        public buildGeomtry() {
            this.useVertexFormat(VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV | VertexFormat.VF_UV2);

            this.verticesData = new Array<number>();
            this.indexData = new Array<number>();

            this.verticesData.push(
                -this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this.width * 0.5, this.height * 0.5, -this.depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this.width * 0.5, this.height * 0.5, -this.depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,

                this.width * 0.5, this.height * 0.5, -this.depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,

                -this.width * 0.5, -this.height * 0.5, this.depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this.width * 0.5, -this.height * 0.5, this.depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this.width * 0.5, this.height * 0.5, this.depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                this.width * 0.5, this.height * 0.5, this.depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this.width * 0.5, this.height * 0.5, this.depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this.width * 0.5, -this.height * 0.5, this.depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,

                -this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this.width * 0.5, -this.height * 0.5, this.depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                this.width * 0.5, -this.height * 0.5, this.depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this.width * 0.5, -this.height * 0.5, this.depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,

                this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this.width * 0.5, this.height * 0.5, -this.depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this.width * 0.5, this.height * 0.5, this.depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                this.width * 0.5, this.height * 0.5, this.depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this.width * 0.5, -this.height * 0.5, this.depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,

                this.width * 0.5, this.height * 0.5, -this.depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this.width * 0.5, this.height * 0.5, -this.depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this.width * 0.5, this.height * 0.5, this.depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                -this.width * 0.5, this.height * 0.5, this.depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this.width * 0.5, this.height * 0.5, this.depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this.width * 0.5, this.height * 0.5, -this.depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,

                -this.width * 0.5, this.height * 0.5, -this.depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this.width * 0.5, -this.height * 0.5, -this.depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this.width * 0.5, -this.height * 0.5, this.depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                          
                - this.width * 0.5, -this.height * 0.5, this.depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this.width * 0.5, this.height * 0.5, this.depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this.width * 0.5, this.height * 0.5, -this.depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0
                );

            this.indexData.push(
                0, 2, 1, 3, 5, 4,
                6, 8, 7, 9, 11, 10,
                12, 14, 13, 15, 17, 16,
                18, 20, 19, 21, 23, 22,
                24, 26, 25, 27, 29, 28,
                30, 32, 31, 33, 35, 34
                );
        }
    }
}