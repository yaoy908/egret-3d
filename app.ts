
function jsOnload() {
    var sample: egret3d.Class_Sky = new egret3d.Class_Sky();
}

function onTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_View3D.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_Wireframe.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_SkinAnimation.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_Sky.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_Particle.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onTsconfig();

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

