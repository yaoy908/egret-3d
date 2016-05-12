module egret3d {

    /**
     * @language zh_CN
     * @class egret3d.SkeletonAnimationClip
     * @classdesc
     * SkeletonAnimationClip 类为骨骼动画
     *
     * SkeletonAnimationClip类为骨骼动画，其中保存管理若干个Skeleton（骨架对象），每个骨架对象都为该动画某时刻的骨骼帧信息。
     *
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample animation/skeletonAnimation/SkeletonAnimationClip.ts
     */
    export class SkeletonAnimationClip{
        
        /**
        * @language zh_CN
        * 帧数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frameCount: number = 0;

        private _animName: string = null;
        private _sampling: number = 1;
        private _timePosition: number;
        private _loop: boolean = true;
        private _playing: boolean = true;
        private _enabled: boolean = true;
        private _weight: number = 1.0;
        private _length: number = 0;
        private _parent: SkeletonAnimation = null;
        private _poseArray: Array<Skeleton> = null;

        constructor(animName: string = null) {
            this._animName = animName;
        }

        /**
        * @language zh_CN
        * 获取骨骼动画对象
        * @returns SkeletonAnimation 骨骼动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get parent(): SkeletonAnimation {
            return this._parent;
        }

        /**
        * @language zh_CN
        * 获取动画Pose骨架序列
        * @returns Array<Skeleton> 骨架序列
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get poseArray(): Array<Skeleton> {
            return this._poseArray;
        }

        /**
        * @language zh_CN
        * 设置动画Pose骨架序列
        * @prame array 动画Pose骨架序列
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set poseArray(array: Array<Skeleton>) {

            this._poseArray = array;

            this._length = array[array.length - 1].frameTime;
        }

        /**
        * @language zh_CN
        * 克隆新的SkeletonAnimationClip对象
        * @returns SkeletonAnimationClip 新的SkeletonAnimationClip
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): SkeletonAnimationClip {

            var cloneObj: SkeletonAnimationClip = new SkeletonAnimationClip(this.animationName);

            cloneObj.frameCount = this.frameCount;

            cloneObj.poseArray = this._poseArray;

            return cloneObj;
        }
        
        /**
        * @language zh_CN
        * 是否已经结束
        * @returns boolean 是否已经结束
        * @version Egret 3.0
        * @platform Web,Native
        */
        public hasEnded(): boolean {
            return ((this._timePosition >= this._length) && !this._loop);
        }

        /**
        * @language zh_CN
        * 添加动画播放时间偏移量
        * @param offset 时间增量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addTime(offset: number) {
            this.timePosition += offset;
        }

        /**
        * @language zh_CN
        * 获取当前帧索引
        * @returns number 当前帧索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get currentFrameIndex(): number {

            var currentFrameIndex: number = Math.floor(this._timePosition / 80) % this._poseArray.length;

            return currentFrameIndex;
        }

        /**
        * @language zh_CN
        * 设置当前帧索引
        * @prame value 当前帧索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set currentFrameIndex(value: number) {

            value = Math.abs(value) % this._poseArray.length;

            this.timePosition = value * 80;
        }

        /**
        * @language zh_CN
        * 获取下一帧的索引
        * @returns number 下一帧的索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get nextFrameIndex(): number {
            return (this.currentFrameIndex + 1) % this._poseArray.length;
        }

        /**
        * @language zh_CN
        * 获取动画名称
        * @returns number 动画名称
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get animationName(): string {
            return this._animName;
        }

        /**
        * @language zh_CN
        * 设置动画名称
        * @param name 动画名称
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set animationName(name: string) {
            this._animName = name;
        }

        /**
        * @language zh_CN
        * 获取动画长度
        * @returns number 动画长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get length(): number {
            return this._length;
        }

        /**
        * @language zh_CN
        * 获取采样率
        * @returns number 采样率
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get sampling(): number {
            return this._sampling;
        }

        /**
        * @language zh_CN
        * 设置采样率
        * @param value 采样率
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set sampling(value: number) {
            this._sampling = Math.max(value, 1);
        }

        /**
        * @language zh_CN
        * 获取是否循环
        * @returns boolean 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get loop(): boolean {
            return this._loop;
        }

        /**
        * @language zh_CN
        * 设置是否循环
        * @param value 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set loop(value: boolean) {
            this._loop = value;
        }

        /**
        * @language zh_CN
        * 获取是否播放中
        * @returns boolean 是否播放中
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get play(): boolean {
            return this._playing;
        }

        /**
        * @language zh_CN
        * 设置是否播放
        * @param value 是否播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set play(value: boolean) {
            this._playing = value;
        }

        /**
        * @private
        * @language zh_CN
        * 是否启用
        */
        public get enabled(): boolean {
            return this._enabled;
        }

        /**
        * @private
        * @language zh_CN
        * 是否启用
        */
        public set enabled(value: boolean) {
            this._enabled = value;
            //this.parent.notifyAnimationStateEnabled(this, value);
        }

        /**
        * @private
        * @language zh_CN
        * 混合权重
        */
        public get weight(): number {
            return this._weight;
        }

        /**
        * @private
        * @language zh_CN
        * 混合权重
        */
        public set weight(value: number) {
            this._weight = value;
            if (this._enabled) {
                ;//this.parent.notifyDirty();
            }
        }

        /**
        * @private
        * @language zh_CN
        * 播放的时间位置
        */
        public get timePosition(): number {
            return this._timePosition;
        }

        /**
        * @private
        * @language zh_CN
        * 播放的时间位置
        */
        public set timePosition(value: number) {
            if (value != this._timePosition) {
                this._timePosition = value;
                if (this._loop) {
                    this._timePosition = value % this._length;
                    if (this._timePosition < 0) {
                        this._timePosition += this._length;
                    }
                } else {
                    if (this._timePosition < 0) {
                        this._timePosition = 0;
                    } else if (this._timePosition > this._length) {
                        this._timePosition = this._length;
                        this._playing = false;
                    }
                }
                if (this.enabled) {
                    ;//this.parent.notifyDirty();
                }
            }
        }

        /**
        * @private
        * @language zh_CN
        * 填充帧
        * @param initialSkeleton 初始骨架
        */
        public fillFrame(initialSkeleton: Skeleton): void {

            for (var i: number = 0; i < this._poseArray.length; i++) {
                this._poseArray[i].calculateJointWorldMatrix(initialSkeleton);
            }

            if (this.frameCount == this._poseArray.length - 1)
                return;

            var skeletonPose: Array<Skeleton> = new Array<Skeleton>();

            var fps: number = 60.0;

            var gpf: number = 1000.0 / fps;

            skeletonPose.push(this._poseArray[0]);

            for (var frameIndex: number = 1; frameIndex <= this.frameCount; frameIndex++) {

                var currFrame: Skeleton = skeletonPose[frameIndex - 1];

                var nextFrame: Skeleton = this._poseArray[(Math.floor(frameIndex / this.sampling) + 1) % this._poseArray.length];

                var targetSkeletonPose: Skeleton = new Skeleton();

                targetSkeletonPose.skeletonLerp(currFrame, nextFrame, frameIndex * gpf);

                skeletonPose.push(targetSkeletonPose);
            }

            this.poseArray = skeletonPose;
        }

    }
}