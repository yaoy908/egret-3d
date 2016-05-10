module egret3d {

    /**
    * @class egret3d.MethodBase
    * @classdesc
    * 增加多种渲染效果的方法基类
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MethodBase {

        /**
        * @private
        * @language zh_CN
        */
        public methodType: number = -1;

        /**
        * @private
        * @language zh_CN
        */
        public vsShaderList: Array<string> = [] ;

        /**
        * @private
        * @language zh_CN
        */
        public fsShaderList: Array<string> = [];

        /**
        * @private
        * @language zh_CN
        */
        public materialData: MaterialData;


        /**
        * @private
        * @language zh_CN
        */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {

        }

        /**
        * @private
        * @language zh_CN
        */
        public update(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }

        /**
        * @private
        * @language zh_CN
        */
        public dispose() {
        }
    }
}