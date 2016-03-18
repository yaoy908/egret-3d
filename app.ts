
function jsOnload() {
    var sample: egret3d.Class_NormalMap = new egret3d.Class_NormalMap();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

