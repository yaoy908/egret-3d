module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 用来实现水面波光粼粼的效果
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class WaterNormalMethod extends MethodBase {

        private _uvData: Float32Array = new Float32Array(8);

        private _time: number = 0.0;
        private _start: boolean = false;

        private _speedU_0: Point = new Point(-0.000009, 0.0);
        private _speedU_1: Point = new Point(0.00003, 0.0);

        private _distion_intensity : Point = new Point(0.05, 0.05);

        private _normalTexture_0: ITexture; 
        private _normalTexture_1: ITexture; 

        private _normal_0_UVScale: number = 4.0; 
        private _normal_1_UVScale: number = 4.0; 


        /** 
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.normal_fragment] = this.fsShaderList[ShaderPhaseType.normal_fragment] || [];
            this.fsShaderList[ShaderPhaseType.normal_fragment].push("waterNormal_fs");

            this.start();

            //---------------
            this._uvData[0] = this._speedU_0.x * 2.5 ;
            this._uvData[1] = this._speedU_0.y * 2.5 ;
            this._uvData[2] = this._speedU_1.x * 2.5 ;
            this._uvData[3] = this._speedU_1.y * 2.5 ;
            this._uvData[4] = this._distion_intensity.x;
            this._uvData[5] = this._distion_intensity.y;
            this._uvData[6] = this._normal_0_UVScale ;
            this._uvData[7] = this._normal_1_UVScale ;
        }

        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start(rest: boolean = false) {
            if (rest)
                this._time = 0;
            this._start = true;
        }

        /**
        * @language zh_CN 
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            this._start = false;
        }

        /**
         * @language zh_CN
         * 设置lightmap贴图
         * @param texture lightmap贴图
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set normalTextureA(texture: ITexture) {
            this._normalTexture_0 = texture;
            if (this.materialData["normalTextureA"] != this._normalTexture_0) {
                this.materialData["normalTextureA"] = this._normalTexture_0;
                this.materialData.textureChange = true;
            }
        }

        /**
         * @language zh_CN
         * 设置lightmap贴图
         * @param texture lightmap贴图
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set normalTextureB(texture: ITexture) {
            this._normalTexture_1 = texture;
            if (this.materialData["normalTextureB"] != this._normalTexture_1) {
                this.materialData["normalTextureB"] = this._normalTexture_1;
                this.materialData.textureChange = true;
            }
        }

        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param materialData
        * @param geometry
        * @param context3DProxy
        * @param modeltransform 
        * @param modeltransform
        * @param camera3D
        */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            usage["waterNormalData"] = context3DProxy.getUniformLocation(usage.program3D, "waterNormalData");
            usage["time"] = context3DProxy.getUniformLocation(usage.program3D, "time");
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this._start) {
                this._time += delay;
                context3DProxy.uniform2fv(usage["waterNormalData"], this._uvData);
                context3DProxy.uniform1f(usage["time"], this._time);
            }
        }
    }
}
