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

        /**
         * @private
         * @language zh_CN
         * 顶点蒙皮信息
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_SKIN = 0x0000040,
    }
        
    /**
     * @language zh_CN
     * @class egret3d_dev.SubGeometry
     * @classdesc
     * 表示几何形状 子集
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class SubGeometry {
        public material: MaterialBase;
        
       

        /**
        * @language zh_CN
        * 
        */
        public uniforms: Array<any> = new Array<any>();
        
        /**
        * @language zh_CN
        * 创建一个SubGeometry
        */
        constructor() {
        }
    }
} 