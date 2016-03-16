module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.EAMParser
     * @classdesc
     * 用 EAMParser 类 解析.eam 文件
     */
    export class ECAParser {

        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns SkeletonAnimationClip
         */
        public static parse(datas: ArrayBuffer): CameraAnimationController {
            var bytes: ByteArray = new ByteArray(datas);
            var version: number = bytes.readUnsignedInt();
            return ECAVersion.versionDictionary[version](bytes);
        }
    }
}