module egret3d {

     /**
    * @private
     * @language zh_CN
     * @class egret3d.VertexShader
     * @classdesc
     * 顶点着色器。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class FragmentShader extends ShaderBase {

        /**
        * @language zh_CN
        * 创建一个新的 VertexShader 对象。
        * @param materialData {MaterialData}
        * @param usage {MethodUsageData}
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor( materialData: MaterialData, usage: PassUsage) {
            super( );
   
        }

        /**
        * @language zh_CN
        * 设置顶点着色器。
        * @param geometry {GeometryBase}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setVertexShader() {
          
        }

        /**
        * @language zh_CN
        * 返回 Shader 源。
        * @returns {String}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getShaderSource(): string {
            //var shaderSource: string = super.getShaderSource();
            //var index: number = shaderSource.lastIndexOf("}");
            //var endS: string = shaderSource.substr(index, shaderSource.length - index);
         

            //shaderSource = shaderSource.substr(0, index);
            //shaderSource += "   gl_Position = temp_p; \r\n";
            //shaderSource += endS;
            return "";
        }

        /**
        * @language zh_CN
        * 构建 VertexShader。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build( ) {
        
        }

        /**
        * @language zh_CN
        * 添加 Method。
        * @version Egret 3.0
        * @platform Web,Native
        * @param method {MethodBase}
        */
        public addMethod(method: MethodBase) {
          
        }

    }


} 