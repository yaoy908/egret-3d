module egret3d {

     /**
     * @class egret3d.ImageTexture
     * @classdesc
     * ImageTexture 类为 图像贴图
     * 
     * 图像贴图用于封装 HTMLImageElement（网页图像元素）到引擎内部可使用的Texture2D对象, </p>
      * HTMLImageElement 可通过内嵌HTML文件中获取。</p>
     *
      *
     * 示例：
     * 假设html中已有 &lt;img id="t1" src="xxx.png" /&gt;
     * <pre>
     * var img: HTMLImageElement = <HTMLImageElement>document.getElementById("t1");
     * var imageTexture: egret3d.ImageTexture = new egret3d.ImageTexture(img);
      * </pre>
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ImageTexture implements ITexture {

        /**
         * @language zh_CN
         * 贴图数据
         *  
         */
        public imageData: HTMLImageElement;

        public width: number;
        public height: number;
        public texture2D: Texture2D;
        public texture3D: Texture3D;

        /**
         * @language zh_CN
         * 构造函数
         * @param img HTMLImageElement（网页图像元素）
         */
        constructor(img: HTMLImageElement) {
            this.imageData = img;
        }

        /**
         * @language zh_CN
         * 设置贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512*512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
         * @param img HTMLImageElement（网页图像元素）
         */
        public set useMipmap( flag:boolean ) {
            this.texture2D.useMipmap = flag;
        }


        /**
         * @language zh_CN
         * 获取贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512*512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
         * @param img HTMLImageElement（网页图像元素）
         */
        public get useMipmap():boolean {
            return this.texture2D.useMipmap ;
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();
                this.texture2D.internalFormat = InternalFormat.ImageData;
                this.texture2D.imageData = this.imageData;
                this.texture2D.colorFormat = ContextConfig.ColorFormat_RGBA8888;
                context3D.upLoadTextureData(0, this.texture2D);
            }
        }

        /**
         * @language zh_CN
         * 强制上传贴图数据给GPU，强制要求贴图更新。
         * 在video 贴图类型需要立即改变显卡中的贴图内存
         * @param context3D 
         */
        public uploadForcing(context3D: Context3DProxy) {
            context3D.upLoadTextureData(0, this.texture2D);
        }
    }
}