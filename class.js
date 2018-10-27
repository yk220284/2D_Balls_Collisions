class BouncyBall {
	constructor(ox, oy, sx, sy, r) {
		this.x = ox;
		this.y = oy;
		this.speedx = sx;
		this.speedy = sy;
		this.speed = function () {
			return dist(0, 0, this.speedx, this.speedy);
		}
		this.r = r;
		this.mass = this.r ** 2.5;
		this.angle = function () {
			return atan2(this.speedy, this.speedx);
		};
	}

	move() {
		this.x += this.speedx;
		this.y += this.speedy;
	}

	show() {
		fill(255);
		noStroke();
		ellipse(this.x, this.y, this.r * 2);
	}

	bounce() {
		if (this.y + this.r + this.speedy > height) {
			this.speedy *= -1

		} else if (this.y - this.r + this.speedy < 0) {
			this.speedy *= -1

		} else if (this.x + this.r + this.speedx > width) {
			this.speedx *= -1

		} else if (this.x - this.r + this.speedx < 0) {
			this.speedx *= -1
		}

		if (this.y + this.r > height) {
			this.y = height - this.r;
		}
		if (this.y - this.r < 0) {
			this.y = this.r;
		}
		if (this.x + this.r > width) {
			this.x = canvas.width - this.r;
		}
		if (this.x - this.r < 0) {
			this.x = this.r;
		}
	}

	contain(px, py) {

		return dist(px, py, this.x, this.y) < this.r;

	}

	collide(other) {
		return (dist(this.x, this.y, other.x, other.y) <= (this.r + other.r));
	}

	collide_soon(other) {
		return (dist(this.x + this.speedx, this.y + this.speedy, other.x + other.speedx, other.y + other.speedy) <= (this.r + other.r));
	}

	bounceOff(other) {
		// 2D momentum formula
		var theta1 = this.angle();
		var theta2 = other.angle();
		var phi = Math.atan2(other.y - this.y, other.x - this.x);
		var m1 = this.mass;
		var m2 = other.mass;
		var v1 = this.speed();
		var v2 = other.speed();

		var dx1F = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
		var dy1F = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
		var dx2F = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
		var dy2F = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

		this.speedx = dx1F;
		this.speedy = dy1F;
		other.speedx = dx2F;
		other.speedy = dy2F;


	}

	staticCollision(other) {

		var theta = atan2((this.y - other.y), (this.x - other.x));
		var overlap = this.r + other.r - dist(this.x, this.y, other.x, other.y);
		var smallerObject = this.r < other.r ? this : other
		smallerObject.x -= overlap * cos(theta);
		smallerObject.y -= overlap * sin(theta);
	}
}

// a subclass of BouncyBall
class BigBall extends BouncyBall {
	constructor(ox, oy, sx, sy, r) {
		super(ox, oy, sx, sy, r); // call the super class constructor and pass in the name parameter
		this.history = [];
	}

	move() {
		super.move();
		if (trace) {
			let v = createVector(this.x, this.y);
			this.history.push(v);

			for (let i = 0; i < this.history.length; i++) {
				let v = this.history[i];
				fill(0, 0, 255);
				noStroke();
				ellipse(v.x, v.y, 1 * 2);

			}
		}
	}
}