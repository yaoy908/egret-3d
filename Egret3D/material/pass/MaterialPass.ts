module egret3d {
    
    /**
    * @language zh_CN
    * @class egret3d.MaterialPass
    * @classdesc
    * 材质渲染pass 根据Mesh数据、模型的材质还有灯光数据的不同。
    * 以不同的渲染方法，会组成相应的shader内容，然后渲染出不同的效果。
    * @see egret3d.Mesh
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MaterialPass {
        protected _passUsage: PassUsage;
        protected _materialData: MaterialData;
        protected _passChange: boolean = true;

        /**
        * @private
        */
        public methodList: Array<MethodBase> = new Array<MethodBase>();
        
        /**
        * @private
        */
        public methodDatas: Array<MethodData> = new Array<MethodData>();
        
        /**
        * @private
        */
        public vsShaderNames: Array<string> = new Array<string>();
        
        /**
        * @private
        */
        public fsShaderNames: Array<string> = new Array<string>();
        
        /**
        * @private
        */
        public lightGroup: LightGroup;
                
        /**
        * @private
        */
        constructor(materialData: MaterialData) {
            this._materialData = materialData;
        }
            
        /**
        * @language zh_CN
        * 增加渲染方法
        * @param method 渲染方法
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addMethod(method: MethodBase) {
            if (method.methodType != -1) {
                this.methodList.push(method);
                method.materialData = this._materialData; 
                //this._materialData.textureMethodTypes.push(method.methodType);
                this._passChange = true;
            }
            else {
                new Error("method.methodType is null");
            }
        }
                    
        /**
        * @language zh_CN
        * 移除渲染方法
        * @param method 渲染方法
        * @version Egret 3.0
        * @platform Web,Native
        */
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

        /**
        * @private
        */
        public passInvalid() {
            this._passChange = true;
        }

        /**
       * @language zh_CN
       * 重置纹理。
       * @version Egret 3.0
       * @platform Web,Native
       */
        protected resetTexture(context3DProxy: Context3DProxy) {
            //--------texture----------------
            var sampler2D: GLSL.Sampler2D;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                if (this._materialData[sampler2D.varName]) {
                    sampler2D.texture = this._materialData[sampler2D.varName];
                }
            }

            var sampler3D: GLSL.Sampler3D;
            for (var index in this._passUsage.sampler3DList) {
                sampler3D = this._passUsage.sampler3DList[index];
                if (this._materialData[sampler3D.varName]) {
                    sampler3D.texture = this._materialData[sampler3D.varName];
                }
            }
            this._materialData.textureChange = false;
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

            this._passUsage.fragmentShader.addUseShaderName("materialSource_fs");

            if (animation) {
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNumber * 2;
                    this._passUsage.vertexShader.addUseShaderName("skeleton_vs");
                }
                else if (animation.particleAnimationController) {
                    this._passUsage.vertexShader.addUseShaderName("particle_vs");
                    for (var i: number = 0; i < animation.particleAnimationController.particleAnimationState.vertex_shaders.length; i++){
                        this._passUsage.vertexShader.addUseShaderName(animation.particleAnimationController.particleAnimationState.vertex_shaders[i]);
                    }
                    for (var i: number = 0; i < animation.particleAnimationController.particleAnimationState.fragment_shaders.length; i++) {
                        this._passUsage.fragmentShader.addUseShaderName(animation.particleAnimationController.particleAnimationState.fragment_shaders[i]);
                    }
                }
            }
            else {
                this._passUsage.vertexShader.addUseShaderName("diffuse_vs");
            }

            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.color) != -1) {
                this._passUsage.fragmentShader.addUseShaderName("gamma_fs");
                this._passUsage.fragmentShader.addUseShaderName("diffuse_fragment");
            }
            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.normal) != -1) {
                this._passUsage.fragmentShader.addUseShaderName("normalMap_fragment");
            }

            if (this.lightGroup) {
                this._passUsage.maxDirectLight = this.lightGroup.directLightList.length;
                this._passUsage.maxSpotLight = this.lightGroup.spotLightList.length;
                this._passUsage.maxPointLight = this.lightGroup.pointLightList.length;

                this._passUsage.fragmentShader.addUseShaderName("lightingBase_fs");

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

            if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.specular) != -1) {
                this._passUsage.fragmentShader.addUseShaderName("specularMap_fragment");
            }

            if (this.methodList) {
                for (var i: number = 0; i < this.methodList.length; i++) {
                    this.methodList[i].materialData = this._materialData;
                    for (var j: number = 0; j < this.methodList[i].vsShaderList.length; j++) {
                        this._passUsage.vertexShader.addUseShaderName(this.methodList[i].vsShaderList[j]);
                    }
                    for (var j: number = 0; j < this.methodList[i].fsShaderList.length; j++) {
                        this._passUsage.fragmentShader.addUseShaderName(this.methodList[i].fsShaderList[j]);
                    }
                }
            }

            this._passUsage.vertexShader.addEndShaderName("end_vs");
            this._passUsage.fragmentShader.addEndShaderName("end_fs");
        }

        /**
        * @private
        */
        public upload(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, animation: IAnimation, geometry:Geometry) {
            this._passChange = false;
            this.initUseMethod(animation, geometry);
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

            var sampler2D: GLSL.Sampler2D;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                sampler2D.uniformIndex = context3DProxy.getUniformLocation(this._passUsage.program3D, sampler2D.varName);
            }

            var sampler3D: GLSL.Sampler2D;
            for (var index in this._passUsage.sampler3DList) {
                sampler3D = this._passUsage.sampler3DList[index];
                sampler3D.uniformIndex = context3DProxy.getUniformLocation(this._passUsage.program3D, sampler3D.varName);
            }

            if (this.methodList) {
                for (var i: number = 0; i < this.methodList.length; i++) {
                    this.methodList[i].upload(time, delay, this._passUsage, null, context3DProxy, modeltransform, camera3D);
                }
            }
        }
        
        /**
        * @private
        */
        public draw(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, subGeometry: SubGeometry, animtion: IAnimation) {
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
                this._materialData.materialSourceData[12] = this._materialData.roughness;
                this._materialData.materialSourceData[13] = this._materialData.albedo;

                this._materialData.materialSourceData[14] = this._materialData.uvRectangle.x;
                this._materialData.materialSourceData[15] = this._materialData.uvRectangle.y; //保留
                this._materialData.materialSourceData[16] = this._materialData.uvRectangle.width; //保留
                this._materialData.materialSourceData[17] = this._materialData.uvRectangle.height; //保留
                this._materialData.materialSourceData[18] = this._materialData.specularScale; //保留
                this._materialData.materialSourceData[19] = this._materialData.normalScale; //保留
            }

            if (this._passChange) {
                this.upload(time, delay, context3DProxy, modeltransform, camera3D, animtion, subGeometry.geometry);
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

            if (this._materialData.alphaBlending)
                Context3DProxy.gl.depthMask(false);

            Context3DProxy.gl.enable(ContextConfig.BLEND);
            context3DProxy.setBlendFactors(this._materialData.blend_src, this._materialData.blend_dest);

            if (this._passUsage.uniform_materialSource) {
                context3DProxy.uniform1fv(this._passUsage.uniform_materialSource.uniformIndex, this._materialData.materialSourceData);
            }

            if (this._materialData.textureChange) {
                this.resetTexture(context3DProxy);
            }

            //texture 2D
            var sampler2D: GLSL.Sampler2D;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                if (!sampler2D.texture) {
                    continue;
                }
                sampler2D.texture.upload(context3DProxy);
                context3DProxy.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture2D );
                if (this._materialData.materialDataNeedChange) {
                    var min_filter: number = (this._materialData.smooth && sampler2D.texture.texture2D.useMipmap) ? Context3DProxy.gl.LINEAR_MIPMAP_LINEAR : Context3DProxy.gl.LINEAR;
                    var mag_filter: number = this._materialData.smooth ? Context3DProxy.gl.LINEAR : Context3DProxy.gl.LINEAR;
            
                    var wrap_u_filter: number = this._materialData.repeat ? Context3DProxy.gl.REPEAT : Context3DProxy.gl.CLAMP_TO_EDGE;
                    var wrap_v_filter: number = this._materialData.repeat ? Context3DProxy.gl.REPEAT : Context3DProxy.gl.CLAMP_TO_EDGE　;
                    context3DProxy.setTexture2DSamplerState(min_filter, mag_filter, wrap_u_filter, wrap_v_filter);
                    this._materialData.materialDataNeedChange = false;
                }
            }

            var sampler3D: GLSL.Sampler3D;
            for (var index in this._passUsage.sampler3DList) {
                sampler3D = this._passUsage.sampler3DList[index];
                sampler3D.texture.upload(context3DProxy);
                context3DProxy.setCubeTextureAt(sampler3D.activeTextureIndex, sampler3D.uniformIndex, sampler3D.index, sampler3D.texture.texture3D);
            }

            var i: number = 0;
            if (this.lightGroup) {
                for (i = 0; i < this._passUsage.maxDirectLight; i++) {
                    this.lightGroup.directLightList[i].updateLightData(camera3D,i, this._passUsage.directLightData);
                }
                for (i = 0; i < this._passUsage.maxSpotLight; i++) {
                    this.lightGroup.spotLightList[i].updateLightData(camera3D,i, this._passUsage.spotLightData);
                }
                for (i = 0; i < this._passUsage.maxPointLight; i++) {
                    this.lightGroup.pointLightList[i].updateLightData(camera3D,i, this._passUsage.pointLightData);
                }

                if (this._passUsage.uniform_directLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_directLightSource.uniformIndex, this._passUsage.directLightData);
                if (this._passUsage.uniform_sportLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_sportLightSource.uniformIndex, this._passUsage.spotLightData);
                if (this._passUsage.uniform_pointLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_pointLightSource.uniformIndex, this._passUsage.pointLightData);
            }

            if (this._passUsage.uniform_ModelMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ModelMatrix.uniformIndex, false, modeltransform.rawData);
            }

            if (this._passUsage.uniform_ViewMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ViewMatrix.uniformIndex, false, camera3D.viewMatrix.rawData);
            }

            if (this._passUsage.uniform_ProjectionMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ProjectionMatrix.uniformIndex, false, camera3D.projectMatrix.rawData);
            }

            if (this._passUsage.uniform_ViewProjectionMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ViewProjectionMatrix.uniformIndex, false, camera3D.viewProjectionMatrix.rawData);
            }

            if (this.methodList) {
                for (var i: number = 0; i < this.methodList.length; i++) {
                    this.methodList[i].update(time, delay, this._passUsage, null, context3DProxy, modeltransform, camera3D);
                }
            }

            if (this._passUsage.uniform_eyepos) {
                context3DProxy.uniform3f(this._passUsage.uniform_eyepos.uniformIndex, camera3D.x, camera3D.y, camera3D.z);
            }

            if (this._passUsage.uniform_cameraMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_cameraMatrix.uniformIndex, false, camera3D.modelMatrix.rawData);
            }

            if (animtion) {

                if (animtion.skeletonAnimationController) {
                    if (this._passUsage.uniform_time) {
                        context3DProxy.uniform1f(this._passUsage.uniform_time.uniformIndex, animtion.time);
                    }
                    context3DProxy.uniform4fv(this._passUsage.uniform_PoseMatrix.uniformIndex, animtion.skeletonAnimationController.currentSkeletonMatrixData);
                }

                if (animtion.particleAnimationController) {
                    if (this._passUsage.uniform_time) {
                        context3DProxy.uniform4f(this._passUsage.uniform_time.uniformIndex, animtion.time * 0.001, animtion.particleAnimationController.particleAnimationState.duration, animtion.particleAnimationController.particleAnimationState.loop, animtion.particleAnimationController.particleAnimationState.totalTime );
                    }
                }
            }

            context3DProxy.drawElement(this._materialData.drawMode, subGeometry.start, subGeometry.count);

            if (this._materialData.alphaBlending)
                Context3DProxy.gl.depthMask(true);
      
        }
    }
} 