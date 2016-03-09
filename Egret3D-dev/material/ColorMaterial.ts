module egret3d_dev {
    export class ColorMaterial extends MaterialBase {

        constructor( color:number = 0xcccccc ) {
            super();
            this.color = color;
        }

        protected initPass() {
            this.diffusePass = new ColorPass(this.materialData);
        }

        public set color( value:number ) {
            this.materialData.diffuseColor = value; 
        }

        public get color(): number {
            return this.materialData.diffuseColor;
        }

        public set alpha(value: number) {
            this.materialData.alpha = value; 
        }

        public get alpha(): number {
            return this.materialData.alpha; 
        }
    }
}