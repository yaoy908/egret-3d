module egret3d {
    export interface ITexture {
        upload(context3D: Context3DProxy)
        uploadForcing(context3D: Context3DProxy)
        width: number;
        height: number;
        texture2D: Texture2D;
        texture3D: Texture3D;
    }
}