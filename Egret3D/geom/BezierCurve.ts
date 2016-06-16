module egret3d {
    /**
    * @private
     * @language zh_CN
     * @class egret3d.BezierCurve
     * @classdesc
     * 贝塞尔曲线
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class BezierCurve {
        constructor() {

        }

        public calcBezierY(pos: Array<Point>, ctrl: Array<Point>, t: number): number {

            var A0: Point;
            var B0: Point;
            var A1: Point;
            var B1: Point;

            for (var i: number = 0; i < 3; i++) {
                if (t >= pos[i].x && t <= pos[i + 1].x) {
                    A0 = pos[i];
                    B0 = ctrl[i];

                    A1 = pos[i + 1];
                    B1 = ctrl[i + 1];
                    break;
                }
            }
            t = (t - A0.x) / (A1.x - A0.x);
            return this.cubic_bezier(A0.y, B0.y, B1.y, A1.y, t);
        }

        public calcBezierX(pos: Array<Point>, ctrl: Array<Point>, t: number): number {

            var A0: Point;
            var B0: Point;
            var A1: Point;
            var B1: Point;

            for (var i: number = 0; i < 3; i++) {
                if (t >= pos[i].x && t <= pos[i + 1].x) {
                    A0 = pos[i];
                    B0 = ctrl[i];

                    A1 = pos[i + 1];
                    B1 = ctrl[i + 1];
                    break;
                }
            }
            t = (t - A0.x) / (A1.x - A0.x);
            return this.cubic_bezier(A0.x, B0.x, B1.x, A1.x, t);
        }

        private cubic_bezier(p0: number, p1: number, p2: number, p3: number, t:number): number {
            var progress: number = 1.0 - t;
            var progress2: number = progress * progress;
            var progress3: number = progress2 * progress;
            var t2: number = t * t;
            var t3: number = t2 * t;
           
            var res: number = p0 * progress3 + 3.0 * p1 * t * progress2 + 3.0 * p2 * t2 * progress + p3 * t3;
            return res;
        }

    }



    export class BezierData {
        public static PointCount: number = 16;
        public posPoints: Array<Point> = [];
        public ctrlPoints: Array<Point> = [];
        private static calc: BezierCurve = new BezierCurve();

        private _count: number;
        constructor(ptCount: number) {
            this._count = ptCount;
        }

        public calc(t:number): number {
            var value: number = BezierData.calc.calcBezierY(this.posPoints, this.ctrlPoints, t);
            return value;
        }

        public compress(): Float32Array {
            var floats: Array<number> = [];
            for (var i: number = 0, count: number = this.posPoints.length; i < count; i++) {
                floats.push(this.posPoints[i].x, this.posPoints[i].y);
                floats.push(this.ctrlPoints[i].x, this.ctrlPoints[i].y);
            }
            var res: Float32Array = BezierData.compressFloats(floats);
            return res;
        }

        public validate(): void {
            if (this.posPoints == null) {
                this.posPoints = [];
            }
            if (this.ctrlPoints == null) {
                this.ctrlPoints = [];
            }
            var i: number = 0, count: number = 0;
            for (i = this.posPoints.length, count = this._count / 2; i < count; i++) {
                this.posPoints.push(new Point(0, 0));
            }
            for (i = this.ctrlPoints.length, count = this._count / 2; i < count; i++) {
                this.ctrlPoints.push(new Point(0, 0));
            }
        }

        //___________压缩数据
        public static compressFloats(floats: Array<number>): Float32Array {
            if (floats.length % 2 == 1) {
                floats.push(0);
            }

            var res: Float32Array = new Float32Array(floats.length / 2 + 2);
            const maxInt: number = 4096;//最大的数，在这个范围进行压缩
            const maxInt_1: number = maxInt - 1;

            var i: number;
            var count: number;

            //获得最小和最大值
            var ints: Array<number> = [];
            ints.length = floats.length;

            var floatValue: number;
            var max: number = - Number.MAX_VALUE;
            var min: number = Number.MAX_VALUE;

            for (i = 0, count = floats.length; i < count; i++) {
                floatValue = ints[i] = floats[i];
                max = Math.max(floatValue, max);
                min = Math.min(floatValue, min);
            }
            var range: number = max - min;
            //转化每个float，于0 - maxInt之间
            var intValue: number = 0;
            for (i = 0, count = ints.length; i < count; i++) {
                intValue = ints[i];
                intValue -= min;
                intValue /= range;//0-1之间
                intValue *= maxInt_1;//0 - (maxInt - 1)之间
                ints[i] = Math.floor(intValue);
            }

            //2合1
            var int1: number;
            var int2: number;
            for (i = 0, count = ints.length / 2; i < count; i++) {
                int1 = ints[i * 2];
                int2 = ints[i * 2 + 1];
                res[i] = int1 + int2 / maxInt;
            }
            res[i + 0] = min;
            res[i + 1] = range;
            //输出结果
            return res;
        }




    }

}