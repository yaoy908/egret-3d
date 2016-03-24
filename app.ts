
function jsOnload() {
    var sample: egret3d.Class_Geometry = new egret3d.Class_Geometry();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

