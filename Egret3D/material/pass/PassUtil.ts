module egret3d {

    export enum PassType { diffusePass,colorPass, normalPass, shadowPass, lightPass , matCapPass }

    export class PassUtil{
        public static CreatPass(pass: PassType,materialData:MaterialData):MaterialPass {
            switch (pass) {
                case PassType.colorPass:
                    return new ColorPass(materialData);
                case PassType.diffusePass:
                    return new DiffusePass(materialData);
                case PassType.shadowPass:
                    return new ShadowPass(materialData);
                case PassType.matCapPass:
                    return new MatCapPass(materialData);
            }
            return null;
        }
    }
}