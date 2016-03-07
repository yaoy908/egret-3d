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

        /**
               * @language zh_CN
               * 初始化 UseMethod。
               * @version Egret 3.0
               * @platform Web,Native
               */
        public initUseMethod() {
            var i: number = 0;

            //this.pixelShader.addMethod(this.diffuseMethod);
            //this.pixelShader.addShader(this.diffuseMethod.fragMethodName);

            //if (this.materialData.textureMethodTypes.indexOf(TextureMethodType.DIFFUSE) != -1) {
            //    this.pixelShader.addShader("diffuseMap_fragment");
            //}
            //if (this.materialData.textureMethodTypes.indexOf(TextureMethodType.NORMAL) != -1) {
            //    this.pixelShader.addShader("normalMap_fragment");
            //}
            //if (this.materialData.textureMethodTypes.indexOf(TextureMethodType.SPECULAR) != -1) {
            //    this.pixelShader.addShader("specularMap_fragment");
            //}

            //for (i = 0; i < this.materialData.directLightList.length; i++) {
            //    this.pixelShader.addShader("directLight_fragment");
            //}

            //for (i = 0; i < this.materialData.sportLightList.length; i++) {
            //    this.pixelShader.addShader("spotLight_fragment");
            //}

            //for (i = 0; i < this.materialData.pointLightList.length; i++) {
            //    this.pixelShader.addShader("pointLight_fragment");
            //}

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

            //this.pixelShader.addShader("diffuse_fragmentEnd");

            //if (this.effectMethodList) {
            //    for (var i: number = 0; i < this.effectMethodList.length; i++) {
            //        this.pixelShader.addEffectMethod(this.effectMethodList[i]);
            //        this.pixelShader.addShader(this.effectMethodList[i].fragMethodName);
            //    }
            //}



        }


        /**
         * @language zh_CN
         * 初始化 shader 。
         * @param context3D {Context3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
        * @version Egret 3.0
        * @platform Web,Native
         */
        public initShader(context3D: Context3DProxy, geometry: Geometry, animation: IAnimation) {
            //super.initShader(context3D, geometry, animation);

            //this.vertexShader = new VertexShader(this.materialData, this.materialData.diffusePassUsageData);
            //this.pixelShader = new PixelShader(this.materialData, this.materialData.diffusePassUsageData);

            //this.materialData.context3D = context3D;


            //this.vertexShader.setVertexShader(geometry);
            //this.initUseMethod();

            //if (animation) {
            //    animation.initShader(this.vertexShader, this.pixelShader);
            //}

            //this.vertexShader.build();
            //this.pixelShader.build();

            //var vs: string = this.vertexShader.getShaderSource();
            //var fs: string = this.pixelShader.getShaderSource();

            //var vs_shader: IShader = context3D.creatVertexShader(vs);
            //var fs_shader: IShader = context3D.creatFragmentShader(fs);

            //this.materialData.diffusePassUsageData.program3D = context3D.creatProgram(vs_shader, fs_shader);
            //this.context3DChange = true;
        }

        public draw(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, subGeometry:SubGeometry, animtion: IAnimation) {
            if (this._passUsage.passNeedReset) {
                this._passUsage.passNeedReset = false;
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

        public upload(time: number, delay: number, usage: PassUsage, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this._passUsage.vsShaderNames.length = 0;
            this._passUsage.fsShaderNames.length = 0;

            var methoda: MethodBase;
            var vsList: Array<string> = [];
            var fsList: Array<string> = [];
            var vsName: string = "";
            var fsName: string = "";

            for (var i: number; i < this._passUsage.methodList.length; i++) {
                methoda = this._passUsage.methodList[i];
                if (methoda.vsShaderName != "") {
                    vsList.push(methoda.vsShaderName);
                    vsName += methoda.vsShaderName;
                }
                if (methoda.fsShaderName != "") {
                    fsList.push(methoda.fsShaderName);
                    fsName += methoda.fsShaderName;
                }
                methoda.upload(time, delay, usage, context3DProxy, modeltransform, camera3D);
            }

            //ShaderPool.getProgram(vsName, fsName);
        }
    }
} 