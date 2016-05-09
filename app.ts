
function jsOnload() {
    var sample: egret3d.Class_SkinAnimation = new egret3d.Class_SkinAnimation();
}

function onTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_SkinAnimation.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onTsconfig();

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

