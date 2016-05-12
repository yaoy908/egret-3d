module egret3d {
    
    /**
    * @private
    */
    export class MethodBase {

        public vsShaderList: { [shaderPhaseType: number]: string[] } = [];
        public fsShaderList: { [shaderPhaseType: number]: string[] } = [];

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