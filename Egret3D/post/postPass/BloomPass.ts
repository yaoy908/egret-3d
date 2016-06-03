module egret3d {
    export class BloomPass implements IPost{

        public drawRectangle: Rectangle;

        private postRender: PostRender;
        private gaussPass:GaussPass;

        private _debugHud: HUD = new HUD();
        constructor() {
            this.postRender = new PostRender("hud_vs", "bloom_fs");
            this.postRender.setRenderToTexture(256, 256, FrameBufferFormat.FLOAT_RGBA);

            this.gaussPass = new GaussPass();

            this._debugHud.fsShader = "hud_H_fs";
            this._debugHud.x = 512+256;
            this._debugHud.y = 0;
            this._debugHud.width = 128;
            this._debugHud.height = 128;
        }

        public drawTexture(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle, posList: any) {
            this.postRender.draw(time, delay, context3D, collect, camera, backViewPort, posList);

            this._debugHud.viewPort = camera.viewPort;
            this._debugHud.diffuseTexture = posList["colorTexture"] ;
            this._debugHud.draw(context3D);

            posList["bloomPass"] = this.postRender.renderTexture;
            posList["end"] = posList["colorTexture"] ;

            this.gaussPass.drawTexture( time, delay , context3D , collect , camera , backViewPort , posList );
        }
    }
}