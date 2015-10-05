var WINDOW_WIDTH = $("#game").width();
var WINDOW_HEIGHT = $("#game").height();


var isTouching = false;
var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.CANVAS, 'game',{ preload: preload, create: create, update: update });
var counter = 0;
var bg,ai_bg1,ai_bg2,ai_bg3,ai_bg4,ai_bg5, bitBg, ai_bit_bg1,ai_bit_bg2,ai_bit_bg3,ai_bit_bg4,ai_bit_bg5;
var TO_RADIANS = Math.PI/180;
var slow_speed = 1;
var normal_speed = 2;
var com_speed = 6;
var maxSpeed = 7.5;
var rotate_step = 3;
var car;
var com_cars;
var com_car;
var car_width = 56;
var car_height = 112;
var car_radius = Math.sqrt((car_width/2)*(car_width/2) + (car_height/2)*(car_height/2));

var accelerateTime = setInterval(function(){ 
  if(car.speed < maxSpeed) {
    car.speed += 0.4;
    if(car.speed >= maxSpeed) {
      car.change_status = true; 
    }
  } 
}, 400);

var bg_music;
var first_collision_music;
var cheering_music;
var light_music;
var low_engith_music;
var boost_music;
var slow_down_music;
var fast_music;

//game control variables
var game_start = false;
var car_boost = false;
var car_in_sand = false;
var car_in_road = false;
var car_collide = false;

//main map color configure
var DESKTOP_CHROME_SAND = "#e92026";
var DESKTOP_CHROME_BLACKAREA = "#000000";
var DESKTOP_CHROME_GREY = "#5b5d57";
var DESKTOP_CHROME_FINISH_STEP_ONE = "#d6ce13";
var DESKTOP_CHROME_FINISH_STEP_TWO = "#2337b0";
var DESKTOP_CHROME_AI_SEER_LEFT = "#f0262d";
var DESKTOP_CHROME_AI_SEER_RIGHT = "#6dbf40";

var DESKTOP_FIRE_AI_SEER_LEFT = "#ef262c";

var MOBILE_SAFAFI_SAND = "#e92126";
var MOBILE_SAFAFI_BLACKAREA= "#000000";
var MOBILE_SAFAFI_FINISH_STEP_ONE = "#d6ce13";
var MOBILE_SAFAFI_FINISH_STEP_TWO = "#2337b1";
var MOBILE_SAFAFI_AI_SEER_LEFT = "#ef272c";
var MOBILE_SAFAFI_AI_SEER_RIGHT = "#6dbf3f";

function preload() {
  game.load.image('track-hit', 'assets/track-hit.png');
  game.load.image('map', 'assets/map.jpg');
  game.load.image('ai-map1', 'assets/ai_map1.jpg');
    //game.load.image('ai-map2', 'assets/ai_map2.jpg');
  game.load.image('car', 'assets/car.png');
  game.load.image('ai-car', 'assets/ai-car.png');
  game.load.audio('bg-musi', ['assets/bg.mp3']);
  game.load.audio('collision-musi', ['assets/bump_1.mp3']);
  game.load.audio('lights-musi', ['assets/lights.mp3']);
  game.load.audio('cheering-musi', ['assets/cheering.mp3']);
  game.load.audio('low-engine-musi', ['assets/engine_normal.mp3']);
  game.load.audio('boost-musi', ['assets/engine_normal_to_fast.mp3']);
  game.load.audio('slow-down-musi', ['assets/engine_fast_to_normal.mp3']);
  game.load.audio('fast-musi', ['assets/engine_fast.mp3']);
  game.load.physics('carPhysicsData', 'assets/car.json');
}

