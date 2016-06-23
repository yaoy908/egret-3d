module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapXmlParser {

        /**
        * @language zh_CN
        * 地图配置信息的版本号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public version: number = 1;
        /**
         * @language zh_CN
         * 节点列表 
         * @version Egret 3.0
         * @platform Web,Native
         */
        public nodeList: Array<MapNodeData> = new Array<MapNodeData>();

        public matDict: any = {};

        private parseMethod(node: Node): MatMethodData[] {
            if (node.childNodes.length <= 1)
                return null;

            var list = [];
            var item: Node;
            var nodeName: string;
            var count: number = 0;
            var method: MatMethodData;
            var attr: Attr = null;
            for (var i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (nodeName == "#text")
                    continue;
                method = new MatMethodData();
                method.type = nodeName;

                for (var j: number = 0; j < item.attributes.length; ++j) {
                    attr = item.attributes[j];
                    var v: string = typeof method[attr.name];
                    if (v == "string") {
                        method[attr.name] = attr.value;
                    }
                    else if (v == "number") {
                        method[attr.name] = Number(attr.value);
                    }
                    else if (v == "boolean") {
                        method[attr.name] = (attr.value == "true" ? true : false);
                    }
                }
               
                list.push(method);
            }
            return list;
        }

        private parseMat(node: Node): MatSphereData {
            if (node.childNodes.length == 0)
                return null;
            var data: MatSphereData = new MatSphereData();

            var attr: Attr = null;
            for (var i: number = 0; i < node.attributes.length; ++i) {
                attr = node.attributes[i];
                data[attr.name] = attr.value;
            }

            var item: Node;
            var nodeName: string;
            var count: number = 0;
            for (var i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (nodeName == "#text") {
                    continue;
                }

                if (nodeName == "methods") {
                    data.methods = this.parseMethod(item);
                }
                else if (nodeName == "uvRectangle") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        data.uvRectangle[item.attributes[j].name] = Number(item.attributes[j].value);
                    }
                }
                else if (nodeName == "blendMode") {
                    data[item.nodeName] = BlendMode[item.textContent];
                }
                else {
                    var v: string = typeof data[item.nodeName];
                    if (v == "string") {
                        data[item.nodeName] = item.textContent;
                    }
                    else if (v == "number") {
                        data[item.nodeName] = Number(item.textContent);
                    }
                    else if (v == "boolean") {
                        data[item.nodeName] = (item.textContent == "true" ? true : false);
                    }
                }

                //if (nodeName == "diffuseTextureName") {
                //    data.diffuseTextureName = item.textContent;
                //} else if (nodeName == "normalTextureName") {
                //    data.normalTextureName = item.textContent;
                //} else if (nodeName == "specularTextureName") {
                //    data.specularTextureName = item.textContent;
                //} else if (nodeName == "diffuseColor") {
                //    data.diffuseColor = Number(item.textContent);
                //} else if (nodeName == "ambientColor") {
                //    data.ambientColor = Number(item.textContent);
                //} else if (nodeName == "specularColor") {
                //    data.specularColor = Number(item.textContent);
                //} else if (nodeName == "alpha") {
                //    data.alpha = Number(item.textContent);
                //} else if (nodeName == "specularLevel") {
                //    data.specularLevel = Number(item.textContent);
                //} else if (nodeName == "gloss") {
                //    data.gloss = Number(item.textContent);
                //} else if (nodeName == "ambientPower") {
                //    data.ambientPower = Number(item.textContent);
                //} else if (nodeName == "diffusePower") {
                //    data.diffusePower = Number(item.textContent);
                //} else if (nodeName == "normalPower") {
                //    data.normalPower = Number(item.textContent);
                //} else if (nodeName == "castShadow") {
                //    data.castShadow = String(item.textContent) == "true";
                //} else if (nodeName == "acceptShadow") {
                //    data.acceptShadow = String(item.textContent) == "true";
                //} else if (nodeName == "smooth") {
                //    data.smooth = String(item.textContent) == "true";
                //} else if (nodeName == "repeat") {
                //    //data.repeat = String(item.textContent) == "true";
                //    data.repeat = true;
                //} else if (nodeName == "bothside") {
                //    data.bothside = String(item.textContent) == "true";
                //} else if (nodeName == "drawMode") {
                //    data.drawMode = Number(item.textContent);
                //} else if (nodeName == "cullMode") {
                //    data.cullMode = Number(item.textContent);
                //} else if (nodeName == "blendMode") {
                //    data.blendMode = BlendMode[item.textContent];
                //} else if (nodeName == "cutAlpha") {
                //    data.cutAlpha = Number(item.textContent);
                //} 
            }

            return data;
        }

        constructor(data: any) {

            var versionList: NodeList = data.getElementsByTagName("version");
            this.version = Number(versionList[0].textContent);

            var matList: NodeList = data.getElementsByTagName("mat");
            var nodeList: NodeList = data.getElementsByTagName("node");
            var environment: NodeList = data.getElementsByTagName("env");
            var cameraAnimList: NodeList = data.getElementsByTagName("cameraAnims");

            for (var i: number = 0; i < matList.length; i++) {
                var matNodeData = this.parseMat(matList[i]);
                if (matNodeData) {
                    this.matDict[matNodeData.id] = matNodeData;
                }
            }

            for (var i: number = 0; i < nodeList.length; i++) {
                var mapNodeData:MapNodeData = this.parseNode(nodeList[i]);
                if (mapNodeData) {
                    this.nodeList.push(mapNodeData);
                }
            }

            for (var i: number = 0; i < this.nodeList.length; i++) {
                var mapNodeData: MapNodeData = this.nodeList[i];

                if (mapNodeData.type == "Camera3D") {
                    var camera: Camera3D = new Camera3D();
                    camera.fieldOfView = Number(mapNodeData.fov);
                    mapNodeData.object3d = camera;

                }
                else {
                    mapNodeData.object3d = new Object3D();
                }
                mapNodeData.object3d.name = mapNodeData.name; 
                mapNodeData.object3d.position = new Vector3D(mapNodeData.x, mapNodeData.y, mapNodeData.z);
                mapNodeData.object3d.orientation = new Quaternion(mapNodeData.rx, mapNodeData.ry, mapNodeData.rz, mapNodeData.rw);
                mapNodeData.object3d.scale = new Vector3D(mapNodeData.sx, mapNodeData.sy, mapNodeData.sz);
            }

            this.processNode();
        }

        private processNode() {
            for (var i: number = 0; i < this.nodeList.length; i++) {
                var mapNodeData0: MapNodeData = this.nodeList[i];
                for (var j: number = 0; j < this.nodeList.length; j++) {
                    var mapNodeData1: MapNodeData = this.nodeList[j];
                    if (mapNodeData0.parent == mapNodeData1.insID) {
                        mapNodeData1.object3d.addChild(mapNodeData0.object3d);
                        break;
                    }
                }
            }
        }

        private parseNode(node: Node):MapNodeData {
            if (node.childNodes.length == 1)
                return null;

            var attr: Attr = null;

            var data: MapNodeData = new MapNodeData();

            for (var i: number = 0; i < node.attributes.length; ++i) {
                attr = node.attributes[i];
                data[attr.nodeName] = attr.value;
            }

            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            for (i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;

                if (nodeName == "pos") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "rot") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "scale") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "mat") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        if (attr.nodeName == "id") {
                            data.materialIDs = (attr.value + "").split(",");
                        }
                    }
                }
                else if (nodeName == "skinClip") {
                    var skinClipData: any = {};
                    data.skinClips.push(skinClipData);
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        skinClipData[attr.nodeName] = attr.value;
                    }
                }
                else if (nodeName == "propertyAnim") {
                    var propertyAnimsData: any = {};
                    data.propertyAnims.push(propertyAnimsData);
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        propertyAnimsData[attr.nodeName] = attr.value;
                    }
                }
                //else if (nodeName == "lightIds") {
                //    if (item.textContent == null || item.textContent == "") {
                //        data.lightIds = [];
                //    } else if (item.textContent.indexOf(",") == -1) {
                //        data.lightIds = [item.textContent];
                //    } else {
                //        data.lightIds = (item.textContent + "").split(",");
                //    }
                //}
            }

            ////使外部使用更方便
            //if (data.skinClips == null) {
            //    data.skinClips = [];
            //}
            //if (data.lightIds == null) {
            //    data.lightIds = [];
            //}
            //for (var i: number = 0; i < data.lightIds.length; i++) {
            //    data.lightIds[i] = Number(data.lightIds[i]);
            //}
            //if (data.lightIds.indexOf(0) == -1) {
            //    data.lightIds.push(0);//平行光默认被追加
            //}
            ////
            //if (data.materialIDs == null) {
            //    data.materialIDs = [];
            //}
            //for (var i: number = 0; i < data.materialIDs.length; i++) {
            //    data.materialIDs[i] = Number(data.materialIDs[i]);
            //}


            return data;
        }
    }
}