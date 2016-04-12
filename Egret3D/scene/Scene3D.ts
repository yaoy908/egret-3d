module egret3d {

    /**
    * @private
    */
    export class Scene3D {
        private _tree: TreeBase; 
        private _root: Object3D = new Object3D();
        private _quad: QuadRoot;
        constructor() {
            this._tree = new TreeBase(this._root);
            this._quad = new QuadRoot(this, 8, 128);
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

        public get quad(): QuadRoot {
            return this._quad;
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

        public removeChild3D(child3D: Object3D) {
            this._root.removeChild(child3D);
            // to do add renderlist tree
        }

        public update() {
        }

        public infrustumList(camera: Camera3D): Object3D[] {
            return this._tree.infrustumList(camera);
        }
    }
} 