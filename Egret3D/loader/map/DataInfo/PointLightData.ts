module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.PointLightData
    * @classdesc
    * 点光源数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PointLightData {

        /**
         * @language zh_CN
         * 灯光的编号id（全局唯一）
         * @version Egret 3.0
         * @platform Web,Native
         */
        public id: number = 0;

        /**
         * @language zh_CN
         * diffuse的颜色
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffuseColor: number = 0xffffff;

        /**
         * @language zh_CN
         * ambient的颜色
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ambientColor: number = 0xffffff;

        /**
         * @language zh_CN
         * 材质球索引，全局唯一
         * @version Egret 3.0
         * @platform Web,Native
         */
        public intensity: number = 1.0;

        /**
         * @language zh_CN
         * 衰减值
         * @version Egret 3.0
         * @platform Web,Native
         */
        public falloff: number = 0.0;

        /**
         * @language zh_CN
         * 半径数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public radius: number = 100;

        /**
         * @language zh_CN
         * 坐标x
         * @version Egret 3.0
         * @platform Web,Native
         */
        public posX: number = 0

        /**
         * @language zh_CN
         * 坐标y
         * @version Egret 3.0
         * @platform Web,Native
         */
        public posY: number = 0;

        /**
         * @language zh_CN
         * 坐标z
         * @version Egret 3.0
         * @platform Web,Native
         */
        public posZ: number = 0;

        public constructor() {
        }

    }
}