module egret3d {
                        
    /**
    * @class egret3d.SphereSky
    * @classdesc
    * 天空球
    * 球形的天空盒子，需要sphere的360全景照片，可进行全景照片和video的球形显示
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SphereSky extends Mesh {
           
        private _camera: Camera3D;

        /**
        * @language zh_CN
        * constructor
        * @param tex1 天空球贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(material: MaterialBase, camera: Camera3D = null) {
            super(new SphereGeometry(10000), material);
            this._camera = camera;
            material.cullMode = ContextConfig.FRONT;
        } 

        /**
        * @language zh_CN
        * 当前对象数据更新，只有在视锥内的对象才会执行此更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            if (this._camera) {
                this.position = this._camera.globalPosition;
            }
        }
    }
} 