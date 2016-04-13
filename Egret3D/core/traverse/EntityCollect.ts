module egret3d {
            
    /**
    * @private
    * @class egret3d.EntityCollect
    * @classdesc
    * Object3D 渲染对象收集器,把渲染对象进行可视筛选，
    * 并且划分渲染层级，依次排序到加入列表.
    *
    * @see egret3d.Scene3D
    * @see egret3d.View3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EntityCollect extends CollectBase {


        private _normalRenderItems: Array<IRender> = [] ;
        private _alphaRenderItems: Array<IRender> = [] ;

        /**
        * @language zh_CN
        * constructor
        * @param root 渲染根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        private applyRender(child: any, camera: Camera3D) {
            if (!child.visible) {
                return;
            }

            if ( child["material"] )
                this.addRenderList(<IRender>child, camera);

            for (var i: number = 0; i < child.childs.length; i++) {
                this.applyRender(child.childs[i], camera);
            }
        }

        private addRenderList(renderItem: IRender, camera: Camera3D) {

            if (renderItem.enableCulling) {
                if (!camera.isVisibleToCamera(renderItem)) {
                    return;
                }
                this.renderList.push(renderItem);
            }

            if (renderItem.enablePick) {
                this.mousePickList.push(renderItem);
            }

            //var layer: Layer = this.findLayer(renderItem);
            //var tag: Tag = this.findTag(renderItem);

            if (renderItem.material != null && renderItem.material.materialData.alphaBlending) {
                //layer.alphaObjects.push(renderItem);
                this._alphaRenderItems.push(renderItem);
            }
            else {
                this._normalRenderItems.push(renderItem);
            }
        }
                
        /**
        * @language zh_CN
        * 数据更新 处理需要渲染的对象
        * @param camera 当前摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(camera: Camera3D) {
            super.update(camera);
            this._normalRenderItems.length = 0;
            this._alphaRenderItems.length = 0;
            this.renderList.length = 0;
            this.mousePickList.length = 0;

            this.clearLayerList();
            this.applyRender(this.rootScene.root, camera);

            for (var i: number = 0; i < this._normalRenderItems.length; ++i) {
                this.renderList.push(this._normalRenderItems[i]);
            }
            for (var i: number = 0; i < this._alphaRenderItems.length; ++i) {
                this.renderList.push(this._alphaRenderItems[i]);
            }

            //for (var i: number = 0; i < this._layerTags.length; ++i) {
            //    this._layerTags[i].clearDepth = true;
            //    for (var j: number = 0; j < this._layerTags[i].layers.length; ++j) {
            //        for (var k: number = 0; k < this._layerTags[i].layers[j].objects.length; ++k) {
            //            this.renderList.push(this._layerTags[i].layers[j].objects[k]);
            //        }

            //        this._layerTags[i].layers[j].alphaObjects.sort((a: Object3D, b: Object3D) => this.sort(a, b, camera));
            //        for (var k: number = 0; k < this._layerTags[i].layers[j].alphaObjects.length; ++k) {
            //            this.renderList.push(this._layerTags[i].layers[j].alphaObjects[k]);
            //        }
            //    }
            //}
        }

       // protected findLayer(renderItem: IRender): Layer {
       //     var typeIndex: number = renderItem.layer >> 24;
       //     var layerIndex: number = renderItem.layer & 0x00FFFFFF;
       //     if (typeIndex < this._layerTags.length && typeIndex >= 0) {
       //         if (layerIndex < this._layerTags[typeIndex].layers.length && layerIndex >= 0) {
       //             return this._layerTags[typeIndex].layers[layerIndex];
       //         }
       //     }
       //     return this._layerTags[0].layers[0];
       // }

       // protected findTag(object3d: Object3D): Tag {
       //     var typeIndex: number = object3d.layer >> 24;
       //     if (typeIndex < this._layerTags.length && typeIndex >= 0) {
       //         return this._layerTags[typeIndex];
       //     }
       //     return this._layerTags[0];
       // }

        protected clearLayerList() {
           //for (var i: number = 0; i < this._layerTags.length; ++i) {
           //    for (var j: number = 0; j < this._layerTags[i].layers.length; ++j) {
           //        this._layerTags[i].layers[j].objects.length = 0;
           //        this._layerTags[i].layers[j].alphaObjects.length = 0;
           //    }
           //}
       }

        protected sort(a: Object3D, b: Object3D, camera: Camera3D) {
            var dis_0: number = Vector3D.distance(a.globalPosition, camera.position);
            var dis_1: number = Vector3D.distance(b.globalPosition, camera.position);
            if (dis_0 > dis_1) {
                return -1;
            }
            else if (dis_0 < dis_1) {
                return 1;
            }

            return 0;
        }
    }
}