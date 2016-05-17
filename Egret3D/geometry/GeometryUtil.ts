module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.GeometryUtil
    * @classdesc
    * 创建Geometry的功能类
    * @see egret3d.Geometry
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class GeometryUtil {

        /**
        * @language zh_CN
        * 创建一个Geometry对象，指定了顶点的数据结构，但是顶点数据需要额外填充
        * @param vertexFromat 顶点数据格式，默认参数为 VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1
        * @returns Geometry Geometry对象
        * @see egret3d.VertexFormat
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static createGeometry(vertexFromat: VertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1): Geometry {
            var geo: Geometry = new Geometry();
            geo.vertexFormat = vertexFromat;
            return geo;
        }
    }
}