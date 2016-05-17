
function jsOnload() {
    var sample: egret3d.Class_Points = new egret3d.Class_Points();
}

function onTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_View3D.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_Wireframe.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_SkinAnimation.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_Sky.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_Particle.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_Points.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onTsconfig();

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

