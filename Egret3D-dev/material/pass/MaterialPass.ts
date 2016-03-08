module egret3d_dev {

    export class MaterialPass {
        protected _passUsage: PassUsage;
        protected _materialData: MaterialData;
        protected _passChange: boolean = true ;

        public methodList: Array<MethodBase> = new Array<MethodBase>();
        public methodDatas: Array<MethodData> = new Array<MethodData>();

        public vsShaderNames: Array<string> = new Array<string>();
        public fsShaderNames: Array<string> = new Array<string>();


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
                new Error( "method.methodType is null" );
            }
        }

        public removeMethod(method: MethodBase) {
            var index: number = this.methodList.indexOf(method);
            if (index != -1) {
                this.methodList.slice(index);
                this._passChange = true;
            }
        }

        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initUseMethod() {
            this._passChange = false ;

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

        public upload(time: number, delay: number, usage: PassUsage, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this._passChange = false;
            this.initUseMethod();
            this._passUsage.vertexShader.getShader(usage);
            this._passUsage.fragmentShader.getShader(usage);
            this._passUsage.program3D = ShaderPool.getProgram(this._passUsage.vertexShader.shader.id, this._passUsage.fragmentShader.shader.id);
        }

        public draw(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, subGeometry:SubGeometry, animtion: IAnimation) {
            if (this._passChange) {
                this.upload(time, delay, this._passUsage, context3DProxy, modeltransform, camera3D);
            }

            subGeometry.update(time, delay,this._passUsage,context3DProxy);

            //if (this._materialData.depthTest) {
            //    context3DProxy.enable(ContextConfig.DEPTH_TEST);
            //    context3DProxy.depthFunc(ContextConfig.LEQUAL);
            //}
            //else {
            //    context3DProxy.disable(ContextConfig.DEPTH_TEST);
            //    context3DProxy.depthFunc(ContextConfig.LEQUAL);
            //}

            //context3DProxy.setCulling(this._materialData.cullFrontOrBack);

            //if (this._materialData.bothside) {
            //    context3DProxy.disable(ContextConfig.CULL_FACE);
            //} else
            //    context3DProxy.enable(ContextConfig.CULL_FACE);

            //Context3DProxy.gl.enable(ContextConfig.BLEND);
            //context3DProxy.setBlendFactors(this._materialData.blend_src, this._materialData.blend_dest);

            //if (this._materialData.alphaBlending)
            //    Context3DProxy.gl.depthMask(false);

            //for (var i: number; i < this._passUsage.methodList.length; i++) {
            //    this._passUsage.methodList[i].active(time, delay, context3DProxy, modeltransform, camera3D);
            //}
            context3DProxy.setProgram(this._passUsage.program3D);

            //var i: number = 0;

            //if (this._materialData.materialDataNeedChange) {
            //    this._materialData.materialSourceData[0] = (this._materialData.diffuseColor >> 16 & 0xff) / 255.0;
            //    this._materialData.materialSourceData[1] = (this._materialData.diffuseColor >> 8 & 0xff) / 255.0;
            //    this._materialData.materialSourceData[2] = (this._materialData.diffuseColor & 0xff) / 255.0;

            //    this._materialData.materialSourceData[3] = (this._materialData.ambientColor >> 16 & 0xff) / 255.0;
            //    this._materialData.materialSourceData[4] = (this._materialData.ambientColor >> 8 & 0xff) / 255.0;
            //    this._materialData.materialSourceData[5] = (this._materialData.ambientColor & 0xff) / 255.0;

            //    this._materialData.materialSourceData[6] = (this._materialData.specularColor >> 16 & 0xff) / 255.0;
            //    this._materialData.materialSourceData[7] = (this._materialData.specularColor >> 8 & 0xff) / 255.0;
            //    this._materialData.materialSourceData[8] = (this._materialData.specularColor & 0xff) / 255.0;

            //    this._materialData.materialSourceData[9] = this._materialData.alpha;
            //    this._materialData.materialSourceData[10] = this._materialData.cutAlpha;
            //    this._materialData.materialSourceData[11] = this._materialData.shininess;

            //    this._materialData.materialSourceData[12] = this._materialData.diffusePower;
            //    this._materialData.materialSourceData[13] = this._materialData.specularPower;
            //    this._materialData.materialSourceData[14] = this._materialData.ambientPower;
            //    this._materialData.materialSourceData[15] = this._materialData.normalPower; //保留
            //}

            ////texture 2D
            //var sampler2D: GLSL.Sampler2D;
            //for (var index in this._materialData.diffusePassUsageData.sampler2DList) {
            //    sampler2D = this._materialData.diffusePassUsageData.sampler2DList[index];
            //    context3DProxy.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture2D );
            //    if (this._materialData.materialDataNeedChange) {
            //        var min_filter: number = this._materialData.smooth ? Context3DProxy.gl.LINEAR_MIPMAP_LINEAR : Context3DProxy.gl.LINEAR;
            //        var mag_filter: number = this._materialData.smooth ? Context3DProxy.gl.LINEAR : Context3DProxy.gl.LINEAR;

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

            //if (this._materialData.alphaBlending)
            //    Context3DProxy.gl.depthMask(true);

            context3DProxy.drawElement(this._materialData.drawMode, subGeometry.start, subGeometry.count );
        }


    }
} 