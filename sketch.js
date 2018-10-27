let balls = [];
let num_of_balls = 150;
let pause = false;
let trace = false;

// All key effects
function keyPressed() {
	if (keyCode == 84) { // t for trace
		clearPath();
		trace = !trace;
		//clean up the earlier mess
	} else if (keyCode == 80) { // p for pause
		pause = !pause;
	} else if (keyCode == 67) { // c for clearing the path
		clearPath();
	}
}
// Throw small particles 
function createBall(ox, oy) {
	let sx = random(-10, 10);
	let sy = random(-10, 10);
	let r = random(2, 4);
	nb = new BouncyBall(ox, oy, sx, sy, r);
	balls.push(nb);
	if (balls.length > 1000) {
		balls.splice(0, 1);
	}
}
var canvas

function setup() {
	canvas = createCanvas(600, 400);
	canvas.parent('sketch-holder');
	for (let i = 0; i < num_of_balls; i++) {
		createBall(Math.random() * canvas.width, Math.random() * canvas.height);
	}
}


// mouse effect
function doubleClicked() {
	let p = canvas.position();
	if ((0 < mouseX && mouseX < canvas.width && 0 < mouseY && mouseY < canvas.height)) {
		let sx = 0;
		let sy = 0;
		let r = random(30, 40);
		nb = new BigBall(mouseX, mouseY, sx, sy, r);
		balls.push(nb);
		if (balls.length > 1000) {
			balls.splice(0, 1);
		}
	}
}

// handle collisions
function draw() {
	background(0);
	for (var i = 0; i < balls.length; i++) {
		for (var j = 0; j < balls.length; j++) {
			if (balls[i] !== balls[j] && balls[i].collide_soon(balls[j])) {
				console.log('collide')
				balls[i].bounceOff(balls[j]);
				balls[i].staticCollision(balls[j]);
			};
		};
	}

	for (var i = 0; i < balls.length; i++) {
		balls[i].show();
		balls[i].bounce();
	}
	// pausing
	if (pause == false) {
		for (let i = 0; i < balls.length; i++) {
			balls[i].move();
		}
	}

}


function clearPath() {
	// tracing
	for (let i = num_of_balls; i < balls.length; i++) {
		balls[i].history = [];
	}
}

function mousePressed() {
	for (var i = balls.length - 1; i >= 0; i--) {
		if (balls[i].contain(mouseX, mouseY)) {
			console.log('deleted' + ' ' + i)
			balls.splice(i, 1);
		}
	}
}

function applyDrag() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].speedx *= 0.5;
		balls[i].speedy *= 0.5;
	}
}