module egret3d {
    
    /**
     * @language zh_CN
     * @class egret3d.ParserUtils
     * @classdesc
     * 用 ParserUtils 类 解析所有egret自定义 文件
     */
    export class ParserUtils {
        
        /**
        * @language zh_CN
        * 解析出的文件对象
        */
        public datas: any;
        
        /**
        * @language zh_CN
        * 文件格式
        */
        public dataFormat: string;

        public onLoadComplete: Function;
                
        /**
        * @language zh_CN
        * 传入数据流对象，解析出相应的数据对象.
        * @param buffer 需要解析的数据流
        * @returns 是否解析成功
        */
        public parser(buffer: ArrayBuffer, callback: Function = null): boolean {
            this.onLoadComplete = callback;
            var bytes: ByteArray = new ByteArray(buffer);
            var fileFormatBytes: ByteArray = new ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            bytes.position = 0;
            var fileFormat: number = 0;
            fileFormat |= fileFormatBytes.readByte() << 16;
            fileFormat |= fileFormatBytes.readByte() << 8;
            fileFormat |= fileFormatBytes.readByte();
            switch (fileFormat) {
                case 0x00444453: // dds
                    this.datas = DDSParser.parse(buffer);
                    this.dataFormat = ".dds";
                    if (this.onLoadComplete) {
                        this.onLoadComplete(this);
                    }
                    break;
                case 0x00FFD8FF: // jpg
                    this.dataFormat = ".jpg";
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) { // basic
                        img.src = window['createObjectURL'](buffer);
                    } else if (window['URL'] != undefined) { // mozilla(firefox)
                        img.src = window['URL'].createObjectURL(buffer);
                    } else if (window['webkitURL'] != undefined) { // webkit or chrome
                        img.src = window['webkitURL'].createObjectURL(buffer);
                    }
                    img.onload = () => this.onLoad(img);
                    break;
                case 0x0089504E: // png
                    this.dataFormat = ".png";
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) { // basic
                        img.src = window['createObjectURL'](buffer);
                    } else if (window['URL'] != undefined) { // mozilla(firefox)
                        img.src = window['URL'].createObjectURL(buffer);
                    } else if (window['webkitURL'] != undefined) { // webkit or chrome
                        img.src = window['webkitURL'].createObjectURL(buffer);
                    }
                    img.onload = () => this.onLoad(img);
                    break;
                case 0x0065736D: // esm
                    this.dataFormat = ".esm";
                    this.datas = ESMParser.parse(buffer);
                    if (this.onLoadComplete) {
                        this.onLoadComplete(this);
                    }
                    break;
                case 0x0065616D: // eam
                    this.dataFormat = ".eam";
                    this.datas = EAMParser.parse(buffer);
                    if (this.onLoadComplete) {
                        this.onLoadComplete(this);
                    }
                    break;
                case 0x00656361: // eca
                    this.dataFormat = ".eca";
                    this.datas = ECAParser.parse(buffer);
                    if (this.onLoadComplete) {
                        this.onLoadComplete(this);
                    }
                    break;
                default:
                    return false;
            }
            return true;
        }

        protected onLoad(img:HTMLImageElement) {
            this.datas = new ImageTexture(img);
            if (this.onLoadComplete) {
                this.onLoadComplete(this);
            }
        }
    }
}