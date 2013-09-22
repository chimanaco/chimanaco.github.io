/*
	VERTEX DISPLACEMENT WITH A NOISE FUNCTION USING GLSL AND THREE.JS	
	http://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js
*/

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
		
var geometry, material, mesh;
var attributes;
var camera, scene, renderer, stats;
var keyboard;
var W, H;
var group;
var frame = 0;
var uniforms;

/* ------------------------------------
	setup
------------------------------------*/

function setup() {
	// common setting
	init();

	var vertexShader = document.getElementById("vertexShader").innerHTML;
	var fragmentShader = document.getElementById("fragmentShader").innerHTML;

	attributes = {
	};

	// add a uniform for the time
	uniforms = {
		time: {
			type: 'f', // a float
			value: 0
		}
	};

	// geometry
	geometry = new THREE.CubeGeometry(300, 300, 300);
	
	// create the final material
	material = new THREE.ShaderMaterial({
	    uniforms:       uniforms,
	    attributes:     attributes,
	    vertexShader:   vertexShader,
	    fragmentShader: fragmentShader
	});

	mesh = new THREE.Mesh(geometry, material );
	scene.add(mesh);	

	// var wireplane = new THREE.Mesh( wgeometry, wmaterial );
	// wireplane.scale.set( 1, 1, 1 );
	// wireplane.position.y = -10.5;
	// wireplane.rotation.x = - Math.PI / 2;
	// scene.add( wireplane );
}

/* ------------------------------------
	draw
------------------------------------*/

function draw() {
	uniforms.time.value = (Math.sin(frame) + 1) / 2;
    frame += 0.1;
    console.log(uniforms.time.value);

	// camera
	camera.rotation.x = params.cameraRotX;
	camera.rotation.y = params.cameraRotY;
	camera.rotation.z = params.cameraRotZ;

	// group
	mesh.rotation.x = Date.now() * params.speedX / 1000;
	mesh.rotation.y = Date.now() * params.speedY / 1000;
	mesh.rotation.z = Date.now() * params.speedZ / 1000;
	
	// rendering & updating
	requestAnimationFrame( draw );
	renderer.render( scene, camera );
	stats.update();
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
	// camera = new THREE.PerspectiveCamera( 50, W/H, near, far );
	// camera.position.set(0, 0, 500);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
}

/* ------------------------------------
	restart when changes on GUI
------------------------------------*/

function restart() {
	resetCamera();
}

setup();
draw();