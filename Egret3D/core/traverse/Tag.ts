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
    export class Tag {
        /**
       * @language zh_CN
       * 没有alpha的对象列表
       */
        public objects: Array<Object3D> = new Array<Object3D>();

        /**
        * @language zh_CN
        * 有alpha的对象列表
        */
        public alphaObjects: Array<Object3D> = new Array<Object3D>();
    }
} 