
// 按秒为单位
//x : delay
//y : life
//z : space
//w : index
attribute vec4 attribute_time ;

// 按秒为单位
//x: time second
//y: duration second
//z: loop 1.0:0.0
//w: +/-
uniform vec4 uniform_time ;

//按秒为单位
//当前时间
float currentTime = 0.0;

struct ParticleData{
	float delay;
	float life;
	float rate;
	float index;
};

float particle(  ){
	ParticleData emit ;
	emit.delay = attribute_time.x ; 
	emit.life = attribute_time.y ; 
	emit.rate = attribute_time.z ; 
	emit.index = attribute_time.w ; 
	
	float time = uniform_time.x ; 
	float duration = uniform_time.y ; 
	float loop = uniform_time.z ; 
	float maxLife = uniform_time.w ; 
	
	float numberSpace = emit.index * emit.rate ; 
	currentTime = max(time - numberSpace - emit.delay,0.0) ;
	
	if(loop==0.0){
			if( numberSpace > duration )
				return currentTime = 0.0 ;
	}else{
			duration = uniform_time.w ;
			currentTime = mod(currentTime,duration);
			if( currentTime > emit.life )
				return currentTime = 0.0 ;
	}
  
	if( currentTime <= 0.0 ) 
		return currentTime ; 
}

void e_discard(){
	varying_color.w = 0.0 ;
}

void main(void) {
	float active = particle(  ) ;
	
	if( active == 0.0 ){
		e_discard();
	}else{
		
	}
}