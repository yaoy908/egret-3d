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

        public emit: ParticleEmitter;

        public particleAnimationState: ParticleAnimationState;

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
        * 获取动画列表
        * @return 动画名称数组
        */
        public animStateNames: string[];

        /**
        * @language zh_CN
        * 获取动画节点
        * @return 动画节点数组
        */
        public animStates: IAnimationState[];

        /**
        * @language zh_CN
        * 动画节点容器
        */
        private _play: boolean = false;

       
        
        /**
        * @language zh_CN
        * 构造函数
        * @param nodeCollection 动画节点容器对象
        */
        constructor() {
            super();

            this.animStates = [];
            this.particleAnimationState = new ParticleAnimationState("particle");
            this.addAnimState(this.particleAnimationState);
        }

        /**
        * @language zh_CN
        * 更新调度
        * @param time 总时间
        * @param delay 帧间隔时间
        */
        public update(time: number, delay: number , geometry:Geometry , context:Context3DProxy ) {
            if (!this._play) {
                return;
            }
            this.delay = delay; 
            this.time += this.delay; 

            if (this.particleAnimationState)
                this.particleAnimationState.update(this.time , delay , geometry , context );
        }

        /**
        * @language zh_CN
        * 播放动画
        * @param animName 动画名
        * @param speed 播放速度
        */
        public play(animName?: string, speed?: number,reset:boolean = true ) {
            this._play = true;
            if (reset){
                this.time = 0;
            }
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
        * 添加动画状态
        * @return 动画名称列表
        */
        public addAnimState(animState: IAnimationState) {
            var has: number = this.animStates.indexOf(animState);
            if (has==-1)
                this.animStates.push( animState );
        }

        /**
        * @language zh_CN
        * 上传动画状态
        * @return 动画名称列表
        */
        public removeAnimState(animState: IAnimationState) {
            var has: number = this.animStates.indexOf(animState);
            if (has != -1)
                this.animStates.splice(has,1);
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