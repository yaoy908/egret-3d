module egret3d {

    /**
    * @private
    */
    export class ParticleFollowNode extends AnimationNode {

        public follow: Object3D;
        private attribute_followPosition: GLSL.VarRegister;
        private attribute_followRotation: GLSL.VarRegister;

        private count: number = 0;
        private particleAnimationState: ParticleAnimationState; 

        constructor() {
            super();
            this.name = "ParticleFollowNode";
            this.vertex_ShaderName = "particle_follow_vs";

            this.attribute_followPosition = new GLSL.VarRegister();
            this.attribute_followPosition.name = "attribute_followPosition";
            this.attribute_followPosition.size = 3;
            this.attributes.push(this.attribute_followPosition);

        }

        public build(geometry: Geometry, count: number) {
            this.count = count;
            this.particleAnimationState = <ParticleAnimationState>this.state;
        }

        private delay: number = 0;
        private life: number = 0;
        private space: number = 0;
        private id: number = 0; 
        private duration: number = 0; 

        private tempTime: number = 0; 
        private numSpace: number = 0; 
        private timeIndex: number = 0;
        private currentTime: number = 0;

        public update(time: number, delay: number, geometry: Geometry, context: Context3DProxy) {

            if (!this.follow) return;
            var index: number = 0;
            var vertices: number = geometry.vertexCount / this.count;

            for (var i: number = 0; i < this.count; ++i) {
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    this.timeIndex = index * geometry.vertexAttLength + 5;
                    index = index * geometry.vertexAttLength + this.attribute_followPosition.offsetIndex;

                    this.delay = geometry.verticesData[this.timeIndex + 0];
                    this.life = geometry.verticesData[this.timeIndex + 1] ;
                    this.space = geometry.verticesData[this.timeIndex + 2];
                    this.id = geometry.verticesData[this.timeIndex + 3];

                    this.tempTime = time * 0.001;

                    var numberSpace = this.id * this.space ;
                    this.tempTime = Math.max(this.tempTime, 0.0);

                    if (this.particleAnimationState.loop == 0.0) {
                        this.duration = this.particleAnimationState.duration;
                        if (numberSpace > this.duration )
                        {
                            geometry.verticesData[index + 0] = this.follow.x;
                            geometry.verticesData[index + 1] = this.follow.y;
                            geometry.verticesData[index + 2] = this.follow.z;
                        }
                    } else {
                        this.duration = this.particleAnimationState.totalTime ;
                        this.tempTime =(this.tempTime - numberSpace);
                        this.tempTime = this.tempTime % this.duration;

                        //this.tempTime = (this.tempTime - Math.floor(this.tempTime));

                        if (this.tempTime - delay * 0.001 <= numberSpace )
                        {
                            geometry.verticesData[index + 0] = this.follow.x;
                            geometry.verticesData[index + 1] = this.follow.y;
                            geometry.verticesData[index + 2] = this.follow.z;
                        }
                    }
                }
            }
            if (true) {
                geometry.upload(context);
            }
        }
    }

} 