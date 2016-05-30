module egret3d {

    /*
    * @private
    */
    export enum PassType { diffusePass,colorPass, normalPass, shadowPass, lightPass , matCapPass }
        /*
    * @private
    */
    export class PassUtil{
        public static CreatPass(pass: PassType,materialData:MaterialData):MaterialPass {
            switch (pass) {
                case PassType.colorPass:
                    materialData.shaderPhaseTypes[PassType.colorPass] = []; 
                    return new ColorPass(materialData);
                case PassType.diffusePass:
                    materialData.shaderPhaseTypes[PassType.diffusePass] = []; 
                    return new DiffusePass(materialData);
                case PassType.shadowPass:
                    materialData.shaderPhaseTypes[PassType.shadowPass] = []; 
                    return new ShadowPass(materialData);
                case PassType.matCapPass:
                    materialData.shaderPhaseTypes[PassType.matCapPass] = []; 
                    return new MatCapPass(materialData);
            }
            return null;
        }
    }
}