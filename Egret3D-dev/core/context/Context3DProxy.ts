module egret3d_dev {

    export class Egret3D {
        static context3DProxy: Context3DProxy; 
        static request(config: string="", blend2D: boolean = false) {
            this.context3DProxy = new egret3d_dev.Context3DProxy(blend2D);
        }
    }

    export class Context3DProxy {

        private _canvas3DRectangle: Rectangle = new Rectangle();
        private _canvas: HTMLCanvasElement;
        /**
         * @language zh_CN
         * @private
         * WebGLRenderingContext 的引用
        */
        public static gl: WebGLRenderingContext;

        /**
         * @language zh_CN
         * @private
        */
        public version: string;

        /**
        * @language zh_CN
        * @private
        * 渲染3D 的驱动设备是否存在，或者丢失。
        * 一般情况下，当切换程序的时候，设备将会丢失，
        * 这个时候就需要快速重新申请设备，并将相应的资源buffer，texture重新提交至显卡
        */
        public isLost: boolean;

        constructor(blend2D: boolean = false) {
            this._canvas = document.createElement("canvas");
            this._canvas.style.position = "absolute";
            this._canvas.style.zIndex = "0";

            if (document.getElementsByClassName("egret-player").length > 0) {
                document.getElementsByClassName("egret-player")[0].appendChild(this._canvas);
            }
            else {
                document.body.appendChild(this._canvas);
            }

            this._canvas.id = "egret3D";
            this._canvas.oncontextmenu = function () {
                return false;
            };

            Context3DProxy.gl = <WebGLRenderingContext>this._canvas.getContext("experimental-webgl");

            if (!Context3DProxy.gl)
                Context3DProxy.gl = <WebGLRenderingContext>this._canvas.getContext("webgl");

            if (!Context3DProxy.gl)
                alert("you drivers not suport webgl");

            this.register();
            console.log("this.context3D ==>", Context3DProxy.gl);
        }

       /**
       * @language zh_CN
       * 初始化,并创建显示区域的后台缓冲大小。
       * @param GPU_CONFIG
       * @param canvasRec
       * @event call
       */
        public creatBackBuffer(x: number, y: number, width: number, height: number) {
            this._canvas.style.left = x.toString() ; 
            this._canvas.style.top = y.toString(); 
            this._canvas.width = width; 
            this._canvas.height = height;
            this.viewPort(x,y,width,height);
        }

        /**
       * @language zh_CN
       * get GPU Context3D 
       * 注册并初始化相关 GPU 参数配置信息
       * 用于设置显卡的相关参数
       * @param GPU_CONFIG
       * @param canvasRec
       * @event call
       */
        private register() {

            var ext: any = Context3DProxy.gl.getExtension('WEBGL_compressed_texture_s3tc');
            var OES_texture_float_linear = Context3DProxy.gl.getExtension("OES_texture_float_linear");
            var OES_texture_float = Context3DProxy.gl.getExtension("OES_texture_float");
            var OES_texture_half_float = Context3DProxy.gl.getExtension("OES_texture_half_float");
            var OES_texture_half_float_linear = Context3DProxy.gl.getExtension("OES_texture_half_float_linear");
            var OES_standard_derivatives = Context3DProxy.gl.getExtension("OES_standard_derivatives");
            var WEBGL_draw_buffers = Context3DProxy.gl.getExtension("WEBGL_draw_buffers");
            var WEBGL_depth_texture = Context3DProxy.gl.getExtension("WEBGL_depth_texture");

            ContextConfig.BLEND = Context3DProxy.gl.BLEND;

            DrawMode.TRIANGLES = Context3DProxy.gl.TRIANGLES;
            DrawMode.POINTS = Context3DProxy.gl.POINTS;
            DrawMode.LINES = Context3DProxy.gl.LINES;
            DrawMode.LINE_STRIP = Context3DProxy.gl.LINE_STRIP;

            ContextConfig.FLOAT = Context3DProxy.gl.FLOAT
            ContextConfig.VERTEX_SHADER = Context3DProxy.gl.VERTEX_SHADER;
            ContextConfig.FRAGMENT_SHADER = Context3DProxy.gl.FRAGMENT_SHADER;

            ContextConfig.FRONT = Context3DProxy.gl.FRONT;
            ContextConfig.BACK = Context3DProxy.gl.BACK;

            ContextConfig.DEPTH_BUFFER_BIT = Context3DProxy.gl.DEPTH_BUFFER_BIT;
            ContextConfig.ELEMENT_ARRAY_BUFFER = Context3DProxy.gl.ELEMENT_ARRAY_BUFFER;
            ContextConfig.UNSIGNED_SHORT = Context3DProxy.gl.UNSIGNED_SHORT;

            ContextConfig.NEAREST = Context3DProxy.gl.NEAREST;
            ContextConfig.REPEAT = Context3DProxy.gl.REPEAT;
            ContextConfig.ONE = Context3DProxy.gl.ONE;
            ContextConfig.ZERO = Context3DProxy.gl.ZERO;
            ContextConfig.SRC_ALPHA = Context3DProxy.gl.SRC_ALPHA;
            ContextConfig.ONE_MINUS_SRC_ALPHA = Context3DProxy.gl.ONE_MINUS_SRC_ALPHA;
            ContextConfig.SRC_COLOR = Context3DProxy.gl.SRC_COLOR;
            ContextConfig.ONE_MINUS_SRC_COLOR = Context3DProxy.gl.ONE_MINUS_SRC_COLOR;;

            ContextConfig.ColorFormat_RGB565 = Context3DProxy.gl.RGB565;
            ContextConfig.ColorFormat_RGBA5551 = Context3DProxy.gl.RGB5_A1;
            ContextConfig.ColorFormat_RGBA4444 = Context3DProxy.gl.RGBA4;
            ContextConfig.ColorFormat_RGBA8888 = Context3DProxy.gl.RGBA;

            ContextConfig.DEPTH_TEST = Context3DProxy.gl.DEPTH_TEST;
            ContextConfig.CULL_FACE = Context3DProxy.gl.CULL_FACE;
            ContextConfig.BLEND = Context3DProxy.gl.BLEND;

            ContextConfig.LEQUAL = Context3DProxy.gl.LEQUAL;

            if (ext) {
                ContextConfig.ColorFormat_DXT1_RGB = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
                ContextConfig.ColorFormat_DXT1_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                ContextConfig.ColorFormat_DXT3_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                ContextConfig.ColorFormat_DXT5_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
            }

            ContextSamplerType.TEXTURE_0 = Context3DProxy.gl.TEXTURE0;
            ContextSamplerType.TEXTURE_1 = Context3DProxy.gl.TEXTURE1;
            ContextSamplerType.TEXTURE_2 = Context3DProxy.gl.TEXTURE2;
            ContextSamplerType.TEXTURE_3 = Context3DProxy.gl.TEXTURE3;
            ContextSamplerType.TEXTURE_4 = Context3DProxy.gl.TEXTURE4;
            ContextSamplerType.TEXTURE_5 = Context3DProxy.gl.TEXTURE5;
            ContextSamplerType.TEXTURE_6 = Context3DProxy.gl.TEXTURE6;
            ContextSamplerType.TEXTURE_7 = Context3DProxy.gl.TEXTURE7;
            ContextSamplerType.TEXTURE_8 = Context3DProxy.gl.TEXTURE8;

            console.log("requst GPU Config", Context3DProxy.gl);

            ShaderPool.register(this);
        }

        public backBufferSize(x: number, y: number, width: number, height: number) {
            this._canvas3DRectangle.x = x; 
            this._canvas3DRectangle.y = y; 
            this._canvas3DRectangle.width = width; 
            this._canvas3DRectangle.height = height; 
            ContextConfig.canvasRectangle = this._canvas3DRectangle;

            this._canvas3DRectangle.x = x;
            this._canvas3DRectangle.y = y;
            this._canvas3DRectangle.width = width;
            this._canvas3DRectangle.height = height;

            this._canvas.style.left = this._canvas3DRectangle.x.toString() + "px";
            this._canvas.style.top = this._canvas3DRectangle.y.toString() + "px";
            this._canvas.width = this._canvas3DRectangle.width;
            this._canvas.height = this._canvas3DRectangle.height;
        }
       
        /**
        * @language zh_CN
        * 版本号
        * 视口设置定义
        * @param x position X
        * @param y position Y
        * @param width  3D canvas width
        * @param height  3D canvas  height
        */
        public viewPort(x: number, y: number, width: number, height: number) {
            Context3DProxy.gl.viewport(x, y, width, height);
        }

        /**
        * @language zh_CN
        * 创建 显卡程序
        * @param vsShader
        * @param fsShader
        */
        public creatProgram(vsShader: Shader, fsShader: Shader): Program3D {
            var shaderProgram = Context3DProxy.gl.createProgram();
            Context3DProxy.gl.attachShader(shaderProgram, vsShader.shader);
            Context3DProxy.gl.attachShader(shaderProgram, fsShader.shader);
            Context3DProxy.gl.linkProgram(shaderProgram);
            var p = Context3DProxy.gl.getProgramParameter(shaderProgram, Context3DProxy.gl.LINK_STATUS);
            if (!p) {
                alert("vsShader error" + Context3DProxy.gl.getShaderInfoLog(vsShader.shader));
                alert("fsShader error" + Context3DProxy.gl.getShaderInfoLog(fsShader.shader));
            }
            var program: Program3D = new Program3D(shaderProgram);
            return program;
        }

        /**
        * @language zh_CN
        * 创建 顶点索引流
        * @param indexData
        */
        public creatIndexBuffer(indexData: Array<number>): IndexBuffer3D {
            var indexDataArray = new Uint16Array(indexData);

            var indexBuffer: WebGLBuffer = Context3DProxy.gl.createBuffer();
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexDataArray, Context3DProxy.gl.STATIC_DRAW);

            return new IndexBuffer3D(indexBuffer);
        }

        /**
        * @language zh_CN
        * 创建 顶点数据流
        * @param vertexData
        */
        public creatVertexBuffer(vertexData: Array<number>): VertexBuffer3D {
            var vertexDataArray: Float32Array = new Float32Array(vertexData);

            var vertexBuffer: WebGLBuffer = Context3DProxy.gl.createBuffer();
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ARRAY_BUFFER, vertexDataArray, Context3DProxy.gl.STATIC_DRAW);

            return new VertexBuffer3D(vertexBuffer);
        }

        /// public upLoadTextureData(mipLevel: number, texture: Texture2D , data:any ) {
        ///     /// 启用二维纹理
        ///     ///Context3DProxy.gl.enable( Context3DProxy.gl.TEXTURE );
        ///     Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture.texture2D);
        ///     ///if (typeof (data) == HTMLImageElement) {
        ///     /// Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, mipLevel, Context3DProxy.gl.RGBA, Context3DProxy.gl.RGBA, Context3DProxy.gl.UNSIGNED_BYTE, data);
        ///     ///}
        ///     Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, mipLevel, Context3DProxy.gl.RGBA, 128, 128, 0, Context3DProxy.gl.RGBA, Context3DProxy.gl.UNSIGNED_BYTE, data ) ;
        ///
        ///     Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.NEAREST);
        ///     Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.NEAREST);
        ///     Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.REPEAT);
        ///     Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.REPEAT);
        /// }

        /**
        * @language zh_CN
        * 设置2D纹理状态
        * @param min_filter
        * @param mag_filter
        * @param wrap_u_filter
        * @param wrap_v_filter
        */
        public setTexture2DSamplerState(min_filter: number, mag_filter: number, wrap_u_filter: number, wrap_v_filter: number) {
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, min_filter);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, mag_filter);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, wrap_u_filter);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }

        /**
        * @language zh_CN
        * 提交2D纹理
        * @param mipLevel
        * @param texture
        */
        public upLoadTextureData(mipLevel: number, texture: Texture2D) {
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture.texture);

            if (texture.internalformat == InternalFormat.ImageData) {
                Context3DProxy.gl.pixelStorei(Context3DProxy.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGBA, Context3DProxy.gl.RGBA, Context3DProxy.gl.UNSIGNED_BYTE, texture.imageData);
                Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_2D);
            }
            else if (texture.internalformat == InternalFormat.CompressData) {
                this.upLoadCompressedTexture2D(mipLevel, texture);
               
            }
            else if (texture.internalformat == InternalFormat.PixelArray) {
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, mipLevel, texture.colorformat, texture.mimapData[mipLevel].width, texture.mimapData[mipLevel].height, texture.border, texture.colorformat, Context3DProxy.gl.UNSIGNED_BYTE, texture.mimapData[mipLevel].data);
            }

            if (texture.useMipmap)
                Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_2D);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR_MIPMAP_LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.REPEAT);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.REPEAT);
        }

        /**
        * @language zh_CN
        * 提交2D压缩纹理
        * @param mipLevel
        * @param texture
        */
        public upLoadCompressedTexture2D(mipLevel: number, texture: Texture2D) {
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture.texture);
            Context3DProxy.gl.compressedTexImage2D(Context3DProxy.gl.TEXTURE_2D, mipLevel, texture.colorformat, texture.mimapData[mipLevel].width, texture.mimapData[mipLevel].height, texture.border, texture.mimapData[mipLevel].data);
        }

        /**
        * @language zh_CN
        * 创建 2维贴图
        */
        public creatTexture2D(): Texture2D {
            var texture: Texture2D = new Texture2D();
            return texture;
        }

        /**
        * @language zh_CN
        * 创建 Cube贴图
        */
        public creatCubeTexture(): Texture3D {
            var texture: Texture3D = new Texture3D();
            return texture;
        }

        /**
        * @language zh_CN
        *
        * @param tex
        */
        public uploadCubetexture(tex: Texture3D) {
            /// 创建纹理并绑定纹理数据
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_CUBE_MAP, tex.texture);

            Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_right.imageData);
            Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_left.imageData);
            Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_up.imageData);
            Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_down.imageData);
            Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_back.imageData);
            Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_front.imageData); 
            ///Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_CUBE_MAP);
            ///gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);

            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);

            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, min_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, mag_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, wrap_u_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }
        
        /**
        * @language zh_CN
        *
        * @param width
        * @param height
        * @param format
        */
        public createFramebuffer(width: number, height: number, format: FrameBufferFormat): Texture2D {
            var rttframeBuffer = Context3DProxy.gl.createFramebuffer();
            var texture2D: Texture2D = this.creatTexture2D();
            var depthRenderbuffer = Context3DProxy.gl.createRenderbuffer();
            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, rttframeBuffer);

            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture2D.texture);

            var float: Float32Array = new Float32Array(32 * 32 * 4);
            for (var i: number = 0; i < 32 * 32; i++) {
                float[i] = 1.0;
                float[i + 1] = 1.0;
                float[i + 2] = 1.0;
                float[i + 3] = 1.0;
            }

            switch (format) {
                case FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGB, width, height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGBA, width, height, 0, Context3DProxy.gl.RGBA, Context3DProxy.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.FLOAT_RGB:
                    Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGB, width, height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.FLOAT, float);
                    break;
                case FrameBufferFormat.FLOAT_RGBA:
                    Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGBA, width, height, 0, Context3DProxy.gl.RGBA, Context3DProxy.gl.FLOAT, float);
                    break;
            }

            Context3DProxy.gl.framebufferTexture2D(Context3DProxy.gl.FRAMEBUFFER, Context3DProxy.gl.COLOR_ATTACHMENT0, Context3DProxy.gl.TEXTURE_2D, texture2D.texture, 0);

            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);
            ///Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_2D);  
            ///配置渲染缓冲 
            Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, depthRenderbuffer);
            Context3DProxy.gl.renderbufferStorage(Context3DProxy.gl.RENDERBUFFER, Context3DProxy.gl.DEPTH_COMPONENT16, width, height);

            texture2D.width = width;
            texture2D.height = height;
            texture2D.frameBuffer = rttframeBuffer;
            texture2D.renderbuffer = depthRenderbuffer;

            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, null);
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, null);
            Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, null);
            return texture2D;
        }
                
        /**
        * @language zh_CN
        *
        * @param texture
        * @param enableDepthAndStencil
        * @param surfaceSelector
        */
        public setRenderToTexture(texture: Texture2D, enableDepthAndStencil: Boolean = false, surfaceSelector: number = 0) {
            if (enableDepthAndStencil) {
                //Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, texture.renderbuffer);
                //Context3DProxy.gl.renderbufferStorage(Context3DProxy.gl.RENDERBUFFER, Context3DProxy.gl.DEPTH_COMPONENT16, texture.width, texture.height);
            }

            Context3DProxy.gl.viewport(0, 0, texture.width, texture.height);
           
            //if (Context3DProxy.gl.checkFramebufferStatus(Context3DProxy.gl.FRAMEBUFFER) != Context3DProxy.gl.FRAMEBUFFER_COMPLETE)
            //{
            //    alert("缓冲失败");
            //}

            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, texture.frameBuffer);
            Context3DProxy.gl.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);
            Context3DProxy.gl.framebufferTexture2D(Context3DProxy.gl.FRAMEBUFFER, Context3DProxy.gl.COLOR_ATTACHMENT0, Context3DProxy.gl.TEXTURE_2D, texture.texture, 0);
            Context3DProxy.gl.framebufferRenderbuffer(Context3DProxy.gl.FRAMEBUFFER, Context3DProxy.gl.DEPTH_ATTACHMENT, Context3DProxy.gl.RENDERBUFFER, texture.renderbuffer);
        }
                        
        /**
        * @language zh_CN
        *
        */
        public setRenderToBackBuffer() {

            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, null);
            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, null);
            Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, null);

        }
                                
        /**
        * @language zh_CN
        *
        * @param source
        */
        public creatVertexShader(source: string): Shader {
            var shader: WebGLShader = Context3DProxy.gl.createShader(Context3DProxy.gl.VERTEX_SHADER);
            Context3DProxy.gl.shaderSource(shader, source);
            Context3DProxy.gl.compileShader(shader);

            var tmpShader: Shader = new Shader(shader);
            tmpShader.id = (Shader.ID_COUNT++).toString();
            return tmpShader;
        }
                                        
        /**
        * @language zh_CN
        *
        * @param source
        */
        public creatFragmentShader(source: string): Shader {
            var shader: WebGLShader = Context3DProxy.gl.createShader(Context3DProxy.gl.FRAGMENT_SHADER);
            Context3DProxy.gl.shaderSource(shader, source);
            Context3DProxy.gl.compileShader(shader);

            var tmpShader: Shader = new Shader(shader);
            tmpShader.id = (Shader.ID_COUNT++).toString();
            return tmpShader;
        }

        /**
        * @language zh_CN
        * 清除渲染区域的颜色 深度
        * @param r
        * @param g
        * @param b
        * @param a
        */
        public clear(r: number, g: number, b: number, a: number) {
            Context3DProxy.gl.clearColor(r, g, b, a);
            Context3DProxy.gl.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);
        }
        
        /**
        * @language zh_CN
        * 清除渲染区域的 深度
        * @param depth
        */
        public clearDepth(depth: number=1.0) {
            Context3DProxy.gl.clearDepth(depth);
            Context3DProxy.gl.clear(Context3DProxy.gl.DEPTH_BUFFER_BIT);
        }

                
        /**
        * @language zh_CN
        * 清除渲染区域的 模板
        * @param stencil
        */
        public clearStencil(stencil: number) {
            Context3DProxy.gl.clearStencil(stencil);
        }

        /**
        * @language zh_CN
        * 使用显卡着色器
        * @param program
        */
        public setProgram(program: Program3D) {
            Context3DProxy.gl.useProgram(program.program);
        }

        /**
        * @language zh_CN
        * 获取矩阵变量ID
        * @param program
        * @param name
        */
        public getUniformLocation(programe3D: Program3D, name: string): any {
            return Context3DProxy.gl.getUniformLocation(programe3D.program, name);
        }

        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        */
        public uniform1f(location: any, x: number): void {
            Context3DProxy.gl.uniform1f(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform1fv(location: any, v: any): void {
            Context3DProxy.gl.uniform1fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        */
        public uniform1i(location: any, x: number): void {
            Context3DProxy.gl.uniform1i(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform1iv(location: any, v: Int32Array): void {
            Context3DProxy.gl.uniform1iv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        */
        public uniform2f(location: any, x: number, y: number): void {
            Context3DProxy.gl.uniform2f(location, x, y);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform2fv(location: any, v: any): void {
            Context3DProxy.gl.uniform2fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        */
        public uniform2i(location: any, x: number, y: number): void {
            Context3DProxy.gl.uniform2i(location, x, y);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform2iv(location: any, v: Int32Array): void {
            Context3DProxy.gl.uniform2iv(location, v);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        */
        public uniform3f(location: any, x: number, y: number, z: number): void {
            Context3DProxy.gl.uniform3f(location, x, y, z);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform3fv(location: any, v: any): void {
            Context3DProxy.gl.uniform3fv(location, v);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        */
        public uniform3i(location: any, x: number, y: number, z: number): void {
            Context3DProxy.gl.uniform3i(location, x, y, z);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform3iv(location: any, v: Int32Array): void {
            Context3DProxy.gl.uniform3iv(location, v);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        * @param w
        */
        public uniform4f(location: any, x: number, y: number, z: number, w: number): void {
            Context3DProxy.gl.uniform4f(location, x, y, z, w);
        }
                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform4fv(location: any, v: any): void {
            Context3DProxy.gl.uniform4fv(location, v);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        * @param w
        */
        public uniform4i(location: any, x: number, y: number, z: number, w: number): void {
            Context3DProxy.gl.uniform4i(location, x, y, z, w);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform4iv(location: any, v: Int32Array): void {
            Context3DProxy.gl.uniform4iv(location, v);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix2fv(location: any, transpose: boolean, value: any): void {
            Context3DProxy.gl.uniformMatrix2fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix3fv(location: any, transpose: boolean, value: any): void {
            Context3DProxy.gl.uniformMatrix3fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix4fv(location: any, transpose: boolean, value: any): void {
            Context3DProxy.gl.uniformMatrix4fv(location, transpose, value);
        }

        /**
        * @language zh_CN
        * 设置 绘制混合模式
        * @param src 
        * @param dst 
        */
        public setBlendFactors(src: number, dst: number) {
            Context3DProxy.gl.blendFunc(src, dst);
        }

        /**
        * @language zh_CN
        * 设置 绘制剔除模式
        * @param mode 
        */
        public setCulling(mode: number) {
            Context3DProxy.gl.cullFace(mode);
        }

        /**
        * @language zh_CN
        * 开启 绘制模式
        * @param cap 
        */
        public enable(cap: number) {
            Context3DProxy.gl.enable(cap);
        }

        /**
        * @language zh_CN
        * 关闭 绘制模式
        * @param cap 
        */
        public disable(cap: number) {
            Context3DProxy.gl.disable(cap);
        }

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag 
        * @param compareMode 
        */
        public depthFunc(compareMode: number = 0) {
              Context3DProxy.gl.depthFunc(compareMode);
        }

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag 
        * @param compareMode 
        */
        public enableDepthTest(flag: boolean, compareMode: number = 0) {
            if (flag)
                Context3DProxy.gl.enable(Context3DProxy.gl.DEPTH_TEST);
        }

        /**
        * @language zh_CN
        * 获取顶点着色器变量 索引
        * @param programe 
        * @param attribName
        * @returns 着色器变量
        */
        public getShaderAttribLocation(programe: Program3D, attribName: string): any {
            return Context3DProxy.gl.getAttribLocation(programe.program, attribName);
        }

        /**
        * @language zh_CN
        * 指定顶点着色器变量索引 及机构
        * @param programe3D 
        * @param index 
        * @param size 
        * @param dataType 
        * @param normalized 
        * @param stride 
        * @param offset 
        */
        public vertexAttribPointer(programe3D: Program3D, index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number) {
            Context3DProxy.gl.vertexAttribPointer(index, size, dataType, normalized, stride, offset);
            Context3DProxy.gl.enableVertexAttribArray(index);
        }

        /**
        * @language zh_CN
        * 实时传入显卡顶点着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen 
        */
        public setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number) {
            Context3DProxy.gl.vertexAttrib4fv(offest, floats.subarray(offest, numLen));
        }

        /**
        * @language zh_CN
        * 实时传入显卡片段着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen 
        */
        public setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number) {
        }

        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex 
        * @param uniLocation 
        * @param index 
        * @param texture 
        */
        public setTexture2DAt(samplerIndex: number, uniLocation: number, index: number, texture: Texture2D) {
            Context3DProxy.gl.activeTexture(samplerIndex);
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture.texture);
            Context3DProxy.gl.uniform1i(uniLocation, index);
        }
        
        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex 
        * @param uniLocation 
        * @param index 
        * @param texture 
        */
        public setCubeTextureAt(samplerIndex: number, uniLocation: number, index: number, texture: Texture3D) {
            Context3DProxy.gl.activeTexture(samplerIndex);
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_CUBE_MAP, texture.texture);
            Context3DProxy.gl.uniform1i(uniLocation, index);
        } 

        /**
        * @language zh_CN
        * 设置矩形裁切区域
        * @param rectangle 
        */
        public setScissorRectangle(rectangle: Rectangle) {
        }

        /**
        * @language zh_CN
        * 设置模板测试
        */
        public setStencilReferenceValue() {
        }

        /**
        * @language zh_CN
        * 设置模板测试
        */
        setStencilActions(triangleFace: string, compareMode: string, actionOnBothPass: string, actionOnDepthFail: string, actionOnDepthPassStencilFail: string) {
        }

        /**
        * @language zh_CN
        * 绑定顶点Buffer
        * @param vertexBuffer 
        */
        public bindVertexBuffer(vertexBuffer: VertexBuffer3D) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer.buffer);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param first 第一个顶点索引
        * @param length 顶点个数
        */
        public drawArrays(type: number, first: number, length: number) {
            Context3DProxy.gl.drawArrays(type, first, length);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param indexBuffer 索引数据
        * @param offset 顶点偏移
        * @param length 顶点个数
        */
        public drawElement(type: number, indexBuffer: IndexBuffer3D, offset: number, length: number) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
            Context3DProxy.gl.drawElements(type, length, Context3DProxy.gl.UNSIGNED_SHORT, offset);
        }

        /**
        * @language zh_CN
        * 绘制提交
        */
        public flush() {
            Context3DProxy.gl.flush();
        }
    }
}