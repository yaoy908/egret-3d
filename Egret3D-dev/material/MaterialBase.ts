module egret3d_dev {
    export class MaterialBase {

        public diffusePass: DiffusePass; 

        public materialData: MaterialData;

        
         /**
         * @language zh_CN
         * @class egret3d.MaterialBase
         * @classdesc
         * TerrainMaterial,TextureMaterial 的基类。</p>
         * 材质球共有的基础类型，封装了材质球共有的基础数据设置方法。</p>
         * 不同的渲染通道pass。</p>
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(materialData: MaterialData=null) {
            if (materialData == null) {
                this.setData(new MaterialData());
            }
            else
                this.setData(materialData);
        }

        public setData(data: MaterialData) {
            this.materialData = data; 
        }

        public getData(): MaterialData {
            return this.materialData; 
        }


        /**
       * @language zh_CN
       * 设置材质 diffuseColor。
       * 设置 16 进制的漫反射颜色
       * @param color {Number}
       * @version Egret 3.0
       * @platform Web,Native
       */
        public set diffuseColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.diffuseColor = color;
        }

        /**
        * @language zh_CN
        * 设置材质 ambientColor。
        * 设置 16 进制的环境光颜色
        * @param color {Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set ambientColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.ambientColor = color;
        }

        /**
        * @language zh_CN
        * 设置材质 specularColor。
        * 设置 16 进制的镜面光反射颜色
        * @param color {Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set specularColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.specularColor = color;
        }


        /**
         * @language zh_CN
         * 设置材质 alpha 值。
         * 设置 材质球的透明度，如果透明度小于1会自动启用 alphablending
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set alpha(value: number) {
            if (this.materialData.alpha != value) {
                this.materialData.alpha = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 alpha 值。
         * 返回 alpha 颜色
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get alpha(): number {
            return this.materialData.alpha;
        }

        /**
         * @language zh_CN
         * 设置材质 shininess 值。
         * 设置材质球的 光滑程度 值越大，越不光滑
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set shininess(value: number) {
            if (this.materialData.shininess != value) {
                this.materialData.shininess = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 shininess 值。
         * 返回材质 光滑程度 值越大，越不光滑
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get shininess(): number {
            return this.materialData.shininess;
        }

        /**
         * @language zh_CN
         * 设置材质 specularPower 值。
         * 设置材质 高光颜色的强度 值。
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set specularPower(value: number) {
            if (this.materialData.specularPower != value) {
                this.materialData.specularPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 specularPower 值。
         * 返回材质 高光颜色的强度 值。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get specularPower(): number {
            return this.materialData.specularPower;
        }


        /**
         * @language zh_CN
         * 设置材质 ambientPower 值。
         * 设置材质 环境光颜色的强度 值。
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set ambientPower(value: number) {
            if (this.materialData.ambientPower != value) {
                this.materialData.ambientPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 ambientPower 值。
         * 返回材质 环境光颜色的强度 值。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get ambientPower(): number {
            return this.materialData.ambientPower;
        }
        

        /**
         * @language zh_CN
         * 设置材质 diffusePower 值。
         * 设置材质 漫反射颜色的强度 值。
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set diffusePower(value: number) {
            if (this.materialData.diffusePower != value) {
                this.materialData.diffusePower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 diffusePower 值。
         * 返回材质 漫反射颜色的强度 值。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get diffusePower(): number {
            return this.materialData.diffusePower;
        }

        /**
         * @language zh_CN
         * 设置材质 normalPower 值。
         * 设置材质 法线的强度 值。
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */

        public set normalPower(value: number) {
            if (this.materialData.normalPower != value) {
                this.materialData.normalPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 normalPower 值。
         * 返回材质 法线的强度 值。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get normalPower(): number {
            return this.materialData.normalPower;
        }

        /**
         * @language zh_CN
         * 设置材质 castShadow 值。
         * 设置材质是否接受阴影，设置了之后必须要给 shadowmaping 的方法。
         * @param value {boolean}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set castShadow(value: boolean) {
            this.materialData.castShadow = value;
            if (value) {
                //if (!ShadowRender.frameBuffer) {
                //    alert("要使用shadow view3D.useShadow = true ");
                //} else {
                //    if (!this.shadowPass)
                //        this.shadowPass = new ShadowMapPass(this.materialData);
                //}
            }
        }

        /**
         * @language zh_CN
         * 返回材质 castShadow 值。
         * 返回材质 是否产生阴影 值。
         * @returns {boolean}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get castShadow(): boolean {
            return this.materialData.castShadow;
        }

        /**
         * @language zh_CN
         * 设置材质 acceptShadow 值。
         * 设置材质是否是否产生阴影，设置了之后必须要给 shadowmaping 的方法。
         * @param value {boolean}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set acceptShadow(value: boolean) {
            this.materialData.acceptShadow = value;
        }

        /**
        * @language zh_CN
        * 返回材质 acceptShadow 值。
        * 返回材质是否接受阴影，设置了之后必须要给 shadowmaping 的方法。
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get acceptShadow(): boolean {
            return this.materialData.acceptShadow;
        }

        /**
         * @language zh_CN
         * 设置材质 smooth 值。
         * 材质纹理的采样方式，是否抗锯齿，是否精细显示。
         * @param value {boolean}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set smooth(val: boolean) {
            this.materialData.smooth = val;
        }
        /**
        * @language zh_CN
        * 返回材质 smooth 值。
        * 返回 材质纹理的采样方式，是否抗锯齿，是否精细显示。的开关
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get smooth(): boolean {
            return this.materialData.smooth;
        }
        /**
         * @language zh_CN
         * 设置材质 repeat 值。
         * 设置材质 是否进行纹理重复采样的方式开关。
         * @param value {boolean}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set repeat(val: boolean) {
            this.materialData.repeat = val;
        }
        /**
        * @language zh_CN
        * 返回材质 repeat 值。
        * 返回材质 是否进行纹理重复采样的方式开关。
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get repeat(): boolean {
            return this.materialData.repeat;
        }
        /**
         * @language zh_CN
         * 设置材质 bothside 值。
        * 设置材质是否显示双面的开关，一般情况不需要。
         * @param value {boolean}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set bothside(val: boolean) {
            this.materialData.bothside = val;
        }
        /**
        * @language zh_CN
        * 返回材质 bothside 值。
       * 返回是否显示双面的开关，一般情况不需要。
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get bothside(): boolean {
            return this.materialData.bothside;
        }

        /**
       * @language zh_CN
       * 设置 cull 模式。
       * @param value {Number}
       * @version Egret 3.0
       * @platform Web,Native
       */
        public set cullMode(value: number) {
            this.materialData.cullFrontOrBack = value;
        }

        /**
         * @language zh_CN
         * 返回 cull 模式。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get cullMode(): number {
            return this.materialData.cullFrontOrBack;
        }
        
        /**
         * @language zh_CN
         * 设置材质 blendMode 值。
         * 设置材质球的 混合模式可以参照 blendmode 中的值
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set blendMode(value: BlendMode) {
            this.materialData.blendMode = value;
            switch (value) {
                case BlendMode.NORMAL:
                    this.materialData.blend_src = ContextConfig.ONE;
                    this.materialData.blend_dest = ContextConfig.ZERO;
                    break;
                case BlendMode.LAYER:
                    this.materialData.blend_src = ContextConfig.SRC_ALPHA;
                    this.materialData.blend_dest = ContextConfig.ZERO;
                    this.materialData.alphaBlending = true;
                    break;
                case BlendMode.MULTIPLY:
                    this.materialData.blend_src = ContextConfig.ZERO;
                    this.materialData.blend_dest = ContextConfig.SRC_COLOR;
                    this.materialData.alphaBlending = true;
                    break;
                case BlendMode.ADD:
                    this.materialData.blend_src = ContextConfig.SRC_ALPHA;
                    this.materialData.blend_dest = ContextConfig.ONE;
                    this.materialData.alphaBlending = true;
                    break;
                case BlendMode.ALPHA:
                    this.materialData.blend_src = ContextConfig.SRC_ALPHA;
                    this.materialData.blend_dest = ContextConfig.ONE_MINUS_SRC_ALPHA;
                    this.materialData.alphaBlending = true;
                    break;
                case BlendMode.SCREEN:
                    this.materialData.blend_src = ContextConfig.ONE;
                    this.materialData.blend_dest = ContextConfig.ONE_MINUS_SRC_COLOR;
                    break;
            }
        }

        public renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, subGeometry:SubGeometry , animtion:IAnimation) {
            this.diffusePass.active(time,delay,context3DProxy, modeltransform, camera3D)
        }

        public renderXRayPass() {
        }

        public renderOutlinePass() {
        }

        public renderNormalPass() {
        }

        public renderDepthPass() {
        }

        public renderPositionPass(){
        }

        public renderUVPass() {
        }

        public renderScendUVPass() {
        }

        public renderVertexColorPass() {
        }

        public renderLightingPass() {
        }
    }
} 