module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.PlaneGeometry
     * @classdesc
     * PlaneGeometry类 表示面板几何体
     *
     * 示例：
     * //用 PlaneGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理）;
     * var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.PlaneGeometry(), new egret3d.TextureMaterial() );
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/PlaneGeometry.ts
     */
    export class PlaneGeometry extends Geometry {

        private _segmentsW: number = 1;
        private _segmentsH: number = 1;
        private _width: number = 500.0;
        private _height: number = 500.0;
        private _scaleU: number = 1; 
        private _scaleV: number = 1; 
        private _rotation: Vector3D;

        /**
        * @language zh_CN
        * 构造函数
        * @param width 宽度
        * @param height 高度
        * @param segmentsW 宽度分段数
        * @param segmentsH 高度分段数
        * @param uScale U缩放
        * @param vScale V缩放
        */
        constructor(width: number = 500, height: number = 500, segmentsW: number = 1, segmentsH: number = 1, uScale: number = 1, vScale: number = 1 ) {
            super();
            this._width = width;
            this._height = height;
            this._segmentsW = segmentsW;
            this._segmentsH = segmentsH;
            this._scaleU = uScale;
            this._scaleV = vScale;

            this.buildGeometry();
        }

        private buildGeometry(): void {

            this.useVertexFormat(VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0);

            var x: number, y: number;
            var numIndices: number;
            var base: number;
            var tw: number = this._segmentsW + 1;
            var numVertices: number = (this._segmentsH + 1) * tw;
            var stride: number = this.vertexAttLength;
            var skip: number = stride - 15;

            numIndices = this._segmentsH * this._segmentsW * 6;

            this.verticesData = new Array<number>(numVertices * stride);
            this.indexData = new Array<number>(numIndices);

            numIndices = 0;
            var point: Vector3D = new Vector3D();
            var index: number = 0;
            for (var yi: number = 0; yi <= this._segmentsH; ++yi) {
                for (var xi: number = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - .5) * this._width;
                    y = (yi / this._segmentsH - .5) * this._height;
                
                    this.verticesData[index++] = x;
                    this.verticesData[index++] = 0;
                    this.verticesData[index++] = y;

                    this.verticesData[index++] = 0;
                    this.verticesData[index++] = 1;
                    this.verticesData[index++] = 0;

                    this.verticesData[index++] = 1;
                    this.verticesData[index++] = 0;
                    this.verticesData[index++] = 0;

                    this.verticesData[index++] = 1;
                    this.verticesData[index++] = 1;
                    this.verticesData[index++] = 1;
                    this.verticesData[index++] = 1;

                    this.verticesData[index++] = (xi / this._segmentsW) * this._scaleU ;
                    this.verticesData[index++] = (1 - yi / this._segmentsH) * this._scaleV ;

                    index += skip;

                    if (xi != this._segmentsW && yi != this._segmentsH) {
                        base = xi + yi * tw;
                        var mult: number = 1;

                        this.indexData[numIndices++] = base * mult;
                        this.indexData[numIndices++] = (base + tw + 1) * mult;
                        this.indexData[numIndices++] = (base + tw) * mult;

                        this.indexData[numIndices++] = base * mult;
                        this.indexData[numIndices++] = (base + 1) * mult;
                        this.indexData[numIndices++] = (base + tw + 1) * mult;

                    }
                }
            }
        }
    }
}