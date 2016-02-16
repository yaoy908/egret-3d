module egret3d_dev {

    /**
    * @class egret3d.openGLES.Texture2D
    * @classdesc
    * Texture 类表示上载到渲染上下文的二维纹理。</p>
    *
    * 定义一个 2D 纹理，以便在渲染期间使用。</p>
    * 无法直接实例化 Texture。使用 Context3D createTexture() 方法创建实例。</p>
    * @see egret3d.openGLES.Program3D
    * @see egret3d.openGLES.IndexBuffer3D
    * @see egret3d.openGLES.VertexBuffer3D
    * @see egret3d.openGLES.Texture2D
    * @see egret3d.openGLES.Shader
    * @see egret3d.openGLES.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class TextureBase {

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
        public texture: any;

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
         * @language zh_CN
         * 立方形贴图
         */
        public cubeTexture: CubeTexture;

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
         * 构造函数
         */
        constructor(texture2D: WebGLTexture) {
            this.texture = texture2D;
            this.border = 0;
            this.useMipmap = true;
            this.imageData = null;
            this.colorformat = ContextConfig.ColorFormat_RGBA8888;
            this.internalformat = InternalFormat.PixelArray;
            this.mimapData = new Array<MipmapData>();
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: ContextProxy) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = this.internalformat;
                this.texture.gpu_colorformat = this.colorformat;
                this.texture.mipmapDatas = this.mimapData;
                this.texture.image = this.imageData;
                this.texture.gpu_border = 0;

                if (this.useMipmap) {
                    for (var i: number = 0; i < this.mimapData.length; i++) {
                        context3D.upLoadTextureData(i, this.texture);
                    }
                }
                else {
                    context3D.upLoadTextureData(0, this.texture);
                }
                
             
            }
        }

        public uploadForcing(context3D: ContextProxy) {
            this.texture = context3D.creatTexture2D();
            this.texture.gpu_internalformat = this.internalformat;
            this.texture.gpu_colorformat = this.colorformat;
            this.texture.mipmapDatas = this.mimapData;
            this.texture.image = this.imageData;
            this.texture.gpu_border = 0;

            if (this.useMipmap) {
                for (var i: number = 0; i < this.mimapData.length; i++) {
                    context3D.upLoadTextureData(i, this.texture);
                }
            }
            else {
                context3D.upLoadTextureData(0, this.texture);
            }
        }

        /**
         * @language zh_CN
         * 获取宽度值
         *  
         * @returns width
         */
        public get width(): number {
            if (this.imageData)
                return this.imageData.width;
            else if (this.mimapData.length > 0)
                return this.mimapData[0].width;
            return 0;
        }

        /**
         * @language zh_CN
         * 获取高度值
         *  
         * @returns height
         */
        public get height(): number {
            if (this.imageData)
                return this.imageData.height;
            else if (this.mimapData.length > 0)
                return this.mimapData[0].height;
            return 0;
        }
    }
}