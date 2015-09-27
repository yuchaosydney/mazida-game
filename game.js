var game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'game',{ preload: preload, create: create, update: update });

var TO_RADIANS = Math.PI/180;
var speed = 1;
var maxSpeed = 4;
var car;

function preload() {
  game.load.image('track-hit', 'assets/track-hit.png');
  game.load.image('car', 'assets/car.png');
}

function create() {
  game.add.image(0, 0, 'track-hit');
  car = game.add.sprite(500,500, 'car');
  car.anchor.setTo(0.5,0.5);
  car.rotationStep = 4;
  car.angle = 0;
}

function update() {
  
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
    steerLeft(car);
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    steerRight(car);
  }

  moveCar(car);
}



/*
 *
 *useful algrithoms
 **/

function moveCar(car) {
  var speedAxis = speedXY(car.angle, speed);
  car.x += speedAxis.x;
  car.y += speedAxis.y;
}

function speedXY (rotation, speed) {
  return {
		x: Math.sin(rotation * TO_RADIANS) * speed,
		y: Math.cos(rotation * TO_RADIANS) * speed * -1,
	};
}

function steerLeft(car){
  car.angle -= car.rotationStep * (speed/maxSpeed);
}

function steerRight(car){
  car.angle += car.rotationStep * (speed/maxSpeed);
}
