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
                
        /**
        * @language zh_CN
        * 传入数据流对象，解析出相应的数据对象.
        * @param buffer 需要解析的数据流
        * @returns 是否解析成功
        */
        public parser(buffer: ArrayBuffer): boolean {
            var bytes: ByteArray = new ByteArray(buffer);
            var fileFormat: string = bytes.readUTF();
            this.dataFormat = fileFormat;
            switch (fileFormat) {
                case "esm":
                    this.datas = ESMParser.parse(buffer);
                    break;
                case "eam":
                    this.datas = EAMParser.parse(buffer);
                    break;
                case "eca":
                    this.datas = ECAParser.parse(buffer);
                    break;
                default:
                    return false;
            }
            return true;
        }
    }
}