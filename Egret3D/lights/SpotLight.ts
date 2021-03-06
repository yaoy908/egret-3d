﻿module egret3d {
                        
    /**
    * @class egret3d.DirectLight
    * @classdesc
    * spot 的灯光 也就是筒灯
    * 所有的灯光基本要素 灯光的颜色，强度，位置，方向
    * 颜色的色值均是16进制 red:0xffff0000 argb的定义模式
    * 每个材质球所能最大使用的灯光建议别太多，能省则省，尤其是移动端，能用灯光缓存图 lightmap 最好
    * spot light 可以直接想象为点光源照了个罩子，有方向且有范围的灯光
    * @see egret3d.Object3D
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SpotLight extends LightBase {

        /**
         * @language zh_CN
         * @priavete 
         */
        public static stride: number = 14;

        /**
        * @language zh_CN
        * 创建一个聚光源
        * @param color 灯光颜色值
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(color: number) {
            super();
            this.diffuse = color;
            this.lightType = LightType.spotLightlight ;
        }
                                
        /**
        * @language zh_CN
        *   
        * spot 的 裁切范围
        * spot light 照射范围的大小指数
        * @param value Cutoff
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set spotCosCutoff(value: number) {
            this._spotCosCutoff = value;
        }
                
        /**
        * @language zh_CN
        *          
        * spot 的 裁切范围
        * spot light 照射范围的大小指数
        * @returns number Cutoff -spot 的 裁切范围
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get spotCosCutoff(): number {
            return this._spotCosCutoff ;
        }
                        
        /**
        * @language zh_CN
        * spot 的 灯光强弱
        * spot light 灯光圆形范围内随半径大小改变发生的灯光强弱指数
        *  
        * @param value 灯光强弱指数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set spotExponent(value: number) {
            this._spotExponent = value; 
        }
                
        /**
        * @language zh_CN
        *    
        * spot 的 灯光强弱
        * spot light 灯光圆形范围内随半径大小改变发生的灯光强弱指数
        * @returns number 灯光强弱指数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get spotExponent(): number {
            return this._spotExponent;
        }
                                
        /**
        * @language zh_CN
        *    
        * spot 的 灯光衰减
        * spot light 灯光圆形范围内随半径大小改变发生的灯光衰减常数指数
        * @param value 持续衰减
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set constantAttenuation(value: number) {
            this._constantAttenuation = value;
        }
                
        /**
        * @language zh_CN
        * spot 的 灯光衰减
        * spot light 灯光圆形范围内随半径大小改变发生的灯光衰减常数指数
        * @returns number 持续衰减
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get constantAttenuation(): number {
            return this._constantAttenuation ;
        }

        /**
        * @language zh_CN
        *  
        * spot 的 灯光线性衰减
        * spot light 灯光圆形范围内随半径大小改变发生的灯光线性衰减
        * @param value 线性衰减
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set linearAttenuation(value: number) {
            this._linearAttenuation = value;
        }
                
        /**
        * @language zh_CN
        *  
        * spot 的 灯光线性衰减
        * spot light 灯光圆形范围内随半径大小改变发生的灯光线性衰减
        * @returns number 线性衰减
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get linearAttenuation(): number {
            return this._linearAttenuation;
        }
        
        /**
        * @language zh_CN
        *     
        * spot 的 灯光线性2次衰减
        * spot light 灯光圆形范围内随半径大小改变发生的灯光线性2次衰减
        * @param value 2次衰减
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set quadraticAttenuation(value: number) {
            this._quadraticAttenuation = value;
        }
        
        /**
        * @language zh_CN
        *  
        * spot 的 灯光线性2次衰减
        * spot light 灯光圆形范围内随半径大小改变发生的灯光线性2次衰减
        * @returns number 返回2次衰减
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get quadraticAttenuation(): number {
            return this._quadraticAttenuation;
        }


        /**
         * @language zh_CN
         * @private
         * 更新灯光数据
         * @param index 灯光ID
         * @param lightData 灯光数据
         */
        public updateLightData(camera:Camera3D ,index: number, lightData: Float32Array) {
            lightData[index * SpotLight.stride] = this.globalPosition.x;
            lightData[index * SpotLight.stride + 1] = this.globalPosition.y;
            lightData[index * SpotLight.stride + 2] = this.globalPosition.z;
          
            lightData[index * SpotLight.stride + 3] = this.globalRotation.x * MathUtil.DEGREES_TO_RADIANS ;
            lightData[index * SpotLight.stride + 4] = this.globalRotation.y * MathUtil.DEGREES_TO_RADIANS ;
            lightData[index * SpotLight.stride + 5] = this.globalRotation.z * MathUtil.DEGREES_TO_RADIANS ; 
         
            lightData[index * SpotLight.stride + 6] = this._diffuse.x;
            lightData[index * SpotLight.stride + 7] = this._diffuse.y;
            lightData[index * SpotLight.stride + 8] = this._diffuse.z;
          
            lightData[index * SpotLight.stride + 9] = this._spotExponent;
            lightData[index * SpotLight.stride + 10] = this._spotCosCutoff;
            lightData[index * SpotLight.stride + 11] = this._constantAttenuation;
            lightData[index * SpotLight.stride + 12] = this._linearAttenuation;
            lightData[index * SpotLight.stride + 13] = this._quadraticAttenuation;
        }
    }
} 


