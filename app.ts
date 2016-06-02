
function jsOnload() {
    var sample: egret3d.Class_ParticleColor = new egret3d.Class_ParticleColor();
}

function onTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/Feature/utils/AxisMesh.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_View3D.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_ParticleColor.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onTsconfig();

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

