module egret3d {

    export enum CurveType { Line, BesselCurve };

    export class AnimCurve {
        public type: CurveType = CurveType.Line;
        public start: Point = new Point();
        public end: Point = new Point();
        public c1: Point = new Point();
        public c2: Point = new Point();
        public cache: number[] = null;
        public useCache: boolean = false;

        public constructor() {
        }

        public calculateValue(time: number): number {

            if (time < this.start.x || time > this.end.x) {
                return 0;
            }

            if (this.useCache) {
                return this.cache[Math.floor(time - this.start.x)];
            }

            switch (this.type) {
                case CurveType.Line:
                    return this.valueFromLine(time);
                case CurveType.BesselCurve:
                    return this.valueFromBesselCurve(time);
            }
            
            var world2D;
            
            return 0;
        }

        protected valueFromLine(time: number): number {

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            return this.start.y + t * (this.end.y - this.start.y);
        }

        protected valueFromBesselCurve(time: number): number {

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            var _1t: number = 1 - t;

            var _1t2: number = _1t * _1t;

            var _1t3: number = _1t2 * _1t;
            
            return this.start.y * _1t3 + 3 * this.c1.y * t * _1t2 + 3 * this.c2.x * t * t * _1t + this.end.y * t * t * t;
        }

        public cacheCurveData(): void {

            this.cache = [];

            for (var time = this.start.x; time < this.end.x; time++) {
                this.cache.push(this.calculateValue(time));
            }

            this.useCache = true;
        }
    }
}