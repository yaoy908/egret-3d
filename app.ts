function jsOnload() {
    var sample = new egret3d.MainEnter();
}

function onTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/demo/MainEnter.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onTsconfig();
    egret3d.Egret3DEngine.preload(() => jsOnload());
}

 