module egret3d {

    /**
    * @private
    */
    export class ParticleScale extends AnimationNode {
      
        public scale: ValueShape = new ConstValueShape();
        private particleAnimationState: ParticleAnimationState;
        private scaleMat: Matrix4_4 = new Matrix4_4();
        constructor() {
            super();

            this.name = "ParticleScale";
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
            var scaleArray: number[] = this.scale.calculate(count);
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            var pos: Vector3D = new Vector3D();
            for (var i: number = 0; i < count; ++i) {
                var scale: number = scaleArray[i]; 
                this.scaleMat.identity();
                this.scaleMat.appendScale(scale, scale, scale);

                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength ;

                    pos.x = geometry.verticesData[index + 0];
                    pos.y = geometry.verticesData[index + 1];
                    pos.z = geometry.verticesData[index + 2];

                    this.scaleMat.transformVector4(pos, pos);

                    geometry.verticesData[index + 0] = pos.x;
                    geometry.verticesData[index + 1] = pos.y;
                    geometry.verticesData[index + 2] = pos.z;
                }
            }

        }
    }
} 