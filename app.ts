
function jsOnload() {
    var sample: egret3d.Class_Wireframe = new egret3d.Class_Wireframe();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

