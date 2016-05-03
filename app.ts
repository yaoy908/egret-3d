
function jsOnload() {
    var sample: egret3d.Class_Wireframe = new egret3d.Class_Wireframe();
}

function onTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_Wireframe.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onTsconfig();

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

