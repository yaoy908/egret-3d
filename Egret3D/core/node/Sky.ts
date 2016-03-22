module egret3d {
                    
    /**
    * @class egret3d.Sky
    * @classdesc
    * 场景中天空盒子，是6面体cube，以6张无缝结合的贴图构成.
    *
    * @see egret3d.Skytexture
    *
    * 示例:
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample core/node/Sky.ts
    */
    export class Sky extends Mesh  {
       
        private _camera: Camera3D;

        /**
        * @language zh_CN
        * 构建一个天空盒子对象
        * @param cubMaterial 天空盒子贴图材质 
        * @param camera 天空盒子渲染相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(cubMaterial: CubeTextureMaterial, camera: Camera3D = null) {
            super(new CubeGeometry(10000, 10000, 10000), cubMaterial);
            this._camera = camera;
            cubMaterial.cullMode = ContextConfig.FRONT;
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