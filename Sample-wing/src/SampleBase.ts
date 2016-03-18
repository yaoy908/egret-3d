/**
 *
 * @author 
 *
 */
    
class SampleBase {
    
    protected _egret3DCanvas: egret3d.Egret3DCanvas;
    protected _view: egret3d.View3D;
    private globalTime: number;
    constructor() {
        // 
        this._egret3DCanvas = new egret3d.Egret3DCanvas();
        this._egret3DCanvas.x = 0;
        this._egret3DCanvas.y = 0;
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        this._egret3DCanvas.start();
        
        this._egret3DCanvas.start();
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        
        this._view = new egret3d.View3D(this._egret3DCanvas.x,this._egret3DCanvas.y,this._egret3DCanvas.width,this._egret3DCanvas.height);
        this._view.backColor = 0xff000000;
        this._egret3DCanvas.addView3D(this._view);
        
        this.onInit();
    }
    
    protected ontime()
    {
        var a = this;
    }
    
    protected onInit(){
        
    }
    
    protected onUpdate(time: number, delay:number){
        
    }
    
    public update(e: egret3d.Event3D) {
        this.onUpdate(e.time, e.delay);
    }
}
