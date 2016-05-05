module egret3d {

    /**
    * @private
    */
    export class PBRPass extends MaterialPass {

        constructor(materialData: MaterialData) {
            super(materialData);
        }

        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initUseMethod(animation: IAnimation, geom: Geometry) {
            this._passChange = false;
            var i: number = 0;
            this._passUsage = new PassUsage();
            this._materialData.textureMethodTypes.push(TextureMethodType.color);

            this._passUsage.vertexShader.shaderType = Shader.vertex;
            this._passUsage.fragmentShader.shaderType = Shader.fragment;

            if (geom.vertexFormat & VertexFormat.VF_POSITION) {
                this._passUsage.vertexShader.addUseShaderName("attribute_position_vs");
            }

            if (geom.vertexFormat & VertexFormat.VF_NORMAL) {
                this._passUsage.vertexShader.addUseShaderName("attribute_normal_vs");
            }

            if (geom.vertexFormat & VertexFormat.VF_TANGENT) {
                this._passUsage.vertexShader.addUseShaderName("attribute_tangent_vs");
            }

            if (geom.vertexFormat & VertexFormat.VF_COLOR) {
                this._passUsage.vertexShader.addUseShaderName("attribute_color_vs");
            }

            if (geom.vertexFormat & VertexFormat.VF_UV0) {
                this._passUsage.vertexShader.addUseShaderName("attribute_uv0_vs");
            }

            if (geom.vertexFormat & VertexFormat.VF_UV1) {
                this._passUsage.vertexShader.addUseShaderName("attribute_uv1_vs");
            }

            if (geom.vertexFormat & VertexFormat.VF_SKIN) {
                this._passUsage.vertexShader.addUseShaderName("attribute_skin_vs");
            }

            this._passUsage.vertexShader.addUseShaderName("base_vs");
            this._passUsage.fragmentShader.addUseShaderName("base_fs");

            this._passUsage.vertexShader.addUseShaderName("diffuse_vertex");


            this._passUsage.fragmentShader.addUseShaderName("materialSource_fs");
            this._passUsage.fragmentShader.addUseShaderName("PBR_fs");

            this._passUsage.vertexShader.addEndShaderName("end_vs");
            this._passUsage.fragmentShader.addEndShaderName("end_fs");

        }
    }
} 