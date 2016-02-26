module egret3d_dev {
                                
    /**
    * @private
    * @class egret3d_dev.DepthRender
    * @classdesc
    * 深度渲染器 渲染场景中的实体对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DepthRender extends RenderBase {
                        
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
              super();
        }
                                                
        /**
        * @language zh_CN
        * 提交数据给GPU渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, viewPort: Rectangle) {

            this._numEntity = collect.renderList.length;

            for (this._renderIndex = 0; this._renderIndex < this._numEntity; this._renderIndex++) {
                collect.renderList[this._renderIndex].update(time, delay, camera);

                if (!collect.renderList[this._renderIndex].isVisible) {
                    continue;
                }

                if (collect.renderList[this._renderIndex].material != null) {
                    //collect.renderList[this._renderIndex].material.renderDepthPass(context3D, camera, collect.renderList[this._renderIndex].modelMatrix, this._renderList[this._renderIndex].geometry, this._renderList[this._renderIndex].animation);
                }
            }
        }

    }
} 