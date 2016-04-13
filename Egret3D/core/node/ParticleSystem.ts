module egret3d {

    /**
    * @private
    */
    export class ParticleSystem extends Mesh {

        public count: number = 0;
        public geomNode: Geometry;
        public nodeCollection: AnimaNodeCollection = new AnimaNodeCollection();
        public time: number = 0;

        constructor(geometry: Geometry, material: MaterialBase, count: number) {
            super(null, material);
            this.animation = new ParticleAnimation(this.nodeCollection);

            this.geomNode = geometry;
            this.count = count;
            this.geometry = new Geometry();


            this.createNode();

            this.geometry.nodeCollection = this.nodeCollection;

            this.build();

            this.animation.play();
        }

        protected createNode() {
            var posNode: ParticlePositionNode = new ParticlePositionNode();
            var billboard: ParticleBillboardNode = new ParticleBillboardNode();
            var lifecycle: ParticleLifecycleNode = new ParticleLifecycleNode();
            var speed: ParticleSpeedNode = new ParticleSpeedNode();
            var acceler: ParticleAccelerateNode = new ParticleAccelerateNode();

            posNode.parameters = [500, 500, 500];
            lifecycle.startRange = [0, 1000];
            lifecycle.lifeRange = [1000, 5000];
            lifecycle.isLoop = true;

            this.nodeCollection.addNode(posNode);
            this.nodeCollection.addNode(billboard);
            this.nodeCollection.addNode(lifecycle);
            this.nodeCollection.addNode(speed);
            this.nodeCollection.addNode(acceler);
        }

        protected build() {
            this.time = 0;
            this.nodeCollection.calculate();
            this.geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL  | VertexFormat.VF_UV0;
            this.geometry.vertexAttLength = this.nodeCollection.numberOfVertices;
            this.geometry.vertexSizeInBytes = this.nodeCollection.vertexSizeInBytes;
            var vertexIndex: number = 0;
            var vertexArray: Array<number> = new Array<number>();
            this.geometry.verticesData = new Array<number>();
            for (var i: number = 0; i < this.count; ++i) {
                for (var j: number = 0; j < this.geomNode.vertexCount; ++j) {
                    for (var k: number = 0; k < this.geometry.vertexAttLength; ++k) {
                        this.geometry.verticesData.push(0);
                    }
                    vertexIndex = i * this.geomNode.vertexCount + j;
                    vertexArray.length = 0;
                    this.geomNode.getVertexForIndex(j, VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_UV0, vertexArray);
                    for (var k: number = 0; k < vertexArray.length; ++k) {
                        this.geometry.verticesData[vertexIndex * this.geometry.vertexAttLength + k] = vertexArray[k];
                    }
                }
            }

            this.geometry.indexData = new Array<number>();
            for (var i: number = 0; i < this.count; ++i) {
                for (var j: number = 0; j < this.geomNode.indexData.length; ++j) {
                    this.geometry.indexData[i * this.geomNode.indexData.length + j] = this.geomNode.indexData[j] + i * this.geomNode.vertexCount;
                }
            }

            for (var i: number = 0; i < this.nodeCollection.nodes.length; ++i) {
                this.nodeCollection.nodes[i].buildGeomtry(this.geometry, this.count);
            }

            if (!this.bound) {
                this.buildBoundBox();
            }
        }

        /**
        * @private
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            this.time += delay;
        }
    }
}