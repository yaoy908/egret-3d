module egret3d_dev {
    export class Class_View3D {
        protected _view: View3D;
        constructor() {
            this._view = new View3D();



            this.update();
        }

        private update() {
            requestAnimationFrame( ()=>this.update() );
        }
    }
}