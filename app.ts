
function jsOnload() {
    var sample: egret3d.Class_NavigationMesh = new egret3d.Class_NavigationMesh();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

