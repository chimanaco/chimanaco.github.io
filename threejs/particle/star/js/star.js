/*
	Three.js Star
	Author: chimanaco

	// Awesome References // 

	Particle Engine (Three.js)
	http://stemkoski.github.io/Three.js/Particle-Engine.html

	_playGnd
	http://threejsplaygnd.brangerbriz.net/
*/

/* ////////////////////////////
    Variables
//////////////////////////// */

// standard
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom
var skyBox;
var dt;
var theta = 0;
var radiusX = 200;

/* ------------------------------------
	setup
------------------------------------*/

function setup() {
	// Scene
	scene = new THREE.Scene();

	// Camera
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 5000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,200,400);
	camera.lookAt(scene.position);

	// Renderer
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();
	renderer.autoClearColor = false;
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'threeJs' );
	container.appendChild( renderer.domElement );
	
	// Stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	
	// Light
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

	// Skybox / Fog
	var skyBoxGeometry = new THREE.CubeGeometry( 4000, 4000, 4000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.BackSide } );
	skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);

    // Events
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// Controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	// Particle Engine
	this.engine = new ParticleEngine();
	engine.setValues( Examples.startunnel );
	engine.initialize();
}

/* ////////////////////////////
    Draw
//////////////////////////// */

function draw() {
	// camera position
	theta += window.rotationX;
	camera.position.x = radiusX * Math.sin( theta * Math.PI / 360 );
    
    requestAnimationFrame( draw );
	render();		
	update();
}

/* ////////////////////////////
    Render
//////////////////////////// */

function render() {
	renderer.render( scene, camera );
}

/* ////////////////////////////
    Update
//////////////////////////// */

function update() {
	controls.update();
	stats.update();
	
	dt = clock.getDelta();
	engine.update( dt * speed );
}

/* ////////////////////////////
    Reset Engine
//////////////////////////// */

function restartEngine(parameters) {
	resetCamera();
	
	engine.destroy();
	engine = new ParticleEngine();
	engine.setValues( parameters );
	engine.initialize();
}

/* ////////////////////////////
    Reset Camera
//////////////////////////// */

function resetCamera() {
	// Camera
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(0,200,400);
	camera.lookAt(scene.position);	
	scene.add(camera);
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	THREEx.WindowResize(renderer, camera);
}

setup();
draw();