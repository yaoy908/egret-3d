module egret3d {
    
    /**
    * @private
    */
    export class MethodBase {

        public methodType: number = -1 ;
        public vsShaderList: Array<string> = [] ;
        public fsShaderList: Array<string> = [];

        public materialData: MaterialData;

        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {

        }

        public update(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }

        /**
        * @language zh_CN
        */
        public dispose() {
        }
    }
}