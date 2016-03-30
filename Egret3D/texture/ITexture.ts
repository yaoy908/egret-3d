module egret3d {
    export interface ITexture {

        useMipmap: boolean; 
        smooth: boolean; 
       
        upload(context3D: Context3DProxy)
        uploadForcing(context3D: Context3DProxy)
        width: number;
        height: number;
        texture2D: Texture2D;
        texture3D: Texture3D;
    }
}