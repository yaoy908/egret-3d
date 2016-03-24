module egret3d {
    export class Class_MuiltView3D {

        protected _egret3DCanvas: Egret3DCanvas;

        private _v1: View3D;
        private _v2: View3D;
        private globalTime: number;
        constructor() {
            this._egret3DCanvas = new Egret3DCanvas();
            this._egret3DCanvas.x = 0; 
            this._egret3DCanvas.y = 0; 
            this._egret3DCanvas.width = window.innerWidth; 
            this._egret3DCanvas.height = window.innerHeight; 

            this._v1 = new View3D(0, 0, 500, 500);
            this._egret3DCanvas.addView3D(this._v1);

            this._v2 = new View3D(500, 0, 500, 500);
            this._v2.backColor = 0x00ff0000;
            this._egret3DCanvas.addView3D(this._v2);


            this._egret3DCanvas.start();
        }
    }
}