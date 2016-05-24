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
        public positionNode: ParticlePosition;
        public rotationNode: ParticleRotation;
        public scaleNode: ParticleScale;

        private particleGeometryShape: Geometry;
        private particleAnimation: ParticleAnimation;

        private _particleFollowNode: ParticleFollowNode; 
        private _particleState: ParticleAnimationState; 
        private _isEmitterDirty: boolean = true;

        private _particleAnimNodes: AnimationNode[] = [];
        private _play: boolean = false;

        private _data: ParticleData;

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
            this.material.blendMode = BlendMode.ADD; 

            this.animation = this.particleAnimation = new ParticleAnimation();
            this.animation.particleAnimationController = this.particleAnimation;
            this._particleState = this.particleAnimation.particleAnimationState ;

            this.particleAnimation.emit = this;
            this.particleGeometryShape = geo ? geo : new PlaneGeometry(50.0, 50.0, 1, 1, 1, 1, Vector3D.Z_AXIS);

            this.loop = data.loop;
            this.duration = data.duration;

            this.initMainAnimNode();
            this.buildBoudBox(data.bounds);
        }

        /**
        * @language zh_CN
        * 粒子发射器的 发射，是否进行循环播放
        */
        public set loop(flag: boolean) {
            if (flag)
                this._particleState.loop = 1;
            else
                this._particleState.loop = 0;
        }

        public get loop(): boolean {
            return this._particleState.loop == 1;
        }

        /**
        * @language zh_CN
        * 粒子发射器的 发射时间周期，如果loop 为true 这个值将会无效
        */
        public set duration(value: number) {
            this._particleState.duration = value;
        }

        /**
        * @language zh_CN
        * 粒子发射器的 发射时间周期，如果loop 为true 这个值将会无效
        */
        public get duration(): number {
            return this._particleState.duration;
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
        public removeAnimNode(node: AnimationNode) {
            var index: number = this._particleAnimNodes.indexOf(node);
            if (index != -1) {
                this._particleAnimNodes.slice(index);
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
                this.animation.time = this._particleState.totalTime;
                this.animation.play("", 1.0, false);
            } else {
                this.animation.play();
            }
            this._play = true;
        }

        protected initialize() {
            this._isEmitterDirty = false;

            var particlePerLife: number = (this._data.lifeMax + this._data.lifeMin) / 2;
            var particleCount: number = Math.floor(particlePerLife * this._data.rate);//粒子的目标数量是这个的时候，可以达到循环

            if (this._data.particleCount != -1) {
                particleCount = Math.min(this._data.particleCount, particleCount);
            }
            this._particleState.maxCount = particleCount;

            this.geometry = new Geometry();
            this.geometry.buildDefaultSubGeometry();
            this.geometry.subGeometrys[0].count = this._particleState.maxCount * this.particleGeometryShape.indexData.length;


            //根据 模型形状初始化 
            var vertexIndex: number = 0;
            var vertexArray: Array<number> = new Array<number>();

            //根据 动画功能节点初始化 着色器 并初始化粒子顶点结构
            this.geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_UV0;

            //根据动画节点，预计算顶点信息，长度，字节总量
            this.initOtherAnimNode();

            this.geometry.verticesData = new Array<number>();
            for (var i: number = 0; i < this._particleState.maxCount; ++i) {
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
            for (var i: number = 0; i < this._particleState.maxCount; ++i) {
                for (var j: number = 0; j < this.particleGeometryShape.indexData.length; ++j) {
                    this.geometry.indexData[i * this.particleGeometryShape.indexData.length + j] = this.particleGeometryShape.indexData[j] + i * this.particleGeometryShape.vertexCount;
                }
            }

            //最后根据节点功能，填充模型
            this.particleAnimation.particleAnimationState.fill(this.geometry, this._particleState.maxCount);
        }

        private initMainAnimNode() {
            this._data.validate();
            //clean
            this.particleAnimation.particleAnimationState.clean();
            
            //time 
            this._timeNode = new ParticleTime();
            this._timeNode.init(this._data);
           
            //position
            this.positionNode = new ParticlePosition();
            this.positionNode.positions = new Vec3ConstValueShape();

            //rotation
            this.rotationNode = new ParticleRotation();
            this.rotationNode.rotations = new Vec3ConstValueShape();

            //scale
            this.scaleNode = new ParticleScale();
            this.scaleNode.scale = new ConstValueShape();
            (<ConstValueShape>this.scaleNode.scale).value = 0.4;
            
        }

        private initOtherAnimNode() {

            //end
            var particleEndNode: ParticleEndNode = new ParticleEndNode();
            this._particleFollowNode = new ParticleFollowNode();

            this.particleAnimation.particleAnimationState.addNode(this._timeNode);
            this.particleAnimation.particleAnimationState.addNode(this.positionNode);
            this.particleAnimation.particleAnimationState.addNode(this.rotationNode);
            this.particleAnimation.particleAnimationState.addNode(this.scaleNode);
            this.particleAnimation.particleAnimationState.addNode(this._particleFollowNode);

            //加入自定义节点
            for (var i: number = 0; i < this._particleAnimNodes.length; i++) {
                this.particleAnimation.particleAnimationState.addNode(this._particleAnimNodes[i]);
            }

            //永远是最后一个加入
            this.particleAnimation.particleAnimationState.addNode(particleEndNode);
            //计算加入动画后，会获取的节点信息，重新计算 geometry 结构
            this.particleAnimation.particleAnimationState.calculate(this.geometry);


        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
        }
        /**
        * @private
        */
        //public renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            
        //    if (this._play){
        //        if (this._isEmitterDirty) {
        //            this.initialize();
        //        }
        //        this._i = 0;
        //        this.geometry.update(time, delay, context3DProxy, camera3D);
        //        if (this.geometry.subGeometrys.length <= 0) {
        //            this.geometry.buildDefaultSubGeometry();
        //        }
        //        for (this._i = 0; this._i < this.geometry.subGeometrys.length; this._i++) {
        //            this._subGeometry = this.geometry.subGeometrys[this._i];
        //            this._matID = this._subGeometry.matID;
        //            if (this.multiMaterial[this._matID]) {
        //                if (this.lightGroup) {
        //                    this.multiMaterial[this._matID].lightGroup = this.lightGroup;
        //                }
        //                this.multiMaterial[this._matID].renderDiffusePass(time, delay, this._matID, context3DProxy, this.modelMatrix, camera3D, this._subGeometry, this.animation);
        //            }
        //            else {
                 
        //                if (this.lightGroup) {
        //                    this.multiMaterial[0].lightGroup = this.lightGroup;
        //                }
        //                this.multiMaterial[0].renderDiffusePass(time, delay, this._matID, context3DProxy, this.modelMatrix, camera3D, this._subGeometry, this.animation);
        //            }
                     
        //        }

        //        if (this.animation) {
        //            this.animation.update(time, delay, this.geometry, this.multiMaterial[0].diffusePass._passUsage, context3DProxy);
        //        }

        //    }
        //}


        public buildBoudBox(vector: Vector3D) {
            var b: BoundBox = new BoundBox(this);
            b.fillBox(new Vector3D(-vector.x / 2, -vector.y / 2, -vector.z / 2), new Vector3D(vector.x / 2, vector.y / 2, vector.z / 2));
            this.bound = b;
            this.initAABB();
        }




    }
}