module egret3d {

    /**
   * @class egret3d.ParticleEmitter
   * @classdesc
   * 粒子发射器 
   * @see egret3d.Mesh
   * @version Egret 3.0
   * @platform Web,Native 
   */
    export class ParticleEmitter extends Mesh {

        private _timeNode: ParticleTime;
        private _rotationNode: ParticleRotation;
        private _positionNode: ParticlePosition;
        private _scaleNode: ParticleScale;
        private _colorNode: ParticleStartColor;

        private particleGeometryShape: Geometry;
        private particleAnimation: ParticleAnimation;

        private _particleFollowNode: ParticleFollowNode; 
        private _particleState: ParticleAnimationState; 
        private _isEmitterDirty: boolean = true;

        private _userNodes: AnimationNode[] = [];

        private _data: ParticleData;
        private _externalGeometry: Geometry;

        /**
        * @language zh_CN
        * 构造函数
        * @param geo Geometry 几何数据
        * @param data ParticleData 生成粒子的数据来源
        * @param material 粒子的材质
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor(data:ParticleData, geo: Geometry = null, material: MaterialBase = null) {
            super(null, material );
            this._data = data;
            this._externalGeometry = geo;
            this.material.blendMode = data.property.blendMode;

            this.animation = this.particleAnimation = new ParticleAnimation(this);
            this.animation.particleAnimationController = this.particleAnimation;
            this._particleState = this.particleAnimation.particleAnimationState ;

            this.particleAnimation.emit = this;

            this.buildParticle();
        }

        /**
        * @language zh_CN
        * @private
        * 重新构建这个粒子
        * @param geo Geometry 几何数据
        * @param data ParticleData 生成粒子的数据来源
        * @param material 粒子的材质
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private buildParticle(): void {
            this._data.validate();
            if (this._externalGeometry == null) {
                this.particleGeometryShape = this.createShape();
            } else {
                this.particleGeometryShape = this._externalGeometry;
            }

            this.initialize();

            this.initBoudBox(this._data.property.bounds);

            this._isEmitterDirty = false;
        }

        /**
        * @language zh_CN
        * 根据粒子的配置信息，生成geometry
        * @return Geometry
        * @version Egret 3.0
        * @platform Web,Native
        */
        private createShape(): Geometry {
            var geo: Geometry;
            var geomData: ParticleDataGeometry = this._data.geometry;
            if (geomData.type == ParticleDataGeometry.Plane) {
                geo = new PlaneGeometry(geomData.planeW, geomData.planeH, 1, 1, 1, 1, Vector3D.Z_AXIS);
            } else if (geomData.type == ParticleDataGeometry.Cube) {
                geo = new CubeGeometry(geomData.cubeW, geomData.cubeH, geomData.cubeD);
            } else if (geomData.type == ParticleDataGeometry.Sphere) {
                geo = new SphereGeometry(geomData.sphereRadius, geomData.sphereSegW, geomData.sphereSegH);
            }
            return geo;
        }

        public get data(): ParticleData {
            return this._data;
        }


