module egret3d_dev{
    /**
     * @class egret3d.View3D
     * @classdesc
     * 渲染视图。</p>
     * view3D 是整个3D引擎的渲染视口，可以控制渲染窗口的大小，渲染的方式。</p>
     * 可以设置不同的相机 camera3D。</p>
     * 交换不同的场景元素 scene3D 。</p>
     * skyBox需要在这里直接设置，有cube sky 和 sphere sky。</p>
     * 整个渲染的主循环通过 render  。</p>
     * @see egret3d.camera3d
     * @see egret3d.scene3D
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class View3D {
        protected _context3D: ContextProxy;
        protected _canvas:HTMLCanvasElement;
        protected _width: number = 0;
        protected _height: number = 0;
        protected _x: number = 0;
        protected _y: number = 0;

        constructor(viewPort:Rectangle) {
        }



























        /**
       * @language zh_CN
       * get GPU Context3D 
       * 获取GPU交换链表程序
       * @param GPU_CONFIG
       * @param canvasRec
       * @event call
       */
        private requstContext3D(GPU_CONFIG: string, canvasRec: Rectangle, call: Function) {
            console.log("requst GPU Config", GPU_CONFIG);
            if (!this._context3D || (this._context3D && !this._context3D.isLost)) {
                var tapContext3D: WebGLRenderingContext = this.requestWEBGL(canvasRec)
                this._context3D = new ContextProxy(tapContext3D);

                var ext: any = tapContext3D.getExtension('WEBGL_compressed_texture_s3tc');
                var OES_texture_float_linear = tapContext3D.getExtension("OES_texture_float_linear");
                var OES_texture_float = tapContext3D.getExtension("OES_texture_float");
                var OES_texture_half_float = tapContext3D.getExtension("OES_texture_half_float");
                var OES_texture_half_float_linear = tapContext3D.getExtension("OES_texture_half_float_linear");
                var OES_standard_derivatives = tapContext3D.getExtension("OES_standard_derivatives");
                var WEBGL_draw_buffers = tapContext3D.getExtension("WEBGL_draw_buffers");
                var WEBGL_depth_texture = tapContext3D.getExtension("WEBGL_depth_texture");

                ContextConfig.BLEND = tapContext3D.BLEND;

                DrawMode.TRIANGLES = tapContext3D.TRIANGLES;
                DrawMode.POINTS = tapContext3D.POINTS;
                DrawMode.LINES = tapContext3D.LINES;
                DrawMode.LINE_STRIP = tapContext3D.LINE_STRIP;

                ContextConfig.FLOAT = tapContext3D.FLOAT
                ContextConfig.VERTEX_SHADER = tapContext3D.VERTEX_SHADER;
                ContextConfig.FRAGMENT_SHADER = tapContext3D.FRAGMENT_SHADER;
                ContextConfig.canvasRectangle = canvasRec;

                ContextConfig.FRONT = tapContext3D.FRONT;
                ContextConfig.BACK = tapContext3D.BACK;

                ContextConfig.DEPTH_BUFFER_BIT = tapContext3D.DEPTH_BUFFER_BIT;
                ContextConfig.ELEMENT_ARRAY_BUFFER = tapContext3D.ELEMENT_ARRAY_BUFFER;
                ContextConfig.UNSIGNED_SHORT = tapContext3D.UNSIGNED_SHORT;

                ContextConfig.NEAREST = tapContext3D.NEAREST;
                ContextConfig.REPEAT = tapContext3D.REPEAT;
                ContextConfig.ONE = tapContext3D.ONE;
                ContextConfig.ZERO = tapContext3D.ZERO;
                ContextConfig.SRC_ALPHA = tapContext3D.SRC_ALPHA;
                ContextConfig.ONE_MINUS_SRC_ALPHA = tapContext3D.ONE_MINUS_SRC_ALPHA;
                ContextConfig.SRC_COLOR = tapContext3D.SRC_COLOR;
                ContextConfig.ONE_MINUS_SRC_COLOR = tapContext3D.ONE_MINUS_SRC_COLOR;;

                ContextConfig.ColorFormat_RGB565 = tapContext3D.RGB565;
                ContextConfig.ColorFormat_RGBA5551 = tapContext3D.RGB5_A1;
                ContextConfig.ColorFormat_RGBA4444 = tapContext3D.RGBA4;
                ContextConfig.ColorFormat_RGBA8888 = tapContext3D.RGBA;

                ContextConfig.DEPTH_TEST = tapContext3D.DEPTH_TEST;
                ContextConfig.CULL_FACE = tapContext3D.CULL_FACE;
                ContextConfig.BLEND = tapContext3D.BLEND;


                if (ext) {
                    ContextConfig.ColorFormat_DXT1_RGB = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    ContextConfig.ColorFormat_DXT1_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    ContextConfig.ColorFormat_DXT3_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    ContextConfig.ColorFormat_DXT5_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                }

                ContextSamplerType.TEXTURE_0 = tapContext3D.TEXTURE0;
                ContextSamplerType.TEXTURE_1 = tapContext3D.TEXTURE1;
                ContextSamplerType.TEXTURE_2 = tapContext3D.TEXTURE2;
                ContextSamplerType.TEXTURE_3 = tapContext3D.TEXTURE3;
                ContextSamplerType.TEXTURE_4 = tapContext3D.TEXTURE4;
                ContextSamplerType.TEXTURE_5 = tapContext3D.TEXTURE5;
                ContextSamplerType.TEXTURE_6 = tapContext3D.TEXTURE6;
                ContextSamplerType.TEXTURE_7 = tapContext3D.TEXTURE7;
                ContextSamplerType.TEXTURE_8 = tapContext3D.TEXTURE8;
            }

            //CheckerboardTexture.texture.upload(this._context3D);

            console.log("requst GPU Config", this._context3D);
            //ShaderSystemTool.regist(call);
        }

        private requestWEBGL(viewPort: Rectangle, blend2D: boolean = false): WebGLRenderingContext {
            this._canvas = document.createElement("canvas");
            this._canvas.style.position = "absolute";
            this._canvas.style.zIndex = "0";
            this._canvas.style.left = "0px";
            this._canvas.style.top = "0px";

            if (document.getElementsByClassName("egret-player").length > 0) {
                document.getElementsByClassName("egret-player")[0].appendChild(this._canvas);
            }
            else {
                document.body.appendChild(this._canvas);
            }

            this._canvas.id = "egret3D";
            this._canvas["x"] = viewPort.x;
            this._canvas["y"] = viewPort.y;
            this._canvas.width = viewPort.width;
            this._canvas.height = viewPort.height;
            ContextConfig.clientRect = this._canvas.getBoundingClientRect();
            this._canvas.oncontextmenu = function () {
                return false;
            };

            var gl = <WebGLRenderingContext>this._canvas.getContext("experimental-webgl");
            if (!gl)
                gl = <WebGLRenderingContext>this._canvas.getContext("webgl");

            console.log("this.context3D ==>", this._context3D);
            if (!gl)
                alert("you drivers not suport webgl");
            return gl;
        }

        /**
        * @language zh_CN
        * 请求全屏
        */
        public static requestFullScreen() {
            var dom: HTMLElement = document.documentElement;
            if (dom.requestFullscreen) {
                dom.requestFullscreen();
            } else if (dom.webkitRequestFullScreen) {
                dom.webkitRequestFullScreen();
            }
        }
        
        /**
        * @language zh_CN
        * 退出全屏
        */
        public static exitFullscreen() {
            var de: Document = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        }
    }
}