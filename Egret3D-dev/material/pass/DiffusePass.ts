module egret3d_dev {
    
    /**
    * @private
    */
    export class DiffusePass extends MaterialPass {

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
        public initUseMethod(animation: IAnimation) {
            this._passChange = false;

            this._materialData.textureMethodTypes.push(TextureMethodType.color);

            var i: number = 0;

            this._passUsage = new PassUsage();

            this._passUsage.vertexShader.shaderType = Shader.vertex;
            this._passUsage.fragmentShader.shaderType = Shader.fragment;

            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.color) != -1) {
                this._passUsage.vertexShader.addUseShaderName("diffuse_vertex");
                this._passUsage.fragmentShader.addUseShaderName("Color_fragment");
            }
            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.normal) != -1) {
                this._passUsage.vertexShader.addUseShaderName("");
                this._passUsage.fragmentShader.addUseShaderName("normalMap_fragment");
            }
            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.specular) != -1) {
                this._passUsage.vertexShader.addUseShaderName("");
                this._passUsage.fragmentShader.addUseShaderName("specularMap_fragment");
            }

            if (this.lightGroup) {
                this._passUsage.maxDirectLight = this.lightGroup.directLightList.length;
                this._passUsage.maxSpotLight = this.lightGroup.spotLightList.length;
                this._passUsage.maxPointLight = this.lightGroup.pointLightList.length;

                if (this.lightGroup.directLightList.length) {
                    this._passUsage.directLightData = new Float32Array(DirectLight.stride * this.lightGroup.directLightList.length);
                    this._passUsage.fragmentShader.addUseShaderName("directLight_fragment");
                }
                //if (this.lightGroup.spotLightList.length)
                //    this._passUsage.fragmentShader.addUseShaderName("directLight_fragment");
                //if (this.lightGroup.pointLightList.length)
                //    this._passUsage.fragmentShader.addUseShaderName("directLight_fragment");
            }

            if (animation) {
                this._passUsage.maxBone = animation.skeletonAnimationController.jointNumber * 2;
            }

            this._passUsage.vertexShader.addEndShaderName("end_vs");
            this._passUsage.fragmentShader.addEndShaderName("end_fs");

            if (this.methodList) {
                for (var i: number = 0; i < this.methodList.length; i++) {
                    this._passUsage.vertexShader.addUseShaderName(this.methodList[i].vsShaderName);
                    this._passUsage.fragmentShader.addUseShaderName(this.methodList[i].fsShaderName);
                }
            }
        }
    }
} 