module egret3d_dev {

    export class MaterialPass {
        protected _passUsage: PassUsage;
        protected _materialData: MaterialData;
        protected _passChange: boolean = true;

        public methodList: Array<MethodBase> = new Array<MethodBase>();
        public methodDatas: Array<MethodData> = new Array<MethodData>();

        public vsShaderNames: Array<string> = new Array<string>();
        public fsShaderNames: Array<string> = new Array<string>();

        public lightGroup: LightGroup;
        private normalMatrix: Matrix4_4 = new Matrix4_4();
        constructor(materialData: MaterialData) {
            this._materialData = materialData;
        }

        public addMethod(method: MethodBase) {
            if (method.methodType != -1) {
                this.methodList.push(method);
                this._materialData.textureMethodTypes.push(method.methodType);
                this._passChange = true;
            }
            else {
                new Error("method.methodType is null");
            }
        }

        public removeMethod(method: MethodBase) {
            var index: number = this.methodList.indexOf(method);
            if (index != -1) {
                this.methodList.slice(index);
                this._passChange = true;
            }
        }

        protected materialDataChange() {
            this._materialData.materialDataNeedChange = true;
        }

        protected restProgram() {

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

            var i: number = 0;

            this._passUsage = new PassUsage();
            this._passUsage.vertexShader.shaderType = Shader.vertex;
            this._passUsage.fragmentShader.shaderType = Shader.fragment;

            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.diffuse) != -1) {
                this._passUsage.vertexShader.addUseShaderName("default_vertex");
                this._passUsage.fragmentShader.addUseShaderName("diffuseMap_fragment");
            }
            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.normal) != -1) {
                this._passUsage.vertexShader.addUseShaderName("");
                this._passUsage.fragmentShader.addUseShaderName("normalMap_fragment");
            }
            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.specular) != -1) {
                this._passUsage.vertexShader.addUseShaderName("");
                this._passUsage.fragmentShader.addUseShaderName("specularMap_fragment");
            }

            if (animation) {
                this._passUsage.maxBone = animation.skeletonAnimationController.jointNumber * 2;
            }

            if (this.lightGroup) {
                this._passUsage.maxDirectLight = this.lightGroup.directLightList.length;
                this._passUsage.maxSpotLight = this.lightGroup.spotLightList.length;
                this._passUsage.maxPointLight = this.lightGroup.pointLightList.length;

                if (this.lightGroup.directLightList.length) {
                    this._passUsage.directLightData = new Float32Array(DirectLight.stride * this.lightGroup.directLightList.length);
                    this._passUsage.fragmentShader.addUseShaderName("directLight_fragment");
                }
                if (this.lightGroup.spotLightList.length) {
                    this._passUsage.spotLightData = new Float32Array(SpotLight.stride * this.lightGroup.spotLightList.length);
                    this._passUsage.fragmentShader.addUseShaderName("spotLight_fragment");
                }
                if (this.lightGroup.pointLightList.length) {
                    this._passUsage.pointLightData = new Float32Array(PointLight.stride * this.lightGroup.pointLightList.length);
                    this._passUsage.fragmentShader.addUseShaderName("pointLight_fragment");
                }
            }

            if (this.methodList) {
                for (var i: number = 0; i < this.methodList.length; i++) {
                    this._passUsage.vertexShader.addUseShaderName(this.methodList[i].vsShaderName);
                    this._passUsage.fragmentShader.addUseShaderName(this.methodList[i].fsShaderName);
                }
            }

        }

        public upload(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, animation: IAnimation) {
            this._passChange = false;
            this.initUseMethod(animation);
            this._passUsage.vertexShader.shader = this._passUsage.vertexShader.getShader(this._passUsage);
            this._passUsage.fragmentShader.shader = this._passUsage.fragmentShader.getShader(this._passUsage);
            this._passUsage.program3D = ShaderPool.getProgram(this._passUsage.vertexShader.shader.id, this._passUsage.fragmentShader.shader.id);

            for (var property in this._passUsage) {
                if ((<string>property).indexOf("uniform") != -1) { 
                    if (this._passUsage[property]) {
                        (<GLSL.Uniform>this._passUsage[property]).uniformIndex = context3DProxy.getUniformLocation(this._passUsage.program3D, property);
                    }
                }
            }
        }

        public draw(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, subGeometry: SubGeometry, animtion: IAnimation) {

            if (this._passChange) {
                this.upload(time, delay, context3DProxy, modeltransform, camera3D, animtion);
            }
            context3DProxy.setProgram(this._passUsage.program3D);
            subGeometry.update(time, delay, this._passUsage, context3DProxy);

            if (this._materialData.depthTest) {
                context3DProxy.enable(ContextConfig.DEPTH_TEST);
                context3DProxy.depthFunc(ContextConfig.LEQUAL);
            }
            else {
                context3DProxy.disable(ContextConfig.DEPTH_TEST);
                context3DProxy.depthFunc(ContextConfig.LEQUAL);
            }

            context3DProxy.setCulling(this._materialData.cullFrontOrBack);

            if (this._materialData.bothside) {
                context3DProxy.disable(ContextConfig.CULL_FACE);
            } else
                context3DProxy.enable(ContextConfig.CULL_FACE);

            Context3DProxy.gl.enable(ContextConfig.BLEND);
            context3DProxy.setBlendFactors(this._materialData.blend_src, this._materialData.blend_dest);

            if (this._materialData.alphaBlending)
                Context3DProxy.gl.depthMask(false);

            if (this._materialData.materialDataNeedChange) {
                //this._materialData.materialDataNeedChange = false;
                this._materialData.materialSourceData[0] = (this._materialData.diffuseColor >> 16 & 0xff) / 255.0;
                this._materialData.materialSourceData[1] = (this._materialData.diffuseColor >> 8 & 0xff) / 255.0;
                this._materialData.materialSourceData[2] = (this._materialData.diffuseColor & 0xff) / 255.0;

                this._materialData.materialSourceData[3] = (this._materialData.ambientColor >> 16 & 0xff) / 255.0;
                this._materialData.materialSourceData[4] = (this._materialData.ambientColor >> 8 & 0xff) / 255.0;
                this._materialData.materialSourceData[5] = (this._materialData.ambientColor & 0xff) / 255.0;

                this._materialData.materialSourceData[6] = (this._materialData.specularColor >> 16 & 0xff) / 255.0;
                this._materialData.materialSourceData[7] = (this._materialData.specularColor >> 8 & 0xff) / 255.0;
                this._materialData.materialSourceData[8] = (this._materialData.specularColor & 0xff) / 255.0;

                this._materialData.materialSourceData[9] = this._materialData.alpha;
                this._materialData.materialSourceData[10] = this._materialData.cutAlpha;
                this._materialData.materialSourceData[11] = this._materialData.shininess;

                this._materialData.materialSourceData[12] = this._materialData.diffusePower;
                this._materialData.materialSourceData[13] = this._materialData.gloss;
                this._materialData.materialSourceData[14] = this._materialData.ambientPower;
                this._materialData.materialSourceData[15] = this._materialData.normalPower; //保留
            }

            context3DProxy.uniform1fv(this._passUsage.uniform_materialSource.uniformIndex, this._materialData.materialSourceData);

            //texture 2D
            //var sampler2D: GLSL.Sampler2D;
            //for (var index in this._passUsage.sampler2DList) {
            //    sampler2D = this._passUsage.sampler2DList[index];
            //    context3DProxy.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture2D );
            //    if (this._materialData.materialDataNeedChange) {
            //        var min_filter: number = this._materialData.smooth ? Context3DProxy.gl.LINEAR_MIPMAP_LINEAR : Context3DProxy.gl.LINEAR;
            //        var mag_filter: number = this._materialData.smooth ? Context3DProxy.gl.LINEAR : Context3DProxy.gl.LINEAR;
            //
            //        var wrap_u_filter: number = this._materialData.repeat ? Context3DProxy.gl.REPEAT : Context3DProxy.gl.CLAMP_TO_EDGE;
            //        var wrap_v_filter: number = this._materialData.repeat ? Context3DProxy.gl.REPEAT : Context3DProxy.gl.CLAMP_TO_EDGE　;
            //        context3DProxy.setTexture2DSamplerState(min_filter, mag_filter, wrap_u_filter, wrap_v_filter);
            //        this._materialData.materialDataNeedChange = false;
            //    }
            //}

            //var sampler3D: GLSL.Sampler3D;
            //for (var index in this._materialData.diffusePassUsageData.sampler3DList) {
            //    sampler3D = this._materialData.diffusePassUsageData.sampler3DList[index];
            //}

            var i: number = 0;
            if (this.lightGroup) {
                for (i = 0; i < this._passUsage.maxDirectLight; i++) {
                    this.lightGroup.directLightList[i].updateLightData(i, this._passUsage.directLightData);
                }
                for (i = 0; i < this._passUsage.maxSpotLight; i++) {
                    this.lightGroup.spotLightList[i].updateLightData(i, this._passUsage.spotLightData);
                }
                for (i = 0; i < this._passUsage.maxPointLight; i++) {
                    this.lightGroup.pointLightList[i].updateLightData(i, this._passUsage.pointLightData);
                }

                if (this._passUsage.uniform_directLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_directLightSource.uniformIndex, this._passUsage.directLightData);
                if (this._passUsage.uniform_sportLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_sportLightSource.uniformIndex, this._passUsage.spotLightData);
                if (this._passUsage.uniform_pointLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_pointLightSource.uniformIndex, this._passUsage.pointLightData);
            }

            if (this._materialData.alphaBlending)
                Context3DProxy.gl.depthMask(true);

            context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ModelMatrix.uniformIndex, false, modeltransform.rawData);
            context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ProjectionMatrix.uniformIndex, false, camera3D.viewProjectionMatrix.rawData);

            this.normalMatrix.copyFrom(modeltransform);
            this.normalMatrix.invert();
            this.normalMatrix.transpose();
            //this.normalMatrix.appendScale(1,1,1);

            context3DProxy.uniformMatrix4fv(this._passUsage.uniform_normalMatrix.uniformIndex, false, this.normalMatrix.rawData);
            context3DProxy.uniform3f(this._passUsage.uniform_eyepos.uniformIndex, camera3D.x, camera3D.y, camera3D.z);

            if (animtion) {
                context3DProxy.uniform4fv(this._passUsage.uniform_PoseMatrix.uniformIndex, animtion.skeletonAnimationController.currentSkeletonMatrixData);
            }

            context3DProxy.drawElement(this._materialData.drawMode, subGeometry.start, subGeometry.count);
        }


    }
} 