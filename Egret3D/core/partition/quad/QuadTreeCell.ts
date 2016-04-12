module egret3d {

    // 四叉树节点
    export class QuadTreeCell {
        public static NUM_CHILDREN: number = 4;

        // (如果不是leaf)子节点的index, -1表示无子节点
        public childCellIndices: Array<number>;
        // (如果是leaf) 三角面的index
        public nodeIndices: Array<number>;
        // 该节点的包围框
        public aabb: QuadAABB;

        public points: Array<Vector3D>;

        constructor(aabox: QuadAABB) {
            this.childCellIndices = new Array<number>();
            this.childCellIndices.length = QuadTreeCell.NUM_CHILDREN;

            this.nodeIndices = new Array<number>();

            this.clear();

            if (aabox) {
                this.aabb = aabox.clone();
            } else {
                this.aabb = new QuadAABB();
            }
        }

        // Indicates if we contain triangles (if not then we should/might have children)
        public isLeaf(): boolean {
            return this.childCellIndices[0] == -1;
        }

        public clear(): void {
            for (var i: number = 0; i < QuadTreeCell.NUM_CHILDREN; i++) {
                this.childCellIndices[i] = -1;
            }
            this.nodeIndices.splice(0, this.nodeIndices.length);
        }


    }
}