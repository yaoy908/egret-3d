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
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vexData: Array<number> = new Array<number>();
                        
        /**
        * @language zh_CN
        * 索引数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public indexData: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vexLength: number = 3;
        
        /**
        * @language zh_CN
        * 子包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        public childBound: Bound;

        /**
        * @language zh_CN
        * 绑定的Object3D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public owner: Object3D;

        protected matrix: Matrix4_4 = new Matrix4_4();

        /**
        * @language zh_CN
        * 创建一个包围对象
        * @prame owner 绑定的Object3D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(owner: Object3D) {
            this.owner = owner;
        }

        /**
        * @language zh_CN
        * 得到变换矩阵 如果没有绑定Object3D对象
        * @returns 变换矩阵 
        */
        public get transform(): Matrix4_4 {
            if (!this.owner) {
                return this.matrix;
            }
            return this.owner.modelMatrix;
        }

        /**
        * @language zh_CN
        * 检测一个点是否包围盒内
        * @param pos 检测的点
        * @returns 成功返回true
        */
        public pointIntersect(pos: Vector3D): boolean {
            return false;
        }

        /**
        * @language zh_CN
        * 检测两个包围对象是否相交
        * @param target 检测的目标
        * @param intersect 默认参数为null 相交的结果 可以为null
        * @returns  成功返回true
        */
        public intersect(target: Bound, intersect: Bound = null): boolean {
            return true;
        }
                                                
        /**
        * @private
        * @language zh_CN
        */
        public inBound(frustum: Frustum): boolean{
            return true;
        }

        protected updateAABB() {

        }
    }
}