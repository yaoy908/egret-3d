module egret3d {
    export class MeshData {
        public name: string;
        public materialID: number = -1;
        public vertexColor: boolean;
        public skinClips: Array<string>;
        public lightIds: Array<any>;

        public x: number = 0;
        public y: number = 0;
        public z: number = 0;

        public rx: number = 0;
        public ry: number = 0;
        public rz: number = 0;

        public sx: number = 1;
        public sy: number = 1;
        public sz: number = 1;

        public constructor() {
        }
       
    }
}