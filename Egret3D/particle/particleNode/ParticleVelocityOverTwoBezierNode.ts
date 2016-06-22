module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityOverTwoBezierNode
    * @classdesc
    * 粒子速度叠加节点,双贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityOverTwoBezierNode extends AnimationNode {

        private _node: ParticleDataMoveSpeed;
        private attribute_randomSeed: GLSL.VarRegister;
        private _floatCompressDataX: Float32Array;
        private _floatCompressDataY: Float32Array;
        private _floatCompressDataZ: Float32Array;
        private _floatCompressDataX2: Float32Array;
        private _floatCompressDataY2: Float32Array;
        private _floatCompressDataZ2: Float32Array;

        private _animationState: ParticleAnimationState;
        constructor() {
            super();
            this.name = "ParticleVelocityOverTwoBezierNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverTwoBezier");

            this.attribute_randomSeed = new GLSL.VarRegister();
            this.attribute_randomSeed.name = "attribute_velocityOverRandomSeed";
            this.attribute_randomSeed.size = 1;
            this.attributes.push(this.attribute_randomSeed);
        }

        /**
        * @language zh_CN
        * 填充粒子移动速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            this._node = <ParticleDataMoveSpeed>data;
            this._floatCompressDataX = this._node.velocityOver.xBezier1.compress();
            this._floatCompressDataY = this._node.velocityOver.yBezier1.compress();
            this._floatCompressDataZ = this._node.velocityOver.zBezier1.compress();

            this._floatCompressDataX2 = this._node.velocityOver.xBezier2.compress();
            this._floatCompressDataY2 = this._node.velocityOver.yBezier2.compress();
            this._floatCompressDataZ2 = this._node.velocityOver.zBezier2.compress();
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
            this._animationState = <ParticleAnimationState>this.state;

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            for (var i: number = 0; i < count; ++i) {
                var random: number = Math.random();
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_randomSeed.offsetIndex;
                    geometry.verticesData[index + 0] = random;
                }
            }
        }



        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            context3DProxy.uniform1fv(usage["uniform_velocityOverX"].uniformIndex, this._floatCompressDataX);
            context3DProxy.uniform1fv(usage["uniform_velocityOverY"].uniformIndex, this._floatCompressDataY);
            context3DProxy.uniform1fv(usage["uniform_velocityOverZ"].uniformIndex, this._floatCompressDataZ);
            context3DProxy.uniform1fv(usage["uniform_velocityOverX2"].uniformIndex, this._floatCompressDataX2);
            context3DProxy.uniform1fv(usage["uniform_velocityOverY2"].uniformIndex, this._floatCompressDataY2);
            context3DProxy.uniform1fv(usage["uniform_velocityOverZ2"].uniformIndex, this._floatCompressDataZ2);
        }



    }
} 