        /**
        * @language zh_CN
        * 获取时间节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeNode(): ParticleTime {
            return this._timeNode;
        }


        /**
        * @language zh_CN
        * 设置跟随的目标，如果设置了，粒子发射器会跟随目标 
        * @param o 粒子发射器会跟随目标 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public set followTarget(o: Object3D) {
            this._particleState.followTarget = o;
        }

        /**
        * @language zh_CN
        * 获取跟随的目标
        * @returns Object3D 跟随的目标 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public get followTarget(): Object3D {
            return this._particleState.followTarget;
        }


        /**
        * @language zh_CN
        * 给粒子发射器添加 粒子效果节点
        * @param node 粒子效果节点 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private addAnimNode(node: AnimationNode) {
            var index: number = this._userNodes.indexOf(node);
            if (index == -1) {
                this._userNodes.push( node );
                this._isEmitterDirty = true;
            }
        }

        /**
        * @language zh_CN
        * 移除粒子发射器上的效果节点
        * @param node 粒子效果节点 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private removeAnimNode(node: AnimationNode) {
            var index: number = this._userNodes.indexOf(node);
            if (index != -1) {
                this._userNodes.slice(index);
                this._isEmitterDirty = true;
            }
        }

        /**
        * @language zh_CN
        * 播放粒子
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public play(prewarm: boolean = false) {
            if (prewarm) {
                this.animation.animTime = this._particleState.loopTime;
                this.animation.play("", 1.0, false);
            } else {
                this.animation.play();
            }
        }

        /**
        * @private
        */
        protected initialize() {
            //clean
            this.particleAnimation.particleAnimationState.clean();

            var count: number = this._data.property.particleCount;

            this.geometry = new Geometry();
            this.geometry.buildDefaultSubGeometry();
            this.geometry.subGeometrys[0].count = count * this.particleGeometryShape.indexData.length;


            //根据 模型形状初始化 
            var vertexIndex: number = 0;
            var vertexArray: Array<number> = new Array<number>();

            //根据 动画功能节点初始化 着色器 并初始化粒子顶点结构
            this.geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_UV0 | VertexFormat.VF_COLOR;

            //根据动画节点，预计算顶点信息，长度，字节总量
            this.initMainAnimNode();
            this.initUserAnimNode();
            this.initEndNode();

            this.geometry.verticesData = new Array<number>();
            for (var i: number = 0; i < count; ++i) {
                for (var j: number = 0; j < this.particleGeometryShape.vertexCount; ++j) {

                    for (var k: number = 0; k < this.geometry.vertexAttLength; ++k) {
                        this.geometry.verticesData.push(0);
                    }

                    vertexIndex = i * this.particleGeometryShape.vertexCount + j;
                    vertexArray.length = 0;

                    this.particleGeometryShape.getVertexForIndex(j, this.geometry.vertexFormat, vertexArray);

                    for (var k: number = 0; k < vertexArray.length; ++k) {
                        this.geometry.verticesData[vertexIndex * this.geometry.vertexAttLength + k] = vertexArray[k];
                    }
                }
            }

            this.geometry.indexData = new Array<number>();
            for (var i: number = 0; i < count; ++i) {
                for (var j: number = 0; j < this.particleGeometryShape.indexData.length; ++j) {
                    this.geometry.indexData[i * this.particleGeometryShape.indexData.length + j] = this.particleGeometryShape.indexData[j] + i * this.particleGeometryShape.vertexCount;
                }
            }

            //最后根据节点功能，填充模型
            this.particleAnimation.particleAnimationState.fill(this.geometry, count);
        }

