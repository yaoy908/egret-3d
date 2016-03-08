module egret3d_dev {
    export class ColorPass extends MaterialPass {
        /**
       * @language zh_CN
       * @private
       * 初始化 UseMethod。
       * @version Egret 3.0
       * @platform Web,Native
       */
        public initUseMethod() {
            this._passChange = false;

            this._materialData.textureMethodTypes.push(TextureMethodType.color);

            var i: number = 0;

            this._passUsage = new PassUsage();

            this._passUsage.vertexShader.shaderType = Shader.vertex;
            this._passUsage.fragmentShader.shaderType = Shader.fragment;

            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.color) != -1) {
                this._passUsage.vertexShader.addUseShaderName("Color_vertex");
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

            for (i = 0; i < this._materialData.lightList.length; i++) {
                this._passUsage.fragmentShader.addUseShaderName(LightType[this._materialData.lightList[i].lightType]);
            }

            //if (this.animation) {
            //    if (this.animation.animaNodeCollection) {
            //        var vsShaderNames: string[] = this.animation.animaNodeCollection.getNodesVertexShaders();
            //        var fsShaderNames: string[] = this.animation.animaNodeCollection.getNodesFragmentShaders();
            //        for (i = 0; i < vsShaderNames.length; i++) {
            //            this.vertexShader.addShader(vsShaderNames[i]);
            //        }
            //        for (i = 0; i < fsShaderNames.length; i++) {
            //            this.pixelShader.addShader(fsShaderNames[i]);
            //        }
            //    }
            //}

            //if (this.materialData.acceptShadow && this.shadowMaping) {
            //    this.pixelShader.addMethod(this.shadowMaping);
            //    this.vertexShader.addShader(this.shadowMaping.vertexMethodName);
            //    this.pixelShader.addShader(this.shadowMaping.fragMethodName);
            //}

            if (this.methodList) {
                for (var i: number = 0; i < this.methodList.length; i++) {
                    this._passUsage.vertexShader.addUseShaderName(this.methodList[i].vsShaderName);
                    this._passUsage.fragmentShader.addUseShaderName(this.methodList[i].fsShaderName);
                }
            }


        }
    }
} 