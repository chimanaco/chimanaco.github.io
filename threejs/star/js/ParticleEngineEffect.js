/**
* @author Lee Stemkoski   http://www.adelphi.edu/~stemkoski/
*/

/* 
	Particle Engine options:
	
	positionBase   : new THREE.Vector3(),
	positionStyle : Type.CUBE or Type.SPHERE,

	// for Type.CUBE
	positionSpread  : new THREE.Vector3(),

	// for Type.SPHERE
	positionRadius  : 10,
	
	velocityStyle : Type.CUBE or Type.SPHERE,

	// for Type.CUBE
	velocityBase       : new THREE.Vector3(),
	velocitySpread     : new THREE.Vector3(), 

	// for Type.SPHERE
	speedBase   : 20,
	speedSpread : 10,
		
	accelerationBase   : new THREE.Vector3(),
	accelerationSpread : new THREE.Vector3(),
		
	particleTexture : THREE.ImageUtils.loadTexture( 'images/star.png' ),
		
	// rotation of image used for particles
	angleBase               : 0,
	angleSpread             : 0,
	angleVelocityBase       : 0,
	angleVelocitySpread     : 0,
	angleAccelerationBase   : 0,
	angleAccelerationSpread : 0,
		
	// size, color, opacity 
	//   for static  values, use base/spread
	//   for dynamic values, use Tween
	//   (non-empty Tween takes precedence)
	sizeBase   : 20.0,
	sizeSpread : 5.0,
	sizeTween  : new Tween( [0, 1], [1, 20] ),
			
	// colors stored in Vector3 in H,S,L format
	colorBase   : new THREE.Vector3(0.0, 1.0, 0.5),
	colorSpread : new THREE.Vector3(0,0,0),
	colorTween  : new Tween( [0.5, 2], [ new THREE.Vector3(0, 1, 0.5), new THREE.Vector3(1, 1, 0.5) ] ),

	opacityBase   : 1,
	opacitySpread : 0,
	opacityTween  : new Tween( [2, 3], [1, 0] ),
	
	blendStyle    : THREE.NormalBlending (default), THREE.AdditiveBlending

	particlesPerSecond : 200,
	particleDeathAge   : 2.0,		
	emitterDeathAge    : 60	
*/

Examples =
{
	
	// (1) build GUI for easy effects access.
	// (2) write ParticleEngineExamples.js	
	startunnel :
	{
		positionStyle  : Type.CUBE,
		positionBase   : new THREE.Vector3( 0, 0, 0 ),
		positionSpread : new THREE.Vector3( 10, 10, 10 ),

		velocityStyle  : Type.CUBE,
		velocityBase   : new THREE.Vector3( 0, 100, 200 ),
		velocitySpread : new THREE.Vector3( 400, 400, 800 ), 
		
		angleBase               : 0,
		angleSpread             : 720,
		angleVelocityBase       : 100,
		angleVelocitySpread     : 0,
		
		particleTexture : THREE.ImageUtils.loadTexture( 'img/spark.png' ),

		colorBase   : new THREE.Vector3(0.5, 2, 0.8), // H,S,L
		opacityBase : 1,
		blendStyle  : THREE.AdditiveBlending,

		sizeTween    : new Tween( [0, 1], [1, 20] ),
		// opacityTween : new Tween( [2, 3], [1, 0] ),
		// colorTween   : new Tween( [0.5, 2], [ new THREE.Vector3(0,1,0.5), new THREE.Vector3(0.8, 1, 0.5) ] ),

		particlesPerSecond : 5000,
		particleDeathAge   : 1.0,		
		emitterDeathAge    : 60
	}
	
}