//场景目录名
let SceneName: string = "Sponza";

function startScene() {

    egret3d.EgretWorld.getInstance().loadScene(SceneName);
}

function onMyTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/Feature/FeatureConfig.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/ui/LoadingUI.js");

    egret3d.Egret3DEngine.addImportScript("./js/Feature/utils/AxisMesh.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/utils/FPSCounter.js");

    egret3d.Egret3DEngine.addImportScript("./js/Feature/controller/EgretCameraZoomController.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/EgretWorld.js");
}

window.onload = () => {

    egret3d.Egret3DEngine.onTsconfig = () => onMyTsconfig();
    egret3d.Egret3DEngine.preload(() => startScene());
}
