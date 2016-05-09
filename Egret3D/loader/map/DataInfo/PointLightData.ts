module egret3d {
    export class PointLightData {

        public id: number = 0;
        public diffuseColor: number = 0xffffff;
        public ambientColor: number = 0xffffff;
        public intensity: number = 1.0;
        public falloff: number = 0.0;
        public radius: number = 100;

        public posX: number = 0
        public posY: number = 0;
        public posZ: number = 0;

        public constructor() {
        }

    }
}