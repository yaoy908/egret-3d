module egret3d {

    /**
    * @class egret3d.ColorGradientsMethod
    * @classdesc
    * 实现颜色渐变叠加
    * @see egret3d.MethodBase
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ColorGradientsMethod extends MethodBase {
        /**
        * @language zh_CN
        * 创建一个ColorGradientsMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
      
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.muilt_end_fragment] = this.fsShaderList[ShaderPhaseType.muilt_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.muilt_end_fragment].push("colorGradients_fs");

            this.vsShaderList[ShaderPhaseType.local_vertex] = this.vsShaderList[ShaderPhaseType.local_vertex] || [];
            this.vsShaderList[ShaderPhaseType.local_vertex].push("vertexPos_vs");
        }

        /**
        * @language zh_CN
        * 设置颜色渐变数据
        * @param posStart Vector3D
        * @param posEnd Vector3D
        * @param color Color
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStartData(posStart: Vector3D, posEnd: Vector3D, color: Color) {
            this.materialData.colorGradientsSource[0] = posStart.x;
            this.materialData.colorGradientsSource[1] = posStart.y;
            this.materialData.colorGradientsSource[2] = posStart.z;
            this.materialData.colorGradientsSource[3] = posEnd.x;
            this.materialData.colorGradientsSource[4] = posEnd.y;
            this.materialData.colorGradientsSource[5] = posEnd.z;

            this.materialData.colorGradientsSource[6] = color.r;
            this.materialData.colorGradientsSource[7] = color.g;
            this.materialData.colorGradientsSource[8] = color.b;
            this.materialData.colorGradientsSource[9] = color.a;
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
            usage["uniform_colorGradientsSource"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorGradientsSource");
        }
        /**
        * @private
        * @language zh_CN
        */
        public activePass(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1fv(usage["uniform_colorGradientsSource"], this.materialData.colorGradientsSource);
        }

    }
}