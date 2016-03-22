
function jsOnload() {
    var sample: egret3d.Class_MeshPick = new egret3d.Class_MeshPick();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

