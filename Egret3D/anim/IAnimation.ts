module egret3d {

    /**
     * @private
     * @language zh_CN
     * @class egret3d.IAnimation
     * @classdesc
     * 动画接口
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample animation/IAnimation.ts
     */
    export interface IAnimation {

        /**
        * @language zh_CN
        * 骨骼动画控制器对象
        * 只有骨骼动画对象才有此接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        skeletonAnimationController?: SkeletonAnimation;

        /**
        * @language zh_CN
        * 粒子动画控制器对象。
        * 只有粒子动画对象才有此接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        particleAnimationController?: ParticleAnimation;

        /**
        * @language zh_CN
        * 总时间
        */
        time: number;

        /**
        * @language zh_CN
        * 帧间隔时间
        */
        delay: number;

        /**
        * @language zh_CN
        * 动画播放速度
        */
        speed: number;

        /**
        * @language zh_CN
        * 更新调度
        * @param time 总时间
        * @param delay 帧间隔时间
        */
        update(time: number, delay: number, geometry: Geometry, context: Context3DProxy ): void;

        /**
        * @language zh_CN
        * 播放动画
        * @param animName 动画名称
        * @param speed 播放速度（默认为1）
        */
        play(animName?: string, speed?: number): void;

        /**
        * @language zh_CN
        * 停止动画播放
        */
        stop(): void;

        /**
        * @language zh_CN
        * 是否正在播放
        */
        isPlay(): boolean;

        /**
        * @language zh_CN
        * 获取动画列表
        * @return 动画名称数组
        */
        animStateNames: string[];

        /**
        * @language zh_CN
        * 获取动画节点
        * @return 动画节点数组
        */
        animStates: IAnimationState[];

        addAnimState(animState: IAnimationState)
        removeAnimState(animState: IAnimationState)
        /**
        * @language zh_CN
        * 克隆新的IAnimation对象
        * @return 新的IAnimation对象
        */
        clone(): IAnimation;
    }
}
