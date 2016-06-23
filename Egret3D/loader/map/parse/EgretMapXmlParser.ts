module egret3d {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.EgretMapXmlParser
    * @classdesc
    * 解析egret地图xml配置文件的类
    * 用于解析egret地图文件的类，解析完后，该类中保存有xml中所有的信息
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EgretMapXmlParser {

        /**
         * @language zh_CN
         * 地图配置信息的版本号
         * @version Egret 3.0
         * @platform Web,Native
         */
        public version: number = 1;
        /**
         * @language zh_CN
         * 模型文件数据列表
         * @version Egret 3.0
         * @platform Web,Native
         */
        public esmList: Array<MeshData>;

        /**
         * @language zh_CN
         * 材质球数据列表
         * @version Egret 3.0
         * @platform Web,Native
         */
        public materialList: Array<MaterialSphereData>;

        /**
         * @language zh_CN
         * 相机动画文件数据列表
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ecaList: Array<string>;

         /**
         * @language zh_CN
         * 蒙皮文件数据列表
         * @version Egret 3.0
         * @platform Web,Native
         */
        public eamList: Array<string>;

        /**
         * @language zh_CN
         * 光源数据列表
         * @version Egret 3.0
         * @platform Web,Native
         */
        public lightDatas: Array<LightData>;

        /**
         * @language zh_CN
         * 是否开启配置的平行光源
         * @version Egret 3.0
         * @platform Web,Native
         */
        public enableDirectLight: boolean;

        /**
         * @language zh_CN
         * 是否开启配置的点光源
         * @version Egret 3.0
         * @platform Web,Native
         */
        public enablePointLight: boolean;

        /**
         * @language zh_CN
         * 地图名
         * @version Egret 3.0
         * @platform Web,Native
         */
        public sceneName: string;

        
        /**
         * @language zh_CN
         * 构造函数
         * 先创建该parser，然后执行parseXml函数
         * @version Egret 3.0
         * @platform Web,Native
         */
        public constructor() {
        }

        

            

        private init(): void {
            this.ecaList = [];
            this.eamList = [];
            this.materialList = [];
            this.esmList = [];

            this.lightDatas = [];
        }

        /**
         * @language zh_CN
         * 解析xml
         * @param sceneName 地图名
         * @param xml 加载得到的xml字符串
         * @version Egret 3.0
         * @platform Web,Native
         */
        public parseXml(sceneName:string, text: string): void {
            this.init();
            //
            this.sceneName = sceneName;
            var obj = XMLParser.parse(text);

            var versionList: NodeList = obj.getElementsByTagName("version");
            this.version = Number(versionList[0].textContent);

            var matList: NodeList = obj.getElementsByTagName("mat");
            var meshList: NodeList = obj.getElementsByTagName("mesh");
            var environment: NodeList = obj.getElementsByTagName("env");
            var cameraAnimList: NodeList = obj.getElementsByTagName("cameraAnims");

            this.parseEnvironment(environment);
            


            //
            var i: number = 0;
            var count: number = 0;
            var tempNode: Node;

            var meshData: MeshData;
            var materialData: MaterialSphereData;
            var cameraAnim: string;
            //___________esm
            for (i = 0, count = meshList.length; i < count; i++) {
                tempNode = meshList[i];
                meshData = this.parseMesh(tempNode);
                if (meshData) {
                    this.esmList.push(meshData);
                }
            }

            //___________mat
            for (i = 0, count = matList.length; i < count; i++) {
                tempNode = matList[i];
                materialData = this.parseMaterial(tempNode);
                if (materialData) {
                    this.materialList.push(materialData);
                }
            }

            //___________eca
            for (i = 0, count = cameraAnimList[0].childNodes.length; i < count; i++) {
                tempNode = cameraAnimList[0].childNodes[i];
                cameraAnim = this.parseCameraAnim(tempNode);
                if (cameraAnim) {
                    this.ecaList.push(cameraAnim);
                }
            }

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

        private parseCameraAnim(xml: Node): string {
            if(xml.nodeName == "eca")
                return xml.textContent;
            return null;
        }



        private eachAttr(item: Node, fun: Function): void {
            XMLParser.eachXmlAttr(item, fun);
        }

        private parseMesh(xml: Node): MeshData {
            if (xml.childNodes.length == 1)
                return null;
            var data: MeshData = new MeshData();

            this.eachAttr(xml, function (label: string, value: string): void {
                if (label == "name") {
                    data.name = value;
                } else if (label == "billboard") {
                    data.billboard = value == "true";
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
                            data.materialIDs = (value + "").split(",");
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
            //
            if (data.materialIDs == null) {
                data.materialIDs = [];
            }
            for (var i: number = 0; i < data.materialIDs.length; i++) {
                data.materialIDs[i] = Number(data.materialIDs[i]);
            }


            return data;
        }


       

        private parseMaterial(xml: Node): MaterialSphereData {
            if (xml.childNodes.length == 0)
                return null;
            var data: MaterialSphereData = new MaterialSphereData();

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
                    data.blendMode = BlendMode[item.textContent];
                } else if (nodeName == "cutAlpha") {
                    data.cutAlpha = Number(item.textContent);
                } else if (nodeName == "methods") {
                    data.methods = EgretMaterialMethodParser.parse(item);
                } else if (nodeName == "uvRectangle") {
                    this.eachAttr(item, function (label: string, value: string): void {
                        if (label == "x") {
                            data.uvRectangle.x = Number(value);
                        } else if (label == "y") {
                            data.uvRectangle.y = Number(value);
                        } else if (label == "width") {
                            data.uvRectangle.width = Number(value);
                        } else if (label == "height") {
                            data.uvRectangle.height = Number(value);
                        }
                    });
                }

            }
            if (data.methods == null) {
                data.methods = [];
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
                    if (childNode.nodeName == "light") {
                        
                        var lightData: LightData = new LightData();
                        this.lightDatas.push(lightData);

                        this.eachAttr(childNode, function (label: string, value: string): void {
                            if (label == "id") {
                                lightData.id = Number(value);
                            }
                        });

                        var lightNode: Node;
                        for (var sunI: number = 0, sunCount: number = childNode.childNodes.length; sunI < sunCount; sunI++) {
                            lightNode = childNode.childNodes[sunI];
                            if (lightNode.nodeName == "#text")
                                continue;
                            if (lightNode.nodeName == "type") {
                                lightData.type = LightType[lightNode.textContent];
                            }else if (lightNode.nodeName == "direction") {
                                var dirX: number, dirY: number, dirZ: number;
                                this.eachAttr(lightNode, function (label: string, value: string): void {
                                    if (label == "x") {
                                        dirX = Number(value);
                                    } else if (label == "y") {
                                        dirY = Number(value);
                                    } else if (label == "z") {
                                        dirZ = Number(value);
                                    }

                                });
                                lightData.dirX = dirX;
                                lightData.dirY = dirY;
                                lightData.dirZ = dirZ;
                                
                            } else if (lightNode.nodeName == "diffuseColor") {
                                lightData.diffuseColor = Number(lightNode.textContent);
                            } else if (lightNode.nodeName == "ambientColor") {
                                lightData.ambientColor = Number(lightNode.textContent);
                            } else if (lightNode.nodeName == "intensity") {
                                lightData.intensity = Number(lightNode.textContent);
                            } else if (lightNode.nodeName == "halfIntensity") {
                                lightData.halfIntensity = Number(lightNode.textContent);
                            } if (lightNode.nodeName == "position") {
                                var posX: number, posY: number, posZ: number;
                                this.eachAttr(lightNode, function (label: string, value: string): void {
                                    if (label == "x") {
                                        posX = Number(value);
                                    } else if (label == "y") {
                                        posY = Number(value);
                                    } else if (label == "z") {
                                        posZ = Number(value);
                                    }

                                });
                                lightData.posX = posX;
                                lightData.posY = posY;
                                lightData.posZ = posZ;

                            }else if (lightNode.nodeName == "falloff") {
                                lightData.falloff = Number(lightNode.textContent);
                            } else if (lightNode.nodeName == "radius") {
                                lightData.radius = Number(lightNode.textContent);
                            }

                        }
                         
                    }else if (childNode.nodeName == "fog") {

                    }
                   
                }
            }
        }


        //public dispose(): void {
        //    this.materialList = this.esmList = this.eamList = this.ecaList = null;
        //    this.esmPath = this.texturePath = this.ecaPath = this.eamPath = null;
        //}





    }
}

