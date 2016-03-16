module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.CubeTextureMaterial
    * @classdesc
    * cube纹理材质。
    * 
    * 
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class CubeTextureMaterial extends MaterialBase {
        /**
         * @language zh_CN
         * 创建一个新的 TextureMaterial 对象。
         * @param texture {ITexture}
         * @param materialData {MaterialData}
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(texture: ITexture = null, materialData: MaterialData = null) {
            super(materialData);
            this.diffuseTexture = texture;
            this.initMatPass();
        }

        protected initMatPass() {
            this.diffusePass = new CubePass(this.materialData);
        }

        /**
         * @language zh_CN
         * 克隆方法。
         * 将材质球克隆一份，公用shader着色器和贴图，不公用参数
         * @returns {TextureMaterial}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public clone(): CubeTextureMaterial {
            var mat: CubeTextureMaterial = new CubeTextureMaterial(this.diffuseTexture, this.materialData.clone());
            return mat;
        }
    }
} 