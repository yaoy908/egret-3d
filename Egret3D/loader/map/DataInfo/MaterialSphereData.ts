module egret3d {
    export class MaterialSphereData {
        public id: number = 0;

        public diffuseTextureName: string;
        public normalTextureName: string;
        public specularTextureName: string;
        

        public diffuseColor: number;
        public ambientColor: number;
        public specularColor: number;

        public alpha: number;
        public specularLevel: number;
        public gloss: number;

        public ambientPower: number;
        public diffusePower: number;
        public normalPower: number;

        public castShadow: boolean;
        public acceptShadow: boolean;
        public smooth: boolean;
        public repeat: boolean;
        public bothside: boolean;

        public drawMode: number;
        public cullMode: number;
        public blendMode: number;

        public method: MaterialMethodData;
       
        

        constructor() {
            
        }
    }
}