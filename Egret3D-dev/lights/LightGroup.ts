module egret3d_dev {
   
     /**
    * @class egret3d.DirectLight
    * @classdesc
    *   
    * 点光源。</p>
    * 所有的灯光基本要素 灯光的颜色，强度，位置，方向。</p>
    * 颜色的色值均是16进制 red:0xffff0000 argb的定义模式。</p>
    * 每个材质球所能最大使用的灯光建议别太多，能省则省，尤其是移动端，能用灯光缓存图 lightmap 最好。</p>
    * 点光源是游戏中常常用到的动态光源，实时渲染中，灯光的数量会直接影响渲染性能。</p>
    * @see egret3d.Object3D
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LightGroup {
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 灯光个数
         */
        public lightNum: number = 0;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 方向光列表
         */
        public directLightList: Array<DirectLight>;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 聚光灯列表
         */
        public spotLightList: Array<SpotLight>;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 点光源列表
         */
        public pointLightList: Array<PointLight>;

        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            this.directLightList = new Array<DirectLight>();
            this.spotLightList = new Array<SpotLight>();
            this.pointLightList = new Array<PointLight>();
        }

        /**
         * @language zh_CN
         * 为灯光组,添加一个灯光
         * @param light  Direct Light
         */
        public addLight(light: LightBase) {
            switch (light.lightType){
                case LightType.directlight:
                    this.directLightList.push(<DirectLight>light);
                    this.lightNum++;
                    break;

                case LightType.pointlight:
                    this.pointLightList.push(<PointLight>light);
                    this.lightNum++;
                    break;

                case LightType.spotLightlight:
                    this.spotLightList.push(<SpotLight>light);
                    this.lightNum++;
                    break;
            }
        }
    }
} 