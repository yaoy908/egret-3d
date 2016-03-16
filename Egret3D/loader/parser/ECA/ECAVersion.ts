module egret3d {
    export class ECAVersion {
        static versionDictionary: any = {
            1: (bytes: ByteArray) => ECAVersion.parserVersion_1(bytes),
        };

        public static parserVersion_1(bytes: ByteArray) {
         
        }
    }
} 