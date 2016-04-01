module egret3d {


    /**
    * @private
    * @class egret3d.Layer
    * @classdesc
    * Object3D 渲染Layer
    * 每个Layer分两个渲染列表，一个是有alpha的对象列表，另一个是没有alpha的对象列表
    * 不同的Layer层级可以使用不同的渲染方式，来达到各组不同的渲染效果.
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Layer {
        /**
       * @language zh_CN
       * layer 列表
       */
        public layers: Array<Layer> = new Array<Layer>();

        /**
        * @language zh_CN
        * 是否清理深度
        */
        public clearDepth: boolean = false;

        /**
        * @language zh_CN
        * 层级清理深度状态
        */
        public cleanState: boolean = true; 
    }
} 