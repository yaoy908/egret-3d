module ecore {

    //场景节点类型;
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