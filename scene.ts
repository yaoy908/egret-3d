//场景目录名
let SceneName: string = "Sponza";

function startScene() {

    demo.EgretWorld.getInstance().loadScene(SceneName);
}

function onMyTsconfig() {
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/DataInfo/MaterialData.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/DataInfo/MeshData.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/DataInfo/SceneNode.js");

    //egret3d.Egret3DEngine.addImportScript("./js/Feature/loader/EgretLoaderBase.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/loader/EgretSceneXmlParser.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/loader/EgretCameraAnimationLoader.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/loader/EgretGeometryLoader.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/loader/EgretMaterialLoader.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/loader/EgretSceneLoader.js");

    //egret3d.Egret3DEngine.addImportScript("./js/Feature/ui/LoadingUI.js");

    //egret3d.Egret3DEngine.addImportScript("./js/Feature/utils/AxisMesh.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/utils/FPSCounter.js");

    //egret3d.Egret3DEngine.addImportScript("./js/Feature/controller/EgretCameraZoomController.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/EgretWorld.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Feature/EgretConfig.js");

}

window.onload = () => {
    startScene();
    //egret3d.Egret3DEngine.onTsconfig = () => onMyTsconfig();
    //egret3d.Egret3DEngine.preload(() => startScene());
}
