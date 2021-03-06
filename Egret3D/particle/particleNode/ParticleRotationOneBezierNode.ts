﻿module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleRotationOneBezierNode
    * @classdesc
    * 粒子z轴旋转角速度（bezier曲线）
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleRotationOneBezierNode extends AnimationNode {

        private _floatCompressData: Float32Array;
        private _node: ParticleDataRotationSpeed;
       
        constructor() {
            super();
            this.name = "ParticleRotationOneBezierNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_rotationOneBezier");

        }

        /**
        * @language zh_CN
        * 填充粒子旋转角速度
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            this._node = <ParticleDataRotationSpeed>data;
            this._floatCompressData = this._node.bezier1.sampler();
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
            
        }


        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            context3DProxy.uniform1fv(usage["uniform_rotationBezier"].uniformIndex, this._floatCompressData);
        }



    }
} 