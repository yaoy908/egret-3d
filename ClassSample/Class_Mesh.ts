module egret3d_dev {
    export class Class_Mesh extends Class_View3D{
        constructor() {
            super();

            var a: number = Math.random() ;

            var mat: ColorMaterial = new ColorMaterial();

            var geometery: CubeGeometry = new CubeGeometry();
            var mesh: Mesh = new Mesh(geometery, mat);
            this._view.addChild3D(mesh);

            this.update(0, 0);
        }
    }
}