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
        * 动画播放完一个周期的事件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EVENT_PLAY_COMPLETE: string = "event_play_complete";

        /**
        * @language zh_CN
        * 动画帧更改的事件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EVENT_FRAME_CHANGE: string = "event_frame_change";

        /**
        * @language zh_CN
        * 播放速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public speed: number = 1;

        public isLoop: boolean = true;
        public fps: number = 1000 / 60;
        public delay: number;
        private _isPlay: boolean = false;
        private _animTime: number = 0;
        private _skeleton: Skeleton = null;
        private _animStateNames: string[] = [];
        private _animStates: SkeletonAnimationState[] = [];
        private _skeletonMatrixData: Float32Array = null;
        private _blendSpeed: number = 300;
        private _blendSkeleton: SkeletonPose = null;
        private _blendList: SkeletonAnimationState[] = [];

        constructor(skeleton: Skeleton) {
            super();
            this._isPlay = false;
            this._skeleton = skeleton;
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
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(animName?: string, speed: number = 1, reset: boolean = true): void {

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

            this._blendList.push(playSkeletonAnimationState);

            playSkeletonAnimationState.weight = this._blendList.length > 1 ? 0 : 1;

            if (reset) {
                playSkeletonAnimationState.timePosition = 0;
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

            if (!this._isPlay || this._blendList.length <= 0) {
                return;
            }

            //是否启用融合，并且维护各个动作的融合权重;
            if (this._blendSpeed <= 0) {
                if (this._blendList.length > 1) {
                    this._blendList.splice(0, this._blendList.length - 1);
                }
            }
            else {

                var blendSpeed: number = delay * this.speed / this._blendSpeed;

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

                    animationState.timePosition += delay * this.speed;
                }
            }

            //融合插值;
            var animationStateA: SkeletonAnimationState = this._blendList[0];

            var currentSkeletonA: SkeletonPose = animationStateA.currentSkeletonPose;

            if (this._blendList.length <= 1) {
                this._skeletonMatrixData = currentSkeletonA.updateGPUCacheData(this._skeleton);
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

                this._skeletonMatrixData = this._blendSkeleton.updateGPUCacheData(this._skeleton);
            }
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
            if (this._skeletonMatrixData) {
                context3DProxy.uniform4fv(usage.uniform_PoseMatrix.uniformIndex, this._skeletonMatrixData);
            }
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

            //if (!this._currentAnim) {
            //    return;
            //}

            //this._animTime = this._currentAnim.timePosition = value;

            //this._skeletonMatrixData = this._currentAnim.currentSkeletonPose.updateGPUCacheData(this._skeleton);
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

            var index: number = this._animStates[0].skeletonAnimationClip.poseArray[0].findJointIndex(jointName);

            return true;
        }
    }
}