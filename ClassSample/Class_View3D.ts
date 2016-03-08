module egret3d_dev {
    export class Class_View3D {
        protected _view: View3D;
        private globalTime: number;
        constructor() {
            this._view = new View3D( 0,0,800,600);
            this.update(0,0);
        }

        protected update( time:number , delay:number ) {
            this._view.update(time, delay); 



            requestAnimationFrame((d) => this.update(this.globalTime+=d,d));
        }
    }
}