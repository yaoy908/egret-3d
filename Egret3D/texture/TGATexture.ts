module egret3d {

    /**
     * @private 
     */
    export class TGATexture implements ITexture {

        public width: number;
        public height: number;
        public texture2D: Texture2D;
        public texture3D: Texture3D;

        public upload(context3D: Context3DProxy) {
        }

        public uploadForcing(context3D: Context3DProxy) {
        }
    }
}