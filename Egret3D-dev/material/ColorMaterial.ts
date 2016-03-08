module egret3d_dev {
    export class ColorMaterial extends MaterialBase {

        constructor() {
            super();
        }

        protected initPass() {
            this.diffusePass = new ColorPass(this.materialData);
        }
    }
}