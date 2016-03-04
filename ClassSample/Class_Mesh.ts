module egret3d_dev {
    export class Class_Mesh{
        constructor() {
            var mat: MaterialBase = new MaterialBase();

            var geometery: Geometry = new Geometry();
            var mesh: Mesh = new Mesh(geometery,mat);
        }
    }
}