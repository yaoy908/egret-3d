
function jsOnload() {
    var sample: egret3d.Class_Shader = new egret3d.Class_Shader();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

