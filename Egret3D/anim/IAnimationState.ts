module egret3d {
    //动画状态机
    //为粒子系统时,会保存相应的粒子功能节点
    export interface IAnimationState {

        name: string;

        vertex_shaders: string[];

        fragment_shaders: string[];
        //新增顶点个数总量
        numberOfVertices: number;
        //新增顶点的长度
        vertexSizeInBytes: number;

        animNodes: AnimationNode[];
        keyFrames: AnimationCurve[];
    }
}