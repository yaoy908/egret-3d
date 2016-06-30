module egret3d {
    export class SkeletonAnimationState implements IAnimationState {

        /**
        * @language zh_CN
        * State名称
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string = "";

        /**
        * @language zh_CN
        * 融合权重值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public weight: number = 1.0;

        private _skeleton: Skeleton = null;
        private _timeLength: number = 0;
        private _timePosition: number = 0;
        private _skeletonAnimation: SkeletonAnimation = null;
        private _skeletonAnimationClip: SkeletonAnimationClip = null;

        constructor(name: string) {
            this.name = name;
        }

        /**
        * @language zh_CN
        * 蒙皮骨架
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeleton(): Skeleton {
            return this._skeleton;
        }

        /**
        * @language zh_CN
        * 蒙皮骨架
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set skeleton(skeleton: Skeleton) {
            this._skeleton = skeleton;
        }

        /**
        * @language zh_CN
        * 骨骼动画控制器
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeletonAnimation(): SkeletonAnimation {
            return this._skeletonAnimation;
        }

        /**
        * @language zh_CN
        * 骨骼动画控制器
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set skeletonAnimation(skeletonAnimation: SkeletonAnimation) {
            this._skeletonAnimation = skeletonAnimation;
        }

        /**
        * @language zh_CN
        * 骨骼动画剪辑
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeletonAnimationClip(): SkeletonAnimationClip {
            return this._skeletonAnimationClip;
        }

        /**
        * @language zh_CN
        * 动画时间长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeLength(): number {
            return this._timeLength;
        }

        /**
        * @language zh_CN
        * 添加 SkeletonAnimationClip 对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addAnimationClip(animationClip: SkeletonAnimationClip): void {

            if (!this._skeletonAnimationClip) {
                this._skeletonAnimationClip = new SkeletonAnimationClip();
            }
            else {
                this._skeletonAnimationClip.poseArray = [];
            }

            var skeletonPoseA: SkeletonPose = null;

            var skeletonPoseB: SkeletonPose = null;

            for (var i: number = 1; i < animationClip.poseArray.length; ++i) {

                skeletonPoseA = animationClip.poseArray[i - 1];

                skeletonPoseB = animationClip.poseArray[i];

                var nCount: number = 2;//Math.floor((skeletonPoseB.frameTime - skeletonPoseA.frameTime) / this._skeletonAnimation.fps);

                for (var j: number = 0; j < nCount; j++) {

                    var skeletonPose: SkeletonPose = new SkeletonPose();

                    skeletonPose.lerp(skeletonPoseA, skeletonPoseB, j / nCount);

                    this._skeletonAnimationClip.poseArray.push(skeletonPose);
                }
                
            }

            this._timeLength = this._skeletonAnimationClip.poseArray[this._skeletonAnimationClip.poseArray.length - 1].frameTime;
        }

        /**
        * @language zh_CN
        * 时间位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timePosition(): number {
            return this._timePosition;
        }

        /**
        * @language zh_CN
        * 时间位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set timePosition(value: number) {

            if (value == this._timePosition) {
                return;
            }

            this._timePosition = value;

            if (this._skeletonAnimation.isLoop) {

                this._timePosition = value % this._timeLength;

                if (this._timePosition < 0) {

                    this._timePosition += this._timeLength;

                }
            }
            else {

                if (this._timePosition < 0) {

                    this._timePosition = 0;

                }
                else if (this._timePosition > this._timeLength) {

                    this._timePosition = this._timeLength;

                }
            }
        }

        /**
        * @language zh_CN
        * 获取当前帧的SkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get currentSkeletonPose(): SkeletonPose {
            return this._skeletonAnimationClip.poseArray[this.currentFrameIndex];
        }

        /**
        * @language zh_CN
        * 获取当前帧索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get currentFrameIndex(): number {
            return Math.floor(this._timePosition / this._skeletonAnimation.fps);
        }

        /**
        * @language zh_CN
        * 获取SkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getSkeletonPose(index: number): SkeletonPose {
            return this._skeletonAnimationClip.poseArray[index];
        }

        /**
        * @language zh_CN
        * 克隆SkeletonAnimationState对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): SkeletonAnimationState {

            var skeletonAnimationState: SkeletonAnimationState = new SkeletonAnimationState(this.name);

            skeletonAnimationState._skeleton = this._skeleton;

            skeletonAnimationState._timeLength = this._timeLength;

            skeletonAnimationState._skeletonAnimation = this._skeletonAnimation;

            skeletonAnimationState._skeletonAnimationClip = this._skeletonAnimationClip;

            return skeletonAnimationState;
        }
    }
}