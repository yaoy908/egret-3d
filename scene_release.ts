//场景目录名
let SceneName: string = "Sponza";

function startScene() {

    demo.EgretWorld.getInstance().loadScene(SceneName);
}

function onMyTsconfig() {

}

window.onload = () => {
    startScene();
    //egret3d.Egret3DEngine.onTsconfig = () => onMyTsconfig();
    //egret3d.Egret3DEngine.preload(() => startScene());
}
