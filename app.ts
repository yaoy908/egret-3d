
function jsOnload() {
    var sample: egret3d.Class_QuadTree = new egret3d.Class_QuadTree();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

