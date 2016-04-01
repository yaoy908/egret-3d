module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.CheckerboardTexture
     * @classdesc
     * CheckerboardTexture 类为 棋盘格纹理类</p>
     * 
     * 棋盘格纹理为黑白间隔色块组成的一张纹理，主要用于判别模型UV的正确性，若某模型UV值不正确，其纹理表现必定乱序不规整。</p>
     * 使用示例:</p>
      <pre>
     var material: egret3d.TextureMaterial = new egret3d.TextureMaterial(egret3d.CheckerboardTexture.texture );
     var mesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(), material);
      </pre>
     *
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample texture/CheckerboardTexture.ts
     */
    export class CheckerboardTexture implements ITexture {

        /**
         * @language zh_CN
         * 公用棋盘格实例对象
         */
        public static texture: CheckerboardTexture = new CheckerboardTexture();
        private _width: number = 32;
        private _height: number = 32;
        private _pixelArray: Uint8Array;

        public width: number;
        public height: number;
        public texture2D: Texture2D;
        public texture3D: Texture3D;

        private _smooth: boolean = true;
        private _useMipmap: boolean = true;

        /**
         * @language zh_CN
         * 构造函数
         */
        constructor() {
            this.buildCheckerboard();
        }


        /**
        * @language zh_CN
        * 设置贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512*512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
        * @param img HTMLImageElement（网页图像元素）
        */
        public set useMipmap(flag: boolean) {
            this._useMipmap = flag;
        }

        /**
         * @language zh_CN
         * 获取贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512*512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
         * @param img HTMLImageElement（网页图像元素）
         */
        public get useMipmap(): boolean {
            return this._useMipmap;
        }
        
        /**
          * @language zh_CN
          * 设置贴图是否使用 smooth 
          * @param img HTMLImageElement（网页图像元素）
          */
        public set smooth(flag: boolean) {
            this._smooth = flag;
        }


        /**
         * @language zh_CN
         * 获取贴图是否使用 smooth
         * @param img HTMLImageElement（网页图像元素）
         */
        public get smooth(): boolean {
            return this._smooth;
        }
        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();
                this.texture2D.border = 0; 
                this.texture2D.internalFormat = InternalFormat.PixelArray;
                this.texture2D.colorFormat = ContextConfig.ColorFormat_RGBA8888;
                this.texture2D.smooth = this._smooth; 
                this.texture2D.useMipmap = this._useMipmap; 
                this.texture2D.mimapData = new Array<MipmapData>();
                this.texture2D.mimapData.push(new MipmapData(this._pixelArray, this._width, this._height));
                this.texture2D.useMipmap = false;
                context3D.upLoadTextureData(0, this.texture2D);
            }
        }

        private buildCheckerboard(): void {
            if (!this._pixelArray) {

                this._pixelArray = new Uint8Array(this._width * this._height * 4);

                var colors: Color[] = [Color.white(), Color.black()];

                var colorIndex = 0;

                var blockSize: number = 4;

                for (var y: number = 0; y < this._height; y++) {
                    for (var x: number = 0; x < this._width; x++) {

                        if ((x % blockSize) == 0) {
                            colorIndex = (colorIndex + 1) % 2;
                        }

                        if ((y % blockSize) == 0 && x == 0) {
                            var tmp: Color = colors[0];
                            colors[0] = colors[1];
                            colors[1] = tmp;
                            colorIndex = 0;
                        }

                        this._pixelArray[(y * (this._width * 4) + x * 4) + 0] = colors[colorIndex].r;
                        this._pixelArray[(y * (this._width * 4) + x * 4) + 1] = colors[colorIndex].g;
                        this._pixelArray[(y * (this._width * 4) + x * 4) + 2] = colors[colorIndex].b;
                        this._pixelArray[(y * (this._width * 4) + x * 4) + 3] = colors[colorIndex].a;
                    }
                }
            }
        }
        
        public uploadForcing(context3D: Context3DProxy) {
        }
    }
}