module egret3d {

    /**
    * @private
    * 粒子初始化的尺寸大小（直接修改顶点数据，todo：xyz三轴缩放）
    */
    export class ParticleScale extends AnimationNode {
      
        private _scale: Vec3ConstRandomValueShape;
        private particleAnimationState: ParticleAnimationState;
        constructor() {
            super();

            this.name = "ParticleScale";
        }

        /**
       * @private
       * 装载初始化的旋转数据
       */
        public initNode(data: ParticleData): void {
            this._scale = new Vec3ConstRandomValueShape();
            this._scale.maxX = data.birthSizeMax.x;
            this._scale.maxY = data.birthSizeMax.y;
            this._scale.maxZ = data.birthSizeMax.z;

            this._scale.minX = data.birthSizeMin.x;
            this._scale.minY = data.birthSizeMin.y;
            this._scale.minZ = data.birthSizeMin.z;
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
            var scaleVec3Array: Vector3D[] = this._scale.calculate(count);
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            for (var i: number = 0; i < count; ++i) {
                var scale: Vector3D = scaleVec3Array[i]; 
                for (var j: number = 0; j < vertices; ++j) {
                   index = i * vertices + j;
                   index = index * geometry.vertexAttLength ;

                   geometry.verticesData[index + 0] *= scale.x;
                   geometry.verticesData[index + 1] *= scale.y;
                   geometry.verticesData[index + 2] *= scale.z;

                }
            }

        }
    }
} 