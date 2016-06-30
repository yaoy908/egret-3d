module egret3d {
    export class SkeletonPose {

        /**
        * @language zh_CN
        * 骨架包含的骨骼
        * @version Egret 3.0
        * @platform Web,Native
        */
        public joints: Array<Joint> = [];

        /**
        * @language zh_CN
        * 当前骨架的帧时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frameTime: number;

        /**
        * @language zh_CN
        * GPU所需的骨骼缓存数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cacheData: Float32Array;

        /**
        * @language zh_CN
        * GPU所需的骨骼缓存数据是否有效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cacheDataValid: boolean;

        private _temp_q0: Quaternion = new Quaternion();
        private _temp_q1: Quaternion = new Quaternion();
        private _temp_q2: Quaternion = new Quaternion();
        private _temp_v0: Vector3D = new Vector3D();
        private _temp_v1: Vector3D = new Vector3D();
        private _temp_v2: Vector3D = new Vector3D();

        constructor() {
        }

        /**
        * @language zh_CN
        * 克隆新骨架对象
        * @returns Skeleton 新骨架对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): SkeletonPose {

            var skeletonPose: SkeletonPose = new SkeletonPose();

            skeletonPose.frameTime = this.frameTime;

            for (var i: number = 0; i < this.joints.length; i++) {
                skeletonPose.joints.push(this.joints[i].clone());
            }

            return skeletonPose;
        }

        /**
        * @language zh_CN
        * 骨架插值计算
        * @param skeletonA 骨架A
        * @param skeletonB 骨架B
        * @param t 时间因子(0~1);
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lerp(skeletonPoseA: SkeletonPose, skeletonPoseB: SkeletonPose, t: number): SkeletonPose {

            this.joints = [];

            this.frameTime = (skeletonPoseB.frameTime - skeletonPoseA.frameTime) * t + skeletonPoseA.frameTime;

            for (var i: number = 0; i < skeletonPoseA.joints.length; ++i) {

                var jointA: Joint = skeletonPoseA.joints[i];

                var jointB: Joint = skeletonPoseB.joints[i];

                var joint: Joint = new Joint(jointA.name);

                joint.name = jointA.name;

                joint.parent = jointA.parent;

                joint.parentIndex = jointA.parentIndex;

                joint.scale.lerp(jointA.scale, jointB.scale, t);

                joint.orientation.lerp(jointA.orientation, jointB.orientation, t);

                joint.translation.lerp(jointA.translation, jointB.translation, t);

                joint.buildLocalMatrix(joint.scale, joint.orientation, joint.translation);

                joint.worldMatrixValid = jointA.worldMatrixValid;

                if (joint.worldMatrixValid) {

                    this._temp_q0.fromMatrix(jointA.worldMatrix);
                    this._temp_q1.fromMatrix(jointB.worldMatrix);
                    this._temp_q2.lerp(this._temp_q0, this._temp_q1, t);

                    jointA.worldMatrix.copyRowTo(3, this._temp_v0);
                    jointB.worldMatrix.copyRowTo(3, this._temp_v1);
                    this._temp_v2.lerp(this._temp_v0, this._temp_v1, t);

                    this._temp_q2.toMatrix3D(joint.worldMatrix);
                    joint.worldMatrix.rawData[12] = this._temp_v2.x;
                    joint.worldMatrix.rawData[13] = this._temp_v2.y;
                    joint.worldMatrix.rawData[14] = this._temp_v2.z;
                }

                this.joints.push(joint);
            }

            return this;
        }

        /**
        * @language zh_CN
        * 计算当前骨架内所有骨骼的世界矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calculateJointWorldMatrix(): void {

            for (var i: number = 0; i < this.joints.length; ++i) {
                this.calculateAbsoluteMatrix(i);
            }
            
        }

        //递归函数，用于计算骨骼世界矩阵
        private calculateAbsoluteMatrix(jointIndex: number): void {

            var joint: Joint = this.joints[jointIndex];

            if (joint.parentIndex >= 0) {
                this.calculateAbsoluteMatrix(joint.parentIndex);
            }

            if (!joint.worldMatrixValid) {

                joint.worldMatrix.copyFrom(joint.localMatrix);

                if (joint.parentIndex >= 0) {
                    joint.worldMatrix.append(this.joints[joint.parentIndex].worldMatrix);
                }

                joint.worldMatrixValid = true;
            }
        }

        /**
        * @language zh_CN
        * 更新GPU所需的骨骼缓存数据
        * @param skeleton 蒙皮骨骼骨架
        * @returns Float32Array 缓存数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public updateGPUCacheData(skeleton: Skeleton): Float32Array {

            if (this.cacheDataValid) {
                return this.cacheData;
            }

            if (!this.cacheData) {
                this.cacheData = new Float32Array(skeleton.jointNum * 8);
            }

            var jointMatrix: Matrix4_4 = new Matrix4_4();

            for (var i: number = 0; i < skeleton.joints.length; ++i) {

                for (var j: number = 0; j < this.joints.length; ++j) {

                    if (skeleton.joints[i].name != this.joints[j].name)
                        continue;

                    jointMatrix.copyFrom(skeleton.joints[i].inverseMatrix);

                    jointMatrix.append(this.joints[j].worldMatrix);

                    this._temp_q0.fromMatrix(jointMatrix);

                    this.cacheData[i * 8 + 0] = this._temp_q0.x;
                    this.cacheData[i * 8 + 1] = this._temp_q0.y;
                    this.cacheData[i * 8 + 2] = this._temp_q0.z;
                    this.cacheData[i * 8 + 3] = this._temp_q0.w;

                    this.cacheData[i * 8 + 4] = jointMatrix.rawData[12];
                    this.cacheData[i * 8 + 5] = jointMatrix.rawData[13];
                    this.cacheData[i * 8 + 6] = jointMatrix.rawData[14];
                    this.cacheData[i * 8 + 7] = 1;

                    break;
                }

            }

            this.cacheDataValid = true;

            return this.cacheData;
        }

        /**
        * @language zh_CN
        * 通过名称查找指定骨骼
        * @param name 骨骼名称
        * @return 骨骼对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findJoint(name: string): Joint {

            for (var i: number = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return this.joints[i];
            }

            return null;
        }

        /**
        * @language zh_CN
        * 通过名称查找骨骼索引编号
        * @param name 骨骼名称
        * @returns number 骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findJointIndex(name: string): number {

            for (var i: number = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return i;
            }

            return -1;
        }

        /**
        * @language zh_CN
        * 重置骨骼世界矩阵;
        * @param name 骨骼名称
        * @returns number 骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public resetWorldMatrix(): void {

            for (var i: number = 0; i < this.joints.length; i++) {
                this.joints[i].worldMatrixValid = false;
            }

            this.cacheDataValid = false;
        }
    }
}