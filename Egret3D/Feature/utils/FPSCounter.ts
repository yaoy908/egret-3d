module egret3d {
    export class FPSCounter {

        public fps: number = 0;

        private _recordDateList: Array<Date>;
        private _tempCount: number = 0;
        private _tempNow: Date;
        private _tempStart: Date;

        private _calcCounter: number = 0;

        private static MAX_COUNT: number = 60;
        constructor() {
           this._recordDateList = new Array<Date>();
        }
      
        public update(): void {
            this._tempNow = new Date();

            this._recordDateList.push(this._tempNow);

            //统计fps
            this._calcCounter++;
            if (this._calcCounter > 20) {
                this._calcCounter = 0;

                //移除超过总数量上限的date
                while (this._recordDateList.length > FPSCounter.MAX_COUNT) {
                    this._recordDateList.shift();
                }

                this._tempCount = this._recordDateList.length;
                this._tempStart = this._recordDateList[0];
               
                this.fps = (this._tempNow.getTime() - this._tempStart.getTime()) / 1000;
                this.fps = Math.floor(this._tempCount / this.fps);
            }

        }

    }
}