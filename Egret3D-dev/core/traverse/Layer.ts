module egret3d_dev {

        /**
    * @class egret3d_dev.Tag
    * @classdesc
    * Object3D 渲染tag
    * 图形属性标签页的属性，由layer列表组成，共用深度信息
    * 渲染每个tag他们的深度信息是不清理的
    *
    * @see egret3d_dev.Layer
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