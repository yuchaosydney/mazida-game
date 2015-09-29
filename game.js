var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game',{ preload: preload, create: create, update: update });

var counter = 0;
var bg,ai_bg, bitBg, ai_bit_bg;
var TO_RADIANS = Math.PI/180;
var slow_speed = 0.5;
var normal_speed = 1.5;
var com_speed = 1.4;
var maxSpeed = 4;
var car;
var com_car;
var car_width = 18;
var car_height = 36;
var car_radius = Math.sqrt((car_width/2)*(car_width/2) + (car_height/2)*(car_height/2));

function preload() {
  game.load.image('track-hit', 'assets/track-hit.png');
  game.load.image('ai-map', 'assets/ai_map.png');
  game.load.image('car', 'assets/car.png');
}

function create() {
  
  game.world.setBounds(0, 0, 1140, 801);

  ai_bg = game.add.image(0, 0, 'ai-map');
  bg = game.add.image(0, 0, 'track-hit');
  bitBg = game.make.bitmapData();
  bitBg.load(bg);
  ai_bit_bg = game.make.bitmapData();
  ai_bit_bg.load(ai_bg);

  car = game.add.sprite(1000,550, 'car');
  
  game.physics.enable(car, Phaser.Physics.ARCADE);
  car.body.collideWorldBounds = true;
  car.body.bounce.setTo(1,1); 
  car.anchor.setTo(0.5,0.5);
  car.rotationStep = 4;
  car.angle = 0;
  car.top_left = {x:car.x,y:car.y,angle:0};
  car.top_right = {x:car.x + car_width,y:car.y,angle:0};
  car.speed = normal_speed; 

  car.center_point = {x:car.x + car_width/2,y:car.y + car_height/2};

  car.top_left.angle = Math.atan2(car.top_left.x - car.center_point.x,car.center_point.y - car.top_left.y); 
  car.top_right.angle = Math.atan2(car.top_right.x - car.center_point.x,car.center_point.y - car.top_right.y); 
 game.camera.follow(car);
  
  com_car = game.add.sprite(1000,500, 'car');
  game.physics.enable(com_car, Phaser.Physics.ARCADE);
  com_car.body.collideWorldBounds = true;
  com_car.body.bounce.setTo(1,1); 
  
  com_car.anchor.setTo(0.5,0.5);
  com_car.rotationStep = 4;
  com_car.angle = 0;
  com_car.top_left = {x:com_car.x,y:com_car.y,angle:0};
  com_car.top_right = {x:com_car.x + car_width,y:com_car.y,angle:0};
  com_car.speed = com_speed; 

  com_car.top_left.angle = Math.atan2(com_car.top_left.x - com_car.x,com_car.y - com_car.top_left.y); 
  com_car.top_right.angle = Math.atan2(com_car.top_right.x - com_car.x,com_car.y - com_car.top_right.y);
  //create counter
}

function update() {

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
    steerLeft(car);
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    steerRight(car);
  }else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    if(car.speed < maxSpeed) {
      car.speed += 0.1; 
    } 
  }else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    if(car.speed > 0) {
      car.speed -= 0.1; 
    } 
  }
  car_top_left_point_update(car);
  car_top_right_point_update(car);
  car_top_left_point_update(com_car);
  car_top_right_point_update(com_car);
  
  //stear cars
  // if(getRgbByXYMainMap(car.top_left.x,car.top_left.y) == "#000000") {
  //   car.rotationStep = 128;
  //   steerRight(car); 
  // }
  
  // if(getRgbByXYMainMap(car.top_right.x,car.top_right.y) == "#000000") {
  //   car.rotationStep = 128;
  //   steerLeft(car); 
  // }
  
  if(getRgbByXYMainMap(car.top_right.x,car.top_right.y) == "#000000" || getRgbByXYMainMap(car.top_left.x,car.top_left.y) == "#000000") {
    car.speed = slow_speed; 
  }

  //computer cars
  if(getRgbByXYAIMap(com_car.top_left.x,com_car.top_left.y) == "#ce470d") {
    com_car.rotationStep = 16;
    steerRight(com_car); 
  }
  
  if(getRgbByXYAIMap(com_car.top_right.x,com_car.top_right.y) == "#9cce4d") {
    com_car.rotationStep = 16;
    steerLeft(com_car); 
  }
  //computer cars
  
  moveCar(car);
  moveCar(com_car);
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
  var speedAxis = speedXY(car.angle, car.speed);
  car.x += speedAxis.x;
  car.y += speedAxis.y;
  car.distance ++;
}

function speedXY (rotation, speed) {
  return {
		x: Math.sin(rotation * TO_RADIANS) * speed,
		y: Math.cos(rotation * TO_RADIANS) * speed * -1,
	};
}

function steerLeft(car){
  car.angle -= car.rotationStep * (car.speed/maxSpeed);
  car.rotationStep = 4;
}

function steerRight(car){
  car.angle += car.rotationStep * (car.speed/maxSpeed);
  car.rotationStep = 4;
}

function car_top_left_point_update(car) {
  car.top_left.x = car.x + car_radius*Math.sin((car.top_left.angle + car.angle)*TO_RADIANS); 
  car.top_left.y = car.y + car_radius*Math.cos((car.top_left.angle + car.angle)*TO_RADIANS)*-1; 
}

function car_top_right_point_update(car) {
  car.top_right.x = car.x + car_radius*Math.sin((car.top_right.angle + car.angle)*TO_RADIANS); 
  car.top_right.y = car.y + car_radius*Math.cos((car.top_right.angle + car.angle)*TO_RADIANS)*-1;
}

//return hex color format
function getRgbByXYMainMap(x,y) {
  var rgbObj = bitBg.getPixelRGB(Math.round(x), Math.round(y));
  return Phaser.Color.RGBtoString(rgbObj.r,rgbObj.g,rgbObj.b);
}

function getRgbByXYAIMap(x,y) {
  var rgbObj = ai_bit_bg.getPixelRGB(Math.round(x), Math.round(y));
  return Phaser.Color.RGBtoString(rgbObj.r,rgbObj.g,rgbObj.b);
}
