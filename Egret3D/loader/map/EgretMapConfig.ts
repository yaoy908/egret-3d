module egret3d {

    /**
    * @class egret3d.EgretMapConfig
    * @classdesc
    * 配置加载一个场景的相关信息
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EgretMapConfig {

        constructor() {

        }

        /**
        * @language zh_CN  
        * 场景目录的相对路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static ScenePath: string = "resource/scene/";

        /**
        * @language zh_CN  
        * 场景内配置文件的文件名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static MapFile: string = "MapConfig.xml";

        /**
        * @language zh_CN  
        * 场景中模型文件的后缀
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EsmSuffix: string = ".esm";
        /**
        * @language zh_CN  
        * 场景中相机动画文件的后缀
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EcaSuffix: string = ".eca";
        /**
        * @language zh_CN  
        * 场景蒙皮动画文件的后缀
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EamSuffix: string = ".eam";
       
    }

}