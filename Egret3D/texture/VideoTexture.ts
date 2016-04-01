module egret3d {
   
    /**
     * @private
     * @class egret3d.VideoTexture
     * @classdesc
     * VideoTexture 使用 Video 标签采集 video 视频 </p>
     * VideoTexture 仅且暂时只能在pc上正常使用，移动端需要直接与用户交互才可正常生成播放</p>
     * 需要设置贴图的宽度和高度。必须为2的N次</p>
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class VideoTexture implements ITexture {
        private video: HTMLVideoElement;
        private canUpdataTexture: boolean = false; 
        private context: CanvasRenderingContext2D;
        private tmpCanvas: HTMLCanvasElement;

        public width: number;
        public height: number;
        public texture2D: Texture2D;
        public texture3D: Texture3D;

        private _smooth: boolean = true;

        constructor( width:number = 256 , height:number = 256 ) {

            this.width = width;
            this.height = height;

            this.tmpCanvas = document.createElement("canvas");
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;

            this.context = this.tmpCanvas .getContext('2d');

            this.video = document.createElement("video");
            this.video.msZoom = true;
            this.video.width = width;
            this.video.height = height;
            this.video.videoWidth = width;
            this.video.videoHeight = height;
            this.video.controls = false;
            this.video.autoplay = true;

            this.video.addEventListener("canplaythrough", () => this.loadReady(), true);
            this.tmpCanvas.hidden = true;
        }

        private loadReady() {
            this.canUpdataTexture = true; 
        }

        /**
        * @language zh_CN
        * @private
        * 设置贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512*512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
        * @param img HTMLImageElement（网页图像元素）
        */
        public set useMipmap(flag: boolean) {
            this.texture2D.useMipmap = flag;
        }

        /**
        * @language zh_CN
        * @private
        * 获取贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512*512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
        * @param img HTMLImageElement（网页图像元素）
        */
        public get useMipmap(): boolean {
            return this.texture2D.useMipmap;
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
         * 设置 视频链接
         * 设置 视频的链接地址，只要是h5 支持的格式都支持， 例如:ogv,mp4,avi
         * @param src 视频格式的链接地址
         */
        public set source(src:string) {
            this.video.src = src;
        }

         /**
         * @language zh_CN
         * 返回 视频链接
         * 视频的链接地址，只要是h5 支持的格式都支持， 例如:ogv,mp4,avi
         */
        public get source(): string {
            return this.video.src;
        }

         /**
         * @language zh_CN
         * 播放视频
         * 当视频缓冲好之后才能正常播放视频
         */
        public play() {
            this.video.play();
        }

        
         /**
         * @language zh_CN
         * 暂停视频
         * 控制视频的播放暂停状态
         */
        public pause() {
            this.video.pause();
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * 将video的视频数据实时传输到GPU上
         * @param context3D 
        */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();
                Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, this.texture2D.texture);
                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.NEAREST);
            }

            if (this.canUpdataTexture) {
                this.context.drawImage(this.video, 0, 0, this.width, this.height);
                Context3DProxy.gl.pixelStorei(Context3DProxy.gl.UNPACK_ALIGNMENT, 1)
                Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, this.texture2D.texture);
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, this.tmpCanvas );
            }
           
        }

        public uploadForcing(context3D: Context3DProxy) {
        }
    }
} 