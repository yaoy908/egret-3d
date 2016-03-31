module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Wireframe
     * @classdesc
     * 渲染线框 以线的形式渲染顶点
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Wireframe extends Mesh {

        /**
         * @language zh_CN
         * @param geometry 
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(geometry: Geometry) {
            super(geometry, new ColorMaterial(0xff0000));
            this.material.drawMode = DrawMode.LINES;
        }
    }
}