function create() {
  game.world.setBounds(0, 0, 3067, 1722);
  game.physics.startSystem(Phaser.Physics.P2JS);
 game.physics.p2.gravity.y = 0;
 game.physics.p2.restitution = 0;  
 game.physics.p2.setImpactEvents(true);
game.physics.p2.world.defaultContactMaterial.friction = 3;
 game.input.addPointer();//for mobile touching
  
  //load bg music 
  bg_music = game.add.audio('bg-musi');
  bg_music.volume = 0.1;
  bg_music.loop = true;  
  bg_music.play();
  //bg_music.onStop.add(function(sound){sound.volume = 0.1;sound.restart();},this);
  
  //collision music
  first_collision_music = game.add.audio('collision-musi');
  first_collision_music.volume = 1;
  
  //cheering music
  light_music = game.add.audio('lights-musi'); 
  light_music.play();
  cheering_music = game.add.audio('cheering-musi'); 
  cheering_music.play();
  
  //speed musics
  low_engith_music = game.add.audio('low-engine-musi'); 
  low_engith_music.loop = true; 
  boost_music = game.add.audio('boost-musi'); 
  slow_down_music = game.add.audio('slow-down-musi'); 
  fast_music = game.add.audio('fast-musi'); 

    /**ai cars**/
  ai_bg1 = game.add.image(0, 0, 'ai-map1');
  ai_bit_bg1 = game.make.bitmapData();
  ai_bit_bg1.load(ai_bg1);

    ai_bg2 = game.add.image(0, 0, 'ai-map2');
    ai_bit_bg2 = game.make.bitmapData();
    ai_bit_bg2.load(ai_bg2);
    /**ai cars**/

    bg = game.add.image(0, 0, 'track-hit');
    game.add.image(0, 0, 'map');
    bitBg = game.make.bitmapData();
    bitBg.load(bg);

  //car things
  car = game.add.sprite(1500,450, 'car');
  car.change_status = false;
  car.finish_step_one = false;
  car.finish_step_two = false;
  car.anchor.setTo(0.5,0.5);
  car.rotationStep = rotate_step;
  car.rotation = 90*TO_RADIANS;
  car.top_left = {x:car.x,y:car.y,angle:0};
  car.top_right = {x:car.x + car_width,y:car.y,angle:0};
  car.speed = normal_speed; 
  
  car.center_point = {x:car.x + car_width/2,y:car.y + car_height/2};

  car.top_left.angle = Math.atan2(car.top_left.x - car.center_point.x,car.center_point.y - car.top_left.y); 
  car.top_right.angle = Math.atan2(car.top_right.x - car.center_point.x,car.center_point.y - car.top_right.y); 
  game.camera.follow(car);
  game.physics.p2.enableBody(car,true);
  car.body.clearShapes(); 
  car.body.world.restitution = 0; 
  car.body.loadPolygon('carPhysicsData','car');
  car.body.angle = 90;
  //car things
  
  com_car = game.add.sprite(1350,450, 'ai-car');
  //game.camera.follow(com_car);
  com_car.anchor.setTo(0.5,0.5);
  com_car.rotationStep = rotate_step;
  com_car.top_left = {x:com_car.x,y:com_car.y,angle:0};
  com_car.top_right = {x:com_car.x + car_width,y:com_car.y,angle:0};
  com_car.speed = com_speed; 
  game.physics.p2.enableBody(com_car,true);
  com_car.body.clearShapes(); 
  com_car.body.loadPolygon('carPhysicsData','car');
  com_car.body.sprite = com_car;
  com_car.body.world.restitution = 0; 
  com_car.body.angle = 90;

  com_car.top_left.angle = Math.atan2(com_car.top_left.x - com_car.x,com_car.y - com_car.top_left.y); 
  com_car.top_right.angle = Math.atan2(com_car.top_right.x - com_car.x,com_car.y - com_car.top_right.y);
  //create counter

  //set timer
  setTimeout(function(){ 
    game_start = true; 
    car_boost = true; 
    car_in_road = true; 
    car.change_status = true; 
  }, 2000);
  
// var pandaCollisionGroup = game.physics.p2.createCollisionGroup();
// game.physics.p2.updateBoundsCollisionGroup();
// com_car.body.setCollisionGroup(pandaCollisionGroup);
var checkGroup = game.add.group();
  checkGroup.add(car);
  checkGroup.add(com_car);

}




