/**
* @language zh_CN
* @classdesc
* 创建立方体使用示例 相机控制 做两个盒子  点击反馈
* @version Egret 3.0
* @platform Web,Native
*/
class SampleEvent {
    /**
    * Canvas操作对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _egret3DCanvas: egret3d.Egret3DCanvas;
    /**
    * View3D操作对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _view3D: egret3d.View3D;
    /**
    * 立方体对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _cube: egret3d.Mesh;
    /**
    * 圆柱体对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _cylinder: egret3d.Mesh;

    /**
    * look at 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected cameraCtl: egret3d.LookAtController;


    public constructor() {
        ///创建Canvas对象。
        this._egret3DCanvas = new egret3d.Egret3DCanvas();
        ///Canvas的起始坐标，页面左上角为起始坐标(0,0)。
        this._egret3DCanvas.x = 0;
        this._egret3DCanvas.y = 0;
        ///设置Canvas页面尺寸。
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        ///创建View3D对象,页面左上角为起始坐标(0,0),其参数依次为:
        ///@param x: number 起始坐标x,
        ///@param y: number 起始坐标y
        ///@param  width: number 显示区域的宽
        ///@param  height: number 显示区域的高
        this._view3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        ///当前对象对视位置,其参数依次为:
        ///@param pos 对象的位置
        ///@param target 目标的位置
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, -1000), new egret3d.Vector3D(0, 0, 0));
        ///View3D的背景色设置
        this._view3D.backColor = 0xff000000;
        ///将View3D添加进Canvas中
        this._egret3DCanvas.addView3D(this._view3D);
        ///创建默认图片材质
        var mat_Cube: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        ///创建立方体对象
        var geometery_Cube: egret3d.CubeGeometry = new egret3d.CubeGeometry();
        ///通过材质和立方体对象生成Mesh
        this._cube = new egret3d.Mesh(geometery_Cube, mat_Cube);
        ///注册事件
        this._cube.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
        this._cube.addEventListener(egret3d.TouchEvent3D.TOUCH_DOWN, this.onTouchDown, this);
        ///将mesh插入view3D
        this._view3D.addChild3D(this._cube);


        // ///创建默认图片材质
        //var mat_Cylinder: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        /////创建圆柱体对象
        //var geometery_Cylinder: egret3d.CylinderGeometry = new egret3d.CylinderGeometry();
        /////通过材质和圆柱体对象生成Mesh
        //this._cylinder = new egret3d.Mesh(geometery_Cylinder, mat_Cylinder);
        // ///开启鼠标事件响应
        //this._cylinder.mouseEnable = true;
        /////注册事件
        //this._cylinder.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
        //this._cylinder.addEventListener(egret3d.TouchEvent3D.TOUCH_DOWN, this.onTouchDown, this);
        /////设置x坐标
        //this._cylinder.x = 150;
        /////将mesh插入view3D
        //this._view3D.addChild3D(this._cylinder)

        this.InitCameraCtl();

        ///启动Canvas。
        this._egret3DCanvas.start();
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }

    /**
    * @language zh_CN        
    * 初始化相机控制
    * @version Egret 3.0
    * @platform Web,Native
    */
    private InitCameraCtl() {
        ///摄像机控制类
        this.cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
        ///设置目标和相机的距离
        this.cameraCtl.distance = 1000;
        ///设置相机x轴旋转
        this.cameraCtl.rotationX = 60;
    }

    /**
    * @language zh_CN        
    * 鼠标按下响应事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    private onMouseDown(event3D: egret3d.Event3D): void {
        egret3d.Debug.instance.trace("onMouseDown");
        this.EspondOnAClick();
    }
    /**
    * @language zh_CN        
    * 触摸按下响应事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    private onTouchDown(event3D: egret3d.Event3D) {
        egret3d.Debug.instance.trace("onTouchDown");
        this.EspondOnAClick();
    }
    /**
    * @language zh_CN        
    * 触摸按下反馈
    * @version Egret 3.0
    * @platform Web,Native
    */
    private EspondOnAClick(): void {

        if (this._cube.scaleX <= 2) {
            this._cube.scaleX += 0.5;
            this._cube.scaleY += 0.5;
            this._cube.scaleZ += 0.5;
        }
        else {
            this._cube.scaleX = 1;
            this._cube.scaleY = 1;
            this._cube.scaleZ = 1;
        }

    }

    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }


}    