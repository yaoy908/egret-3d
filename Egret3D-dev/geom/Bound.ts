module egret3d_dev {
    /**
     * @language zh_CN
     * @class egret3d_dev.Bound
     * @classdesc
     * 可使用 Bound 类 取得包围盒的数据。</p>
     * 包含包围盒的各顶点信息，当包围盒要进行世界变换时，应当变换各顶点信息。</p>
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Bound {
        
        /**
        * @language zh_CN
        * 顶点数据
        */
        public vexData: Array<number> = new Array<number>();
                        
        /**
        * @language zh_CN
        * 索引数据
        */
        public indexData: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点长度
        */
        public vexLength: number = 3;

        public inBound(frustum: Frustum): boolean{
            return true;
        }
    }
}