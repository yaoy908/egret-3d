//场景目录名
let SceneName: string = "Sponza";

function startScene() {
    
    egret3d.EgretWorld.getInstance().loadScene(SceneName);
}

function onMyTsconfig() {

}

window.onload = () => {
    startScene();
}
