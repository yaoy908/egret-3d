module egret3d_dev {
            
    /**
    * @private
    * @class egret3d_dev.FuncData
    * @classdesc
    * shader系统工具类，管理所有要用到的shader文件
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ShaderUtil {
        
        private static _shaderLibs: any = {};
        private static _methodLibs: any = {};
        private static _shaderContentDict: { [name: string]: GLSL.ShaderContent } = {};
        private static _filterChar: string[] = [" ", "  ", ";", "\n", "\r", "\t", "\n", "\r", "\t"];
        private static _instance: ShaderUtil;

        /**
        * @language zh_CN
        * 返回组合shader后的内容
        * @param shaderNameList 要组合的shader名字列表
        * @param usage
        * @returns shader 内容
        */
        public static fillShaderContent(shaderContent: GLSL.ShaderContent,shaderNameList: Array<string>, usage: PassUsage) {

            var i: number = 0;
            var varName: string = "";
            for (i = 0; i < shaderNameList.length; ++i) {
                if (varName != "") {
                    varName += "/";
                }
                varName += shaderNameList[i];
            }
            if (this._shaderContentDict[varName] == undefined) {
                shaderContent = new GLSL.ShaderContent();

                for (i = 0; i < shaderNameList.length; ++i) {
                    var tempContent: GLSL.ShaderContent = this._shaderContentDict[shaderNameList[i]];
                    shaderContent.addContent(tempContent);
                }

                this._shaderContentDict[varName] = shaderContent;
            }
            else {
                shaderContent = this._shaderContentDict[varName];
            }

            if (shaderContent == null) {
                return null;
            }

            for (i = 0; i < shaderContent.attributeList.length; i++) {
                varName = shaderContent.attributeList[i].varName;
                usage[varName] = shaderContent.attributeList[i].clone();
            }

            for (i = 0; i < shaderContent.varyingList.length; i++) {
                varName = shaderContent.varyingList[i].varName;
                if ( !usage[varName] ){
                    usage[varName] = shaderContent.varyingList[i].clone();
                }
            }

            for (i = 0; i < shaderContent.tempList.length; i++) {
                varName = shaderContent.tempList[i].varName;
                usage[varName] = shaderContent.tempList[i].clone();
            }

            for (i = 0; i < shaderContent.uniformList.length; i++) {
                varName = shaderContent.uniformList[i].varName;
                usage[varName] = shaderContent.uniformList[i].clone();
            }

            for (i = 0; i < shaderContent.constList.length; i++) {
                varName = shaderContent.constList[i].varName;
                usage[varName] = shaderContent.constList[i].clone();
            }

            for (i = 0; i < shaderContent.sampler2DList.length; i++) {
                varName = shaderContent.sampler2DList[i].varName;
                usage[varName] = shaderContent.sampler2DList[i].clone();
            }

            for (i = 0; i < shaderContent.sampler3DList.length; i++) {
                varName = shaderContent.sampler3DList[i].varName;
                usage[varName] = shaderContent.sampler3DList[i].clone();
            }

            ///usage.sampler3DList.length = 0; 
            ///for (i = 0; i < shaderContent.sampler3DList.length; i++) {
            ///    var sampler3D: GLSL.Sampler3D = shaderContent.sampler3DList[i].clone();
            ///    sampler3D.activeTextureIndex = this.getTextureIndex(i);
            ///    sampler3D.index = i;
            ///    usage.sampler3DList.push(sampler3D);
            ///}
        }

        private synthesisShader(content: GLSL.ShaderContent): string {
                //var i: number; 
            /////var attribute
            //for (var key in shaderContent.attributeList) {
            //    this.connectAtt(shaderContent.attributeList[key]);
            //}
            /////var struct
            //for (var key in shaderContent.structDict) {
            //    this.connectStruct(shaderContent.structDict[key]);
            //}
            /////var varying
            //for (i = 0; i < shaderContent.varyingList.length; i++) {
            //    this.connectVarying(shaderContent.varyingList[i]);
            //}
            /////temp
            //for (i = 0; i < shaderContent.tempList.length; i++) {
            //    this.connectTemp(shaderContent.tempList[i]);
            //}
            /////const
            //for (i = 0; i < shaderContent.constList.length; i++) {

            //    if (shaderContent.constList[i].varName == "max_directLight") {
            //        shaderContent.constList[i].value = this.materialData.directLightList.length.toString();
            //    }
            //    if (shaderContent.constList[i].varName == "bonesNumber") {
            //        shaderContent.constList[i].value = this.maxBone ;///(<AnimationStateSet>this.geometey.animation).getJointNumber() * 2;
            //    }
            //    if (shaderContent.constList[i].varName == "max_sportLight") {
            //        shaderContent.constList[i].value = this.materialData.sportLightList.length.toString();
            //    }
            //    if (shaderContent.constList[i].varName == "max_pointLight") {
            //        shaderContent.constList[i].value = this.materialData.pointLightList.length.toString();
            //    }
            //    this.connectConst(shaderContent.constList[i]);
            //}
            /////uniform
            //for (i = 0; i < shaderContent.uniformList.length; i++) {
            //    this.connectUniform(shaderContent.uniformList[i]);
            //}
            /////sampler
            //for (i = 0; i < shaderContent.sampler2DList.length; i++) {
            //    var sampler2D: GLSL.Sampler2D = shaderContent.sampler2DList[i];
            //    sampler2D = sampler2D.clone();
            //    this.connectSampler(sampler2D);
            //    sampler2D.activeTextureIndex = this.getTexture2DIndex(i);
            //    sampler2D.index = i;
            //    this.useage.sampler2DList.push(sampler2D);
            //}
            /////sampler
            //for (i = 0; i < shaderContent.sampler3DList.length; i++) {
            //    var sampler3D: GLSL.Sampler3D = shaderContent.sampler3DList[i]; 
            //    sampler3D = sampler3D.clone();
            //    this.connectSampler3D(sampler3D);
            //    sampler3D.activeTextureIndex = this.getTexture2DIndex(shaderContent.sampler2DList.length+i);
            //    sampler3D.index = shaderContent.sampler2DList.length + i;
            //    this.useage.sampler3DList.push(sampler3D);
            //}
            /////---------------------------------------------------------------------------------
            /////---------------------------------------------------------------------------------
            //for (i = 0; i < shaderContent.funcList.length; i++) {
            //    this.source += shaderContent.funcList[i].func;
            //}
            return "";
        }

        ///************************************************************************
        ///-shader helper----------------------------------------------------------
        ///------------------------------------------------------------------------
        private readShader(str: string): GLSL.ShaderContent {
            var content: GLSL.ShaderContent = new GLSL.ShaderContent();

            //var shaderStr: string = StringUtil.processShaderFile(str);

            //var source: Array<string> = StringUtil.parseContent(shaderStr);
            //var shaderLine: Array<string> = source.concat();
            //while (shaderLine.length > 0) {

            //    var line: string = shaderLine[0];
            //    shaderLine.shift();

            //    var ret: string = this.getLineType(line);
            //    var index: number = -1;

            //    index = ret.indexOf("struct");
            //    if (index != -1) {
            //        var tempArray: Array<string> = ret.split(" ");
            //        var structStr: string = line;

            //        content.addStruct(tempArray[1], structStr);
            //        this.processStruct(tempArray[1], structStr, content);
            //        continue;
            //    }

            //    index = ret.indexOf("function");
            //    if (index != -1) {
            //        var tempArray: Array<string> = ret.split(" ");
            //        var func: string = line;
            //        content.addFunc(tempArray[1], func);
            //        continue;
            //    }


            //    index = ret.indexOf("unknown");
            //    if (index != -1) {
            //        var tempArray: Array<string> = StringUtil.parseLines(line);
            //        var key: string = StringUtil.getVarKey(tempArray);
            //        var valueType: string = StringUtil.getVarType(tempArray);
            //        if (valueType == "sampler2D") {
            //            var sampler2D: GLSL.Sampler2D = this.getSampler2D(line);
            //            if (sampler2D)
            //                content.addVar(sampler2D);
            //        }
            //        else if (valueType == "samplerCube") {
            //            var sampler3D: GLSL.Sampler3D = this.getSampler3D(line);
            //            if (sampler3D)
            //                content.addVar(sampler3D);
            //        }
            //        else {
            //            if (key == "attribute") {
            //                var att: GLSL.Attribute = this.getAttribute(line);
            //                if (att)
            //                    content.addVar(att);
            //            }
            //            else if (key == "varying") {
            //                var varying: GLSL.Varying = this.getVarying(line);
            //                if (varying)
            //                    content.addVar(varying);
            //            }
            //            else if (key == "uniform") {
            //                var uniform: GLSL.Uniform = this.getUniform(line);
            //                if (uniform)
            //                    content.addVar(uniform);
            //            }
            //            else if (key == "const") {
            //                var ConstVar: GLSL.ConstVar = this.getConst(line);
            //                if (ConstVar)
            //                    content.addVar(ConstVar);
            //            }
            //            else {
            //                content.addVar(this.getTemper(line));
            //            }
            //        }
            //        continue;
            //    }
            //}

            return content;
        }

        private static getLineType(line: string): string {
            var index: number = line.indexOf("{");
            if (index > 0) {
                var firstStr: string = line.substr(0, index);
                if (firstStr.indexOf("struct") >= 0) {
                    var s_pos: number = firstStr.lastIndexOf(" ");
                    s_pos++;
                    var structName: string = firstStr.substr(s_pos, firstStr.length - s_pos);
                    return ("struct " + structName);
                }
                if (firstStr.indexOf("=") < 0) {

                    var pos: number = line.indexOf("(");
                    var s_pos: number = line.lastIndexOf(" ", pos);
                    s_pos++;
                    var func: string = line.substr(s_pos, pos - s_pos);

                    return ("function " + func);
                }
            }
            return "unknown";
        }

        private static getAttribute(shaderLine: string): GLSL.Attribute {
            var tempStr: string = shaderLine;
            var tmpName: string;
            var valueType: string;
            var attribute: GLSL.TmpVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            tmpName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            attribute = new GLSL.Attribute(tmpName, valueType);
            return attribute;
        }

        private static getTemper(shaderLine: string): GLSL.TmpVar {
            var tempStr: string = shaderLine;
            var tmpName: string;
            var valueType: string;
            var tmpVar: GLSL.TmpVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            tmpName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            tmpVar = new GLSL.TmpVar(tmpName, valueType);
            return tmpVar;
        }

        private static getVarying(shaderLine: string): GLSL.Varying {
            var tempStr: string = shaderLine;
            var varyingName: string;
            var valueType: string;
            var varying: GLSL.Varying;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            varyingName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            varying = new GLSL.Varying(varyingName, valueType );
            return varying;
        }

        private static getUniform(shaderLine: string): GLSL.Uniform {
            var tempStr: string = shaderLine;
            var uniformName: string;
            var valueType: string;
            var uniform: GLSL.Uniform;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            uniformName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            uniform = new GLSL.Uniform(uniformName, valueType);
            return uniform;
        }

        private static getConst(shaderLine: string): GLSL.ConstVar {
            var tempStr: string = shaderLine;
            var constVarName: string;
            var valueType: string;
            var varValue: string;
            var constVar: GLSL.ConstVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            constVarName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            varValue = StringUtil.getVarValue(tempArray);

            constVar = new GLSL.ConstVar(constVarName, valueType, varValue);

            return constVar;
        }

        private static getSampler2D(shaderLine: string): GLSL.Sampler2D {
            var tempStr: string = shaderLine;
            var sampler2DName: string;
            var valueType: string;
            var sampler2D: GLSL.Sampler2D;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            sampler2DName = StringUtil.getVarName(tempArray);
            sampler2D = new GLSL.Sampler2D(sampler2DName);
            return sampler2D;
        }

        private static getSampler3D(shaderLine: string): GLSL.Sampler3D {
            var tempStr: string = shaderLine;
            var sampler3DName: string;
            var valueType: string;
            var sampler3D: GLSL.Sampler3D;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            sampler3DName = StringUtil.getVarName(tempArray);

            sampler3D = new GLSL.Sampler3D(sampler3DName);
            return sampler3D;
        }

        private static filterCharacter(name: string): string {
            var src: string = name;
            var dest: string = src;
            for (var i: number = 0; i < ShaderUtil._filterChar.length; ++i) {
                while (true) {
                    dest = src.replace(ShaderUtil._filterChar[i], "");
                    if (src == dest) {
                        break;
                    }
                    src = dest;
                }
            }
            return dest;
        }

        private static processStruct(name: string, structStr: string, content: GLSL.ShaderContent) {
            var pos: number = structStr.lastIndexOf("}");
            pos++;
            var end: number = structStr.lastIndexOf(";");
            var varName = structStr.substr(pos, end - pos);
            var varList: Array<string> = StringUtil.parseLines(varName);
            for (var i: number = 0; i < varList.length; ++i) {
                var varTmp: GLSL.TmpVar = this.getTemper(name + " " + varList[i] + ";");
                if (varTmp)
                    content.addVar(varTmp);
            }
        }




       //----------------------------------------------------------------------------------------------------------------
       //----------------------------------------------------------------------------------------------------------------
       //----------------------------------------------------------------------------------------------------------------
       //----------------------------------------------------------------------------------------------------------------
       //----------------------------------------------------------------------------------------------------------------

        /**
        * @language zh_CN
        * 
        * @param att 
        */
        public static connectAtt(att: GLSL.Attribute):string {
            return "attribute " + att.valueType + " " + att.name + "; \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param tempVar 
        */
        public static connectTemp(tempVar: GLSL.TmpVar): string {
           return tempVar.valueType + " " + tempVar.name + "; \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param struct 
        */
        public static connectStruct(struct: string): string {
            return struct + " \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param constVar 
        */
        public static connectConst(constVar: GLSL.ConstVar): string {
            return "const " + constVar.valueType + " " + constVar.name + " = " + constVar.value + "; \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param varying 
        */
        public static connectVarying(varying: GLSL.Varying): string {
            return "varying " + varying.valueType + " " + varying.name + "; \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param unifrom 
        */
        public static connectUniform(unifrom: GLSL.Uniform): string {
            return "uniform " + unifrom.valueType + " " + unifrom.name + "; \r\n";
        }
        /**
        * @language zh_CN
        * 
        * @param sampler 
        */
        public static connectSampler(sampler: GLSL.Sampler2D): string {
            return "uniform sampler2D " + sampler.name + "; \r\n";

        }

        /**
        * @language zh_CN
        * 
        * @param sampler 
        */
        public static connectSampler3D(sampler: GLSL.Sampler3D): string {
            return "uniform samplerCube " + sampler.name + "; \r\n";
        }

        private static getTexture2DIndex(i: number): number {
            switch (i) {
                case 0:
                    return ContextSamplerType.TEXTURE_0;
                case 1:
                    return ContextSamplerType.TEXTURE_1;
                case 2:
                    return ContextSamplerType.TEXTURE_2;
                case 3:
                    return ContextSamplerType.TEXTURE_3;
                case 4:
                    return ContextSamplerType.TEXTURE_4;
                case 5:
                    return ContextSamplerType.TEXTURE_5;
                case 6:
                    return ContextSamplerType.TEXTURE_6;
                case 7:
                    return ContextSamplerType.TEXTURE_7;
                case 8:
                    return ContextSamplerType.TEXTURE_8;
            }

            throw new Error("texture not big then 8")
        }

    }
}