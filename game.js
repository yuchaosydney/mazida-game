var game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'game',{ preload: preload, create: create, update: update });

var bg, bitBg;
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
  bg = game.add.image(0, 0, 'track-hit');
  bitBg = game.make.bitmapData();
  bitBg.load(bg);
  getRgbByXY(500,600);
  car = game.add.sprite(500,650, 'car');
  com_car = game.add.sprite(600,500, 'car');
  
  game.physics.enable(car, Phaser.Physics.ARCADE);
  car.body.collideWorldBounds = true;
  car.body.bounce.setTo(1,1); 
  car.anchor.setTo(0.5,0.5);
  car.rotationStep = 4;
  car.angle = 0;
  car.top_left = {x:car.x,y:car.y,angle:0};
  car.top_right = {x:car.x + car_width,y:car.y,angle:0};

  car.center_point = {x:car.x + car_width/2,y:car.y + car_height/2};

  car.top_left.angle = Math.atan2(car.top_left.x - car.center_point.x,car.center_point.y - car.top_left.y); 
  car.top_right.angle = Math.atan2(car.top_right.x - car.center_point.x,car.center_point.y - car.top_right.y); 
 
  
  game.physics.enable(com_car, Phaser.Physics.ARCADE);
  com_car.body.collideWorldBounds = true;
  com_car.body.bounce.setTo(1,1); 

  
  com_car.anchor.setTo(0.5,0.5);
  com_car.rotationStep = 4;
  com_car.angle = 0;
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
  car_top_left_point_update(car);
  car_top_right_point_update(car);
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
  car.angle -= car.rotationStep * (speed/maxSpeed);
}

function steerRight(car){
  car.angle += car.rotationStep * (speed/maxSpeed);
}

function car_top_left_point_update(car) {
  car.top_left.x = car.center_point.x + car_radius*Math.sin(car.top_left.x + car.angle); 
  car.top_left.y = car.center_point.y + car_radius*Math.cos(car.top_left.y + car.angle)*-1; 
}

function car_top_right_point_update(car) {
  car.top_right.x = car.center_point.x + car_radius*Math.sin(car.top_right.x + car.angle); 
  car.top_right.y = car.center_point.y + car_radius*Math.cos(car.top_right.y + car.angle)*-1;
}

//return hex color format
function getRgbByXY(x,y) {
  var rgbObj = bitBg.getPixelRGB(x, y);
  return Phaser.Color.RGBtoString(rgbObj.r,rgbObj.g,rgbObj.b);
}
