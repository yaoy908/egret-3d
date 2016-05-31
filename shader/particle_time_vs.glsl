
// 按秒为单位
//x : bornTime
//y : life
//z : space
//w : index
attribute vec4 attribute_time ;

// 按秒为单位
//x: time second
//y: duration second
//z: loop 1.0:0.0
//w: +/-
uniform float uniform_time[5] ;

//按秒为单位
//当前时间
float currentTime = 0.0;

varying vec4 particleTime;

struct ParticleData{
	float bornTime;			//出生时间
	float life;				//单次生命周期时间
	float unitTotalLife;	//从0开始计数到循环到最后一次结束的总时间
	float index;			//下标
};                   


float particle( ParticleData emit ){
	float time = uniform_time[0] ; 
	float loop = uniform_time[1]; 

	//还未出身
	if(time <= emit.bornTime){
		return currentTime = 0.0;
	}
	//非循环的情况，发射器死亡的话就一直隐藏
	if(loop == 0.0 && time >= emit.unitTotalLife){
		return currentTime = 0.0;
	}

	currentTime = time - emit.bornTime;
	//计算当前粒子在单次循环中的相对时间
	currentTime = mod( currentTime, emit.life);
	if( currentTime <= 0.0 ) 
		return currentTime = 0.0;
}


void main(void) {
	
	ParticleData emit ;
	emit.bornTime = attribute_time.x ; 
	emit.life = attribute_time.y ; 
	emit.unitTotalLife = attribute_time.z ; 
	emit.index = attribute_time.w ; 
	
	float active = particle( emit ) ;
	
	particleTime.x = emit.index ;
	particleTime.y = emit.life ;
	particleTime.z = emit.unitTotalLife ;
	particleTime.w = currentTime ;
	
	if( active == 0.0 ){
		e_discard();
	}else{
		
	}
	

}