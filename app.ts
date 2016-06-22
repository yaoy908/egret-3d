
function jsOnload() {
    var sample = new egret3d.Class_NewScene();
}

function onTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_View3D.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/SampleBase.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_NewScene.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onTsconfig();

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

 