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
        
        public id:number = 0;
        public diffuseColor: number = 0xffffff;
        public ambientColor: number = 0xffffff;
        public intensity: number = 1.0;
        public halfIntensity: number = 0.0;

        public dirX: number = -0.5;
        public dirY: number = -0.6;
        public dirZ: number = 0.2;

        public constructor() {
        }

    }
}