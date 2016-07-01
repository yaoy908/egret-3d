module egret3d {

    /**
    * @private
    */
    export enum ValueType {
        float,
        vec2,
        vec3,
        vec4
    }
        
    /**
    * @private
    */
    export class ValueShape {
        public valueType: ValueType;
        public calculate(num: number, valueShape:ValueShape = null ): any {
            new Error("asd");
            return null;
        }
    }
        
    /**
    * @private
    */
    export class ConstValueShape extends ValueShape {
        public valueType: ValueType = ValueType.float;

        public value: number = 5;
        public calculate(num: number): any {
            var values: number[] = [];
            for (var i: number = 0; i < num; i++) {
                values.push(this.value);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class ConstRandomValueShape extends ValueShape {
        public valueType: ValueType = ValueType.float;

        public min: number = 0;
        public max: number = 100;
        public calculate(num: number): any {
            var values: number[] = [];
            for (var i: number = 0; i < num; i++) {
                values.push(this.min + Math.random() * (this.max - this.min));
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class Vec2ConstValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec2;

        public minX: number = 0;
        public minY: number = 0;
        public calculate(num: number): any {
            var values: Point[] = [];
            for (var i: number = 0; i < num; i++) {
                var p: Point = new Point();
                p.x = this.minX ;
                p.y = this.minY ;
                values.push(p);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class Vec2ConstRandomValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec2;

        public minX: number = 0;
        public minY: number = 0;
        public maxX: number = 100;
        public maxY: number = 100;
        public calculate(num: number): any {
            var values: Point[] = [];
            for (var i: number = 0; i < num; i++) {
                var p: Point = new Point();
                p.x = this.minX + Math.random() * (this.maxX - this.minX);
                p.y = this.minY + Math.random() * (this.maxY - this.minY);
                values.push(p);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class Vec3ConstValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public minX: number = 0;
        public minY: number = 0;
        public minZ: number = 0;
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            for (var i: number = 0; i < num; i++) {
                var p: Vector3D = new Vector3D();
                p.x = this.minX;
                p.y = this.minY;
                p.z = this.minZ;
                values.push(p);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class Vec3ConstRandomValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public minX: number = -50;
        public minY: number = -50;
        public minZ: number = -50;
        public maxX: number = 50;
        public maxY: number = 50;
        public maxZ: number = 50;
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            for (var i: number = 0; i < num; i++) {
                var p: Vector3D = new Vector3D();
                p.x = this.minX + Math.random() * (this.maxX - this.minX);
                p.y = this.minY + Math.random() * (this.maxY - this.minY);
                p.z = this.minZ + Math.random() * (this.maxZ - this.minZ);
                values.push(p);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class CubeVector3DValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public width: number = 100;
        public height: number = 100;
        public depth: number = 100;

        /**
        * @language zh_CN
        * @param num 
        * @param parameters [width, height, depth]
        * @returns Vector3D[] 
        */
        public calculate(num: number): any{
            var values: Vector3D[] = [];
            var val: Vector3D;
            for (var i: number = 0; i < num; i++) {
                val = new Vector3D();
                val.x = Math.random() * this.width - (this.width*0.5) ;
                val.y = Math.random() * this.height - (this.height * 0.5);
                val.z = Math.random() * this.depth - (this.depth * 0.5);
                values.push(val);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class PlaneValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public width: number = 100;
        public height: number = 100;
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            var pos: Vector3D;
            for (var i: number = 0; i < num; i++) {
                pos = new Vector3D();
                pos.x = Math.random() * this.width - (this.width * 0.5);
                pos.y = 0;
                pos.z = Math.random() * this.height - (this.height * 0.5);
                values.push(pos);
            }
            return values;
        }
    }
            
    /**
    * @private
    *圆柱体.以Y轴为高 (parameters = [R, height])
    */
    export class CylinderValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public radiusTop: number = 20;
        public radiusBottom: number = 20;
        public height: number = 20;

        //目前没写完，只支持Volume和VolumeShell，后面慢慢补充
        public coneType: number = ParticleConeShapeType.Volume;
        //圆筒的尖端延长方向的交汇点，如果top和bottom的半径相等，这个值是null
        public origPoint: Vector3D;

        public calculate(num: number): any {
            var pos: Vector3D;
            var values: Vector3D[] = [];
            if (this.radiusBottom == this.radiusTop) {
                this.origPoint = null;
                var angle: number;
                for (var i: number = 0; i < num; i++) {
                    pos = new Vector3D();
                    angle = Math.random() * 2 * Math.PI;

                    pos.x = Math.sin(angle) * this.radiusBottom;
                    pos.z = Math.cos(angle) * this.radiusBottom;
                    //体积
                    if (this.coneType == ParticleConeShapeType.Volume) {
                        var random: number = Math.random();
                        pos.x *= random;
                        pos.z *= random;
                    }
                    //体积边缘的壳
                    else if (this.coneType == ParticleConeShapeType.VolumeShell) {
                        pos.y = Math.random() * this.height - this.height * 0.5;
                    }
                    //两个底面
                    else if (this.coneType == ParticleConeShapeType.Base) {
                        pos.y = this.height * 0.5;
                        var random: number = Math.random();
                        if (random > 0.5) {
                            pos.y *= -1;
                        }
                        pos.x *= random;
                        pos.z *= random;
                    }
                    //两个底的圈
                    else if (this.coneType == ParticleConeShapeType.BaseShell) {
                        pos.y = this.height * 0.5;
                        if (Math.random() > 0.5) {
                            pos.y *= -1;
                        }

                    }
                    values.push(pos);
                }
            } else {
                this.origPoint = new Vector3D(0,0,0);
                var awayValue: number = this.radiusTop * this.height / Math.abs(this.radiusTop - this.radiusBottom);
                this.origPoint.y = -(this.height / 2 + awayValue);
                if (this.radiusTop < this.radiusBottom) {
                    this.origPoint.y *= -1;
                }
                //圆筒中的位置
                var angle: number;
                var targetR: number;
                
                var radiusT_B: number = Math.abs(this.radiusBottom - this.radiusTop);
                for (var i: number = 0; i < num; i++) {
                    pos = new Vector3D();
                    angle = Math.random() * 2 * Math.PI;
                    pos.y = Math.random() * this.height - this.height * 0.5;

                    targetR = Math.abs(pos.y - this.origPoint.y);//点到原点的y距离

                    if (this.radiusBottom < this.radiusTop) {
                        targetR = radiusT_B * (this.height / 2 + pos.y) / this.height;
                        targetR += this.radiusBottom;
                    }
                    else {
                        targetR = radiusT_B * (this.height / 2 - pos.y) / this.height;
                        targetR += this.radiusBottom;
                    }


                    pos.x = Math.sin(angle) * targetR;
                    pos.z = Math.cos(angle) * targetR;
                    if (this.coneType == ParticleConeShapeType.Volume) {
                        var random: number = Math.random();
                        pos.x *= random;
                        pos.y *= random;
                    }

                    values.push(pos);
                }


            }
            //unity中的圆筒默认是横着放的yz互换
            if (this.origPoint) {
                this.yz_zy(this.origPoint);
            }
            for (var i: number = 0, count: number = values.length; i < count; i++) {
                this.yz_zy(values[i]);
            }

            //
            return values;
        }

        private yz_zy(v: Vector3D): void {
            v.setTo(v.x, v.z, v.y, v.w);
        }
        

        //获取从这个桶里面发射的粒子，沿着桶的发射朝向
        public getDirection(point: Vector3D, dst: Vector3D): Vector3D {
            if (dst == null) {
                dst = new Vector3D();
            }
            dst.setTo(0, 1, 0);
            if (point == null) {
                return dst;
            }
            if (this.origPoint){
                dst.copyFrom(point);
                dst.decrementBy(this.origPoint);
                dst.normalize();
                if (this.radiusTop < this.radiusBottom) {
                    dst.x *= -1;
                    dst.y *= -1;
                    dst.z *= -1;
                }

            }
            return dst;
        }
    }

    /**
    * @private
    * 线性分布
    */
    class LineValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public points: Vector3D[] = [new Vector3D(), new Vector3D(100, 0, 0), new Vector3D(100, 200, 0)];

        public calculate(num: number): any {
            if (this.points.length == 1) return this.points;

            var values: Vector3D[] = [];
            var pos: Vector3D;
            var numLen: number = 0;
            var segment: number = 0;
            for (var i: number = 1; i < this.points.length; i++) {
                numLen += Vector3D.distance(this.points[i - 1], this.points[i]);
            }
            segment = numLen / num;
            var ntmp: Vector3D = new Vector3D();
            var sourceD: number = 0; 
            var nD: number = 0; 
            var len: number = 0 ; 
            for (var i: number = 1; i < this.points.length; i++) {

                ntmp.x = this.points[i].x - this.points[i - 1].x;
                ntmp.y = this.points[i].y - this.points[i - 1].y;
                ntmp.z = this.points[i].z - this.points[i - 1].z; 

                ntmp.normalize();
                ntmp.scaleBy(segment + len);

                sourceD = Vector3D.distance(this.points[i - 1], this.points[i]);
                nD = Vector3D.distance(ntmp, this.points[i]);

                if (nD > sourceD) {
                    len += nD;
                }

            }

            return values;
        }
    }
    
    /**
    * @private
    * 球表面分布
    */
    class BallSurfaceValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        //parameters = [R]
        public calculate(num: number, ...parameters): any {
            var values: Vector3D[] = [];
            var r: number = parameters[0][0];
            values = this.getPoints1(num, r);
            return values;
        }

        private getPoints1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var x: number;
            var y: number;
            var z: number;
            var s: number;
            var n: number;
            for (var i: number = 0; i < num; i++) {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                z = Math.random() * 2 - 1;
                s = x * x + y * y + z * z;
                if (s > 1) {
                    i--;
                } else {
                    n = Math.sqrt(s);
                    values.push(new Vector3D(x / n * r, y / n * r, z / n * r));
                }
            }
            return values;
        }

        private getPoints2(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            for (var i: number = 0; i < num; i++) {

            }
            return values;
        }
    }
        
    /**
    * @private
    * 球内分布
    */
    export class BallValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public r: number = 10;

        //parameters = [R]
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            values = this.getPoints1(num, this.r);
            return values;
        }

        private getPoints1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var x: number;
            var y: number;
            var z: number;
            var pos: Vector3D;
            var radio: Vector3D = new Vector3D(0, 0, 0);
            for (var i: number = 0; i < num; i++) {
                x = Math.random() * 2 * r - r;
                y = Math.random() * 2 * r - r;
                z = Math.random() * 2 * r - r;
                pos = new Vector3D(x, y, z);
                if (Vector3D.distance(radio, pos) > r) {
                    i--;
                } else {
                    values.push(pos);
                }
            }
            return values;
        }
    }


    /**
    * @private
    * 半球内分布
    */
    export class HemiBallValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public r: number = 10;

        //parameters = [R]
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            values = this.getPoints1(num, this.r);
            return values;
        }

        private getPoints1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var x: number;
            var y: number;
            var z: number;
            var pos: Vector3D;
            var radio: Vector3D = new Vector3D(0, 0, 0);
            for (var i: number = 0; i < num; i++) {
                x = Math.random() * 2 * r - r;
                y = Math.abs(Math.random() * 2 * r - r);
                z = Math.random() * 2 * r - r;
                pos = new Vector3D(x, y, z);
                if (Vector3D.distance(radio, pos) > r) {
                    i--;
                } else {
                    values.push(pos);
                }
            }
            return values;
        }
    }


    /**
    * @private
    * 平面圆
    */
    class CircleValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;


        public calculate(num: number, ...parameters): any {
            var values: Vector3D[];
            var tmpPar = parameters[0];
            var r: number = tmpPar[0];

            //var time: number = new Date().getTime();
            values = this.createRandomPoint1(num, r);//createRandomPoint1 比 createRandomPoint2 大部分情况下快了15% - 25%, 少数情况下略高于createRandomPoint2
            //console.log('createRandomPoint1 cost time: ', new Date().getTime() - time);
            //time = new Date().getTime();
            //this.createRandomPoint2(num, r);
            //console.log('createRandomPoint2 cost time: ', new Date().getTime() - time);
            return values;

        }
        //非稳定算法.但是因为没有三角函数和开平方的计算.反而在大部分情况下效率会更高
        private createRandomPoint1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var d: number = r * 2;
            for (var i: number = 0; i < num; i++) {
                var x = Math.random() * d - r;
                var z = Math.random() * d - r;
                if ((x * x + z * z) > (r * r)) {
                    i--;
                } else {
                    values.push(new Vector3D(x, 0, z));
                }
            }
            return values;
        }

        private createRandomPoint2(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var pos: Vector3D;
            var tempR: number;
            var theta: number;
            for (var i: number = 0; i < num; i++) {
                pos = new Vector3D();
                tempR = Math.sqrt(Math.random()) * r;
                theta = Math.random() * 360;
                pos.x = tempR * Math.sin(theta);
                pos.z = tempR * Math.cos(theta);
                pos.y = 0;
                values.push(pos);
            }
            return values;
        }
    }
                
    /**
    * @private
    * 贝塞尔曲线, 以Y为平面, parameters = [p0, p1, p2, p3]
    */
    class BezierCurveValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;


        public calculate(num: number, ...parameters): any {
            var values: Vector3D[] = [];
            //var tmpPar = parameters[0];
            var tmpPar: Vector3D[] = [];
            tmpPar.push(new Vector3D(0, 0, 0));
            tmpPar.push(new Vector3D(-200, 1000, 700));
            tmpPar.push(new Vector3D(200, -50, 300));
            tmpPar.push(new Vector3D(-300, -220, 500));

            var p0: Vector3D = tmpPar[0];
            var p1: Vector3D = tmpPar[1];
            var p2: Vector3D = tmpPar[2];
            var p3: Vector3D = tmpPar[3];
            var t: number;
            var yt: number;
            var x: number;
            var y: number;
            var z: number;
            for (var i: number = 0; i < num; i++) {
                t = Math.random();
                yt = 1 - t;
                x = p0.x * yt * yt * yt + 3 * p1.x * yt * yt * t + 3 * p2.x * yt * t * t + p3.x * t * t * t;
                y = p0.y * yt * yt * yt + 3 * p1.y * yt * yt * t + 3 * p2.y * yt * t * t + p3.y * t * t * t;
                z = p0.z * yt * yt * yt + 3 * p1.z * yt * yt * t + 3 * p2.z * yt * t * t + p3.z * t * t * t;
                values.push(new Vector3D(x, y, z));
            }
            return values;
        }
    }
                
    /**
    * @private
    */
    export class Value {
        private emitter: any = {};
        private static _instance: Value = new Value();
        constructor() {
            //this.emitter[ValueType.constValue] = new ConstValueShape();
            //this.emitter[ValueType.line] = new LineValueShape();
            //this.emitter[ValueType.plane] = new PlaneValueShape();
            //this.emitter[ValueType.cube3D] = new CubeVector3DValueShape();
            //this.emitter[ValueType.sphere] = new BallValueShape();
            //this.emitter[ValueType.sphere_plane] = new BallSurfaceValueShape();
            //this.emitter[ValueType.cylinder] = new CylinderValueShape();
        }

        public static calculate(count: number, valueShape: ValueShape):Array<any> {
            return valueShape.calculate(count, valueShape);
        }

        public static getValues(count: number, valueType: ValueType, parameters ) {
        }
    }

}