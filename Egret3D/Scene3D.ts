module egret3d {

    /**
    * @private
    */
    export class Scene3D extends Object3D {
        public collect: EntityCollect;
        public _sky: Sky;
        public _sphereSky: SphereSky;
        constructor() {
            super();
            this.collect = new EntityCollect(this);
        }

        /**
      * @language zh_CN
      * 设置天空盒子
      * 设置天空盒子，天空盒子的类型有 cubesky 和 spheresky 两种类型，其中 spheresky 是属于360天空全景照片使用
      * @param value {Sky} 天空盒子
      * @version Egret 3.0
      * @platform Web,Native
      */
        public set sky(value: Sky) {
            this._sky = value;
            if (this._sky) {
               this.addChild(this._sky);
               this._sky.isVisible = false;
            }
        }

        /**
        * @language zh_CN
        * 返回天空盒子
        * 设置天空盒子，天空盒子的类型有 cubesky 和 spheresky 两种类型，其中 spheresky 是属于360天空全景照片使用
        * @returns {Sky}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get sky(): Sky {
            return this._sky;
        }

        /**
        * @language zh_CN
        * 设置天空球
        * 设置天空盒子，天空盒子的类型有 cubesky 和 spheresky 两种类型，其中 spheresky 是属于360天空全景照片使用
        * @param value {SphereSky} 天空球
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set sphereSky(value: SphereSky) {
            this._sphereSky = value;
            if (this._sphereSky) {
                //this.addChild(this._sphereSky);
                //this._sky.isVisible = false;
            }
        }

        /**
        * @language zh_CN
        * 设置天空球
        * 设置天空盒子，天空盒子的类型有 cubesky 和 spheresky 两种类型，其中 spheresky 是属于360天空全景照片使用
        * @param value {SphereSky} 天空球
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get sphereSky(): SphereSky {
            return this._sphereSky;
        }


    }
} 