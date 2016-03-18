/**
 *
 * @author 
 *
 */

class SampleBox extends SampleBase{
    private cameraCtl: egret3d.HoverController;
    private cube: egret3d.Mesh;
    public constructor() {
        super();
    }
    
    protected onInit(){
        this.cameraCtl = new egret3d.HoverController(this._view.camera3D,new egret3d.Object3D(), 90,15,600);
        
        this.cube = new egret3d.Mesh(new egret3d.CubeGeometry(),new egret3d.TextureMaterial());
        
        this._view.addChild3D(this.cube);
    }
    
    protected onUpdate(time: number,delay: number){
        this.cameraCtl.update();
    }
}

