module egret3d_dev {
    export class MaterialBase {
        private i: number; 
        public subLen: number; 

        private subMaterials: Array<SubMaterial> ;

        constructor() {
            
        }

        public applyGeometry( ) {
        }

        public initLize() {
            this.subMaterials = new Array<SubMaterial>();
            this.subLen = this.subMaterials.length;
        }

        private _subGeometry: SubGeometry; 
        private _matID: number; 
        public renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D, item:Object3D ) {
            this.i = 0;
            for (this.i = 0; this.i < item.geometry.subGeometrys.length; this.i++){
                this._subGeometry = item.geometry.subGeometrys[this.i];
                this._matID = this._subGeometry.matID;
                this.subMaterials[this._matID].renderDiffusePass(time, delay, context3DProxy, item.modelMatrix, camera3D, this._subGeometry ,item.animation);
            }
        }
    }
}