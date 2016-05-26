module egret3d {

    /**
    * @class egret3d.ITexture
    * @classdesc
    * 贴图的接口
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ITexture {
       
        /**
        * @language zh_CN
        * 贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512* 512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public useMipmap: boolean = true;

        /**
        * @language zh_CN
        * 是否平滑差值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public smooth: boolean = true; 

        /**
        * @language zh_CN
        * 贴图的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public width: number;

        /**
        * @language zh_CN
        * 贴图的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public height: number;

        /**
        * @language zh_CN
        * Texture2D 对象 保存贴图的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public texture2D: Texture2D;

        /**
        * @language zh_CN
        * Texture3D 对象 保存贴图的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public texture3D: Texture3D;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadForcing(context3D: Context3DProxy) {

        }
    }
}