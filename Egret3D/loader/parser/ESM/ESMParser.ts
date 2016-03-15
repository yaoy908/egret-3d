module egret3d {

    /**
     * @private 
     * data format describe;
     */
    export enum ESMDataFormat {
        DATA_FORMAT_STATIC_MODEL = 0x00000001,
        DATA_FORMAT_SKELETAL_ANIM_MODEL = 0x00000002,
        DATA_FORMAT_EXPORT_MESH = 0x00000004,
        DATA_FORMAT_EXIST_VERTEX_POS = 0x00000008,
        DATA_FORMAT_EXIST_VERTEX_NORMAL = 0x00000010,
        DATA_FORMAT_EXIST_VERTEX_TANGENT = 0x00000020,
        DATA_FORMAT_EXIST_VERTEX_COLOR = 0x00000040,
        DATA_FORMAT_EXIST_VERTEX_UV1 = 0x00000080,
        DATA_FORMAT_EXIST_VERTEX_UV2 = 0x00000100,
        DATA_FORMAT_EXIST_SKELETAL_DATA = 0x00000200,
        DATA_FORMAT_EXIST_WEIGHTS_DATA = 0x00000400
    }
    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ESMParser
     * @classdesc
     * 用 ESMParser 类 解析.esm 文件
     */
    export class ESMParser {

        /**
          * @language zh_CN
          * 从二进制流中解析出模型Geometry信息
          * @param datas 加载的二进制流
          * @returns GeometryBase
          */
        public static parse(datas: ArrayBuffer): Geometry {

            var bytes: ByteArray = new ByteArray(datas);
            var version: number = bytes.readUnsignedInt();
            var geomtryData: GeometryData = new GeometryData();
            ESMVersion.versionDictionary[version](bytes, geomtryData);
            var geomtry: Geometry;
            var vertexFormat: number = 0;
            if (geomtryData.source_skinData.length > 0) {
                vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_SKIN;
                geomtry = GeometryData.buildGeomtry(geomtryData, vertexFormat);
            }
            else {
                vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1;
                geomtry = GeometryData.buildGeomtry(geomtryData, vertexFormat);
            }
            return geomtry;
        }
    }
}