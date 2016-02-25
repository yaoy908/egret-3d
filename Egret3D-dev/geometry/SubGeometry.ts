module egret3d_dev {

    /**
     * @language zh_CN
     * @class egret3d_dev.VertexFormat
     * @classdesc
     * 顶点数据格式类型 是由2进制组成 一个顶点可以由多个类型组成
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum VertexFormat {
                
        /**
         * @private
         * @language zh_CN
         * 顶点坐标
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_POSITION = 0x0000001,

        /**
         * @private
         * @language zh_CN
         * 顶点法线
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_NORMAL = 0x0000002,
                        
        /**
         * @private
         * @language zh_CN
         * 顶点切线
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_TANGENT = 0x0000004,
        
        /**
         * @private
         * @language zh_CN
         * 顶点颜色
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_COLOR = 0x0000008,
        
        /**
         * @private
         * @language zh_CN
         * 顶点uv
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_UV = 0x0000010,
                
        /**
         * @private
         * @language zh_CN
         * 顶点第二uv
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_UV2 = 0x0000020,
    }
        
    /**
     * @language zh_CN
     * @class egret3d_dev.SubGeometry
     * @classdesc
     * 表示几何形状 
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class SubGeometry {
        public material: MaterialBase;
        
        /**
        * @language zh_CN
        * 顶点格式
        */
        public vertexFormat: number;

        /**
        * @language zh_CN
        * 顶点属性长度
        */
        public vertexAttLength: number;

        /**
        * @language zh_CN
        * 顶点数据
        */
        public verticesData: Array<number>;

        /**
        * @language zh_CN
        * 索引数据
        */
        public indexData: Array<number>; 
                
        /**
        * @language zh_CN
        * 顶点坐标数据
        */
        public source_positionData: Array<Vector3D> = new Array<Vector3D>();
                        
        /**
        * @language zh_CN
        * 顶点法线数据
        */
        public source_normalData: Array<Vector3D> = new Array<Vector3D>();
                                
        /**
        * @language zh_CN
        * 顶点切线数据
        */
        public source_tangentData: Array<Vector3D> = new Array<Vector3D>();
                                
        /**
        * @language zh_CN
        * 顶点颜色数据
        */
        public source_colorData: Array<Vector3D> = new Array<Vector3D>();
                                
        /**
        * @language zh_CN
        * 顶点uv数据
        */
        public source_uvData: Array<UV> = new Array<UV>();
                                
        /**
        * @language zh_CN
        * 顶点第二uv数据
        */
        public source_uv2Data: Array<UV> = new Array<UV>();

        /**
        * @language zh_CN
        * 顶点字节数
        */
        public vertexSizeInBytes: number;

        /**
        * @language zh_CN
        * 顶点坐标大小
        */
        public positionSize: number = 3;

        /**
        * @language zh_CN
        * 顶点法线大小
        */
        public normalSize: number = 3;

        /**
        * @language zh_CN
        * 顶点切线大小
        */
        public tangentSize: number = 3;

        /**
        * @language zh_CN
        * 顶点色大小
        */
        public colorSize: number = 4;

        /**
        * @language zh_CN
        * 顶点uv大小
        */
        public uvSize: number = 2;

        /**
        * @language zh_CN
        * 顶点uv2大小
        */
        public uv2Size: number = 2;

        /**
        * @language zh_CN
        * 包围盒min pos
        */
        public minPos: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 包围盒max pos
        */
        public maxPos: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 构造函数
        */
        public uniforms: Array<any> = new Array<any>();
        
        /**
        * @language zh_CN
        * 创建一个SubGeometry
        */
        constructor() {
        }

        private calculateVertexFormat(context3DProxy: Context3DProxy) {
            if (this.vertexFormat & VertexFormat.VF_POSITION) {
                this.vertexAttLength += this.positionSize;
                
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_position"));
            }

            if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                this.vertexAttLength += this.normalSize;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_normal"));
            }

            if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                this.vertexAttLength += this.tangentSize;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_tangent"));
            }

            if (this.vertexFormat & VertexFormat.VF_COLOR) {
                this.vertexAttLength += this.colorSize;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_vertexColor"));
            }

            if (this.vertexFormat & VertexFormat.VF_UV) {
                this.vertexAttLength += this.uvSize;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_uv0"));
            }

            if (this.vertexFormat & VertexFormat.VF_UV2) {
                this.vertexAttLength += this.uv2Size;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_uv1"));
            }
        }


        /**
        * @language zh_CN
        * 生成包围盒
        */
        public buildBoundBox() {
            
            this.minPos.copyFrom(new Vector3D(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE));
            this.maxPos.copyFrom(new Vector3D(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE));
            for (var i: number = 0; i < this.verticesData.length; i += this.vertexAttLength) {
                if (this.maxPos.x < this.verticesData[i]) {
                    this.maxPos.x = this.verticesData[i];
                }
                if (this.maxPos.y < this.verticesData[i + 1]) {
                    this.maxPos.y = this.verticesData[i + 1];
                }
                if (this.maxPos.z < this.verticesData[i + 2]) {
                    this.maxPos.z = this.verticesData[i + 2];
                }

                if (this.minPos.x > this.verticesData[i]) {
                    this.minPos.x = this.verticesData[i];
                }
                if (this.minPos.y > this.verticesData[i + 1]) {
                    this.minPos.y = this.verticesData[i + 1];
                }
                if (this.minPos.z > this.verticesData[i + 2]) {
                    this.minPos.z = this.verticesData[i + 2];
                }
            }
        }
    }
} 