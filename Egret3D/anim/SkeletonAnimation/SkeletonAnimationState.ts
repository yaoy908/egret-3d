module egret3d {
    export class SkeletonAnimationState implements IAnimationState {

        /**
        * @language zh_CN
        * State����
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string = "";

        /**
        * @language zh_CN
        * �ں�Ȩ��ֵ
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
        * ��Ƥ�Ǽ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeleton(): Skeleton {
            return this._skeleton;
        }

        /**
        * @language zh_CN
        * ��Ƥ�Ǽ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set skeleton(skeleton: Skeleton) {
            this._skeleton = skeleton;
        }

        /**
        * @language zh_CN
        * ��������������
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeletonAnimation(): SkeletonAnimation {
            return this._skeletonAnimation;
        }

        /**
        * @language zh_CN
        * ��������������
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set skeletonAnimation(skeletonAnimation: SkeletonAnimation) {
            this._skeletonAnimation = skeletonAnimation;
        }

        /**
        * @language zh_CN
        * ������������
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeletonAnimationClip(): SkeletonAnimationClip {
            return this._skeletonAnimationClip;
        }

        /**
        * @language zh_CN
        * ����ʱ�䳤��
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeLength(): number {
            return this._timeLength;
        }

        /**
        * @language zh_CN
        * ��� SkeletonAnimationClip ����
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

            if (animationClip.poseArray.length < 2) {
                this._skeletonAnimationClip.poseArray = animationClip.poseArray;
            }
            else {
                var skeletonPoseA: SkeletonPose = animationClip.poseArray[0];

                var skeletonPoseB: SkeletonPose = animationClip.poseArray[1];

                var nCount: number = Math.round((skeletonPoseB.frameTime - skeletonPoseA.frameTime) / SkeletonAnimation.fps);

                if (nCount <= 1) {
                    this._skeletonAnimationClip.poseArray = animationClip.poseArray;
                }
                else {
                    for (var i: number = 1; i < animationClip.poseArray.length; ++i) {

                        skeletonPoseA = animationClip.poseArray[i - 1];

                        skeletonPoseB = animationClip.poseArray[i];

                        for (var j: number = 0; j < nCount; j++) {

                            var skeletonPose: SkeletonPose = new SkeletonPose();

                            skeletonPose.lerp(skeletonPoseA, skeletonPoseB, j / nCount);

                            this._skeletonAnimationClip.poseArray.push(skeletonPose);
                        }
                    }

                    this._skeletonAnimationClip.poseArray.push(animationClip.poseArray[animationClip.poseArray.length - 1].clone());
                }
            }

            this._timeLength = this._skeletonAnimationClip.poseArray[this._skeletonAnimationClip.poseArray.length - 1].frameTime;
        }

        /**
        * @language zh_CN
        * ʱ��λ��
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timePosition(): number {
            return this._timePosition;
        }

        /**
        * @language zh_CN
        * ʱ��λ��
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

                    if (this.name == this._skeletonAnimation.currentAnimName) {
                        this._skeletonAnimation.stop();
                    }
                }
                else if (this._timePosition > this._timeLength) {

                    this._timePosition = this._timeLength;

                    if (this.name == this._skeletonAnimation.currentAnimName) {
                        this._skeletonAnimation.stop();
                    }
                }
            }
        }

        /**
        * @language zh_CN
        * ��ȡ��ǰ֡��SkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get currentSkeletonPose(): SkeletonPose {
            return this._skeletonAnimationClip.poseArray[this.currentFrameIndex];
        }

        /**
        * @language zh_CN
        * ��ȡ��ǰ֡����
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get currentFrameIndex(): number {
            return Math.floor(this._timePosition / SkeletonAnimation.fps);
        }

        /**
        * @language zh_CN
        * ��ȡ֡����
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get frameNum(): number {
            if (!this._skeletonAnimationClip) {
                return 0;
            }
            return this._skeletonAnimationClip.poseArray.length;
        }

        /**
        * @language zh_CN
        * ��ȡSkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getSkeletonPose(index: number): SkeletonPose {
            return this._skeletonAnimationClip.poseArray[index];
        }

        /**
        * @language zh_CN
        * ��¡SkeletonAnimationState����
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