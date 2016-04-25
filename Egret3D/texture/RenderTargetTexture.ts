module egret3d {
    export class RenderTargetTexture implements ITexture{
        public useMipmap: boolean = true;
        public smooth: boolean = true;
        public width: number;
        public height: number;
        public texture2D: Texture2D;
        public texture3D: Texture3D;

        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.createFramebuffer(this.width, this.height, FrameBufferFormat.UNSIGNED_BYTE_RGB);
            }
        }

        public uploadForcing(context3D: Context3DProxy) {

        }
    }
} 