function update() {
  changing_top_right = false; 
  //disable p2 physics collistion default effect 
  car.body.velocity.x = 0;
  car.body.velocity.y = 0;
  car.body.angularVelocity = 0;
  com_car.body.velocity.x = 0;
  com_car.body.velocity.y = 0;
  com_car.body.angularVelocity = 0;
  // if(car.overlap(com_car)) {
  //   alert("here"); 
  //   //car.speed = 0; 
  // }
  
  if(isTouching) {
    if(game.input.pointer1.position.x > (WINDOW_WIDTH/2)) {
      steerRight(car);
    }else if(game.input.pointer1.position.x < (WINDOW_WIDTH/2)) {
      steerLeft(car);
    }
  }

  
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
  car_top_left_point_update(com_car);
  car_top_right_point_update(com_car);
  
  //stear cars
  // if(getRgbByXYMainMap(car.top_left.x,car.top_left.y) == "#000000") {
  //    car.rotationStep = 128;
  //    steerRight(car); 
  // }
  
  // if(getRgbByXYMainMap(car.top_right.x,car.top_right.y) == "#000000") {
  //    car.rotationStep = 128;
  //    steerLeft(car); 
  // }
  
  // 
  if((getRgbByXYMainMap(car.top_right.x,car.top_right.y) == DESKTOP_CHROME_SAND || getRgbByXYMainMap(car.top_right.x,car.top_right.y) == MOBILE_SAFAFI_SAND)
     && (getRgbByXYMainMap(car.top_left.x,car.top_left.y) == DESKTOP_CHROME_SAND || getRgbByXYMainMap(car.top_left.x,car.top_left.y) == MOBILE_SAFAFI_SAND)) {
    car.speed = slow_speed;
    if(car_in_road) {
      car.change_status = true; 
      car_in_road = false;  
      car_in_sand = true; 
    }
  }else if(getRgbByXYMainMap(car.top_right.x,car.top_right.y) == DESKTOP_CHROME_BLACKAREA ||
          getRgbByXYMainMap(car.top_right.x,car.top_right.y) == MOBILE_SAFAFI_BLACKAREA){
      car.rotationStep = 20;
      steerRight(car);
      car.rotationStep = rotate_step;

  }else if(getRgbByXYMainMap(car.top_left.x,car.top_left.y) == DESKTOP_CHROME_GREY || getRgbByXYMainMap(car.top_left.x,car.top_left.y) == DESKTOP_CHROME_GREY){
      car.rotationStep = 20;
      steerLeft(car);
      car.rotationStep = rotate_step;
  }else if((getRgbByXYMainMap(car.top_left.x,car.top_left.y) == DESKTOP_CHROME_BLACKAREA || getRgbByXYMainMap(car.top_left.x,car.top_left.y) == MOBILE_SAFAFI_BLACKAREA)
           && 
           (getRgbByXYMainMap(car.top_right.x,car.top_right.y) == DESKTOP_CHROME_BLACKAREA || getRgbByXYMainMap(car.top_right.x,car.top_right.y) == MOBILE_SAFAFI_BLACKAREA)) {
    car.speed = 0; 
  }
  
  else {
    if(!car_in_road) {
      car.change_status = true; 
      car_in_road = true;  
      car_in_sand = false;
    } 
  }

  //hit computer cars
  //computer cars
  if(getRgbByXYAIMapFirst(com_car.top_left.x,com_car.top_left.y) == DESKTOP_CHROME_AI_SEER_LEFT
    ||getRgbByXYAIMapFirst(com_car.top_left.x,com_car.top_left.y) == MOBILE_SAFAFI_AI_SEER_LEFT
    ||getRgbByXYAIMapFirst(com_car.top_left.x,com_car.top_left.y) == DESKTOP_FIRE_AI_SEER_LEFT) {
    com_car.rotationStep = 16;
    steerLeft(com_car); 
  }else {
  
  }

  if(getRgbByXYAIMapFirst(com_car.top_right.x,com_car.top_right.y) == DESKTOP_CHROME_AI_SEER_RIGHT
    ||getRgbByXYAIMapFirst(com_car.top_right.x,com_car.top_right.y) == MOBILE_SAFAFI_AI_SEER_RIGHT) {
    com_car.rotationStep = 16;
    steerRight(com_car);
  }
  //computer cars
  if(game_start)  {
    moveCar(car);
    moveCar(com_car);
  } 
  
  //game control sounds
  if(car_boost && car.change_status) {
    fast_music.stop(); 
    boost_music.play(); 
  }
  if(car_in_sand && car.change_status) {
    boost_music.stop(); 
    fast_music.stop(); 
    slow_down_music.play();
    slow_down_music.onStop.add(function(){low_engith_music.play();}); 
  }
  if(car_in_road && car.change_status) {
    slow_down_music.stop();
    low_engith_music.stop();
    boost_music.play(); 
  }
  
  if(car.speed >= maxSpeed  && car.change_status) {
    boost_music.stop(); 
    fast_music.loop = true; 
    fast_music.play(); 
  }

  if(car_collide && car.change_status) {
    fast_music.stop(); 
    slow_down_music.play();
    
    slow_down_music.onStop.add(function(){
      car.change_status = true;
      car_in_road = true; 
    },this); 
  }
  //check if car finish or not
  if(isFinished(car,car.body.x,car.body.y)) {
    alert(this.game.time.totalElapsedSeconds()); 
  } 

  //flush all control variables
  car_boost = false;
  car_collide = false;
  car.change_status = false;


    //adjust rotation steps
    //if(car.speed >= 7) {
    //    car.rotationStep = 2;
    //}
}



function render() {

	game.debug.bodyInfo(car, 16, 24);

	// game.debug.body(sprite);
	// game.debug.body(sprite2);

}
