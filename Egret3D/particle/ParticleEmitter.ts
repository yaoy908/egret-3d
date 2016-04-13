module egret3d {

    /**
    */

    enum EmitterType {

    }
    /**
    * @private
    */
    export class ParticleEmitter extends Mesh {

        public count: number = 0;
        public geomNode: Geometry;
        public nodeCollection: AnimaNodeCollection = new AnimaNodeCollection();

        protected _position_node: ParticlePositionNode = new ParticlePositionNode();
        protected _lifecycle_node: ParticleLifecycleNode = new ParticleLifecycleNode();
        protected _speed_node: ParticleSpeedNode = new ParticleSpeedNode();
        protected _acceler_node: ParticleAccelerateNode = new ParticleAccelerateNode();
        protected _isChangeBuild: boolean = false;

        constructor(geometry: Geometry, material: MaterialBase, count: number) {
            super(null, material);
            this.animation = new ParticleAnimation(this.nodeCollection);

            this.geomNode = geometry;
            this.count = count;
            this.geometry = new Geometry();
            this.createNode();
            this.geometry.nodeCollection = this.nodeCollection;

            this.build();
        }

        public setEmitterPosition(type: ValueType, parameters: any) {
            if (this._position_node) {
                this._position_node.type = type;
                this._position_node.parameters = parameters;
                this._isChangeBuild = true;
            }
        }
                
        /**
        * @language zh_CN
        * 设置粒子出生时间范围 单位毫秒
        * @param min 最小范围
        * @param max 最大范围
        */
        public setStartTime(min: number, max: number) {
            if (this._lifecycle_node) {
                this._lifecycle_node.startRange = [min, max];
                this._isChangeBuild = true;
            }
        }

        /**
        * @language zh_CN
        * 设置粒子存活时间范围 单位毫秒
        * @param min 最小范围
        * @param max 最大范围
        */
        public setLifeTime(min: number, max: number) {
            if (this._lifecycle_node) {
                this._lifecycle_node.lifeRange = [min, max];
                this._isChangeBuild = true;
            }
        }
                        
        /**
        * @language zh_CN
        * 设置粒子是否循环播放
        * @param l 循环为true
        */
        public set loop(l: boolean) {
            if (this._lifecycle_node) {
                this._lifecycle_node.isLoop = l;
                this._isChangeBuild = true;
            }
        }
                                
        /**
        * @language zh_CN
        * 获取粒子是否循环播放
        * @returns boolean 循环为true
        */
        public get loop(): boolean {
            if (this._lifecycle_node) {
                return this._lifecycle_node.isLoop;
            }
            return false;
        }

        protected createNode() {

            this._position_node.parameters = [500, 500, 500];
            this._lifecycle_node.startRange = [0, 1000];
            this._lifecycle_node.lifeRange = [1000, 5000];
            this._lifecycle_node.isLoop = true;

            this.nodeCollection.addNode(this._position_node);
            this.nodeCollection.addNode(this._lifecycle_node);
            this.nodeCollection.addNode(this._speed_node);
            this.nodeCollection.addNode(this._acceler_node);

            this.nodeCollection.calculate(Geometry.positionSize + Geometry.normalSize + Geometry.uvSize);
            this.geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_UV0;
            this.geometry.vertexAttLength = this.nodeCollection.numberOfVertices;
            this.geometry.vertexSizeInBytes = this.nodeCollection.vertexSizeInBytes;
        }

        protected build() {
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
                    this.geomNode.getVertexForIndex(j, this.geometry.vertexFormat, vertexArray);
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

            this.buildBoundBox();
            this.animation.play();
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            if (this._isChangeBuild) {
                this.build();
                this._isChangeBuild = false;
            }
        }
    }
}