//场景目录名
let SceneName: string = "Sponza";

function startScene() {

    demo.EgretWorld.getInstance().loadScene(SceneName);
}

function onMyTsconfig() {
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/DataInfo/MaterialData.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/DataInfo/MeshData.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/DataInfo/SceneNode.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/DataInfo/DirectionLightData.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/DataInfo/PointLightData.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/DataInfo/MaterialMethodData.js");
    

    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/loader/EgretSceneXmlParser.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/loader/EgretSceneSourceLib.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/loader/EgretSceneLoader.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/loader/EgretMaterialMethodParser.js");
    

    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/ui/LoadingUI.js");

    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/utils/AxisMesh.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/utils/FPSCounter.js");

    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/controller/EgretCameraZoomController.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/EgretWorld.js");
    //egret3d.Egret3DEngine.addImportScript("./js/Egret3D/Feature/EgretConfig.js");

}

window.onload = () => {

    egret3d.Egret3DEngine.onTsconfig = () => onMyTsconfig();
    egret3d.Egret3DEngine.preload(() => startScene());
}
