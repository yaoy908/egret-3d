module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.MaterialSphereData
    * @classdesc
    * 材质球的特效数据
    * @version Egret 3.0
    * @platform Web,Native
    */
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

        public methods: Array<MaterialMethodData>;
       
        

        constructor() {
            
        }
    }
}