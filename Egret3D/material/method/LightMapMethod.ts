module egret3d {
    
    /**
    * @private
    */
    export class LightmapMethod extends MethodBase {

        private texture: ITexture;
        /**
         * @language zh_CN
         */
        constructor() {
            super();
            //this.methodType = TextureMethodType.diffuse; 
            //this.vsShaderList.push("secondaryUV_vs");
            //this.fsShaderList.push("lightMap_fs");
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set lightTexture(texture: ITexture) {
            this.texture = texture;
            this.materialData.lightTexture = this.texture;
            this.materialData.textureChange = true;
        }

      /**
         * @language zh_CN
         * @param time
         * @param delay
         * @param usage
         * @param materialData
         * @param geometry
         * @param context3DProxy
         * @param modeltransform 
         * @param modeltransform
         * @param camera3D
         */
        public upload(time: number, delay: number, usage: PassUsage,geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }

        public active(time: number, delay: number, usage: PassUsage,geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }


    }
}