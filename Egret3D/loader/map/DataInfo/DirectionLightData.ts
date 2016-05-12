module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.DirectionLightData
    * @classdesc
    * 平行光数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DirectionLightData {

        /**
         * @language zh_CN
         * 灯光编号，全局唯一
         * @version Egret 3.0
         * @platform Web,Native
         */
        public id: number = 0;

        /**
         * @language zh_CN
         * diffuseColor
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffuseColor: number = 0xffffff;

        /**
         * @language zh_CN
         * ambientColor
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ambientColor: number = 0xffffff;

        /**
         * @language zh_CN
         * 强度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public intensity: number = 1.0;

        /**
         * @language zh_CN
         * 强度的一半
         * @version Egret 3.0
         * @platform Web,Native
         */
        public halfIntensity: number = 0.0;

        /**
         * @language zh_CN
         * X方向的值
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dirX: number = -0.5;

        /**
         * @language zh_CN
         * Y方向的值
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dirY: number = -0.6;

        /**
         * @language zh_CN
         * Z方向的值
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dirZ: number = 0.2;

        /**
        * @language zh_CN
        * constructor 
        */
        public constructor() {
        }

    }
}