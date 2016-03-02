module egret3d_dev {

    /**
    * @class egret3d_dev.openGLES.Texture2D
    * @classdesc
    * Texture 类表示上载到渲染上下文的二维纹理。</p>
    *
    * 定义一个 2D 纹理，以便在渲染期间使用。</p>
    * 无法直接实例化 Texture。使用 Context3D createTexture() 方法创建实例。</p>
    * @see egret3d_dev.openGLES.Program3D
    * @see egret3d_dev.openGLES.IndexBuffer3D
    * @see egret3d_dev.openGLES.VertexBuffer3D
    * @see egret3d_dev.openGLES.Texture2D
    * @see egret3d_dev.openGLES.Shader
    * @see egret3d_dev.openGLES.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Texture2D {

        /**
       * @language zh_CN
       * @private
       * 提交显卡的 index
       */
        public index: number;

        /**
        * @language zh_CN
        * @private
        * 显卡中上传使用的 border 边框像素大小
        */
        public border: number;

        /**
        * @language zh_CN
        * @private
        * 纹理贴图的颜色模式
        */
        public colorformat: number;

        /**
        * @language zh_CN
        * @private
        * 纹理贴图标准的格式
        */
        public internalformat: InternalFormat;

        /**
        * @language zh_CN
        * @private
        * context.creatTexture()接口生成的GPU纹理
        */
        public texture: WebGLTexture;

        /**
         * @language zh_CN
         * 是否使用mipmap
         */
        public useMipmap: boolean;

        /**
         * @language zh_CN
         * 贴图元素对象
         */
        public imageData: HTMLImageElement;

        /**
         * @language zh_CN
         * mipmap数据
         */
        public mimapData: Array<MipmapData>;

        /**
         * @private
        */
        public frameBuffer: WebGLFramebuffer;

        /**
        * @private
        */
        public renderbuffer: WebGLRenderbuffer;

        /**
        * @language zh_CN
        * 提交给显卡的贴图尺寸大小 贴图宽度
        * <p>当作为renderTexture使用时一定要传入真实尺寸
        */
        public width: number;

             /**
        * @language zh_CN
        * 提交给显卡的贴图尺寸大小 贴图高度
        * <p>当作为renderTexture使用时一定要传入真实尺寸
        */
        public height: number;

        /**
         * @language zh_CN
         * 构造函数
         */
        constructor() {
            this.border = 0;
            this.useMipmap = true;
            this.imageData = null;
            this.colorformat = ContextConfig.ColorFormat_RGBA8888;
            this.internalformat = InternalFormat.PixelArray;
            this.mimapData = new Array<MipmapData>();
        }
    }
}