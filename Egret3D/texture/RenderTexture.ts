module egret3d {

    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class RenderTexture extends ITexture{
        public frameBufferFormat: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB;

        constructor(width: number = 512, height: number = 512, frameBufferFormat: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            super();
            this.useMipmap = false;
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