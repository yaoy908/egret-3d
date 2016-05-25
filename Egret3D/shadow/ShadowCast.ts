module egret3d {

    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ShadowCast {
        private static _enable: boolean = false; 

        public shadowRender: RenderBase[]; 

        //使用阴影
        public static enableShadow(flag: boolean) {
            this._enable = flag; 
        }

        private init() {
            this.shadowRender = [];
            
        }

        public castShadowLight() {
            //this.shadowRender.push(new ShadowRender());
        }
    }
}