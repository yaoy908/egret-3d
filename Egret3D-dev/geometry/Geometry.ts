module egret3d_dev {

    export enum GeometryType {
        normal_geometry,
        skin_geometry,
        particle_geometry,
    }
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
        VF_POSITION = 0x00000001,

        /**
         * @private
         * @language zh_CN
         * 顶点法线
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_NORMAL = 0x00000002,
                        
        /**
         * @private
         * @language zh_CN
         * 顶点切线
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_TANGENT = 0x00000004,
        
        /**
         * @private
         * @language zh_CN
         * 顶点颜色
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_COLOR = 0x00000008,
        
        /**
         * @private
         * @language zh_CN
         * 顶点uv
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_UV = 0x00000010,
                
        /**
         * @private
         * @language zh_CN
         * 顶点第二uv
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_UV2 = 0x00000020,

        /**
         * @private
         * @language zh_CN
         * 顶点蒙皮信息
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_SKIN = 0x00000040,
    }

    /**
     * @language zh_CN
     * @class egret3d_dev.Geometry
     * @classdesc
     * 表示几何形状 子集
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Geometry {

       /**
       * @language zh_CN
       * 模型的类别，是属于 静态模型，还是蒙皮动画模型，还是粒子模型，还是 特定模型
       * 
       */
        public geomtryType: number = -1;

        /**
       * @language zh_CN
       * 顶点格式
       */
        public vertexFormat: number = 0 ;

        /**
        * @language zh_CN
        * 顶点属性长度
        */
        public vertexAttLength: number = 0 ;

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
        * shader buffer
        */
        public sharedVertexBuffer: VertexBuffer3D;
        /**
        * @language zh_CN
        * shader index
        */
        public sharedIndexBuffer: IndexBuffer3D;

 

        /**
        * @language zh_CN
        * 顶点坐标数据
        */
        public source_positionData: Array<number> = new Array<number>();
                        
        /**
        * @language zh_CN
        * 顶点法线数据
        */
        public source_normalData: Array<number> = new Array<number>();
                                
        /**
        * @language zh_CN
        * 顶点切线数据
        */
        public source_tangentData: Array<number> = new Array<number>();
                                
        /**
        * @language zh_CN
        * 顶点颜色数据
        */
        public source_colorData: Array<number> = new Array<number>();
                                
        /**
        * @language zh_CN
        * 顶点uv数据
        */
        public source_uvData: Array<number> = new Array<number>();
                                
        /**
        * @language zh_CN
        * 顶点第二uv数据
        */
        public source_uv2Data: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点第二uv数据
        */
        public source_SkinData: Array<number> = new Array<number>();

        public skeleton: Skeleton;
        /**
        * @language zh_CN
        * 顶点字节数
        */
        public vertexSizeInBytes: number;

        /**
        * @language zh_CN
        * 顶点坐标大小
        */
        public static positionSize: number = 3;

        /**
        * @language zh_CN
        * 顶点法线大小
        */
        public static normalSize: number = 3;

        /**
        * @language zh_CN
        * 顶点切线大小
        */
        public static tangentSize: number = 3;

        /**
        * @language zh_CN
        * 顶点色大小
        */
        public static colorSize: number = 4;

        /**
        * @language zh_CN
        * 顶点uv大小
        */
        public static uvSize: number = 2;

        /**
        * @language zh_CN
        * 顶点uv2大小
        */
        public static uv2Size: number = 2;

        /**
        * @language zh_CN
        * 顶点uv2大小
        */
        public static skinSize: number = 8;

        /**
        * @language zh_CN
        * geometry子集
        */
        public subGeometrys: Array<SubGeometry> = new Array<SubGeometry>();

        /**
        * @language zh_CN
        * @private
        * buffer 需要重新提交的时候
        */
        private _bufferDiry: boolean = true;

        constructor() {
        }

        /**
        * @language zh_CN
        * @private
        */
        public init() {
            this.useVertexFormat( VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_COLOR | VertexFormat.VF_UV );
            this.calculateVertexFormat();
        }

        /**
        * @language zh_CN
        * 使用和定义顶点的数据结构
        *<p>例如 useVertexFormat( VertexFormat.VF_POSITION )
        *设置这样的定义后,就会增加这样的数据顶点数据结构，
        *如果源文件中没有这样的数据结构，
        *就会通过计算的方式计算补全，
        *不能计算的就默认为0
        *@param vertexFormat 需要定义的顶点格式类型 VertexFormat.VF_COLOR | VertexFormat.VF_UV2
        * this.useVertexFormat( VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_COLOR |  VertexFormat.VF_UV | VertexFormat.VF_UV2 );//定义了一个完整的数据结构
        */
        public useVertexFormat(vertexFormat: number) {
            this.vertexFormat = vertexFormat;

            if (this.vertexFormat & VertexFormat.VF_POSITION) {
                this.vertexAttLength += Geometry.positionSize;
            }

            if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                this.vertexAttLength += Geometry.normalSize;
            }

            if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                this.vertexAttLength += Geometry.tangentSize;
            }

            if (this.vertexFormat & VertexFormat.VF_COLOR) {
                this.vertexAttLength += Geometry.colorSize;
            }

            if (this.vertexFormat & VertexFormat.VF_UV) {
                this.vertexAttLength += Geometry.uvSize;
            }

            if (this.vertexFormat & VertexFormat.VF_UV2) {
                this.vertexAttLength += Geometry.uv2Size;
            }

            if (this.vertexFormat & VertexFormat.VF_SKIN) {
                this.vertexAttLength += Geometry.skinSize;
            }

            this.vertexSizeInBytes = this.vertexAttLength * 4;
        }
                
        /**
        * @language zh_CN
        * @根据顶点格式生成顶点buffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calculateVertexFormat() {

            for (var i: number = 0; i < this.source_positionData.length / Geometry.positionSize; ++i) {
                if (this.vertexFormat & VertexFormat.VF_POSITION) {
                    this.verticesData.push(this.source_positionData[i * Geometry.positionSize]);
                    this.verticesData.push(this.source_positionData[i * Geometry.positionSize + 1]);
                    this.verticesData.push(this.source_positionData[i * Geometry.positionSize + 2]);
                }

                if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                    this.verticesData.push(this.source_normalData[i * Geometry.normalSize]);
                    this.verticesData.push(this.source_normalData[i * Geometry.normalSize + 1]);
                    this.verticesData.push(this.source_normalData[i * Geometry.normalSize + 2]);
                }

                if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                    this.verticesData.push(this.source_tangentData[i * Geometry.tangentSize]);
                    this.verticesData.push(this.source_tangentData[i * Geometry.tangentSize + 1]);
                    this.verticesData.push(this.source_tangentData[i * Geometry.tangentSize + 2]);
                }

                if (this.vertexFormat & VertexFormat.VF_COLOR) {
                    this.verticesData.push(this.source_colorData[i * Geometry.colorSize]);
                    this.verticesData.push(this.source_colorData[i * Geometry.colorSize + 1]);
                    this.verticesData.push(this.source_colorData[i * Geometry.colorSize + 2]);
                    this.verticesData.push(this.source_colorData[i * Geometry.colorSize + 3]);
                }

                if (this.vertexFormat & VertexFormat.VF_UV) {
                    this.verticesData.push(this.source_uvData[i * Geometry.uvSize]);
                    this.verticesData.push(this.source_uvData[i * Geometry.uvSize + 1]);
                }

                if (this.vertexFormat & VertexFormat.VF_UV2) {
                    this.verticesData.push(this.source_uv2Data[i * Geometry.uv2Size]);
                    this.verticesData.push(this.source_uv2Data[i * Geometry.uv2Size + 1]);
                }

                if (this.vertexFormat & VertexFormat.VF_SKIN) {
                    for (var j = 0; j < Geometry.skinSize; ++j) {
                        this.verticesData.push(this.source_SkinData[i * Geometry.skinSize + j]);
                    }
                }
            }
        }

        public update(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            if (this._bufferDiry) {
                this._bufferDiry = false; 
                this.upload(context3DProxy);
            }
            context3DProxy.bindVertexBuffer(this.sharedVertexBuffer);
            context3DProxy.bindIndexBuffer(this.sharedIndexBuffer);
        }

        public upload(context3DProxy: Context3DProxy) {
            this.sharedIndexBuffer = context3DProxy.creatIndexBuffer(this.indexData);
            this.sharedVertexBuffer = context3DProxy.creatVertexBuffer(this.verticesData);
        }
    }
} 