module egret3d {
    /**
     * @class egret3d.AOMapMethod
     * @classdesc
     * AO贴图方法
     */
    export class FogMethod extends MethodBase {

        private uniform_globalFog: Float32Array = new Float32Array(7);

        private _fogColor: number = 0x0000cc; 
        private _globalDensity: number = 1.0; 
        private _fogStartDistance: number = 1000; 
        private _fogDistanceScale: number = 0.5; 
        private _height: number = 500; 
        private _fogAlpha: number = 1.0 ; 
        /**
         * @language zh_CN
         * @param fogType line/exp/expHeightFog
         */
        constructor(fogType: string = "expHeightFog_fs" ) {
            super();
            this.methodType = TextureMethodType.diffuse; 
            this.vsShaderList.push("vertexPos_vs");

            if (fogType == "line") {
                this.fsShaderList.push("lineFog");
            } else if (fogType == "exp") {
                this.fsShaderList.push("expFog_fs");
            } else if (fogType == "expHeightFog_fs") {
                this.fsShaderList.push("expHeightFog_fs");
            }
            0.5, 0.6, 0.7
            this.uniform_globalFog[0] = 0.5;
            this.uniform_globalFog[1] = 0.6;
            this.uniform_globalFog[2] = 0.7;
            this.uniform_globalFog[3] = this._globalDensity ;
            this.uniform_globalFog[4] = this._fogStartDistance;
            this.uniform_globalFog[5] = this._height;
            this.uniform_globalFog[6] = this._fogAlpha;


        }

        public set fogColor(value: number) {
            this._fogColor = value;
            this.uniform_globalFog[0] = (this._fogColor >> 16 & 0xff) / 255.0;
            this.uniform_globalFog[1] = (this._fogColor >> 8 & 0xff) / 255.0;
            this.uniform_globalFog[2] = (this._fogColor & 0xff) / 255.0;
        }

        public get fogColor( ): number {
            return this.fogColor;
        }

        public set globalDensity(value: number) {
            this._globalDensity = value;
            this.uniform_globalFog[3] = value;
        }

        public get globalDensity(): number {
            return this._globalDensity;
        }

        public set fogStartDistance(value: number) {
            this._fogStartDistance = value;
            this.uniform_globalFog[4] = value;
        }

        public get fogStartDistance(): number {
            return this._fogStartDistance;
        }

        //public set fogDistanceScale(value: number) {
        //    this._fogDistanceScale = value;
        //    this.uniform_globalFog[5] = value;
        //}

        //public get fogDistanceScale(): number {
        //    return this._fogDistanceScale;
        //}

        public set fogHeight(value: number) {
            this._height = value;
            this.uniform_globalFog[5] = value;
        }

        public get fogHeight(): number {
            return this._height;
        }

        public set fogAlpha(value: number) {
            this._height = value;
            this.uniform_globalFog[6] = value;
        }

        public get fogAlpha(): number {
            return this._height;
        }

        /**
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
            usage["uniform_globalFog"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_globalFog"); 
        }

        public update(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1fv(usage["uniform_globalFog"], this.uniform_globalFog);
        }

        /**
         * @language zh_CN
         */
        public dispose() {
        }
    }
} 