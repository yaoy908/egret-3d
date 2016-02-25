module egret3d_dev {
    export class Geometry {
        public subGeometrys: Array<SubGeometry>;
        public boundBox: CubeBoxBound;
        constructor() {

        }

        /**
        * @language zh_CN
        * 生成包围盒
        */
        public buildBoundBox() {
            this.boundBox.min.copyFrom(new Vector3D(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE));
            this.boundBox.max.copyFrom(new Vector3D(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE));
            for (var i: number = 0; i < this.subGeometrys.length; ++i) {
                if (this.boundBox.max.x < this.subGeometrys[i].maxPos.x) {
                    this.boundBox.max.x = this.subGeometrys[i].maxPos.x;
                }

                if (this.boundBox.max.y < this.subGeometrys[i].maxPos.y) {
                    this.boundBox.max.y = this.subGeometrys[i].maxPos.y;
                }

                if (this.boundBox.max.z < this.subGeometrys[i].maxPos.z) {
                    this.boundBox.max.z = this.subGeometrys[i].maxPos.z;
                } 

                if (this.boundBox.min.x > this.subGeometrys[i].minPos.x) {
                    this.boundBox.min.x = this.subGeometrys[i].minPos.x;
                }

                if (this.boundBox.min.y > this.subGeometrys[i].minPos.y) {
                    this.boundBox.min.y = this.subGeometrys[i].minPos.y;
                }
                 
                if (this.boundBox.min.z > this.subGeometrys[i].minPos.z) {
                    this.boundBox.min.z = this.subGeometrys[i].minPos.z;
                }
            }

            this.boundBox.calculateBox();
        }
    }
}