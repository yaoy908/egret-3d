module egret3d {
    
    /**
    * @private
    * @class egret3d.ITexture
    * @classdesc
    */
    export interface ITexture {

        useMipmap: boolean; 
        smooth: boolean; 
        width: number;
        height: number;
        texture2D: Texture2D;
        texture3D: Texture3D;

        upload(context3D: Context3DProxy)
        uploadForcing(context3D: Context3DProxy)
    }
}