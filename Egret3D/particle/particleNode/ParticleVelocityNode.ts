module egret3d {
        
    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityNode
    * @classdesc
    * 粒子速度节点(根据粒子的出生相对位置，以及是否随机方向获得一个三维向量)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityNode extends AnimationNode {

        private _velocityShape: ConstRandomValueShape;
        private attribute_velocity: GLSL.VarRegister;

        private particleAnimationState: ParticleAnimationState;
        constructor() {
            super();
            this.name = "ParticleVelocityNode"; 

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocity");

            this.attribute_velocity = new GLSL.VarRegister();
            this.attribute_velocity.name = "attribute_velocity";
            this.attribute_velocity.size = 3;
            this.attributes.push(this.attribute_velocity);

        }

        /**
        * @language zh_CN
        * 填充粒子移动速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            var node: ParticleDataMoveSpeed = <ParticleDataMoveSpeed>data;
            this._velocityShape = new ConstRandomValueShape();
            this._velocityShape.max = node.max;
            this._velocityShape.min = node.min;
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

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var data: Array<number> = this._velocityShape.calculate(count);
            var directionVector: Vector3D[] = this.particleAnimationState.directionArray;
            var direction: Vector3D = new Vector3D();

            for (var i: number = 0; i < count; ++i) {
                var speed: number = data[i];
                direction.copyFrom(directionVector[i]);
                direction.scaleBy(speed);
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_velocity.offsetIndex;

                    geometry.verticesData[index + 0] = direction.x;
                    geometry.verticesData[index + 1] = direction.y;
                    geometry.verticesData[index + 2] = direction.z;

                }
            }
        }
    }
} 