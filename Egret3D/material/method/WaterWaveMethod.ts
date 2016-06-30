module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 用来实现水面顶点波动效果
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class WaterWaveMethod extends MethodBase {

        private _waveData: Float32Array = new Float32Array(12);
        private _time: number = 0.0;
        private _start: boolean = false;

        private _wave_xyz_intensity_0: Vector3D = new Vector3D(120.0, 50.0, 70.0);
        private _wave_xyz_intensity_1: Vector3D = new Vector3D(80.0, 40.0, 80.0);
        private _wave_xyz_speed_0: Vector3D = new Vector3D(0.001, 0.001, -0.001);
        private _wave_xyz_speed_1: Vector3D = new Vector3D(0.001, 0.001, 0.001);

        private _waveTexture:ITexture ;
        /**
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            this.vsShaderList[ShaderPhaseType.start_vertex] = this.vsShaderList[ShaderPhaseType.start_vertex] || [];
            this.vsShaderList[ShaderPhaseType.start_vertex].push("wave_vs");

            this.fsShaderList[ShaderPhaseType.multi_end_fragment] = this.fsShaderList[ShaderPhaseType.multi_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.multi_end_fragment].push("wave_fs");

            this.start();

            //---------------
            this._waveData[0] = this._wave_xyz_intensity_0.x;
            this._waveData[1] = this._wave_xyz_intensity_0.y;
            this._waveData[2] = this._wave_xyz_intensity_0.z;

            this._waveData[3] = this._wave_xyz_intensity_1.x;
            this._waveData[4] = this._wave_xyz_intensity_1.y;
            this._waveData[5] = this._wave_xyz_intensity_1.z;

            this._waveData[6] = this._wave_xyz_speed_0.x;
            this._waveData[7] = this._wave_xyz_speed_0.y;
            this._waveData[8] = this._wave_xyz_speed_0.z;

            this._waveData[9] = this._wave_xyz_speed_1.x;
            this._waveData[10] = this._wave_xyz_speed_1.y;
            this._waveData[11] = this._wave_xyz_speed_1.z;
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set waveTexture(texture: ITexture) {
            this._waveTexture = texture;
            if (texture) {
                if (this.materialData["waveTexture"] != this._waveTexture) {
                    this.materialData["waveTexture"] = texture;
                    this.materialData.textureChange = true;
                }
            }
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
            usage["waveData"] = context3DProxy.getUniformLocation(usage.program3D, "waveData");
            usage["time"] = context3DProxy.getUniformLocation(usage.program3D, "time");
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this._start) {
                this._time += delay;
                context3DProxy.uniform3fv(usage["waveData"], this._waveData);
                context3DProxy.uniform1f(usage["time"], this._time);
            }
        }
    }
}
