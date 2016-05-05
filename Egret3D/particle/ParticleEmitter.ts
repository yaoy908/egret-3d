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

        private particleGeometryShape: Geometry;
        private particleAnimation: ParticleAnimation;

        private _particleFollowNode: ParticleFollowNode; 
        private _particleState: ParticleAnimationState; 
        private _isChangeBuild: boolean = true;

        private _particleAnimNodes: AnimationNode[] = [] ;

        /**
        * @language zh_CN
        * 构造函数 
        * @param geo 粒子的几何形状
        * @param material 粒子的材质
        * @param maxParticles 粒子最大个数
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor(geo: Geometry = null, material: MaterialBase = null, maxParticles: number = 1000 ) {
            super(null, material );
            this.material.blendMode = BlendMode.ADD; 

            this.animation = this.particleAnimation = new ParticleAnimation();
            this.animation.particleAnimationController = this.particleAnimation;
            this._particleState = this.particleAnimation.particleAnimationState ;
            this._particleState.maxParticles = maxParticles;

            this.particleAnimation.emit = this;

            //this.particleGeometryShape = geo ? geo : new CubeGeometry(100,100,100);
            this.particleGeometryShape = geo ? geo : new PlaneGeometry(50.0, 50.0, 1, 1, 1, 1, Vector3D.Y_AXIS);

            this.geometry = new Geometry();
            this.geometry.buildDefaultSubGeometry();
            this.geometry.subGeometrys[0].count = this._particleState.maxParticles * this.particleGeometryShape.indexData.length ;

            this.buildBoudBox();
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
        public addAnimNode(node: AnimationNode) {
            var index: number = this._particleAnimNodes.indexOf(node);
            if (index == -1) {
                this._particleAnimNodes.push( node );
                this._isChangeBuild = true;
            }
        }
                
        /**
        * @language zh_CN
        * 移除粒子发射器上的效果节点
        * @param node 粒子效果节点 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public removeAnimNode(node: AnimationNode) {
            var index: number = this._particleAnimNodes.indexOf(node);
            if (index != -1) {
                this._particleAnimNodes.slice(index);
                this._isChangeBuild = true;
            }
        }
                        
        /**
        * @language zh_CN
        * 播放粒子
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public play( prewarm:boolean = false ) {
            if (prewarm) {
                this.animation.time = this._particleState.totalTime;
                this.animation.play("",1.0,false);
            } else {
                this.animation.play();
            }
        }

        protected initlize() {
            this._isChangeBuild = false;
            //根据 模型形状初始化 
            var vertexIndex: number = 0;
            var vertexArray: Array<number> = new Array<number>();

            //根据 动画功能节点初始化 着色器 并初始化粒子顶点结构
            this.geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_UV0;

            //根据动画节点，预计算顶点信息，长度，字节总量
            this.initMainAnimNode();
            
            this.geometry.verticesData = new Array<number>();
            for (var i: number = 0; i < this._particleState.maxParticles; ++i) {
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
            for (var i: number = 0; i < this._particleState.maxParticles; ++i) {
                for (var j: number = 0; j < this.particleGeometryShape.indexData.length; ++j) {
                    this.geometry.indexData[i * this.particleGeometryShape.indexData.length + j] = this.particleGeometryShape.indexData[j] + i * this.particleGeometryShape.vertexCount;
                }
            }

            //this.buildBoundBox();

            //最后根据节点功能，填充模型
            this.particleAnimation.particleAnimationState.fill(this.geometry, this._particleState.maxParticles);
        }

        private initMainAnimNode() {

            //clean
            this.particleAnimation.particleAnimationState.clean();

            //time 
            var particleTimeNode: ParticleTime = new ParticleTime();
            (<ConstValueShape>particleTimeNode.delay).value = 0 ;
            (<ConstValueShape>particleTimeNode.life).value = 2.0;
            (<ConstValueShape>particleTimeNode.rate).value = 0.01 ;

            //position
            var particlePosition: ParticlePosition = new ParticlePosition();
            particlePosition.positions = new CubeVector3DValueShape(); 

            //rotation
            var particleRotation: ParticleRotation = new ParticleRotation();
            particleRotation.rotations = new Vec3ConstValueShape(); 

            //scale
            var particleScale: ParticleScale = new ParticleScale();
            particleScale.scale = new ConstRandomValueShape();
            (<ConstRandomValueShape>particleScale.scale).min = 0.1;
            (<ConstRandomValueShape>particleScale.scale).max = 3.0;

            //end
            var particleEndNode: ParticleEndNode = new ParticleEndNode();
            this._particleFollowNode = new ParticleFollowNode();

            this.particleAnimation.particleAnimationState.addNode(particleTimeNode);
            this.particleAnimation.particleAnimationState.addNode(particleRotation);
            this.particleAnimation.particleAnimationState.addNode(particlePosition);
            this.particleAnimation.particleAnimationState.addNode(particleScale);
            this.particleAnimation.particleAnimationState.addNode(this._particleFollowNode);

            //加入自定义节点
            this.initOtherAnimNode();

            //永远是最后一个加入
            this.particleAnimation.particleAnimationState.addNode(particleEndNode);
            //计算加入动画后，会获取的节点信息，重新计算 geometry 结构
            this.particleAnimation.particleAnimationState.calculate(this.geometry);
        }

        private initOtherAnimNode() {
            for (var i: number = 0; i < this._particleAnimNodes.length; i++) {
                this.particleAnimation.particleAnimationState.addNode(this._particleAnimNodes[i]);
            }
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            if (this._particleState.followTarget && this._particleFollowNode) {
                this._particleFollowNode.follow = this._particleState.followTarget; 
            }
        }

        /**
        * @private
        */
        public renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            if (this._isChangeBuild) this.initlize();
            super.renderDiffusePass(time, delay, context3DProxy, camera3D);
        }

        private buildBoudBox() {
            var bound: BoundBox = new BoundBox(this);
            bound.fillBox(new Vector3D(-50, -50, -50), new Vector3D(50, 50, 50));
            //(<BoundBox>bound.childBound).fillBox(new Vector3D(-50,-50,-50), new Vector3D(50,50,50));
            this.bound = bound;
            this.initAABB();
        }
    }
}