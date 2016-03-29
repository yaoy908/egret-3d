module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Wireframe
     * @classdesc
     * 渲染线框
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
            super(geometry, new ColorMaterial(0xffff0000));
            this.material.drawMode = DrawMode.LINES;
        }

        /**
        * @language zh_CN
        * 数据更新，不前对象的旋转和摄像机的旋转一致
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {

        }
    }
}