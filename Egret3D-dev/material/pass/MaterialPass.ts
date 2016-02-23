module egret3d_dev {

    export class MaterialPass {
        protected _passUsage: PassUsage;
        protected _materialData: MaterialData;
        constructor(materialData: MaterialData) {
            this._materialData = materialData; 
        }

        public addMethod(method: MethodBase) {
            this._passUsage.methodList.push(method);
        }

        public removeMethod(method: MethodBase) {
            var index: number = this._passUsage.methodList.indexOf(method);
            if (index != -1) {
                this._passUsage.methodList.slice(index);
            }
        }

        public active(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this._passUsage.passNeedReset) {
                this._passUsage.passNeedReset = false;
                this.upload(time, delay, this._passUsage, context3DProxy, modeltransform, camera3D);
            }

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

            context3DProxy.gl.enable(ContextConfig.BLEND);
            context3DProxy.setBlendFactors(this._materialData.blend_src, this._materialData.blend_dest);

            if (this._materialData.alphaBlending)
                context3DProxy.gl.depthMask(false);


            for (var i: number; i < this._passUsage.methodList.length; i++) {
                this._passUsage.methodList[i].active(time, delay, context3DProxy, modeltransform, camera3D);
            }

            context3DProxy.gl.useProgram(this._materialData.diffusePassUsageData.program3D.program);
            var i: number = 0;

            if (this._materialData.materialDataNeedChange) {
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
                this._materialData.materialSourceData[13] = this._materialData.specularPower;
                this._materialData.materialSourceData[14] = this._materialData.ambientPower;
                this._materialData.materialSourceData[15] = this._materialData.normalPower; //保留
            }
            //context3DProxy.gl.uniform1fv(this._materialData.diffusePassUsageData.uniform_materialSource.uniformIndex, this._materialData.materialSourceData);
            
            //texture 2D
            var sampler2D: GLSL.Sampler2D;
            for (var index in this._materialData.diffusePassUsageData.sampler2DList) {
                sampler2D = this._materialData.diffusePassUsageData.sampler2DList[index];
                sampler2D.texture.upload(context3DProxy);
                context3DProxy.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture);
                if (this._materialData.materialDataNeedChange) {
                    var min_filter: number = this._materialData.smooth ? context3DProxy.gl.LINEAR_MIPMAP_LINEAR : context3DProxy.gl.LINEAR;
                    var mag_filter: number = this._materialData.smooth ? context3DProxy.gl.LINEAR : context3DProxy.gl.LINEAR;

                    var wrap_u_filter: number = this._materialData.repeat ? context3DProxy.gl.REPEAT : context3DProxy.gl.CLAMP_TO_EDGE;
                    var wrap_v_filter: number = this._materialData.repeat ? context3DProxy.gl.REPEAT : context3DProxy.gl.CLAMP_TO_EDGE　;
                    context3DProxy.setTexture2DSamplerState(min_filter, mag_filter, wrap_u_filter, wrap_v_filter);
                    this._materialData.materialDataNeedChange = false;
                }
            }

            var sampler3D: GLSL.Sampler3D;
            for (var index in this._materialData.diffusePassUsageData.sampler3DList) {
                sampler3D = this._materialData.diffusePassUsageData.sampler3DList[index];
                sampler3D.texture.upload(context3DProxy);
                context3DProxy.setCubeTextureAt(sampler3D.activeTextureIndex, sampler3D.uniformIndex, sampler3D.index, sampler3D.texture.cubeTexture);
            }

            //for (this.index = 0; this.index < this._materialData.diffusePassUsageData.vsMethodList.length; this.index++) {
            //    this._materialData.diffusePassUsageData.vsMethodList[this.index].updata(context3D, this._materialData.diffusePassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            //}

            //if (this._materialData.diffusePassUsageData.uniform_directLightSource) {
            //    for (i = 0; i < this._materialData.directLightList.length; i++) {
            //        this._materialData.directLightList[i].updateLightData(i, this._materialData.diffusePassUsageData.directLightData);
            //    }
            //    context3D.gl.uniform1fv(this._materialData.diffusePassUsageData.uniform_directLightSource.uniformIndex, this._materialData.diffusePassUsageData.directLightData);
            //}

            //if (this._materialData.diffusePassUsageData.uniform_sportLightSource) {
            //    for (i = 0; i < this._materialData.sportLightList.length; i++) {
            //        this._materialData.sportLightList[i].updateLightData(i, this._materialData.diffusePassUsageData.sportLightData);
            //    }
            //    context3D.gl.uniform1fv(this._materialData.diffusePassUsageData.uniform_sportLightSource.uniformIndex, this._materialData.diffusePassUsageData.sportLightData);
            //}

            //if (this._materialData.diffusePassUsageData.uniform_pointLightSource) {
            //    for (i = 0; i < this._materialData.pointLightList.length; i++) {
            //        this._materialData.pointLightList[i].updateLightData(i, this._materialData.diffusePassUsageData.pointLightData);
            //    }
            //    context3D.gl.uniform1fv(this._materialData.diffusePassUsageData.uniform_pointLightSource.uniformIndex, this._materialData.diffusePassUsageData.pointLightData);
            //}

            //context3DProxy.gl.bindBuffer(Egret3DDrive.ELEMENT_ARRAY_BUFFER, geometry.sharedIndexBuffer.buffer);
            //context3DProxy.gl.drawElements(this._materialData.drawMode, geometry.numItems, Egret3DDrive.UNSIGNED_SHORT, 0);

            if (this._materialData.alphaBlending)
                context3DProxy.gl.depthMask(true);

            for (var index in this._materialData.diffusePassUsageData.sampler2DList) {
                context3DProxy.gl.bindTexture(context3DProxy.gl.TEXTURE_2D, null);
            }

        }

        public upload(time: number, delay: number, usage: PassUsage, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this._passUsage.vsShaderNames.length = 0;
            this._passUsage.fsShaderNames.length = 0;

            var methoda: MethodBase;
            for (var i: number; i < this._passUsage.methodList.length; i++) {
                if (this._passUsage.methodList[i].vsShaderName != "") {
                    this._passUsage.methodList[i].vsShaderName;
                }
                this._passUsage.methodList[i].upload(time, delay, usage, context3DProxy, modeltransform, camera3D);
            }
        }
    }
} 