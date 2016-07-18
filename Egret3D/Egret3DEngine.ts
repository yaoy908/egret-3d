﻿module egret3d {

    /**
     * @private
     * @class egret3D.Egret3DEngine
     * @classdesc
     * 引擎库文件加载
     * 引擎库前期加载设置，开发中加载未压缩的编译引擎
     */
    export class Egret3DEngine {
        public static debug: boolean = true;
        private static djs: string = "" ;
        private static scriptSource: Array<string>;
        private static importList: Array<string> = new Array<string>();
        private static _xhr: XMLHttpRequest ;
        private static _libUrl: string = "/Egret3D/tsconfig.json";
        private static _complete:Function ;
        private static getXHR(): any {
            var xhr: any = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            } else {
                xhr = new ActiveXObject("MSXML2.XMLHTTP");
            }
            return xhr;
        }

        public static onTsconfig: Function;

        /**
         * @language zh_CN
         * 请求读取
         * @event complete 读取完成响应回调
         */
        public static preload(complete: Function) {

            this._complete = complete;
            if (this._xhr == null) {
                this._xhr = this.getXHR();
            }
            if (this._xhr == null) {
                alert("Your browser does not support XMLHTTP.");
                return;
            }
            if (this._xhr.readyState > 0) {
                this._xhr.abort();
            }

            this._xhr.open("GET", this._libUrl + "?" + Math.random()*100000, true);
            this._xhr.addEventListener("progress", (e) => Egret3DEngine.onProgress(e), false);
            this._xhr.addEventListener("readystatechange", (e) => Egret3DEngine.onReadyStateChange(e), false);
            this._xhr.addEventListener("error", (e) => Egret3DEngine.onError(e), false);
            this._xhr.responseType = "text";
            this._xhr.send();
        }

        private static onReadyStateChange(event: Event): void {
            if (this._xhr.readyState == 4) {
                if (this._xhr.status >= 400 || this._xhr.status == 0) {
                    console.log(this._libUrl, "load fail");
                } else {
                    this.loadComplete();
                }
            }
        }

        private static loadComplete(): void {
            var libTex: string = this._xhr.responseText;
            this.applyClass(libTex);
        }

        private static onProgress(event: ProgressEvent): void {
            var e: string = event.loaded.toString() + event.total ;
            console.log("progress event```" + e );
        }

        private static onError(event: ErrorEvent): void {
            console.log("load error", event);
        }

        private static applyClass(source: string) {
            var obj = eval("(" + source + ")");

            for (var i: number = 0; i < obj.files.length; ++i) {
                Egret3DEngine.importList[i] = "/js/Egret3D/";
                Egret3DEngine.importList[i] += obj.files[i];
                Egret3DEngine.importList[i] = Egret3DEngine.importList[i].replace(".ts", ".js");
            }

            Egret3DEngine.onTsconfig();

            Egret3DEngine.startLoadScript(null);
        }

        public static addImportScript(path: string) {
            Egret3DEngine.importList.push(path);
        }

        private static startLoadScript(e) {
            if (this.importList.length > 0) {
                var egret3DScript: HTMLScriptElement = document.createElement("script");
                egret3DScript.src = this.importList.shift();
                egret3DScript.onload = (e) => this.startLoadScript(e);
                egret3DScript.onerror = (e) => this.loadScriptError(e);
                document.head.appendChild(egret3DScript);
            }
            else {
                console.log("all complete");
                this._complete();
            }
        }

        private static loadScriptError(e) {
            var error: string = "load Script Error \r\n no file:" + e.srcElement.src ;
            alert(error);
            this.startLoadScript(null);
        }

    }
}