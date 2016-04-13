
function jsOnload() {

    var sample: egret3d.Class_Particle = new egret3d.Class_Particle();
}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

