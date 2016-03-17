
function jsOnload() {
    //var view: egret3d.Class_Mesh = new egret3d.Class_Mesh();
    var view: egret3d.Class_MouseEvent = new egret3d.Class_MouseEvent();




}

window.onload = () => {

    egret3d.Egret3DEngine.preload(() => jsOnload());
}

