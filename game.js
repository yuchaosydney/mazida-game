var game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'game',{ preload: preload, create: create, update: update });

var TO_RADIANS = Math.PI/180;
var speed = 1;
var maxSpeed = 4;
var car;
var com_car;
var car_width = 18;
var car_height = 36;
var car_radius = Math.sqrt((car_width/2)*(car_width/2) + (car_height/2)*(car_height/2));

function preload() {
  game.load.image('track-hit', 'assets/track-hit.png');
  game.load.image('car', 'assets/car.png');
}

function create() {
  game.add.image(0, 0, 'track-hit');
  car = game.add.sprite(500,500, 'car');
  com_car = game.add.sprite(600,500, 'car');
  
  game.physics.enable(car, Phaser.Physics.ARCADE);
  car.body.collideWorldBounds = true;
  car.body.bounce.setTo(1,1); 
  car.anchor.setTo(0.5,0.5);
  car.rotationStep = 4;
  car.angle = 0;
  car.top_left = new Array(car.x,car.y,0);
  car.top_right = new Array(car.x + car_width, car.y,0);
  car.center_point = new Array(car.top_left[0] + car_width/2,car.top_left[1] + car_height/2,0);//(center_x,centery_y, angle) 
  car.top_left[2] = Math.atan2(car.center_point[1] - car.top_left[1],car.top_left[0] - car.center_point[0]); 
  car.top_right[2] = Math.atan2(car.center_point[1] - car.top_right[1],car.top_right[0] - car.center_point[0]); 
  console.log(car.top_right[2]);
  console.log((car.center_point[1] + car_radius*Math.cos(car.top_right[2])));
  
  game.physics.enable(com_car, Phaser.Physics.ARCADE);
  com_car.body.collideWorldBounds = true;
  com_car.body.bounce.setTo(1,1); 

  
  com_car.anchor.setTo(0.5,0.5);
  com_car.rotationStep = 4;
  com_car.angle = 0;
}

function update() {

  game.physics.arcade.collide(car, com_car);
  
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
    steerLeft(car);
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    steerRight(car);
  }

  //moveCar(car);
  //moveCar(com_car);
}

function render() {

	game.debug.bodyInfo(car, 16, 24);

	// game.debug.body(sprite);
	// game.debug.body(sprite2);

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
  console.log(car.rotation); 
  car.angle -= car.rotationStep * (speed/maxSpeed);
}

function steerRight(car){
  console.log(car.rotation); 
  car.angle += car.rotationStep * (speed/maxSpeed);
}
