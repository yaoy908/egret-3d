module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.SkeletonAnimation
    * @classdesc
    * SkeletonAnimation 类表示骨骼动画控制类
    * 
    * 骨骼动画控制类中管理若干个 SkeletonAnimationClip（骨骼动画） 对象，每个SkeletonAnimationClip对象，都是对*.eam 文件的实例。
    * @includeExample anim/skeletonAnimation/SkeletonAnimation.ts
    * @see egret3d.SkeletonAnimationClip
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SkeletonAnimation extends EventDispatcher implements IAnimation {

        /**
        * @language zh_CN
        * 动画速率
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static fps: number = 1000 / 60;

        /**
        * @language zh_CN
        * 播放速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public speed: number = 1;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public event3D: Event3D = new Event3D();

        public isLoop: boolean = true;
        public delay: number;
        private _currentAnimName: string;
        private _isPlay: boolean = false;
        private _animTime: number = 0;
        private _skeleton: Skeleton = null;
        private _animStateNames: string[] = [];
        private _animStates: SkeletonAnimationState[] = [];
        private _skeletonMatrixData: Float32Array = null;
        private _blendSpeed: number = 300;
        private _blendSkeleton: SkeletonPose = null;
        private _blendList: SkeletonAnimationState[] = [];
        private _bindList: { [jointIndex: number]: Array<Object3D> } = {};
        private _temp_quat: Quaternion = new Quaternion();
        private _temp_vec3: Vector3D = new Vector3D();
        private _currentFrame: number = 0;
        private _changeFrameTime: number = 0;
        private _oldFrameIndex: number = 0;

        constructor(skeleton: Skeleton) {
            super();
            this._isPlay = false;
            this._skeleton = skeleton;
            this._skeletonMatrixData = new Float32Array(this._skeleton.jointNum * 8);
            for (var i: number = 0; i < this._skeleton.jointNum; ++i) {
                this._skeletonMatrixData[i * 8 + 3] = 1;
                this._skeletonMatrixData[i * 8 + 7] = 1;
            }
        }


        /**
        * @language zh_CN
        * 添加骨骼动画剪辑对象
        * @param animState 骨骼动画状态对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addSkeletonAnimationClip(animationClip: SkeletonAnimationClip): void {

            var animState: SkeletonAnimationState = new SkeletonAnimationState(animationClip.animationName);

            animState.skeletonAnimation = this;

            animState.skeleton = this._skeleton;

            animState.addAnimationClip(animationClip);

            this.addAnimState(animState);
        }

        /**
        * @language zh_CN
        * 骨骼动画控制器
        * @returns SkeletonAnimation 骨骼动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeletonAnimationController(): SkeletonAnimation {
            return this;
        }

        /**
        * @language zh_CN
        * 添加骨骼动画状态对象
        * @param animState 骨骼动画状态对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addAnimState(animState: SkeletonAnimationState): void {
            for (var i = 0; i < this._animStates.length; i++) {
                if (this._animStates[i].name == animState.name) {
                    return;
                }
            }
            animState.skeleton = this._skeleton;
            this._animStates.push(animState);
            this._animStateNames.push(animState.name);
        }

        /**
        * @language zh_CN
        * 移除骨骼动画状态对象
        * @param animState 骨骼动画状态对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeAnimState(animState: SkeletonAnimationState): void {
            for (var i = 0; i < this._animStates.length; i++) {
                if (this._animStates[i].name == animState.name) {
                    animState.skeleton = null;
                    this._animStates.slice(i, 1);
                    this._animStateNames.slice(i, 1);
                    return;
                }
            }
        }

        /**
        * @language zh_CN
        * 播放骨骼动画
        * @param animName 动画名称
        * @param speed 播放速度
        * @param reset 是否重置
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(animName?: string, speed: number = 1, reset: boolean = true, prewarm: boolean = true): void {

            if (this._animStates.length <= 0) {
                return;
            }

            if (!animName) {
                animName = this._animStates[0].name;
            }

            var playSkeletonAnimationState: SkeletonAnimationState = null;

            for (var i = 0; i < this._animStates.length; i++) {
                if (this._animStates[i].name == animName) {
                    playSkeletonAnimationState = this._animStates[i];
                    break;
                }
            }

            if (!playSkeletonAnimationState) {
                return;
            }

            this._currentAnimName = animName;

            this._blendList.push(playSkeletonAnimationState);

            playSkeletonAnimationState.weight = this._blendList.length > 1 ? 0 : 1;

            if (reset) {
                this._animTime = playSkeletonAnimationState.timePosition = 0;
            }

            this.speed = speed;

            this._isPlay = true;
        }

        /**
        * @language zh_CN
        * 暂停骨骼动画播放（停留在当前帧）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pause(): void {
            this._isPlay = false;
        }

        /**
        * @language zh_CN
        * 停止骨骼动画播放（停留在第一帧）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop(): void {
            this._isPlay = false;
        }

        /**
        * @language zh_CN
        * 更新骨骼动画
        * @param time 总时间
        * @param delay 延迟时间
        * @param geometry 该值无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, geometry: Geometry): void {

            if (!this._isPlay) {
                return;
            }

            if (this._blendList.length <= 0) {
                return;
            }

            var mainState: SkeletonAnimationState = this._blendList[this._blendList.length - 1];

            var delayTime: number = delay * this.speed;

            this._changeFrameTime += delayTime;

            var count: number = Math.floor(Math.abs(this._changeFrameTime / SkeletonAnimation.fps));

            for (var i: number = 0; i < count; ++i) {

                this.event3D.eventType = SkeletonAnimationEvent3D.EVENT_FRAME_CHANGE;
                this.event3D.target = this;

                if (delayTime < 0) {

                    this.event3D.data = ((this._oldFrameIndex - 1 - i) % mainState.frameNum);

                    if (this.event3D.data < 0) {
                        this.event3D.data += mainState.frameNum;
                    }
                }
                else {
                    this.event3D.data = (this._oldFrameIndex + 1 + i) % mainState.frameNum;
                }

                this.dispatchEvent(this.event3D);

                if (this.event3D.data == (mainState.frameNum - 1)) {

                    this.event3D.eventType = SkeletonAnimationEvent3D.EVENT_PLAY_COMPLETE;

                    this.dispatchEvent(this.event3D);
                }

                this._changeFrameTime += (delayTime > 0) ? -SkeletonAnimation.fps : SkeletonAnimation.fps;
            }

            this._oldFrameIndex = this.event3D.data;

            this.animTime += delay * this.speed;
        }

        /**
        * @private
        * @language zh_CN
        * 将骨骼信息更新给GPU
        * @param time 当前时间
        * @param delay 当前帧时间
        * @param usage PassUsage
        * @param geometry 子几何信息
        * @param context3DProxy 上下文信息
        * @param modeltransform 模型矩阵
        * @param camera3D 相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (usage.uniform_time) {
                context3DProxy.uniform1f(usage.uniform_time.uniformIndex, this.animTime);
            }
            context3DProxy.uniform4fv(usage.uniform_PoseMatrix.uniformIndex, this._skeletonMatrixData);
        }

        /**
        * @language zh_CN
        * 克隆骨骼动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): SkeletonAnimation {

            var skeletonAnimation: SkeletonAnimation = new SkeletonAnimation(this._skeleton);

            skeletonAnimation._blendSpeed = this._blendSpeed;

            skeletonAnimation.isLoop = this.isLoop;

            skeletonAnimation._animStateNames = this._animStateNames.concat([]);
            
            for (var i: number = 0; i < this._animStates.length; i++) {
                skeletonAnimation._animStates.push(this._animStates[i].clone());
            }

            return skeletonAnimation;
        }

        /**
        * @language zh_CN
        * 骨架骨骼数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get jointNum(): number {
            return this._skeleton.joints.length;
        }

        /**
        * @language zh_CN
        * 动画名列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get animStateNames(): string[] {
            return this._animStateNames;
        }

        /**
        * @language zh_CN
        * 动画状态对象列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get animStates(): SkeletonAnimationState[] {
            return this._animStates;
        }

        /**
        * @language zh_CN
        * 动画时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get animTime(): number {
            return this._animTime;
        }

        /**
        * @language zh_CN
        * 动画时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set animTime(value: number) {

            if (this._blendList.length <= 0) {
                return;
            }

            if (this._blendList[this._blendList.length - 1].timePosition == value) {
                return;
            }

            var delay: number = value - this._animTime;

            if (this._blendSpeed <= 0) {

                if (this._blendList.length > 1) {
                    this._blendList.splice(0, this._blendList.length - 1);
                }

                this._blendList[0].weight = 1.0;

                this._blendList[0].timePosition += delay;
            }
            else {

                var blendSpeed: number = Math.abs(delay / this._blendSpeed);

                for (var i: number = 0; i < this._blendList.length; ++i) {

                    var animationState: SkeletonAnimationState = this._blendList[i];

                    if (i != this._blendList.length - 1) {

                        animationState.weight = Math.max(0, animationState.weight - blendSpeed);

                        if (animationState.weight <= 0) {

                            this._blendList.splice(i, 1); --i;

                            continue;
                        }
                    }
                    else {
                        animationState.weight = Math.min(1, animationState.weight + blendSpeed);
                    }

                    animationState.timePosition += delay;
                }
            }





            this._animTime = this._blendList[this._blendList.length - 1].timePosition;

            var animationStateA: SkeletonAnimationState = this._blendList[0];

            var currentSkeletonA: SkeletonPose = animationStateA.currentSkeletonPose;

            if (this._blendList.length <= 1) {

                currentSkeletonA.updateGPUCacheData(this._skeleton, this._skeletonMatrixData);

                this.updateBindList(currentSkeletonA);
            }
            else {

                var animationStateB: SkeletonAnimationState = this._blendList[1];

                var currentSkeletonB: SkeletonPose = animationStateB.currentSkeletonPose;

                if (!this._blendSkeleton) {
                    this._blendSkeleton = currentSkeletonA.clone();
                }

                this._blendSkeleton.lerp(currentSkeletonA, currentSkeletonB, animationStateB.weight);

                this._blendSkeleton.resetWorldMatrix();

                this._blendSkeleton.calculateJointWorldMatrix();

                this._blendSkeleton.updateGPUCacheData(this._skeleton, this._skeletonMatrixData);

                this.updateBindList(this._blendSkeleton);
            }
        }

        /**
        * @language zh_CN
        * 动画时间长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeLength(): number {
            if (this._blendList.length <= 0) {
                return 0;
            }
            return this._blendList[this._blendList.length - 1].timeLength;
        }

        /**
        * @language zh_CN
        * 动画帧索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get frameIndex(): number {
            return this.animTime / SkeletonAnimation.fps;
        }

        /**
        * @language zh_CN
        * 动画帧索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set frameIndex(value:number) {
            this.animTime = value * SkeletonAnimation.fps;
        }

        /**
        * @language zh_CN
        * 融合速度(默认300毫秒)
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get blendSpeed(): number {
            return this._blendSpeed;
        }

        /**
        * @language zh_CN
        * 融合速度(默认300毫秒)
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set blendSpeed(value: number) {
            this._blendSpeed = Math.max(value, 0);
        }

        /**
        * @language zh_CN
        * 当前播放的动画名称
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get currentAnimName(): string {
            return this._currentAnimName;
        }

        /**
        * @language zh_CN
        * 当前动画是否正在播放
        * @returns 是否在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPlay(): boolean {
            return this._isPlay;
        }
        
        /**
        * @language zh_CN
        * 绑定3D对象到骨骼
        * @param jointName 骨骼名称
        * @param obj3d 3D对象
        * @returns boolean 是否成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bindToJointPose(jointName: string, object3D: Object3D): boolean {

            var jointIndex: number = this._animStates[0].skeletonAnimationClip.findJointIndex(jointName);

            if (jointIndex < 0) {
                return false;
            }

            var list: Array<Object3D> = null;

            if (this._bindList[jointIndex]) {
                list = this._bindList[jointIndex];
            }
            else {
                list = new Array<Object3D>();

                this._bindList[jointIndex] = list;
            }

            list.push(object3D);

            return true;
        }

        private updateBindList(skeletonPose: SkeletonPose): void {

            var list: Array<Object3D> = null;

            var jointPose: Joint = null;

            var object3D: Object3D = null;

            for (var jointIndex in this._bindList) {

                list = this._bindList[jointIndex];

                if (list.length <= 0)
                    continue;

                jointPose = skeletonPose.joints[jointIndex];

                if (!jointPose)
                    continue;

                for (var i: number = 0; i < list.length; i++) {

                    object3D = list[i];

                    this._temp_quat.fromMatrix(jointPose.worldMatrix);

                    this._temp_quat.toEulerAngles(this._temp_vec3);

                    object3D.rotationX = this._temp_vec3.x;
                    object3D.rotationY = this._temp_vec3.y;
                    object3D.rotationZ = this._temp_vec3.z;

                    ///object3D.scaleX = jointPose.worldMatrix.scale.x;
                    ///object3D.scaleY = jointPose.worldMatrix.scale.y;
                    ///object3D.scaleZ = jointPose.worldMatrix.scale.z;

                    object3D.x = jointPose.worldMatrix.position.x;
                    object3D.y = jointPose.worldMatrix.position.y;
                    object3D.z = jointPose.worldMatrix.position.z;
                }
            }

        }
    }
}