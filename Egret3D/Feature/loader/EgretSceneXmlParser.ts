module demo {
    export class EgretSceneXmlParser {
        public esmList: Array<ecore.MeshData>;
        public materialList: Array<ecore.MaterialData>;
        public ecaList: Array<string>;
        public eamList: Array<string>;

        public dirLightDatas: Array<ecore.DirectionLightData>;
        public pointLightDatas: Array<ecore.PointLightData>;

        public enableDirectLight: boolean;
        public enablePointLight: boolean;

        public texturePath: string;
        public esmPath: string;
        public ecaPath: string;
        public eamPath: string;

        public sceneName: string;

        

        public constructor() {
        }

        private parsingXML(xmlString: string): any {
            var xmlDoc = null;
            ///判断浏览器的类型
            ///支持IE浏览器 
            if (!window["DOMParser"] && window["ActiveXObject"]) {   ///window.DOMParser 判断是否是非ie浏览器
                var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
                for (var i = 0; i < xmlDomVersions.length; i++) {
                    try {
                        xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                        xmlDoc.async = false;
                        xmlDoc.loadXML(xmlString); ///loadXML方法载入xml字符串
                        break;
                    } catch (e) {
                    }
                }
            }
            ///支持Mozilla浏览器
            else if (window["DOMParser"] && document.implementation && document.implementation.createDocument) {
                try {
                    /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                     * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                     * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                     * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                     */
                    var domParser = new DOMParser();
                    xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
                } catch (e) {
                }
            }
            else {
                return null;
            }

            return xmlDoc;
        }

            

        private reset(): void {
            this.ecaList = [];
            this.eamList = [];
            this.materialList = [];
            this.esmList = [];

            this.pointLightDatas = new Array<ecore.PointLightData>();
            this.dirLightDatas = new Array<ecore.DirectionLightData>();
            this.texturePath = this.esmPath = this.ecaPath = null;

            
        }
        //解析xml
        public parseXml(sceneName:string, text: string): void {
            this.reset();
            //
            this.sceneName = sceneName;
            var obj = this.parsingXML(text);


            var texturePathList: NodeList = obj.getElementsByTagName("texturePath");
            var modelPathList: NodeList = obj.getElementsByTagName("modelPath");
            var ecaPathList: NodeList = obj.getElementsByTagName("ecaPath");
            var eamPathList: NodeList = obj.getElementsByTagName("eamPath");

            var matList: NodeList = obj.getElementsByTagName("mat");
            var meshList: NodeList = obj.getElementsByTagName("mesh");
            var environment: NodeList = obj.getElementsByTagName("env");

            this.parseEnvironment(environment);
            


            this.texturePath = texturePathList[0].attributes[0].value;
            this.esmPath = modelPathList[0].attributes[0].value;
            this.eamPath = eamPathList[0].attributes[0].value;
            this.ecaPath = ecaPathList[0].attributes[0].value;
            //
            var i: number = 0;
            var count: number = 0;
            var item: Node;

            var meshData: ecore.MeshData;
            var materialData: ecore.MaterialData;

            //___________esm
            for (i = 0, count = meshList.length; i < count; i++) {
                item = meshList[i];
                meshData = this.parseMesh(item);
                if (meshData) {
                    this.esmList.push(meshData);
                }
            }

            //___________mat
            for (i = 0, count = matList.length; i < count; i++) {
                item = matList[i];
                materialData = this.parseMaterial(item);
                if (materialData) {
                    this.materialList.push(materialData);
                }
            }

            //___________eca
            this.parseCameraAnim();

            //___________eam
            for (meshData of this.esmList) {
                var clipName: string;
                for (clipName of meshData.skinClips) {
                    if (this.eamList.indexOf(clipName) == -1) {
                        this.eamList.push(clipName);
                    }
                }
            }
 
        }


        //test
        private parseCameraAnim(): void {
            this.ecaList = ["Camera001", "Camera002", "Camera003", "Camera004", "Camera005"];
        }

        public static eachXmlAttr(item: Node, fun: Function): void {
            if (item == null || fun == null)
                return;
            var attr: Attr;
            for (var i: number = 0, count = item.attributes.length; i < count; i++) {
                attr = item.attributes[i];
                fun(attr.nodeName, attr.textContent);
            }
        }

        private eachAttr(item: Node, fun: Function): void {
            EgretSceneXmlParser.eachXmlAttr(item, fun);
        }

        private parseMesh(xml: Node): ecore.MeshData {
            if (xml.childNodes.length == 1)
                return null;
            var data: ecore.MeshData = new ecore.MeshData();

            this.eachAttr(xml, function (label: string, value: string): void {
                if (label == "vertexColor") {
                    data.vertexColor = (value + "").toLocaleLowerCase() == "true";
                }
                else if (label == "name") {
                    data.name = value;
                }
            });

            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            for (i = 0, count = xml.childNodes.length; i < count; i++) {
                item = xml.childNodes[i];
                nodeName = item.nodeName;
                
                if (nodeName == "pos") {
                    this.eachAttr(item, function (label: string, value: string): void {
                        if (label == "x") {
                            data.x = Number(value);
                        } else if (label == "y") {
                            data.y = Number(value);
                        } if (label == "z") {
                            data.z = Number(value);
                        }
                    });

                } else if (nodeName == "rot") {
                    this.eachAttr(item, function (label: string, value: string): void {
                        if (label == "rx") {
                            data.rx = Number(value);
                        } else if (label == "ry") {
                            data.ry = Number(value);
                        } if (label == "rz") {
                            data.rz = Number(value);
                        }
                    });
                } else if (nodeName == "scale") {
                    this.eachAttr(item, function (label: string, value: string): void {
                        if (label == "sx") {
                            data.sx = Number(value);
                        } else if (label == "sy") {
                            data.sy = Number(value);
                        } if (label == "sz") {
                            data.sz = Number(value);
                        }
                    });
                } else if (nodeName == "mat") {
                    this.eachAttr(item, function (label: string, value: string): void {
                        if (label == "id") {
                            data.materialID = Number(value);
                        }
                    });
                } else if (nodeName == "skinClip") {
                    if (item.textContent == null || item.textContent == "") {
                        data.skinClips = [];
                    } else if (item.textContent.indexOf(",") == -1) {
                        data.skinClips = [item.textContent];
                    } else {
                        data.skinClips = (item.textContent + "").split(",");
                    }
                } else if (nodeName == "lightIds") {
                    if (item.textContent == null || item.textContent == "") {
                        data.lightIds = [];
                    } else if (item.textContent.indexOf(",") == -1) {
                        data.lightIds = [item.textContent];
                    } else {
                        data.lightIds = (item.textContent + "").split(",");
                    }
                }
            }

            //使外部使用更方便
            if (data.skinClips == null) {
                data.skinClips = [];
            }
            if (data.lightIds == null) {
                data.lightIds = [];
            }
            for (var i: number = 0; i < data.lightIds.length; i++) {
                data.lightIds[i] = Number(data.lightIds[i]);
            }
            if (data.lightIds.indexOf(0) == -1) {
                data.lightIds.push(0);//平行光默认被追加
            }
            

            return data;
        }


       

        private parseMaterial(xml: Node): ecore.MaterialData {
            if (xml.childNodes.length == 0)
                return null;
            var data: ecore.MaterialData = new ecore.MaterialData();

            this.eachAttr(xml, function (label: string, value: string): void {
                if (label == "id") {
                    data.id = Number(value);
                }
            });


            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            for (i = 0, count = xml.childNodes.length; i < count; i++) {
                item = xml.childNodes[i];
                nodeName = item.nodeName;
                if (nodeName == "#text") {
                    continue;
                }
                if (nodeName == "diffuseTextureName") {
                    data.diffuseTextureName = item.textContent;
                } else if (nodeName == "normalTextureName") {
                    data.normalTextureName = item.textContent;
                } else if (nodeName == "specularTextureName") {
                    data.specularTextureName = item.textContent;
                }else if (nodeName == "diffuseColor") {
                    data.diffuseColor = Number(item.textContent);
                } else if (nodeName == "ambientColor") {
                    data.ambientColor = Number(item.textContent);
                } else if (nodeName == "specularColor") {
                    data.specularColor = Number(item.textContent);
                } else if (nodeName == "alpha") {
                    data.alpha = Number(item.textContent);
                } else if (nodeName == "specularLevel") {
                    data.specularLevel = Number(item.textContent);
                } else if (nodeName == "gloss") {
                    data.gloss = Number(item.textContent);
                } else if (nodeName == "ambientPower") {
                    data.ambientPower = Number(item.textContent);
                } else if (nodeName == "diffusePower") {
                    data.diffusePower = Number(item.textContent);
                } else if (nodeName == "normalPower") {
                    data.normalPower = Number(item.textContent);
                } else if (nodeName == "castShadow") {
                    data.castShadow = String(item.textContent) == "true";
                } else if (nodeName == "acceptShadow") {
                    data.acceptShadow = String(item.textContent) == "true";
                } else if (nodeName == "smooth") {
                    data.smooth = String(item.textContent) == "true";
                } else if (nodeName == "repeat") {
                    //data.repeat = String(item.textContent) == "true";
                    data.repeat = true;
                } else if (nodeName == "bothside") {
                    data.bothside = String(item.textContent) == "true";
                } else if (nodeName == "drawMode") {
                    data.drawMode = Number(item.textContent);
                } else if (nodeName == "cullMode") {
                    data.cullMode = Number(item.textContent);
                } else if (nodeName == "blendMode") {
                    data.blendMode = egret3d.BlendMode[item.textContent];
                } else if (nodeName == "methods") {
                    data.method = EgretMaterialMethodParser.parse(item);
                }

            }


            return data;
        }

        private parseEnvironment(environment: NodeList): void {
            //灯光全局配置
            var dlOpen: boolean;
            var plOpen: boolean;
            this.eachAttr(environment[0], function (label: string, value: string): void {
                
                if (label == "directLight") {
                    dlOpen = value == "open";
                } else if (label == "pointLight") {
                    plOpen = value == "open";
                }
            });

            this.enableDirectLight = dlOpen;
            this.enablePointLight = plOpen;

            //解析灯光
            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            var childNode: Node;
            var i2: number;
            var count2: number;
            for (i = 0, count = environment.length; i < count; i++) {
                item = environment[i];
                for (i2 = 0, count2 = item.childNodes.length; i2 < count2; i2++) {
                    childNode = item.childNodes[i2];
                    if (childNode.nodeName == "#text")
                        continue;
                    if (childNode.nodeName == "sunLight") {
                        
                        var dirLight: ecore.DirectionLightData = new ecore.DirectionLightData();
                        this.dirLightDatas.push(dirLight);

                        this.eachAttr(childNode, function (label: string, value: string): void {
                            if (label == "id") {
                                dirLight.id = Number(value);
                            }
                        });

                        var sunNode: Node;
                        for (var sunI: number = 0, sunCount: number = childNode.childNodes.length; sunI < sunCount; sunI++) {
                            sunNode = childNode.childNodes[sunI];

                            if (sunNode.nodeName == "#text")
                                continue;
                            if (sunNode.nodeName == "direction") {
                                var dirX: number, dirY: number, dirZ: number;
                                this.eachAttr(sunNode, function (label: string, value: string): void {
                                    if (label == "x") {
                                        dirX = Number(value);
                                    } else if (label == "y") {
                                        dirY = Number(value);
                                    } else if (label == "z") {
                                        dirZ = Number(value);
                                    }

                                });
                                dirLight.dirX = dirX;
                                dirLight.dirY = dirY;
                                dirLight.dirZ = dirZ;
                                
                            } else if (sunNode.nodeName == "diffuseColor") {
                                dirLight.diffuseColor = Number(sunNode.textContent);
                            } else if (sunNode.nodeName == "ambientColor") {
                                dirLight.ambientColor = Number(sunNode.textContent);
                            } else if (sunNode.nodeName == "intensity") {
                                dirLight.intensity = Number(sunNode.textContent);
                            } else if (sunNode.nodeName == "halfIntensity") {
                                dirLight.halfIntensity = Number(sunNode.textContent);
                            }

                        }
                         
                    } else if (childNode.nodeName == "pointLight") {
                        var pLight: ecore.PointLightData = new ecore.PointLightData();
                        this.pointLightDatas.push(pLight);

                        this.eachAttr(childNode, function (label: string, value: string): void {
                            if (label == "id") {
                                pLight.id = Number(value);
                            }
                        });

                        var pNode: Node;
                        for (var pI: number = 0, pCount: number = childNode.childNodes.length; pI < pCount; pI++) {
                            pNode = childNode.childNodes[pI];

                            if (pNode.nodeName == "#text")
                                continue;
                            if (pNode.nodeName == "position") {
                                var posX: number, posY: number, posZ: number;
                                this.eachAttr(pNode, function (label: string, value: string): void {
                                    if (label == "x") {
                                        posX = Number(value);
                                    } else if (label == "y") {
                                        posY = Number(value);
                                    } else if (label == "z") {
                                        posZ = Number(value);
                                    }

                                });
                                pLight.posX = posX;
                                pLight.posY = posY;
                                pLight.posZ = posZ;

                            } else if (pNode.nodeName == "diffuseColor") {
                                pLight.diffuseColor = Number(pNode.textContent);
                            } else if (pNode.nodeName == "ambientColor") {
                                pLight.ambientColor = Number(pNode.textContent);
                            } else if (pNode.nodeName == "falloff") {
                                pLight.falloff = Number(pNode.textContent);
                            } else if (pNode.nodeName == "radius") {
                                pLight.radius = Number(pNode.textContent);
                            } else if (pNode.nodeName == "intensity") {
                                pLight.intensity = Number(pNode.textContent);
                            }
                            

                        }
                    } else if (childNode.nodeName == "fog") {

                    }
                   
                }
            }
        }


        public dispose(): void {
            this.materialList = this.esmList = this.eamList = this.ecaList = null;
            this.esmPath = this.texturePath = this.ecaPath = this.eamPath = null;
        }





    }
}

