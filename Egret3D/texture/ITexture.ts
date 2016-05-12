module egret3d {

    /**
    * @class egret3d.ITexture
    * @classdesc
    * 贴图的接口
    * @version Egret 3.0
    * @platform Web,Native
    */
    export interface ITexture {

        useMipmap: boolean; 

        /**
        * @language zh_CN
        * 是否平滑差值
        * @version Egret 3.0
        * @platform Web,Native
        */
        smooth: boolean; 

        /**
        * @language zh_CN
        * 贴图的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        width: number;

        /**
        * @language zh_CN
        * 贴图的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        height: number;

        /**
        * @language zh_CN
        * Texture2D 对象 保存贴图的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        texture2D: Texture2D;

        /**
        * @language zh_CN
        * Texture3D 对象 保存贴图的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        texture3D: Texture3D;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        upload(context3D: Context3DProxy)

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        uploadForcing(context3D: Context3DProxy)
    }
}