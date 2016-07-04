module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.ParticleEvent3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleEvent3D extends Event3D {

        /**
         * @language zh_CN
         * EMIT_SUB_PARTICLE 常量定义 发射一个子粒子
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static EMIT_SUB_PARTICLE: string = "EmitSubParticle";
        public position: Vector3D;
      
    }
}