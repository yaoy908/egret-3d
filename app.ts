
function jsOnload() {
    //var view: egret3d_dev.Class_Mesh = new egret3d_dev.Class_Mesh();
    var view: egret3d_dev.Class_SkinAnimation = new egret3d_dev.Class_SkinAnimation();

}

window.onload = () => {

    egret3d_dev.Egret3DEngine.preload(() => jsOnload());
}
