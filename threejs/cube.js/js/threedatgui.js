/*! threedatgui - v0.0.0 - 2013-09-09
* Copyright (c) 2013 ; Licensed  */
/*
	based on:
	davidedc/using-dat-gui-with-processing-js
	https://github.com/davidedc/using-dat-gui-with-processing-js

*/

	window.speed = 1.0;
	window.meshRotation = 0.06;
	// window.rotX = 0;
	// window.rotY = 200;
	// window.rotZ = 400;

	window.onload = function() {
	gui = new dat.GUI();
	gui.add(window, 'speed', -3, 3);
	gui.add(window, 'meshRotation', -0.1, 0.1);
	// gui.add(window, 'rotY', -500, 500);
	// gui.add(window, 'rotZ', -500, 500);
	// gui.add(window, 'rotX', -1, 1);
	// gui.add(window, 'rotY', -1, 1);
	// gui.add(window, 'rotZ', -1, 1);
	
	gui.open();	
};