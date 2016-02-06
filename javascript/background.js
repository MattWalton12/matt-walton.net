background = {};


background.generateBalls = function() {
	console.log("test");
	background.canvas.balls = [];

	for (i=1; i<50; i++) {
		var ball = new Ball(tinycolor({h: 100 + 250 / 50 * i, s: 0.4, v: 1}).toRgbString());
		ball.SetPos(window.innerWidth / 51 * i, window.innerHeight - 200 + Math.cos(i) * 20)
		background.canvas.balls[i] = ball
	}

	background.canvas.renderAll();
}

var iterator = 0.0;

background.updateBallPosition = function() {
	iterator += 0.1;

	var i = 1;
	for (i=1; i<50; i++) {
		if (background.canvas.balls[i].loaded) {
			background.canvas.balls[i].Update();
		} else {
			background.canvas.balls[i].SetPos(window.innerWidth / 51 * i, window.innerHeight - 200 + Math.cos(i + iterator) * 20)
		}
	}

}

background.explode = function() {
	for (i=1; i<50; i++) {
		var randX = Math.random() * 10;
		var randY = Math.sqrt(100 - Math.pow(randX, 2))
		randY = 5 - randY

		randX = randX * 100
		randY = randY * 100

		background.canvas.balls[i].SetVelocity(randX, randY)
	}

	var i = 0;
	var interval = setInterval(function() {
		i++;

		if (i>25)
			return clearInterval(interval);

		background.canvas.balls[i].loaded = true;
		background.canvas.balls[50 - i].loaded = true;
		console.log("loaded", i)
	}, 100);

	background.loaded = true;
}

function Ball(color) {
	this.position = new Vec2(0, 0);
	this.velocity = new Vec2(0, 0);

	this.loaded = false;

	this.drawable = new fabric.Circle({
		radius: 10,
		fill: color,
		left: this.position.x,
		top: this.position.y
	});
	

	background.canvas.add(this.drawable);

	
}

Ball.prototype.SetPos = function(x, y) {

	this.position.x = x;
	this.position.y = y;

	this.drawable.set({left: x, top: y});

}

Ball.prototype.SetVelocity = function(x, y) {
	this.velocity.x = x;
	this.velocity.y = y;
}

Ball.prototype.Update = function() {
	if (this.position.x + 20 >= background.canvas.getWidth() || this.position.x - 20 <= 0) {
		this.velocity.x = -this.velocity.x;
	}

	if (this.position.y + 20 >= background.canvas.getHeight() || this.position.y - 20 <= 0) {
		this.velocity.y = -this.velocity.y;
	}

	this.SetPos(this.position.x + (this.velocity.x / 100), this.position.y + (this.velocity.y / 100))
}

function Vec2(x, y) {
	this.x = x;
	this.y = y;
}

$(document).ready(function() {
	background.canvas = new fabric.Canvas("background");
	background.canvas.setWidth(window.innerWidth);
	background.canvas.setHeight(window.innerHeight);
	background.generateBalls();

	setInterval(function() {
		background.updateBallPosition();
		background.canvas.renderAll();
	}, 1000 / 30);
});