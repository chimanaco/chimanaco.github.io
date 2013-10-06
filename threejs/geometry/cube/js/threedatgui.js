/*
	for dat.GUI:
	dat-gui - A lightweight controller library for JavaScript.
	https://code.google.com/p/dat-gui/
*/

var params = 
{
	fov: 50, 
	// cameraX: 0, 
	// cameraY: 0, 
	// cameraZ: 800,
	speed: 1,
	meshRotation: .06
};

function setupGUI() {
	gui = new dat.GUI();
	var fov = gui.add( params, 'fov', 0, 180).name('field of view');
	// var cameraX = gui.add( params, 'cameraX', -2500, 2500 ).name('cameraX');
	// var cameraY = gui.add( params, 'cameraY', -2500, 2500 ).name('cameraY');
	// var cameraZ = gui.add( params, 'cameraZ', -5000, 5000 ).name('cameraZ');
	var speed = gui.add( params, 'speed', -3, 3 ).name('speed');
	var meshRotation = gui.add( params, 'meshRotation', -0.1, 0.1 ).name('meshRotation');

	fov.onChange(function() { restart() });

	gui.open();	
}