module egret3d_dev {

    /**
     * @language zh_CN
     * @class egret3d_dev.SubGeometry
     * @classdesc
     * 表示几何形状 子集
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class SubGeometry {
        /**
         * @language zh_CN
         * 顶点索引
         * @version Egret 3.0
         * @platform Web,Native
         */
        public start: number = 0;
                
        /**
         * @language zh_CN
         * 顶点数量
         * @version Egret 3.0
         * @platform Web,Native
         */
        public count: number = 0;

        /**
         * @language zh_CN
         * 材质ID
         * @version Egret 3.0
         * @platform Web,Native
         */
        public matID: number = 0;
        
        /**
        * @language zh_CN
        * 创建一个SubGeometry
        */
        constructor() {
        }

        public update(time:number,delay:number,program:Program3D,contextPorxy:Context3DProxy) {
        }
    }
} 