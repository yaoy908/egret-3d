module egret3d {
    export class MethodBase {

        public methodType: number = -1 ;
        public vsShaderName: string = "" ;
        public fsShaderName: string = "" ;

        public upload(time: number, delay: number, usage: PassUsage, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {

        }

        public active(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }

    }
}