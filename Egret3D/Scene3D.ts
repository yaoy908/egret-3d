module egret3d {

    /**
    * @private
    */
    export class Scene3D  {
        public collect: EntityCollect;
        public _sky: Sky;
        public _sphereSky: SphereSky;

        private _root: Object3D = new Object3D();
        constructor() {
            this.collect = new EntityCollect(this);
        }
        
        /**
        * @language zh_CN
        * 返回渲染根节点
        * 返回渲染场景的 scene3D 
        * @returns Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get root(): Object3D {
            return this._root;
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
                this._root.addChild(this._sky);
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

        /**
        * @language zh_CN
        * 将一个 Object3D 实例添加到 Scene3D 实例中。
        * 将一个 Object3D 实例添加到 Scene3D 实例中。参与scene3D中的显示树优化，并且即时渲染出来
        * @param  child3D {Object3D}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild3D(child3D: Object3D) {
            this._root.addChild(child3D);
            // to do add renderlist tree
        }
    }
} 