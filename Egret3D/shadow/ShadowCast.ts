module egret3d {
    export class ShadowCast {
        private static _enable: boolean = false; 

        public shadowRender: RenderBase; 
        public static enableShadow(flag: boolean) {
            this._enable = flag; 
        }

        private init() {
            this.shadowRender 
        }

    }
}