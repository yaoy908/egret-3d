module egret3d {

    /**
    * @private 
    * @language zh_CN
    * @class egret3d.HDRParser
    * @classdesc
    * 用 HDRParser 类 解析.hdr 文件
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class HDRParser {

        /**
        * @language zh_CN
        * @param buffer 二进制流
        * @returns HDRParser
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static parse(buffer: ArrayBuffer): HDRTexture {

            var rgbe_Header: RGBE_Header = new RGBE_Header();


            var content: ByteArray = new ByteArray(buffer);
            var programtype: string = content.readLine();

            if (programtype.charAt(0) == '#' &&
                programtype.charAt(1) == '?') {
                rgbe_Header.programtype = programtype.substr(2, programtype.length - 3);
                rgbe_Header.valid = 0x01;
            }
            else {
                return null;
            }
            var line: string = "";

            for (; ;) {
                line = content.readLine();
                if (line == "FORMAT=32-bit_rle_rgbe\n") {
                    break;
                }
                else if (line) {
                }
            }
            line = content.readLine();
            if (line.charAt(0) != '\n') {
                return null;
            }
            line = content.readLine();
            line = line.substr(0, line.length - 1);
            var split: string[] = line.split(" ");

            rgbe_Header.height = Number(split[1]);
            rgbe_Header.width = Number(split[3]);

            var count: number = rgbe_Header.height;
            var rgbe: ByteArray = new ByteArray();
            var r: number, g: number, b: number, e: number;
            while (count > 0) {
                content.readBytes(rgbe, 0, 4);
                r = rgbe.readUnsignedByte();
                g = rgbe.readUnsignedByte();
                b = rgbe.readUnsignedByte();
                e = rgbe.readUnsignedByte();
                if (r != 2 || g != 2 || (b & 0x80)) {

                }

                for (var i: number = 0; i < 4; ++i) {

                }
                count--;
            }

            return new HDRTexture();
        }

    }

    /**
    * @private 
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class RGBE_Header {
        public valid: number;
        public programtype: string;
        public gamma: number;
        public exposure: number;
        public width: number;
        public height: number;
    }
}