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

        public static parsingEPMFile(data: ByteArray): PropertyAnim {

            var propertyAnim: PropertyAnim = null;

            //验证标识头：'E' 'P' 'A' '\0'
            if (data.readUnsignedInt() != 0x65706100) {
                return propertyAnim;
            }

            propertyAnim = new PropertyAnim();

            //版本号;
            data.readUnsignedInt();

            //属性个数;
            var propertyCount: number = data.readUnsignedShort()

            for (var i = 0; i < propertyCount; i++) {

                //属性名称;
                var propertyName: string = data.readUTF();

                var keyFrames: AnimCurve[] = [];

                //曲线数量;
                var curveCount: number = data.readUnsignedShort();

                for (var j = 1; j < curveCount; j++) {

                    var animCurve: AnimCurve = new AnimCurve();
                    animCurve.type = data.readUnsignedInt();
                    animCurve.start.x = data.readFloat();
                    animCurve.start.y = data.readFloat();
                    animCurve.end.x = data.readFloat();
                    animCurve.end.y = data.readFloat();
                    animCurve.c1.x = data.readFloat();
                    animCurve.c1.y = data.readFloat();
                    animCurve.c2.x = data.readFloat();
                    animCurve.c2.y = data.readFloat();
                    keyFrames.push(animCurve);
                }

                propertyAnim.addAnimCurve(propertyName, keyFrames);
            }

            return propertyAnim;
        }

        //==============================测试代码==============================;

        public buildTestLine(): Wireframe[] {

            var lines: Wireframe[] = [];

            var color: number[] = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffffff];

            var count: number = 0;

            var propertyData: PropertyData;

            for (var k = 0; k < this._propertyArray.length; k++) {

                propertyData = this._propertyArray[k];

                var vb = [];

                var ib = [];

                var keyFrames: AnimCurve[] = propertyData.keyFrames;

                for (var index = 0; index < keyFrames.length; index++) {

                    for (var i = keyFrames[index].start.x; i < keyFrames[index].end.x; i += 10) {

                        vb.push(i, keyFrames[index].calculateValue(i), 0);

                    }
                }

                for (var i = 1; i < vb.length / 3; i++) {
                    ib.push(i - 1);
                    ib.push(i);
                }

                var wireframe: Wireframe = new Wireframe();
                var geom: Geometry = wireframe.geometry;
                geom.setVerticesForIndex(0, VertexFormat.VF_POSITION, vb, vb.length / 3);
                geom.indexData = ib;
                wireframe.material.diffuseColor = color[count];
                wireframe.material.ambientColor = 0xffffff;
                lines.push(wireframe);
                count = (count + 1) % color.length;
            }

            return lines;
        }
    }

    class PropertyData {
        public keyFrames: AnimCurve[];
        public property: string;
        public name: string;
        public target: any;
    }
}