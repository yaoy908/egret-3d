
function jsOnload() {
    var view: egret3d_dev.Class_View3D = new egret3d_dev.Class_View3D();
}

window.onload = () => {

    egret3d_dev.Egret3DEngine.preload(() => jsOnload());

};