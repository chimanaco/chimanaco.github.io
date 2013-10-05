if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// basic
var camera, scene, renderer, stats;
var keyboard;
var W, H;
var group;
// var geometry, material, mesh;

var frame = 0;

// particles
var particles = new THREE.Object3D();
var MAX = 256;

// draw circle
var RESOLUTION = 100;
var LINE_WIDTH = 1;
var SIZE = 360 / RESOLUTION;

// color
var c = new THREE.Color(0xffffff);
var hue = 0;
var hueSpeed = 1 / MAX;

var simplexNoise = new SimplexNoise;

/* ------------------------------------
	setup
------------------------------------*/

function setup() {
	// common setting
	init();
	
	scene.add(particles);
}

/* ------------------------------------
	draw
------------------------------------*/

function draw() {
	var len = particles.children.length;

	if(len < MAX) {
	    addParticle(len);     
	}

	// particles rotation
	particles.rotation.x += params.groupRotX * 0.01;
	particles.rotation.y += params.groupRotY * 0.01;
	particles.rotation.z += params.groupRotZ * 0.01;

	var r = params.radius;

	for(var i = 0; i < len; i++) {
	    particles.children[i].position.y = Math.sin((frame + (360 / MAX) * i) * params.speed) * params.height;
	    // particles.children[i].position.y = Math.sin((frame + (360 / MAX) * i) * params.speed) * params.height * simplexNoise.noise(i * 0.1, 100);
	    // r = Math.random() * 256 / 256;
  	    particles.children[i].scale.set(r, r, r);
	}

	// rendering & updating
	requestAnimationFrame( draw );
	renderer.render( scene, camera );
	stats.update();

	frame++;
}

/* ------------------------------------
	addParticle
------------------------------------*/

function addParticle(num) {
	// draw circle
	var amplitude = num + 1;
	// var amplitude = simplexNoise.noise(num * 0.1, 100) * MAX;
	console.log(amplitude);
	var geometry = new THREE.Geometry();
	for(var i = 0; i <= RESOLUTION; i++) {
	    var segment = ( i * SIZE ) * Math.PI / 180;
	    geometry.vertices.push( new THREE.Vector3( Math.cos( segment ) * amplitude, 0, Math.sin( segment ) * amplitude ) );         
	}

	// conver to HSL
	hue += hueSpeed;
	if(hue > 1) {
		hue = 0;
	}

	c.setHSL(hue, 0.75, 0.2);

	var material = new THREE.LineBasicMaterial( { color: c, linewidth: LINE_WIDTH, opacity: 1.0} );
	var mesh = new THREE.Line( geometry, material );
	
	// mesh.rotation.z = Math.random(90);

	particles.add(mesh);
}

/* ------------------------------------
	common setting
------------------------------------*/

function init() {
	W = window.innerWidth, H = window.innerHeight;
	
	// renderer
	renderer = new THREE.WebGLRenderer();
	// renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
	// renderer.autoClearColor = false;
	renderer.setSize( W, H );
	
	// scene
	scene = new THREE.Scene();

	// camera
	resetCamera();
	
	// Container
	container = document.getElementById( 'threeJs' );
	container.appendChild( renderer.domElement );

	// stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );

	// events
	keyboard = new THREEx.KeyboardState();
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

	// GUI
	setupGUI();
}

/* ------------------------------------
	reset a camera
------------------------------------*/

function resetCamera() {
	var near = 1;
	var far = 10000;
	camera = new THREE.PerspectiveCamera( params.fov, W/H, near, far );
	camera.position.set(params.cameraX, params.cameraY, params.cameraZ);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
}

/* ------------------------------------
	reset Particles when changes a resolution on GUI
------------------------------------*/

function resetParticles() {
	var len = particles.children.length;
	for (var i = 0; i < len; i++) {         
		particles.remove(particles.children[i]);
	}

	hue = 0;
	frame = 0;

	for(var i = 0; i < MAX; i++) {
	    addParticle(i);     
	}

}

setup();
draw();