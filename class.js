class BouncyBall {
	constructor(ox,oy,sx,sy,r) {
		this.x = ox;
		this.y = oy;
		this.speedx = sx;
		this.speedy = sy;
		this.speed = function() {
			return dist(0,0,this.speedx,this.speedy);
		}
		this.r = r;
		this.mass = this.r ** 3;
		this.angle = function() {
			return atan2(this.speedy,this.speedx);
		};
	}

	move(){
		this.x += this.speedx;
		this.y += this.speedy;
	}

	show(){
		noFill();
		stroke(255);
		strokeWeight(1);
		ellipse(this.x,this.y,this.r*2);
	}

	bounce(){
		if (this.y + this.r + this.speedy > height){
			this.speedy *= -1

		}else if (this.y - this.r + this.speedy < 0){
			this.speedy *= -1

		}else if (this.x + this.r + this.speedx > width){
			this.speedx *= -1

		}else if (this.x - this.r + this.speedx < 0){
			this.speedx *= -1}

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

	contain(px,py){

    return dist(px,py,this.x,this.y) < this.r;

	}

  collide(other){
    return (dist(this.x,this.y,other.x,other.y) <= (this.r+other.r));
  }

	collide_soon(other){
		return (dist(this.x + this.speedx, this.y+ this.speedy, other.x + other.speedx , other.y + other.speedy) <= (this.r+other.r));
	}

  bounceOff(other){
    let phi = atan2((other.y - this.y), (other.x - this.x));
		let theta1 = this.angle();
		let theta2 = other.angle();
		let m1 = this.mass;
		let m2 = other.mass;
		let u1 = this.speed();
		let u2 = other.speed();
		let cx1 = u1 * cos(theta1 - phi);
		let cy1 = u1 * sin(theta1 - phi);
		let cx2 = u2 * cos(theta2 - phi);
		let cy2 = u2 * sin(theta2 - phi);

		let v1 = (cx1 * (m1 - m2) + 2 * m2 * cx2) / (m1 + m2);
		let v2 = (cx2 * (m2 - m1) + 2 * m1 * cx1) / (m1 + m2);

		this.speedx = v1 * cos(phi) + cy1 * cos(PI/2 + phi);
		this.speedy = v1 * sin(phi) + cy1 * sin(PI/2 + phi);
		other.speedx = v2 * cos(phi) + cy2 * cos(PI/2 + phi);
		other.speedy = v2 * sin(phi) + cy1 * sin(PI/2 + phi);

  }

	staticCollision(other) {

    var theta = atan2((this.y - other.y), (this.x - other.x));
    var overlap = this.r + other.r - dist (this.x, this.y, other.x,other.y);
    var smallerObject = this.r < other.r ? this : other
    smallerObject.x -= overlap * cos(theta);
    smallerObject.y -= overlap * sin(theta);
	}
}
