module demo {
    export class EgretMaterialMethodParser {

        public static parse(xml: Node): ecore.MaterialMethodData {
            if (xml.childNodes.length == 1)
                return null;

            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            for (i = 0, count = xml.childNodes.length; i < count; i++) {
                item = xml.childNodes[i];
                nodeName = item.nodeName;

                if (nodeName == ecore.MaterialMethodData.lightmapMethod) {
                    var method: ecore.MaterialMethodData = new ecore.MaterialMethodData();
                    method.type = nodeName;
                    EgretSceneXmlParser.eachXmlAttr(item, function (label: string, value: string): void {
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