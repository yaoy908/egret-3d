module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleAnimation
    * @classdesc
    * 粒子动画
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleAnimation extends EventDispatcher implements IAnimation {

        /**
        * @language zh_CN
        * 总时间
        */
        public time: number = 0;

        /**
        * @language zh_CN
        * 帧间隔时间
        */
        public delay: number = 0;

        /**
        * @language zh_CN
        * 播放速度
        */
        public speed: number = 1;

        /**
        * @language zh_CN
        * 动画节点容器
        */
        public animaNodeCollection: AnimaNodeCollection; 
        private _play: boolean = false;

        /**
        * @language zh_CN
        * 构造函数
        * @param nodeCollection 动画节点容器对象
        */
        constructor(nodeCollection: AnimaNodeCollection) {
            super();
            this.animaNodeCollection = nodeCollection ;
        }


        /**
        * @language zh_CN
        * 粒子动画容器
        * @return ParticleAnimation对象
        */
        public get particleAnimationController(): ParticleAnimation {
            return this;
        }

        /**
        * @language zh_CN
        * 更新调度
        * @param time 总时间
        * @param delay 帧间隔时间
        */
        public update(time: number, delay: number) {
            if (!this._play) {
                return;
            }
            this.delay = delay; 

            this.time += this.delay; 
        }

        /**
        * @language zh_CN
        * 播放动画
        * @param animName 动画名
        * @param speed 播放速度
        */
        public play(animName?: string, speed?: number) {
            this._play = true;
            this.time = 0;
            this.delay = 0;
        }

        /**
        * @language zh_CN
        * 停止播放
        */
        public stop() {
            this._play = false;
        }

        /**
        * @language zh_CN
        * 是否正在播放中
        * @return 是否播放中
        */
        public isPlay(): boolean {
            return this._play ;
        }

        /**
        * @language zh_CN
        * 获取动画列表
        * @return 动画名称列表
        */
        public getAnimList(): string[] {
            return []; 
        }

        /**
        * @language zh_CN
        * 获取动画节点
        * @return 动画节点数组
        */
        public getAnimNode(): AnimationNode[] {
            return [];
        }

        /**
        * @language zh_CN
        * 克隆新的ParticleAnimation对象;
        * @return 新的ParticleAnimation对象
        */
        public clone(): IAnimation {
            return null;
        }
    }
}