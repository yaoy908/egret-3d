
// 按秒为单位
//x : bornTime
//y : life
//w : index
attribute vec3 attribute_time ;

//按秒为单位
//当前时间
float currentTime = 0.0;

varying vec3 varying_particleData;
struct ParticleData{
	float bornTime;			//出生时间(加过rate，但是没有加delay)
	float life;				//单次生命周期时间
	float index;			//下标
};                   

//particleStateData.time				
//particleStateData.loop				
//particleStateData.worldSpace			
//particleStateData.scaleX				
//particleStateData.scaleY				
//particleStateData.scaleZ				
//particleStateData.loopTime			
//particleStateData.delay				
//particleStateData.duration			
//particleStateData.gravity				
//particleStateData.accelerationWorld	


float particle( ParticleData emit ){
	//扣除延迟时间
	float time = particleStateData.time - particleStateData.delay;
	//还未出生
	if(time <= emit.bornTime){
		return currentTime = 0.0;
	}
	if(particleStateData.loop == 0.0){
		float emitterDuring = particleStateData.duration - particleStateData.delay;
		//还没到出生时间，发射器已经死亡
		if(emit.bornTime >= emitterDuring)
		{
			return currentTime = 0.0;
		}
		//单个粒子本身的生命周期已经结束
		if(time >= emit.life + emit.bornTime)
		{
			return currentTime = 0.0;
		}
		
	}

	currentTime = time - emit.bornTime;
	//计算当前粒子在单次循环中的相对时间
	currentTime = mod(currentTime, particleStateData.loopTime);
	//当前loopTime内超过粒子自身的什么周期，死亡状态
	if(currentTime >= emit.life){
		return currentTime = 0.0;
	}
	if( currentTime <= 0.0 ) 
		return currentTime = 0.0;
}


void main(void) {
	
	ParticleData emit ;
	emit.bornTime = attribute_time.x ; 
	emit.life = attribute_time.y ; 
	emit.index = attribute_time.z ; 
	
	float active = particle( emit ) ;
	
	varying_particleData.x = currentTime;
	varying_particleData.y = emit.life ;
	varying_particleData.z = emit.index;
	
	if( active == 0.0 ){
		e_discard();
	}else{
		
	}
	

}