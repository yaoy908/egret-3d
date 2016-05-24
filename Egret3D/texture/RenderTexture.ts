module egret3d {
    export class RenderTexture implements ITexture{
        public useMipmap: boolean = false ;
        public smooth: boolean = true;
        public width: number;
        public height: number;
        public texture2D: Texture2D;
        public texture3D: Texture3D;
        public frameBufferFormat: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB;

        constructor(width: number = 512, height: number = 512, frameBufferFormat: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            this.width = width;
            this.height = height;
            this.frameBufferFormat = frameBufferFormat;
        }

        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.createFramebuffer(this.width, this.height, this.frameBufferFormat );
            }
        }

        public uploadForcing(context3D: Context3DProxy) {

        }
    }
} 