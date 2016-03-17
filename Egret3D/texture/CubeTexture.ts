module egret3d {
    /**
     * @class egret3d.SkyTexture
     * @classdesc
     * SkyTexture 类为天空贴图
     *
     * 天空贴图用于Sky类使用，其内部是将6张HTMLImageElement（网页图片元素）封装到CubeTexture对象，CubeTexture为引擎内部使用对象。</p>
     *
     * 示例：</p>
     * 假设html中已有</p>
     <pre>
     <img id="t1" src="image_front.png" />
     <img id="t2" src="image_back.png" />
     <img id="t3" src="image_left.png" />
     <img id="t4" src="image_right.png" />
     <img id="t5" src="image_up.png" />
     <img id="t6" src="image_down.png" />
     </pre>
     使用示例：</p>
     <pre>
     var skyTexture: egret3d.SkyTexture = new egret3d.SkyTexture(
     <HTMLImageElement>document.getElementById("t1"),
     <HTMLImageElement>document.getElementById("t2"),
     <HTMLImageElement>document.getElementById("t3"),
     <HTMLImageElement>document.getElementById("t4"),
     <HTMLImageElement>document.getElementById("t5"),
     <HTMLImageElement>document.getElementById("t6")
     );

     view3D.sky = new egret3d.Sky(skyTexture);
     </pre>
     * @see egret3d.Sky
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample texture/SkyTexture.ts
     */
    export class CubeTexture implements ITexture {

        private image_front: Texture2D;
        private image_back: Texture2D;
        private image_left: Texture2D;
        private image_right: Texture2D;
        private image_up: Texture2D;
        private image_down: Texture2D;

        public texture2D: Texture2D;
        public texture3D: Texture3D;
        public width: number;
        public height: number;

        /**
         * @language zh_CN
         * 构造函数
         * @param image_front 前部HTMLImageElement图片元素
         * @param image_back 背部HTMLImageElement图片元素
         * @param image_left 左部HTMLImageElement图片元素
         * @param image_right 右部HTMLImageElement图片元素
         * @param image_up 顶部HTMLImageElement图片元素
         * @param image_down 底部HTMLImageElement图片元素
         */
        constructor(image_front: Texture2D,
            image_back: Texture2D,
            image_left: Texture2D,
            image_right: Texture2D,
            image_up: Texture2D,
            image_down: Texture2D) {

            this.image_front = image_front;
            this.image_back = image_back;
            this.image_left = image_left;
            this.image_right = image_right;
            this.image_up = image_up;
            this.image_down = image_down;
        }

        /**
         * @language zh_CN
         * 创建CubuTexture
         * @param image_front 前部HTMLImageElement图片元素
         * @param image_back 背部HTMLImageElement图片元素
         * @param image_left 左部HTMLImageElement图片元素
         * @param image_right 右部HTMLImageElement图片元素
         * @param image_up 顶部HTMLImageElement图片元素
         * @param image_down 底部HTMLImageElement图片元素
         */
        public static createCubeTexture(image_front: HTMLImageElement,
            image_back: HTMLImageElement,
            image_left: HTMLImageElement,
            image_right: HTMLImageElement,
            image_up: HTMLImageElement,
            image_down: HTMLImageElement): CubeTexture {

            var front: Texture2D = new Texture2D();
            front.imageData = image_front;

            var back: Texture2D = new Texture2D();
            back.imageData = image_back;

            var left: Texture2D = new Texture2D();
            left.imageData = image_left;

            var right: Texture2D = new Texture2D();
            right.imageData = image_right;

            var up: Texture2D = new Texture2D();
            up.imageData = image_up;

            var down: Texture2D = new Texture2D();
            down.imageData = image_down;

            var cubeTexture: CubeTexture = new CubeTexture(front, back, left, right, up, down);
            return cubeTexture;
        }


        /**
        * @language zh_CN
        * 设置贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512*512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
        * @param img HTMLImageElement（网页图像元素）
        */
        public set useMipmap(flag: boolean) {
            this.texture2D.useMipmap = flag;
        }

        /**
         * @language zh_CN
         * 获取贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512*512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
         * @param img HTMLImageElement（网页图像元素）
         */
        public get useMipmap(): boolean {
            return this.texture2D.useMipmap;
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * 更新上传 cube 贴图纹理到GPU 现存中缓存起来
         * @param context3D
         */
        public upload(context3D: Context3DProxy) {
            if (!this.texture3D) {

                this.texture3D = context3D.creatCubeTexture();
                this.texture3D.border = 0;

                this.texture3D.image_front = this.image_front;
                this.texture3D.image_back = this.image_back;
                this.texture3D.image_left = this.image_left;
                this.texture3D.image_right = this.image_right;
                this.texture3D.image_up = this.image_up;
                this.texture3D.image_down = this.image_down;
                context3D.uploadCubetexture(this.texture3D);
            }
        }

        public uploadForcing(context3D: Context3DProxy) {

        }
    }
}