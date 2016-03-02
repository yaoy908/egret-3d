module egret3d_dev {

     /**
     * @class egret3d_dev.ImageTexture
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
     * var imageTexture: egret3d_dev.ImageTexture = new egret3d_dev.ImageTexture(img);
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
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();
                this.texture2D.internalformat = InternalFormat.ImageData;
                this.texture2D.colorformat = ContextConfig.ColorFormat_RGBA8888;
                context3D.upLoadTextureData(0, this.texture2D);
            }
        }

        public uploadForcing(context3D: Context3DProxy) {
        }

    
    }
}