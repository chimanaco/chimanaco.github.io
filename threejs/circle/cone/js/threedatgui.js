/*
	for dat.GUI:
	davidedc/using-dat-gui-with-processing-js
	https://github.com/davidedc/using-dat-gui-with-processing-js

*/

var params = 
{
	fov: 50, 
	cameraX: 0, 
	cameraY: 0,
	cameraZ: 2000,
	speed: 0.03,
	groupRotX: 0.5,
	groupRotY: 0.5,
	groupRotZ: 0.0,
	height: 300,
	radius: 2//,
	// resolution: 256
};

function setupGUI() {
	gui = new dat.GUI();
	var fov = gui.add( params, 'fov', 0, 180).name('field of view');
	// var near = gui.add( params, 'near', -10, 10).name('near');
	// var far = gui.add( params, 'far', -20000, 20000).name('far');
	var cameraX = gui.add( params, 'cameraX', -2500, 2500 ).name('cameraX');
	var cameraY = gui.add( params, 'cameraY', -2500, 2500 ).name('cameraY');
	var cameraZ = gui.add( params, 'cameraZ', -2500, 2500 ).name('cameraZ');
	var groupRotX = gui.add( params, 'groupRotX', 0, 1 ).name('groupRotX');
	var groupRotY = gui.add( params, 'groupRotY', 0, 1 ).name('groupRotY');
	var groupRotZ = gui.add( params, 'groupRotZ', 0, 1 ).name('groupRotZ');
	var speed = gui.add( params, 'speed', 0, 0.1 ).name('speed');
	var height = gui.add( params, 'height', 10, 1000 ).name('height');
	var radius = gui.add( params, 'radius', 1, 100 ).name('radius');
	// var resolution = gui.add( params, 'resolution', 1, 100 ).step(1).name('resolution');
	
	fov.onChange(function() { resetCamera() });
	// near.onChange(function(value) { restart() });
	// far.onChange(function(value) { restart() });
	cameraX.onChange(function() { resetCamera() });
	cameraY.onChange(function() { resetCamera() });
	cameraZ.onChange(function() { resetCamera() });
	
	gui.open();	
}