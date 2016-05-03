module egret3d {
    export class PBRMaterial extends MaterialBase {

        constructor(texture: ITexture = null, materialData: MaterialData = null) {
            super(materialData);
            this.initMatPass();
        }

        protected initMatPass() {
            this.diffusePass = new PBRPass(this.materialData);
        }
    }
}