module demo {
    export class EgretConfig {

        public static ScenePath: string = "resource/scene/";
        public static MapFile: string = "MapConfig.xml";

        public static EsmSuffix: string = ".esm";
        public static EcaSuffix: string = ".eca";
        public static EamSuffix: string = ".eam";

        //是否播放相机动画
        public static EnableCameraAnim: boolean = true;
        //是否显示坐标轴（红绿蓝XYZ）
        public static EnableAxisMesh: boolean = false;
        public static PointLightAxisMeshSize: number = 2;

        constructor() {
        }
       
    }

}