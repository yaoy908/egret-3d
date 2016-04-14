module egret3d {

    /**
     * @private
     * @language zh_CN
     * 手机朝向
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum Orientation {
        Portrait_Primary = 0,
        Portrait_Secondary = 180,
        Landscape_Primary = -90,
        Landscape_Secondary = 90,
    }

    /**
    * @language zh_CN
    * @class egret3d.MouseEvent3D
    * @classdesc
    * OrientationEvent3D 是所有引擎中可重力感应事件节点的事件类型标记。
    * 只有Input.addEventListener 才会产生下类事件
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class OrientationEvent3D extends Event3D {
        /**
         * @language zh_CN
         * ORIENTATION_CHANGE 常量定义 onOrientationChange 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static ORIENTATION_CHANGE: string = "onOrientationChange";
        /**
         * @language zh_CN
         * DEVICE_MOTION 常量定义 onDeviceMotion 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DEVICE_MOTION: string = "onDeviceMotion";
        /**
         * @language zh_CN
         * DEVICE_ORIENTATION 常量定义 onDeviceOrientation 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DEVICE_ORIENTATION: string = "onDeviceOrientation";

       
        private _orientation: Orientation;
        /**
         * @language zh_CN
         * 获取当前横竖屏枚举值,枚举值为其对应角度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get orientation(): Orientation {
            var value = <number>window.orientation;
            return <Orientation>value;
        }


        private _acceleration: DeviceAcceleration;
        /**
         * @language zh_CN
         * 获取排除重力影响的加速度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get acceleration(): DeviceAcceleration {
            return this._acceleration;
        }
        /**
         * @language zh_CN
         * 设置排除重力影响的加速度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set acceleration(deviceAcceleration: DeviceAcceleration) {
            this._acceleration = deviceAcceleration;
        }
        private _accelerationIncludingGravity: DeviceAcceleration;
         /**
         * @language zh_CN
         * 获取受到重力影响的加速度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get accelerationIncludingGravity(): DeviceAcceleration {
            return this._accelerationIncludingGravity;
        }
         /**
         * @language zh_CN
         * 设置受到重力影响的加速度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set accelerationIncludingGravity(deviceAcceleration: DeviceAcceleration) {
            this._accelerationIncludingGravity = deviceAcceleration;
        }

        private _rotationRate: DeviceRotationRate;
        
        /**
         * @language zh_CN
         * 获取旋转速率
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get rotationRate(): DeviceRotationRate {
            return this._rotationRate;
        }
        /**
         * @language zh_CN
         * 设置旋转速率
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set rotationRate(deviceRotationRate: DeviceRotationRate) {
            this._rotationRate = deviceRotationRate;
        }


        private _absolute: boolean;
        /**
         * @language zh_CN
         * 获取是否是绝对旋转重力方向
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get absolute(): boolean {
            return this._absolute;
        }

        /**
         * @language zh_CN
         * 设置是否是绝对旋转重力方向
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set absolute(value: boolean) {
            this._absolute = value;
        }
        private _alpha: number;
        /**
         * @language zh_CN
         * 获取Alpha旋转，围绕Z轴旋转，即水平方向旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get alpha(): number {
            return this._alpha;
        }
        /**
         * @language zh_CN
         * 设置Alpha旋转，围绕Z轴旋转，即水平方向旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set alpha(value: number) {
            this._alpha = value;
        }
        private _beta: number;
        /**
         * @language zh_CN
         * 获取Beta旋转，围绕X轴旋转，即前后方向旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get beta(): number {
            return this._beta;
        }
        /**
         * @language zh_CN
         * 设置Beta旋转，围绕X轴旋转，即前后方向旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set beta(value: number) {
            this._beta = value;
        }
        private _gamma: number;
        /**
         * @language zh_CN
         * 获取Gamma旋转，围绕Y轴旋转，即左右方向旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get gamma(): number {
            return this._gamma;
        }
        /**
         * @language zh_CN
         * 设置Gamma旋转，围绕Y轴旋转，即左右方向旋转
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set gamma(value: number) {
            this._gamma = value;
        }
    }
} 