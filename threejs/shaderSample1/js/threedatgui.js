/*
	for dat.GUI:
	davidedc/using-dat-gui-with-processing-js
	https://github.com/davidedc/using-dat-gui-with-processing-js

*/

var params = 
{
	fov: 50, 
	// near: 1, 
	// far: 10000, 
	cameraX: 0, 
	cameraY: 0, 
	cameraZ: 500,
	cameraRotX: Math.PI * 2,
	cameraRotY: Math.PI * 2,
	cameraRotZ: Math.PI * 2,
	speedX: 0,
	speedY: 0,
	speedZ: 0
};

function setupGUI() {
	gui = new dat.GUI();
	var fov = gui.add( params, 'fov', 0, 180).name('field of view');
	// var near = gui.add( params, 'near', -10, 10).name('near');
	// var far = gui.add( params, 'far', -20000, 20000).name('far');
	var cameraX = gui.add( params, 'cameraX', -2500, 2500 ).name('cameraX');
	var cameraY = gui.add( params, 'cameraY', -2500, 2500 ).name('cameraY');
	var cameraZ = gui.add( params, 'cameraZ', -5000, 5000 ).name('cameraZ');
	var cameraRotX = gui.add( params, 'cameraRotX', -Math.PI * 2, Math.PI * 2 ).name('cameraRotX');
	var cameraRotY = gui.add( params, 'cameraRotY', -Math.PI * 2, Math.PI * 2 ).name('cameraRotY');
	var cameraRotZ = gui.add( params, 'cameraRotZ', -Math.PI * 2, Math.PI * 2 ).name('cameraRotZ');
	var speedX = gui.add( params, 'speedX', 0, 10 ).name('speedX');
	var speedY = gui.add( params, 'speedY', 0, 10 ).name('speedY');
	var speedZ = gui.add( params, 'speedZ', 0, 10 ).name('speedZ');

	fov.onChange(function() { restart() });
	// near.onChange(function(value) { restart() });
	// far.onChange(function(value) { restart() });
	cameraX.onChange(function() { restart() });
	cameraY.onChange(function() { restart() });
	cameraZ.onChange(function() { restart() });
	cameraRotX.onChange(function() { restart() });
	cameraRotY.onChange(function() { restart() });
	cameraRotZ.onChange(function() { restart() });
	speedX.onChange(function() { restart() });
	speedY.onChange(function() { restart() });
	speedZ.onChange(function() { restart() });

	gui.open();	
}