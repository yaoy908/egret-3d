module egret3d {

    export interface IQuadNode {
        initAABB(): void;
        isTriangle: boolean;
        aabb: QuadAABB;

    }
}
