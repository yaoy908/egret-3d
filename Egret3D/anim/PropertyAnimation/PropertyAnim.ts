module egret3d {
    export class PropertyAnim extends EventDispatcher {

        public speed: number = 1;
        private _propertyArray: PropertyData[] = [];
        private _play: boolean = false;
        private _time: number = 0;
        private _target: Object3D;
        private _totalTime: number = 0;

        public constructor() {
            super();
        }

        public IsExist(property: string): boolean {
            for (var i = 0; i < this._propertyArray.length; i++) {
                if (this._propertyArray[i].property == property) {
                    return true;
                }
            }
            return false;
        }

        public addAnimCurve(property: string, keyFrames: AnimCurve[]): boolean {

            if (this.IsExist(property)) {
                return false;
            }

            if (null == keyFrames || keyFrames.length <= 0) {
                return false;
            }

            var propertyData: PropertyData = new PropertyData();
            propertyData.keyFrames = keyFrames;
            propertyData.property = property;
            propertyData.target = this._target;
            this._propertyArray.push(propertyData);

            for (var i = 0; i < keyFrames.length - 1; i++) {

                if (keyFrames[i].end.x > this._totalTime) {

                    this._totalTime = keyFrames[i].end.x;

                    keyFrames[i].cacheCurveData();
                }
            }

            this.updateBindData(propertyData);
        }

        public removeAnimCurve(property: string): AnimCurve[] {

            var propertyData: PropertyData = null;

            for (var i = 0; i < this._propertyArray.length; i++) {

                if (this._propertyArray[i].property == property) {

                    propertyData = this._propertyArray[i];

                    this._propertyArray.splice(i, 1);

                    return propertyData.keyFrames;
                }
            }
        }

        public bindObject3D(target: Object3D): void {

            this._target = target;

            for (var i = 0; i < this._propertyArray.length; i++) {
                this.updateBindData(this._propertyArray[i]);
            }
        }

        private updateBindData(propertyData: PropertyData): void {

            if (!this._target) {
                return;
            }

            propertyData.target = this._target;

            var strArray: string[] = propertyData.property.split('.');

            for (var i = 0; i < strArray.length - 1; i++) {
                propertyData.target = propertyData.target[strArray[i]];
            }

            propertyData.name = strArray[strArray.length - 1];
        }

        public play(): void {

            if (this._play) {
                return;
            }

            this._play = true;

            this._time = 0;
        }

        public stop(): void {
            this._play = false;
        }

        public set timePosition(time: number) {
            if (time < 0) {
                time = this._totalTime + time;
            }

            this._time = time % this._totalTime;

            if (!this._target) {
                return;
            }

            var propertyData: PropertyData;

            var keyFrames: AnimCurve[];

            for (var i = 0; i < this._propertyArray.length; i++) {

                propertyData = this._propertyArray[i];

                keyFrames = propertyData.keyFrames;

                for (var j = 0; j < keyFrames.length - 1; j++) {

                    if (keyFrames[j].start.x <= this._time && keyFrames[j].end.x > this._time) {

                        propertyData.target[propertyData.name] = keyFrames[j].calculateValue(this._time);

                        break;
                    }
                }
            }
        }

        public get timePosition(): number {
            return this._time;
        }

        public get totalTime(): number {
            return this._totalTime;
        }

        public update(delay: number): void {

            if (!this._play) {
                return;
            }

            this.timePosition += delay * this.speed;
        }

        public clone(): PropertyAnim {
            var pro: PropertyAnim = new PropertyAnim();
            pro._propertyArray = this._propertyArray;
            return pro;
        }
    }

    class PropertyData {
        public keyFrames: AnimCurve[];
        public property: string;
        public name: string;
        public target: any;
    }
}