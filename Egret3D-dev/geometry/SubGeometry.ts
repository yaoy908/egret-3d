module egret3d_dev {
    
    /**
     * @private
     * @language zh_CN
     * @class egret3d_dev.VertexFormat
     * @classdesc
     * 顶点数据格式类型 是由2进制组成 一个顶点可以由多个类型组成
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum VertexFormat {
        VF_POSITION = 0x0000001,
        VF_NORMAL = 0x0000002,
        VF_TANGENT = 0x0000004,
        VF_COLOR = 0x0000008,
        VF_UV = 0x0000010,
        VF_UV2 = 0x0000020,
    }
        
    /**
     * @private
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
        * 顶点字节数
        */
        public vertexSizeInBytes: number;

        public uniforms: Array<any> = new Array<any>();

        constructor() {

        }

        private calculateVertexFormat(context3DProxy: Context3DProxy) {
            if (this.vertexFormat & VertexFormat.VF_POSITION) {
                this.vertexAttLength += 3;
                
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_position"));
            }

            if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                this.vertexAttLength += 3;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_normal"));
            }

            if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                this.vertexAttLength += 3;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_tangent"));
            }

            if (this.vertexFormat & VertexFormat.VF_COLOR) {
                this.vertexAttLength += 4;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_vertexColor"));
            }

            if (this.vertexFormat & VertexFormat.VF_UV) {
                this.vertexAttLength += 2;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_uv0"));
            }

            if (this.vertexFormat & VertexFormat.VF_UV2) {
                this.vertexAttLength += 2;
                //this.uniforms.push(context3DProxy.getUniformLocation(null, "attribute_uv1"));
            }
        }
    }
} 