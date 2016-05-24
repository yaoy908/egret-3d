module egret3d {
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