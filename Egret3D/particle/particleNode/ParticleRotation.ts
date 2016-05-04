module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleRotation
    * @classdesc
    * 粒子旋转效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleRotation extends AnimationNode {
              
        /**
        * @private
        */
        public rotations: ValueShape = new Vec3ConstValueShape();
        private attribute_time: GLSL.VarRegister;
        private particleAnimationState: ParticleAnimationState;
        private rotationMat: Matrix4_4 = new Matrix4_4();
        constructor() {
            super();

            this.name = "ParticleRotation";
        }
        
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {

            this.particleAnimationState = <ParticleAnimationState>this.state;
            var rotationArray: Vector3D[] = this.rotations.calculate(count);
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            var pos: Vector3D = new Vector3D();
            for (var i: number = 0; i < count; ++i) {
                var rot: Vector3D = rotationArray[i]; 
                this.rotationMat.identity();
                this.rotationMat.rotation(rot.x, rot.y, rot.z);
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength ;

                    pos.x = geometry.verticesData[index + 0];
                    pos.y = geometry.verticesData[index + 1];
                    pos.z = geometry.verticesData[index + 2];

                    this.rotationMat.transformVector4(pos, pos);

                    geometry.verticesData[index + 0] = pos.x;
                    geometry.verticesData[index + 1] = pos.y;
                    geometry.verticesData[index + 2] = pos.z;
                }
            }

        }
    }
} 