float particle( ParticleData curParticle ){
	return 1.0 ;
}

mat4 buildModelMatrix(vec4 quat, vec3 scale, vec3 position)
{
	//����
	mat4 ret = mat4( 
		vec4(scale.x, 0.0, 0.0, 0.0), 
		vec4(0.0, scale.y, 0.0, 0.0), 
		vec4(0.0, 0.0, scale.z, 0.0), 
		vec4(0.0, 0.0, 0.0, 1.0) 
	);
	//��ת
	ret = buildMat4Quat(quat) * ret; 
	 
	//ƽ��
	ret[3][0] = position.x;
	ret[3][1] = position.y;
	ret[3][2] = position.z;

	return ret;
}

vec3 calcParticleMove(vec3 distanceXYZ){
	//����
	if(velocityLimitVec2.y > TrueOrFalse){
		vec3 temp = distanceXYZ * distanceXYZ;
		float distanceCurrent = sqrt(temp.x + temp.y + temp.z);
		float distanceLimit = velocityLimitVec2.x;
		if(distanceLimit < Tiny){
			return vec3(0.0);
		}
		if(distanceCurrent > distanceLimit){
			distanceXYZ *= distanceLimit / distanceCurrent;
		}
	}
	return distanceXYZ;
}

mat4 getRenderModeMatrix(mat4 cameraMatrix, mat4 modelMatrix){
	return cameraMatrix;
}

//rewrite by stretched
float updateStretchedBillBoard(vec4 startPos, vec4 newPos){
	return 1.0;	
}

void main(void) {
	if(discard_particle > TrueOrFalse){ 
		outPosition = vec4(0.0,0.0,0.0,0.0); 
	}else{

		//vec3 velocityBaseVec3
		//vec3 velocityOverVec3
		//vec2 velocityLimitVec2
		//vec3 velocityForceVec3
		//vec2 velocityBezierWeightVec2
		//float currentTime

		//��Է�������λ��
		vec3 position_emitter = attribute_offsetPosition;

		vec3 velocityLocalVec3 = velocityBaseVec3 * currentTime;
		vec3 velocityWorldVec3 = vec3(0.0,0.0,0.0);
		vec3 velocityMultiVec3 = vec3(0.0,0.0,0.0);

		if(particleStateData.velocityOverWorldSpace < TrueOrFalse){
			velocityLocalVec3 += velocityOverVec3;		
		}else{
			velocityWorldVec3 += velocityOverVec3;
		}

		if(particleStateData.velocityForceWorldSpace < TrueOrFalse){
			velocityLocalVec3 += velocityForceVec3;
		}else{
			velocityWorldVec3 += velocityForceVec3;
		}

		if(particleStateData.worldSpace > TrueOrFalse){
			//followTargetPosition
			//followTargetScale
			//followTargetRotation

		}else{
			followTargetPosition.x = particleStateData.positionX;
			followTargetPosition.y = particleStateData.positionY;
			followTargetPosition.z = particleStateData.positionZ;

			//followTargetScale.x = particleStateData.scaleX;
			//followTargetScale.y = particleStateData.scaleY;
			//followTargetScale.z = particleStateData.scaleZ;

			followTargetRotation.x = particleStateData.rotationX;
			followTargetRotation.y = particleStateData.rotationY;
			followTargetRotation.z = particleStateData.rotationZ;
			followTargetRotation.w = particleStateData.rotationW;

		}

		mat4 followRotQuat = buildMat4Quat(followTargetRotation);
		velocityLocalVec3 = (followRotQuat * vec4(velocityLocalVec3, 1.0)).xyz;

		mat4 modelMatrix = buildModelMatrix(followTargetRotation, followTargetScale, followTargetPosition);
		position_emitter = (modelMatrix * vec4(position_emitter, 1.0)).xyz; 

		//�̶��ٶ�+�ٶȵ���+���ٶȵ���
		velocityMultiVec3 = velocityLocalVec3 + velocityWorldVec3;
		//�����ٶȣ�����ƽ���ٶȣ�
		velocityMultiVec3 = calcParticleMove(velocityMultiVec3);
		
		//����Ĭ��Ϊȫ������ϵ
		velocityMultiVec3.y -= 4.9 * currentTime * currentTime * particleStateData.gravity;// 0.5 * g * t * t;
		
		//�Ƿ���Ҫ�޸�local positionָ���˶�����ֱ���޸�localPosition
		vec3 origPosition = position_emitter;
		position_emitter += velocityMultiVec3; 

		float dirEnable = updateStretchedBillBoard(vec4(origPosition, 1.0), vec4(position_emitter, 1.0));
		if(dirEnable > TrueOrFalse){
			mat4 billboardMatrix = getRenderModeMatrix(uniform_cameraMatrix, modelMatrix);
			outPosition = billboardMatrix * localPosition;
			outPosition.xyz += position_emitter.xyz;
			outPosition = uniform_ViewMatrix * outPosition;
		}else{
			outPosition = vec4(0.0,0.0,0.0,0.0); 
		}
	}
	gl_Position = uniform_ProjectionMatrix * outPosition ; 
}
	