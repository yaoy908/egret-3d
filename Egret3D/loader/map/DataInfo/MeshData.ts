module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.MeshData
    * @classdesc
    * 模型数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MeshData extends SourceDataBase{

        /**
         * @language zh_CN
         * 材质球索引，全局唯一
         * @version Egret 3.0
         * @platform Web,Native
         */
        public name: string;

        /**
         * @language zh_CN
         * 对应的材质球id
         * @version Egret 3.0
         * @platform Web,Native
         */
        public materialID: number = -1;

        /**
         * @language zh_CN
         * 拥有的动画剪辑名的列表
         * @version Egret 3.0
         * @platform Web,Native
         */
        public skinClips: Array<string>;

        /**
         * @language zh_CN
         * 材质球的id，全局唯一
         * @version Egret 3.0
         * @platform Web,Native
         */
        public lightIds: Array<any>;

        /**
         * @language zh_CN
         * 是否启用公告板模式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public billboard: boolean = false;

        /**
         * @language zh_CN
         * 坐标x
         * @version Egret 3.0
         * @platform Web,Native
         */
        public x: number = 0;

        /**
         * @language zh_CN
         * 坐标y
         * @version Egret 3.0
         * @platform Web,Native
         */
        public y: number = 0;

        /**
         * @language zh_CN
         * 坐标z
         * @version Egret 3.0
         * @platform Web,Native
         */
        public z: number = 0;

        /**
         * @language zh_CN
         * x轴旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public rx: number = 0;

        /**
         * @language zh_CN
         * y轴旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ry: number = 0;

        /**
         * @language zh_CN
         * z轴旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public rz: number = 0;

        /**
         * @language zh_CN
         * x轴缩放
         * @version Egret 3.0
         * @platform Web,Native
         */
        public sx: number = 1;

        /**
         * @language zh_CN
         * y轴缩放
         * @version Egret 3.0
         * @platform Web,Native
         */
        public sy: number = 1;

        /**
         * @language zh_CN
         * z轴缩放
         * @version Egret 3.0
         * @platform Web,Native
         */
        public sz: number = 1;

        /**
        * @language zh_CN
        * constructor 
        */
        public constructor() {
            super();
        }
       
    }
}