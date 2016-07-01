module egret3d {
    export class SkeletonAnimationClip {

        /**
        * @language zh_CN
        * 每帧的SkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public poseArray: Array<SkeletonPose> = [];

        public animationName: string = "";

        constructor() {
        }

        /**
        * @language zh_CN
        * 时间长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeLength(): number {
            if (this.poseArray.length <= 0) {
                return 0;
            }
            return this.poseArray[this.poseArray.length - 1].frameTime;
        }

        /**
        * @language zh_CN
        * 骨骼数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get jointNum(): number {
            if (this.poseArray.length <= 0) {
                return 0;
            }
            return this.poseArray[0].joints.length;
        }

        /**
        * @language zh_CN
        * 克隆SkeletonAnimationClip对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): SkeletonAnimationClip {

            var skeletonAnimationClip: SkeletonAnimationClip = new SkeletonAnimationClip();

            skeletonAnimationClip.animationName = this.animationName;

            skeletonAnimationClip.poseArray = this.poseArray;

            return skeletonAnimationClip;
        }
    }
}