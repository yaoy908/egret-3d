module egret3d {
    export class EgretMaterialMethodParser {

     /**
     * @language zh_CN
     * @class egret3d.EgretMaterialMethodParser
     * @classdesc
     * 解析材质球渲染的method数据
     *
     * @version Egret 3.0
     * @platform Web,Native
     */


         /**
         * @language zh_CN
         * 解析单个材质球渲染的method数据，一个材质球下面会有多个MaterialMethodData
         * @param xml 材质球信息记录xml
         * @returns MaterialMethodData
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static parse(xml: Node): MaterialMethodData {
            if (xml.childNodes.length == 1)
                return null;

            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            for (i = 0, count = xml.childNodes.length; i < count; i++) {
                item = xml.childNodes[i];
                nodeName = item.nodeName;

                if (nodeName == MaterialMethodData.lightmapMethod) {
                    var method: MaterialMethodData = new MaterialMethodData();
                    method.type = nodeName;
                    EgretMapXmlParser.eachXmlAttr(item, function (label: string, value: string): void {
                        if (label == "texture") {
                            method.texture = value;
                        } else if (label == "usePower") {
                            method.usePower = (value + "").toLocaleLowerCase() == "true";
                        }
                    });

                    return method;

                }
            }
            return null;
        }


    }
}