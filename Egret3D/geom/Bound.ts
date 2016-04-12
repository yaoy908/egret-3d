module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Bound
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
        
        /**
        * @language zh_CN
        * 子包围盒
        */
        public childBound: Bound;

        protected matTransform: Matrix4_4 = new Matrix4_4();

        /**
        * @language zh_CN
        * 设置变换矩阵
        * @param mat 变换矩阵 
        */
        public set Transform(mat: Matrix4_4) {
            this.matTransform.copyFrom(mat);
            if (this.childBound) {
                this.childBound.Transform = mat;
            }
        }
                                        
        /**
        * @language zh_CN
        * 得到变换矩阵
        * @returns 变换矩阵 
        */
        public get Transform(): Matrix4_4 {
            return this.matTransform;
        }

        public inBound(frustum: Frustum): boolean{
            return true;
        }
    }
}