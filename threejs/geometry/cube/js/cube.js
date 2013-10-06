/*
	Cube
	Author: chimanaco

	// three.js examples
	http://threejs.org/examples/#webgl_custom_attributes_particles2

	_playGnd
	http://threejsplaygnd.brangerbriz.net/

	WebGL対応のライブラリThree.jsを爆速にする方法 | ClockMaker Blog
	http://clockmaker.jp/blog/2013/01/threejs-optimum/
*/

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

/* ////////////////////////////
    Variables
//////////////////////////// */

// standard
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();

// custom
var geometry, material, mesh;
var CUBE_NUM = 10;
var meshArray;
var theta = 0;
var radius = 1000;

/* ////////////////////////////
    Setup
//////////////////////////// */

function setup() 
{
	init();
	
	// Controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );

	// Code here
	geometry = new THREE.CubeGeometry( 35, 35, 35 );
	meshArray = [];
	material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});

	// var mesh = new THREE.Mesh( geometry, material);
	// scene.add( mesh );

	for (var i = 0; i < CUBE_NUM; i++) {
		for (var j = 0; j < CUBE_NUM; j++) {
			for (var k = 0; k < CUBE_NUM; k++) {
				var num = i * Math.pow(CUBE_NUM, 2) +  j * CUBE_NUM + k;
				meshArray[num] = new THREE.Mesh( geometry, material);
				// meshArray[num].scale = new THREE.Vector3( (i - CUBE_NUM) * 0.1, (j - CUBE_NUM) * 0.1, (k - CUBE_NUM) * 0.1);
				meshArray[num].position.x = 50 * (i - CUBE_NUM / 2);
				meshArray[num].position.y = 50 * (j - CUBE_NUM / 2);
				meshArray[num].position.z = 50 * (k - CUBE_NUM / 2);
				meshArray[num].rotation.x = (i + k) * params.meshRotation;
				scene.add( meshArray[num] );
			}
		}
	}
}

/* ////////////////////////////
    Draw
//////////////////////////// */

function draw() {
	// camera position
	theta += params.speed;
	camera.position.x = radius * Math.cos( theta * Math.PI / 360 );
	camera.position.y = radius * Math.sin( theta * Math.PI / 360 );
    
    // cube rotation
    var len = Math.pow(CUBE_NUM, 3);
	for (var i = 0; i < len ; i++) {
		meshArray[i].rotation.x += params.meshRotation;
		meshArray[i].rotation.y += params.meshRotation;
	}

    requestAnimationFrame( draw );
	renderer.render( scene, camera );	
	controls.update();
	stats.update();
}

/* ------------------------------------
	common setting
------------------------------------*/

function init() {
	W = window.innerWidth, H = window.innerHeight;
	
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1);
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

	// Light
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	
	// stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );

	// info
	info = document.getElementById( 'info' );

	// events
	keyboard = new THREEx.KeyboardState();
	window.addEventListener( 'resize', onWindowResize, false );
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

	// GUI
	setupGUI();
}

/* ------------------------------------
	window resize
------------------------------------*/

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

	// toggle info
	if(document.webkitIsFullScreen || document.mozFullScreen) {
		info.style.display = "none";
	} else {
		info.style.display = "block";
		console.assert(false);
	}

}

/* ------------------------------------
	reset a camera
------------------------------------*/

function resetCamera() {
	var near = 1;
	var far = 10000;
	camera = new THREE.PerspectiveCamera( params.fov, W/H, near, far );
	camera.position.z = 800;

	// camera.position.set(params.cameraX, params.cameraY, params.cameraZ);
	// camera.lookAt(new THREE.Vector3(0, 0, 0));
}

/* ------------------------------------
	restart when changes on GUI
------------------------------------*/

function restart() {
	resetCamera();
}

setup();
draw();