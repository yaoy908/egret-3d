module egret3d_dev {
    export class ColorMaterial extends MaterialBase {
        constructor( ) {
            super(null);
        }

        protected initPass() {
            this.diffusePass = new ColorPass(this.materialData);
        }
    }
}