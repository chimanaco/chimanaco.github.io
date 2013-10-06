/*
	for dat.GUI:
	dat-gui - A lightweight controller library for JavaScript.
	https://code.google.com/p/dat-gui/
*/

var params = 
{
	fov: 50, 
	cameraX: 0, 
	cameraY: 100, 
	cameraZ: 500,
	groupRotX: 0,
	groupRotY: 0,
	groupRotZ: 0
};

function setupGUI() {
	gui = new dat.GUI();
	var fov = gui.add( params, 'fov', 0, 180).name('field of view');
	var cameraX = gui.add( params, 'cameraX', -2500, 2500 ).name('cameraX');
	var cameraY = gui.add( params, 'cameraY', -2500, 2500 ).name('cameraY');
	var cameraZ = gui.add( params, 'cameraZ', -5000, 5000 ).name('cameraZ');
	var groupRotX = gui.add( params, 'groupRotX', 0, 10 ).name('groupRotX');
	var groupRotY = gui.add( params, 'groupRotY', 0, 10 ).name('groupRotY');
	var groupRotZ = gui.add( params, 'groupRotZ', 0, 10 ).name('groupRotZ');

	fov.onChange(function() { restart() });
	// near.onChange(function(value) { restart() });
	// far.onChange(function(value) { restart() });
	cameraX.onChange(function() { restart() });
	cameraY.onChange(function() { restart() });
	cameraZ.onChange(function() { restart() });
	groupRotX.onChange(function() { restart() });
	groupRotY.onChange(function() { restart() });
	groupRotZ.onChange(function() { restart() });

	gui.close();	
}