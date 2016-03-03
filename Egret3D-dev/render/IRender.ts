module egret3d_dev {
    export interface IRender extends IDispatchEvent{
        subMaterials: { [matID: number]: SubMaterial };
        childs: Array<Object3D>;

        geometry: Geometry;
        material: MaterialBase;
        animation: IAnimation;

        modelMatrix: Matrix4_4;

        pickType: number;
        bound: Bound;
        mouseEnable: boolean;
        mouseChilder: boolean;
        enableCulling: boolean;
        visible: boolean;

        
    }
}