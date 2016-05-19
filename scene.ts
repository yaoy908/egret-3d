//场景目录名
let SceneName: string = "Sponza";

var audioManager: egret3d.AudioManager;
var bgSound: egret3d.Sound;

window.addEventListener("click", egretMouseClickAndPlay);
window.addEventListener("touchstart", egretMouseClickAndPlay);
function startScene() {
    egret3d.EgretWorld.getInstance().loadScene(SceneName);
    playSound();
}

function egretMouseClickAndPlay(e) {
    window.removeEventListener("click", egretMouseClickAndPlay);
    window.removeEventListener("touchstart", egretMouseClickAndPlay);
    playSound();
}

function playSound() {
    audioManager = egret3d.AudioManager.instance;
    if (audioManager && audioManager.hasAudio()) {
        bgSound = audioManager.createSound("./resource/music/bg.mp3", onSoundComplete);
    }
    function onSoundComplete(...args) {
        var options: any = { "volume": 0.8, "loop": true };
        var result: any = audioManager.playSound(bgSound, options);
        if (result) {
            window.removeEventListener("click", egretMouseClickAndPlay);
            window.removeEventListener("touchstart", egretMouseClickAndPlay);
        }
    }
}

function onMyTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/Feature/FeatureConfig.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/ui/LoadingUI.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/ui/LogoUI.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/utils/AxisMesh.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/utils/FPSCounter.js");

    egret3d.Egret3DEngine.addImportScript("./js/Feature/controller/EgretCameraZoomController.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/controller/Shake.js");
    egret3d.Egret3DEngine.addImportScript("./js/Feature/EgretWorld.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onMyTsconfig();
    egret3d.Egret3DEngine.preload(() => startScene());
}
