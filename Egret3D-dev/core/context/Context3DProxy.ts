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
        public gl: WebGLRenderingContext;

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

            this.gl = <WebGLRenderingContext>this._canvas.getContext("experimental-webgl");

            if (!this.gl)
                this.gl = <WebGLRenderingContext>this._canvas.getContext("webgl");

            if (!this.gl)
                alert("you drivers not suport webgl");

            this.register();
            console.log("this.context3D ==>", this.gl);
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

            var ext: any = this.gl.getExtension('WEBGL_compressed_texture_s3tc');
            var OES_texture_float_linear = this.gl.getExtension("OES_texture_float_linear");
            var OES_texture_float = this.gl.getExtension("OES_texture_float");
            var OES_texture_half_float = this.gl.getExtension("OES_texture_half_float");
            var OES_texture_half_float_linear = this.gl.getExtension("OES_texture_half_float_linear");
            var OES_standard_derivatives = this.gl.getExtension("OES_standard_derivatives");
            var WEBGL_draw_buffers = this.gl.getExtension("WEBGL_draw_buffers");
            var WEBGL_depth_texture = this.gl.getExtension("WEBGL_depth_texture");

            ContextConfig.BLEND = this.gl.BLEND;

            DrawMode.TRIANGLES = this.gl.TRIANGLES;
            DrawMode.POINTS = this.gl.POINTS;
            DrawMode.LINES = this.gl.LINES;
            DrawMode.LINE_STRIP = this.gl.LINE_STRIP;

            ContextConfig.FLOAT = this.gl.FLOAT
            ContextConfig.VERTEX_SHADER = this.gl.VERTEX_SHADER;
            ContextConfig.FRAGMENT_SHADER = this.gl.FRAGMENT_SHADER;

            ContextConfig.FRONT = this.gl.FRONT;
            ContextConfig.BACK = this.gl.BACK;

            ContextConfig.DEPTH_BUFFER_BIT = this.gl.DEPTH_BUFFER_BIT;
            ContextConfig.ELEMENT_ARRAY_BUFFER = this.gl.ELEMENT_ARRAY_BUFFER;
            ContextConfig.UNSIGNED_SHORT = this.gl.UNSIGNED_SHORT;

            ContextConfig.NEAREST = this.gl.NEAREST;
            ContextConfig.REPEAT = this.gl.REPEAT;
            ContextConfig.ONE = this.gl.ONE;
            ContextConfig.ZERO = this.gl.ZERO;
            ContextConfig.SRC_ALPHA = this.gl.SRC_ALPHA;
            ContextConfig.ONE_MINUS_SRC_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
            ContextConfig.SRC_COLOR = this.gl.SRC_COLOR;
            ContextConfig.ONE_MINUS_SRC_COLOR = this.gl.ONE_MINUS_SRC_COLOR;;

            ContextConfig.ColorFormat_RGB565 = this.gl.RGB565;
            ContextConfig.ColorFormat_RGBA5551 = this.gl.RGB5_A1;
            ContextConfig.ColorFormat_RGBA4444 = this.gl.RGBA4;
            ContextConfig.ColorFormat_RGBA8888 = this.gl.RGBA;

            ContextConfig.DEPTH_TEST = this.gl.DEPTH_TEST;
            ContextConfig.CULL_FACE = this.gl.CULL_FACE;
            ContextConfig.BLEND = this.gl.BLEND;

            ContextConfig.LEQUAL = this.gl.LEQUAL;

            if (ext) {
                ContextConfig.ColorFormat_DXT1_RGB = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
                ContextConfig.ColorFormat_DXT1_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                ContextConfig.ColorFormat_DXT3_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                ContextConfig.ColorFormat_DXT5_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
            }

            ContextSamplerType.TEXTURE_0 = this.gl.TEXTURE0;
            ContextSamplerType.TEXTURE_1 = this.gl.TEXTURE1;
            ContextSamplerType.TEXTURE_2 = this.gl.TEXTURE2;
            ContextSamplerType.TEXTURE_3 = this.gl.TEXTURE3;
            ContextSamplerType.TEXTURE_4 = this.gl.TEXTURE4;
            ContextSamplerType.TEXTURE_5 = this.gl.TEXTURE5;
            ContextSamplerType.TEXTURE_6 = this.gl.TEXTURE6;
            ContextSamplerType.TEXTURE_7 = this.gl.TEXTURE7;
            ContextSamplerType.TEXTURE_8 = this.gl.TEXTURE8;

            console.log("requst GPU Config", this.gl);
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
            this.gl.viewport(x, y, width, height);
        }

        /**
        * @language zh_CN
        * 创建 显卡程序
        * @param vsShader
        * @param fsShader
        */
        public creatProgram(vsShader: Shader, fsShader: Shader): Program3D {
            var shaderProgram = this.gl.createProgram();
            this.gl.attachShader(shaderProgram, vsShader.shader);
            this.gl.attachShader(shaderProgram, fsShader.shader);
            this.gl.linkProgram(shaderProgram);
            var p = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
            if (!p) {
                alert("vsShader error" + this.gl.getShaderInfoLog(vsShader.shader));
                alert("fsShader error" + this.gl.getShaderInfoLog(fsShader.shader));
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

            var indexBuffer: WebGLBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexDataArray, this.gl.STATIC_DRAW);

            return new IndexBuffer3D(indexBuffer);
        }

        /**
        * @language zh_CN
        * 创建 顶点数据流
        * @param vertexData
        */
        public creatVertexBuffer(vertexData: Array<number>): VertexBuffer3D {
            var vertexDataArray: Float32Array = new Float32Array(vertexData);

            var vertexBuffer: WebGLBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexDataArray, this.gl.STATIC_DRAW);

            return new VertexBuffer3D(vertexBuffer);
        }

        /// public upLoadTextureData(mipLevel: number, texture: Texture2D , data:any ) {
        ///     /// 启用二维纹理
        ///     ///this.gl.enable( this.gl.TEXTURE );
        ///     this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture2D);
        ///     ///if (typeof (data) == HTMLImageElement) {
        ///     /// this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        ///     ///}
        ///     this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, this.gl.RGBA, 128, 128, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data ) ;
        ///
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
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
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }

        /**
        * @language zh_CN
        * 提交2D纹理
        * @param mipLevel
        * @param texture
        */
        public upLoadTextureData(mipLevel: number, texture: TextureBase) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture);

            if (texture.internalformat == InternalFormat.ImageData) {
                this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.imageData);
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
            }
            else if (texture.internalformat == InternalFormat.CompressData) {
                this.upLoadCompressedTexture2D(mipLevel, texture);
            }
            else if (texture.internalformat == InternalFormat.PixelArray) {
                this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, texture.colorformat, texture.mimapData[mipLevel].width, texture.mimapData[mipLevel].height, texture.border, texture.colorformat, this.gl.UNSIGNED_BYTE, texture.mimapData[mipLevel].data);
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
            }

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        }

        /**
        * @language zh_CN
        * 提交2D压缩纹理
        * @param mipLevel
        * @param texture
        */
        public upLoadCompressedTexture2D(mipLevel: number, texture: TextureBase) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture);
            this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, mipLevel, texture.colorformat, texture.mimapData[mipLevel].width, texture.mimapData[mipLevel].height, texture.border, texture.mimapData[mipLevel].data);
        }

        /**
        * @language zh_CN
        * 创建 2维贴图
        */
        public creatTexture2D(): TextureBase {
            var texture: TextureBase = new TextureBase(this.gl.createTexture());
            return texture;
        }

        /**
        * @language zh_CN
        * 创建 Cube贴图
        */
        public creatCubeTexture(): CubeTexture {
            return new CubeTexture(this.gl.createTexture());
        }

        /**
        * @language zh_CN
        *
        * @param tex
        */
        public uploadCubetexture(tex: CubeTexture) {
            /// 创建纹理并绑定纹理数据
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, tex.gpu_texture);

            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_right.imageData);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_left.imageData);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_up.imageData);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_down.imageData);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_back.imageData);
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_front.imageData); 
            ///this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
            ///gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }
        
        /**
        * @language zh_CN
        *
        * @param width
        * @param height
        * @param format
        */
        public createFramebuffer(width: number, height: number, format: FrameBufferFormat): TextureBase {
            var rttframeBuffer = this.gl.createFramebuffer();
            var texture2D: TextureBase = this.creatTexture2D();
            var depthRenderbuffer = this.gl.createRenderbuffer();
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, rttframeBuffer);

            this.gl.bindTexture(this.gl.TEXTURE_2D, texture2D.texture);

            var float: Float32Array = new Float32Array(32 * 32 * 4);
            for (var i: number = 0; i < 32 * 32; i++) {
                float[i] = 1.0;
                float[i + 1] = 1.0;
                float[i + 2] = 1.0;
                float[i + 3] = 1.0;
            }

            switch (format) {
                case FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, width, height, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.FLOAT_RGB:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, width, height, 0, this.gl.RGB, this.gl.FLOAT, float);
                    break;
                case FrameBufferFormat.FLOAT_RGBA:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.FLOAT, float);
                    break;
            }

            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture2D.texture, 0);

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            ///this.gl.generateMipmap(this.gl.TEXTURE_2D);  
            ///配置渲染缓冲 
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthRenderbuffer);
            this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);

            texture2D.width = width;
            texture2D.height = height;
            texture2D.frameBuffer = rttframeBuffer;
            texture2D.renderbuffer = depthRenderbuffer;

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
            return texture2D;
        }
                
        /**
        * @language zh_CN
        *
        * @param texture
        * @param enableDepthAndStencil
        * @param surfaceSelector
        */
        public setRenderToTexture(texture: TextureBase, enableDepthAndStencil: Boolean = false, surfaceSelector: number = 0) {
            if (enableDepthAndStencil) {
                //this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, texture.renderbuffer);
                //this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, texture.width, texture.height);
            }

            this.gl.viewport(0, 0, texture.width, texture.height);
           
            //if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) != this.gl.FRAMEBUFFER_COMPLETE)
            //{
            //    alert("缓冲失败");
            //}

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, texture.frameBuffer);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture.texture, 0);
            this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, texture.renderbuffer);
        }
                        
        /**
        * @language zh_CN
        *
        */
        public setRenderToBackBuffer() {

            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);

        }
                                
        /**
        * @language zh_CN
        *
        * @param source
        */
        public creatVertexShader(source: string): Shader {
            var shader: WebGLShader = this.gl.createShader(this.gl.VERTEX_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            var tmpShader: Shader = new Shader(shader);
            tmpShader.id = Shader.ID_COUNT++;
            return tmpShader;
        }
                                        
        /**
        * @language zh_CN
        *
        * @param source
        */
        public creatFragmentShader(source: string): Shader {
            var shader: WebGLShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            var tmpShader: Shader = new Shader(shader);
            tmpShader.id = Shader.ID_COUNT++;
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
            this.gl.clearColor(r, g, b, a);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }
        
        /**
        * @language zh_CN
        * 清除渲染区域的 深度
        * @param depth
        */
        public clearDepth(depth: number=1.0) {
            this.gl.clearDepth(depth);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

                
        /**
        * @language zh_CN
        * 清除渲染区域的 模板
        * @param stencil
        */
        public clearStencil(stencil: number) {
            this.gl.clearStencil(stencil);
        }

        /**
        * @language zh_CN
        * 使用显卡着色器
        * @param program
        */
        public setProgram(program: Program3D) {
            this.gl.useProgram(program.program);
        }

        /**
        * @language zh_CN
        * 获取矩阵变量ID
        * @param program
        * @param name
        */
        public getUniformLocation(programe3D: Program3D, name: string): any {
            return this.gl.getUniformLocation(programe3D.program, name);
        }

        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        */
        public uniform1f(location: any, x: number): void {
            this.gl.uniform1f(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform1fv(location: any, v: any): void {
            this.gl.uniform1fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        */
        public uniform1i(location: any, x: number): void {
            this.gl.uniform1i(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform1iv(location: any, v: Int32Array): void {
            this.gl.uniform1iv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        */
        public uniform2f(location: any, x: number, y: number): void {
            this.gl.uniform2f(location, x, y);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform2fv(location: any, v: any): void {
            this.gl.uniform2fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        */
        public uniform2i(location: any, x: number, y: number): void {
            this.gl.uniform2i(location, x, y);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform2iv(location: any, v: Int32Array): void {
            this.gl.uniform2iv(location, v);
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
            this.gl.uniform3f(location, x, y, z);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform3fv(location: any, v: any): void {
            this.gl.uniform3fv(location, v);
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
            this.gl.uniform3i(location, x, y, z);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform3iv(location: any, v: Int32Array): void {
            this.gl.uniform3iv(location, v);
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
            this.gl.uniform4f(location, x, y, z, w);
        }
                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform4fv(location: any, v: any): void {
            this.gl.uniform4fv(location, v);
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
            this.gl.uniform4i(location, x, y, z, w);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform4iv(location: any, v: Int32Array): void {
            this.gl.uniform4iv(location, v);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix2fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix2fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix3fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix3fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix4fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix4fv(location, transpose, value);
        }

        /**
        * @language zh_CN
        * 设置 绘制混合模式
        * @param src 
        * @param dst 
        */
        public setBlendFactors(src: number, dst: number) {
            this.gl.blendFunc(src, dst);
        }

        /**
        * @language zh_CN
        * 设置 绘制剔除模式
        * @param mode 
        */
        public setCulling(mode: number) {
            this.gl.cullFace(mode);
        }

        /**
        * @language zh_CN
        * 开启 绘制模式
        * @param cap 
        */
        public enable(cap: number) {
            this.gl.enable(cap);
        }

        /**
        * @language zh_CN
        * 关闭 绘制模式
        * @param cap 
        */
        public disable(cap: number) {
            this.gl.disable(cap);
        }

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag 
        * @param compareMode 
        */
        public depthFunc(compareMode: number = 0) {
              this.gl.depthFunc(compareMode);
        }

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag 
        * @param compareMode 
        */
        public enableDepthTest(flag: boolean, compareMode: number = 0) {
            if (flag)
                this.gl.enable(this.gl.DEPTH_TEST);
        }

        /**
        * @language zh_CN
        * 获取顶点着色器变量 索引
        * @param programe 
        * @param attribName
        * @returns 着色器变量
        */
        public getShaderAttribLocation(programe: Program3D, attribName: string): any {
            return this.gl.getAttribLocation(programe.program, attribName);
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
            this.gl.vertexAttribPointer(index, size, dataType, normalized, stride, offset);
            this.gl.enableVertexAttribArray(index);
        }

        /**
        * @language zh_CN
        * 实时传入显卡顶点着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen 
        */
        public setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number) {
            this.gl.vertexAttrib4fv(offest, floats.subarray(offest, numLen));
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
        public setTexture2DAt(samplerIndex: number, uniLocation: number, index: number, texture: TextureBase) {
            this.gl.activeTexture(samplerIndex);
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture);
            this.gl.uniform1i(uniLocation, index);
        }
        
        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex 
        * @param uniLocation 
        * @param index 
        * @param texture 
        */
        public setCubeTextureAt(samplerIndex: number, uniLocation: number, index: number, texture: TextureBase) {
            this.gl.activeTexture(samplerIndex);
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture.texture);
            this.gl.uniform1i(uniLocation, index);
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
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.buffer);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param first 第一个顶点索引
        * @param length 顶点个数
        */
        public drawArrays(type: number, first: number, length: number) {
            this.gl.drawArrays(type, first, length);
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
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
            this.gl.drawElements(type, length, this.gl.UNSIGNED_SHORT, offset);
        }

        /**
        * @language zh_CN
        * 绘制提交
        */
        public flush() {
            this.gl.flush();
        }
    }
}