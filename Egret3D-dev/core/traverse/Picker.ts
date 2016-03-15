module egret3d_dev {

    /**
    * @class egret3d_dev.Picker
    * @classdesc
    * 射线对场景中的实体对像进行检测。</p>
    * 以摄像机向场景中产生的一条射线对所有场景中的对象进行拾取。</p>
    * 根据性能的需要分为几种拣选类型。</p>
    * 1.包围盒拣选。</p>
    * 2.模型拣选返回模型拣选到的位置。</p>
    * 3.模型拣选返回模型拣选到的UV坐标。</p>
    *
    * @see egret3d_dev.Ray
    * @see egret3d_dev.PickType
    *
    * 示例:鼠标拣选模型,拣选到的进行绕Y轴旋转
    * @includeExample core/traverse/Picker.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Picker {
        protected static ray: Ray = new Ray();

        /**
        * @language zh_CN
        * 返回鼠标拾取对象得到的所有对象,调用之前到设置被拣选对象的pickType.
        * @param camera 当前相机
        * @param objects 检测的对象列表
        * @returns 拾取的object列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static pickObject3DList(view: View3D, camera: Camera3D, objects: Array<IRender>): Array<IRender> {
            var ret: Array<IRender> = new Array<IRender>();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(view.width, view.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);

          
            for (var i: number = 0; i < objects.length; ++i) {
                var renderItem: IRender = objects[i];
                var inPos: Vector3D = new Vector3D();
                switch (renderItem.pickType) {
                    case PickType.BoundPick:
                        if (renderItem.bound != null) {
                            var target: PickResult = new PickResult();
                            var result = ray.IntersectMesh(renderItem.bound.vexData, renderItem.bound.indexData, renderItem.bound.vexLength, renderItem.bound.indexData.length / 3, 0, renderItem.modelMatrix, target);
                            if (result) {
                                ret.push(objects[i]);
                            }
                        }
                        break;
                    case PickType.PositionPick:
                        //if (ray.IntersectMeshEx(renderItem, 13, renderItem.pickResult)) {
                        //    var target: PickResult = new PickResult();
                        //    ret.push(objects[i]);
                        //}
                        break;
                    case PickType.UVPick:
                        //if (ray.IntersectMeshEx(mesh, 13, mesh.pickerData)) {
                        //    var target: PickResult = new PickResult();
                        //    ret.push(objects[i]);
                        //}
                        break;
                }
            }
            return ret;
        }
    }
}