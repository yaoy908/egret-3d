module egret3d_dev {
                            
    /**
    * @private
    * @class egret3d_dev.SphereSky
    * @classdesc
    * default render
    * 把所有需要渲染的对象，依次进行渲染
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DefaultRender extends RenderBase {
              
        
        private _renderItem: IRender; 
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super();
        }


        /**
        * @language zh_CN
        * 把所有需要渲染的对象，依次进行渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D) {
            this._numEntity = collect.renderList.length;

            //if (collect.rootNode._sky) {
            //    collect.rootNode.sky.draw(context3D, camera );
            //}
            //else if (collect.rootNode._sphereSky) {
            //    collect.rootNode._sphereSky.draw(context3D, camera );
            //}

            context3D.clearDepth(1);
             
            for (this._renderIndex = 0; this._renderIndex < this._numEntity; this._renderIndex++) {
                this._renderItem = collect.renderList[this._renderIndex] ;
                //collect.renderList[this._renderIndex].update(time, delay, camera);
                if (!this._renderItem.visible) {
                    continue;
                }
                //if (collect.renderList[this._renderIndex].tag && collect.renderList[this._renderIndex].tag.clearDepth && collect.renderList[this._renderIndex].tag.cleanState) {
                //    collect.renderList[this._renderIndex].tag.cleanState = false;
                //    context3D.clearDepth(1);
                //}
                this._renderItem.renderDiffusePass(time, delay, context3D, camera);
            }
        }
    }
} 

