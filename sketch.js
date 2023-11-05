/*
1. draw the lines without any output
	a. workout where on the screen to plot and the scale
	b. draw lines that move up the screen in regular intervals
		i. create 2d array of lines, add one to the array every x frames
		(reason we dont want to just draw verts staight into the screen is becasue we want them to animate)
		ii. each frame clear screen and decrease the y coordinates of each line
		iii. if line's y is smaller than ploty then remove from array
2. add the music output (the waveform)

*/

var music

var output = [];
var startX;
var startY;
var endY;
var spectrumWidth;
var speed = 0.7;
var fourier;

function preload() {
	music = loadSound('assets/Dot.mp3');
}

function setup()
{
	createCanvas(800, 800);
	startX = width/5;
	endY = height/5;
	startY = height - endY;
	spectrumWidth = (width/5)*3;
	fourier = new p5.FFT();

}

function mousePressed() {
	music.loop();
}

function addWave() {	

	//output.push([{x: startX, y: startY}, {x: startX + spectrumWidth, y: startY}]);
	
	var w = fourier.waveform();
	var outputWave = [];
	var smallScale = 3;
	var bigScale = 40;

	for(var i = 0; i < w.length; i++){
		if(i % 20 == 0){
			var x = map(i, 0, 1024, startX, startX + spectrumWidth);
			if(i < 1024 * 0.25 || i > 1024*0.75){
				var y = map (w[i], -1, 1, -smallScale, smallScale);
				
				outputWave.push({
					x: x,
					y: startY + Y
				})
			}
			else {
				var y = map(w[i], -1, 1, -bigScale, bigScale);outputWave.push({
					x: x,
					y: startY + y
				})
			}
		}
	}
	output.push(outputWave);

}

function draw() {
	background(0);
	stroke(255);
	strokeWeight(2);
	if (frameCount % 30 == 0){
		addWave();
	}

	for(var i = 0; i < output.length; i++){
		var o = output[i];
		beginShape()
		for(var j = 0; j < o.length; j++){
			o[j].y -= speed;
			vertex(o[j].x, o[j].y);
		}
		endShape()
		if(o[0].y < endY){
			output.splice(i, 1);
		}
	}
}