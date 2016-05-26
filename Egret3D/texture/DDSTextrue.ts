module egret3d {
    
    /**
     * @private 
     */
    export class DDSTexture extends ITexture {

        public internalFormat: InternalFormat;
        public colorFormat: number;
        public mimapData: Array<MipmapData>;

        private _smooth: boolean = true;
        constructor() {
            super();
        }

      
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();
                this.texture2D.smooth = this._smooth;
                this.texture2D.internalFormat = this.internalFormat;
                this.texture2D.colorFormat = this.colorFormat;
                this.texture2D.mimapData = this.mimapData;

                if (this.mimapData && this.mimapData.length > 0) {
                    for (var i: number = 0; i < this.mimapData.length; i++) {
                        context3D.upLoadTextureData(i, this.texture2D);
                    }
                }
                else {
                    context3D.upLoadTextureData(0, this.texture2D);
                }
            }
        }

        public uploadForcing(context3D: Context3DProxy) {
            context3D.upLoadTextureData(0, this.texture2D);
        }
    }
}