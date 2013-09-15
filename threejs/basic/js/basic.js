if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
		
var camera, scene, renderer, stats;
var keyboard;
var W, H;
var group;

/* ------------------------------------
	setup
------------------------------------*/

function setup() {
	// common setting
	init();

	// code from here
	var wgeometry = new THREE.PlaneGeometry( 1000, 1000, 100, 100 );
	var wmaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1 } );
	var wireplane = new THREE.Mesh( wgeometry, wmaterial );
	wireplane.scale.set( 1, 1, 1 );
	wireplane.position.y = -10.5;
	wireplane.rotation.x = - Math.PI / 2;
	scene.add( wireplane );

  	var baseH = 100;
  	var baseW = 10;
  	var baseD = 10;

    var geometryX = new THREE.CubeGeometry(baseH, baseW, baseD);
    geometryX.applyMatrix( new THREE.Matrix4().makeTranslation( baseH / 2, 0, 0 ) );
	var materialX = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, color: 0xff0000});
	var meshX = new THREE.Mesh(geometryX, materialX);
	
	var geometryY = new THREE.CubeGeometry(baseW, baseH, baseD);
    geometryY.applyMatrix( new THREE.Matrix4().makeTranslation( 0, baseH / 2, 0 ) );
	var materialY = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, color: 0x00ff00});
	var meshY = new THREE.Mesh(geometryY, materialY);
	
	var geometryZ = new THREE.CubeGeometry(baseW, baseD, baseH);
    geometryZ.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, baseH / 2 ) );
	var materialZ = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, color: 0x0000ff});
	var meshZ = new THREE.Mesh(geometryZ, materialZ);
	
	group = new THREE.Object3D();
	group.add(meshX);
	group.add(meshY);
	group.add(meshZ);
	scene.add(group);
}

/* ------------------------------------
	draw
------------------------------------*/

function draw() {
	
	// camera
	camera.rotation.x = params.cameraRotX;
	camera.rotation.y = params.cameraRotY;
	camera.rotation.z = params.cameraRotZ;

	// group
	group.rotation.x = Date.now() * params.speedX / 1000;
	group.rotation.y = Date.now() * params.speedY / 1000;
	group.rotation.z = Date.now() * params.speedZ / 1000;
	
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