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
        //未知对象;
        Unknown,
        //网格模型对象;
        Mesh,
        //灯光对象;
        Light,
        //相机对象;
        Camera,
        //材质球
        Material,
        //根节点
        Scene,
    }
}