module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.SceneNodeType
    * @classdesc
    * 场景节点类型;
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum SceneNodeType {
        /**
         * @language zh_CN
         * 未知类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        Unknown,

        /**
         * @language zh_CN
         * mesh对象
         * @version Egret 3.0
         * @platform Web,Native
         */
        Mesh,

        /**
         * @language zh_CN
         * 灯光对象
         * @version Egret 3.0
         * @platform Web,Native
         */
        Light,

        /**
         * @language zh_CN
         * 相机对象
         * @version Egret 3.0
         * @platform Web,Native
         */
        Camera,

        /**
         * @language zh_CN
         * 材质球对象
         * @version Egret 3.0
         * @platform Web,Native
         */
        Material,

         /**
         * @language zh_CN
         * 根节点
         * @version Egret 3.0
         * @platform Web,Native
         */
        Scene,
    }
}