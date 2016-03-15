module egret3d {
    export class TreeBase {
        private _root: Object3D;
        private _searchList: Array<Object3D> = new Array<Object3D>() ; 
        constructor(object3D: Object3D) {
            this._root = object3D; 
        }

        public infrustumList(camera: Camera3D): Object3D[] {
            this._searchList.length = 0; 
            return this._searchList ;
        }
    }
}