let balls = [];
let num_of_balls = 3;

function createBall(ox,oy){
	let sx = random(-2,2);
	let sy = random(-2,2);
	let r = random(20,60);
	nb = new BouncyBall(ox,oy,sx,sy,r);
	balls.push(nb);
	if (balls.length > 10) {
		balls.splice(0,1);
	}
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
}

window.addEventListener( 'resize' , function() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	}
)

function doubleClicked(){
	let ox = mouseX;
	let oy = mouseY;
	createBall(ox,oy);
}

function draw() {
	background(0);
	for (var i = 0; i < balls.length ; i++) {
		for (var j = 0; j < balls.length ; j++) {
			if (balls[i]!==balls[j] && balls[i].collide_soon(balls[j])){
				console.log('collide')
				balls[i].bounceOff(balls[j]);
				balls[i].staticCollision(balls[j]);
			};
		};
	}



	for (var i = 0; i < balls.length; i++) {
		balls[i].move();
		balls[i].show();
		balls[i].bounce();
	}


}

function mousePressed(){
	for (var i = balls.length-1; i >= 0; i--) {
		if (balls[i].contain(mouseX,mouseY)) {
			console.log('deleted'+' '+i)
			balls.splice(i,1);
		}
	}
}