        /**
        * @private
        * 根据ParticleData中的数据初始化
        */
        private initMainAnimNode() {
            var nodes: Array<AnimationNode> = [];
            //time 
            this._timeNode = new ParticleTime();
            this._timeNode.initNode(this._data.life);
            nodes.push(this._timeNode);

           
            //position
            this._positionNode = new ParticlePosition();
            this._positionNode.initNode(this._data.shape);
            nodes.push(this._positionNode);

            //speed(依赖于position)
            var speedNode: ParticleVelocityNode = new ParticleVelocityNode();
            speedNode.initNode(this._data.moveSpeed);
            nodes.push(speedNode);

            var velocityOver: VelocityOverLifeTimeData = this._data.moveSpeed.velocityOver;
            if (velocityOver) {
                if (velocityOver.type == ParticleDataMoveSpeed.ConstValue || velocityOver.type == ParticleDataMoveSpeed.RandomConstValue) {
                    var overConstNode: ParticleVelocityOverConstNode = new ParticleVelocityOverConstNode();
                    overConstNode.initNode(this._data.moveSpeed);
                    nodes.push(overConstNode);
                } else if(velocityOver.type == ParticleDataMoveSpeed.OneBezier){
                    var overOneBezierNode: ParticleVelocityOverOneBezierNode = new ParticleVelocityOverOneBezierNode();
                    overOneBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(overOneBezierNode);
                } else if (velocityOver.type == ParticleDataMoveSpeed.TwoBezier) {
                    var overTwoBezierNode: ParticleVelocityOverTwoBezierNode = new ParticleVelocityOverTwoBezierNode();
                    overTwoBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(overTwoBezierNode);
                }
            }
            var limit: VelocityLimitLifeTimeData = this._data.moveSpeed.velocityLimit;
            if (limit) {
                if (limit.type == ParticleDataMoveSpeed.ConstValue || limit.type == ParticleDataMoveSpeed.RandomConstValue) {
                    var limitConstNode: ParticleVelocityLimitConstNode = new ParticleVelocityLimitConstNode();
                    limitConstNode.initNode(this._data.moveSpeed);
                    nodes.push(limitConstNode);
                } else if(limit.type == ParticleDataMoveSpeed.OneBezier){
                    var limitOneBezierNode: ParticleVelocityLimitOneBezierNode = new ParticleVelocityLimitOneBezierNode();
                    limitOneBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(limitOneBezierNode);
                }
            }

            //rotation
            this._rotationNode = new ParticleRotation();
            this._rotationNode.initNode(this._data.rotationBirth);
            nodes.push(this._rotationNode);
            
            //scale
            this._scaleNode = new ParticleScale();
            this._scaleNode.initNode(this._data.scaleBirth);
            nodes.push(this._scaleNode);
            //start color
            this._colorNode = new ParticleStartColor();
            this._colorNode.initNode(this._data.property);
            nodes.push(this._colorNode);

            //follow
            if (this._data.followTarget) {
                this._particleFollowNode = new ParticleFollowNode();
                this._particleFollowNode.initNode(this._data.followTarget);
                nodes.push(this._particleFollowNode);
            }
            

            if (this._data.scaleBesizer) {
                var scaleBesizer: ParticleSizeGlobalNode = new ParticleSizeGlobalNode();
                scaleBesizer.initNode(this._data.scaleBesizer);
                nodes.push(scaleBesizer);
            }

            if (this._data.rotationSpeed) {
                var rotationSpeed: ParticleRotationNode = new ParticleRotationNode();
                rotationSpeed.initNode(this._data.rotationSpeed);
                nodes.push(rotationSpeed);
            }

            if (this._data.colorOffset) {
                var colorOffset: ParticleColorGlobalNode = new ParticleColorGlobalNode();
                colorOffset.initNode(this._data.colorOffset);
                nodes.push(colorOffset);
            }

            for (var i: number = 0, count: number = nodes.length; i < count; i++) {
                this.particleAnimation.particleAnimationState.addNode(nodes[i]);
            }
            
        }

        private initUserAnimNode() {
            //加入自定义节点
            for (var i: number = 0; i < this._userNodes.length; i++) {
                this.particleAnimation.particleAnimationState.addNode(this._userNodes[i]);
            }
        }

        private initEndNode(): void {
            //永远是最后一个加入
            var endNode: ParticleEndNode = new ParticleEndNode();
            this.particleAnimation.particleAnimationState.addNode(endNode);
            //计算加入动画后，会获取的节点信息，重新计算 geometry 结构
            this.particleAnimation.particleAnimationState.calculate(this.geometry);
        }

        /**
        * @language zh_CN
        * @private
        * 构建包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        private initBoudBox(vector: Vector3D) {
            var b: BoundBox = new BoundBox(this);
            b.fillBox(new Vector3D(-vector.x / 2, -vector.y / 2, -vector.z / 2), new Vector3D(vector.x / 2, vector.y / 2, vector.z / 2));
            this.bound = b;
            this.initAABB();
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            if (this._isEmitterDirty) {
                this.buildParticle();
            }
            super.update(time, delay, camera);
        }






    }
}