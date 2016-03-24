
function jsOnload() {
    var sample: egret3d.Class_View3D = new egret3d.Class_Scene();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

