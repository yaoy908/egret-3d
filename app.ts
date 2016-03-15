
function jsOnload() {
    //var view: egret3d.Class_Mesh = new egret3d.Class_Mesh();
    var view: egret3d.Class_PointLight = new egret3d.Class_PointLight();

}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}
