module egret3d_dev {
    export interface IRender extends IDispatchEvent{
        childs: Array<Object3D>;

        geometry: Geometry;
        material: MaterialBase;
        animation: IAnimation;

        modelMatrix: Matrix4_4;

        pickType: number;

        /**
        * @language zh_CN
        * 对象模型包围盒。</p>
        * 每个场景物件都需要有的 包围盒子，可以自定义包围盒形状大小，也可以根据模型本身生成。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        bound: Bound;

        /**
        * @language zh_CN
        * 鼠标检测数据
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        pickResult: PickResult;

        mouseEnable: boolean;
        mouseChilder: boolean;
        enableCulling: boolean;
        visible: boolean;

        //upload(context3DProxy: Context3DProxy);
        renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) 
    }
}