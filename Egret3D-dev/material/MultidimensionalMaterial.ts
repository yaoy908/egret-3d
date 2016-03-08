module egret3d_dev {
    export class MultidimensionalMaterial extends MaterialBase {
        public subMaterials: { [matID: number]: MaterialBase };
        constructor() {
            super();
        }

        public setMaterialByID(id: string, subMaterial: MaterialBase) {
            this.subMaterials[id] = subMaterial;
        }

        public renderDiffusePass(time: number, delay: number, matID:number , context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, subGeometry: SubGeometry, animtion: IAnimation) {
            if (this.subMaterials[matID])
                this.subMaterials[matID].renderDiffusePass(time,delay,matID,context3DProxy,modeltransform,camera3D,subGeometry,animtion);
        }
    }
}