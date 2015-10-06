var theGame = function(game){
  console.log("the game constructor");   
  //game variables
      isTouching = false;
      counter = 0;
      bg = null,ai_bg1 = null,ai_bg2 = null,ai_bg3 = null,ai_bg4 = null,ai_bg5 = null, bitBg = null, ai_bit_bg1 = null,ai_bit_bg2 = null,ai_bit_bg3 = null,ai_bit_bg4 = null,ai_bit_bg5 = null;
      TO_RADIANS = Math.PI/180;
      slow_speed = 1;
      normal_speed = 2;
      com_speed = 6;
      maxSpeed = 6;
      rotate_step = 3;
      car = null;
      com_cars = [];
      com_car = null;
      checkGroup = null;
      car_width = 56;
      car_height = 112;
      car_radius = Math.sqrt((car_width/2)*(car_width/2) + (car_height/2)*(car_height/2));

      bg_music = null;
      first_collision_music = null;
      cheering_music = null;
      light_music = null;
      low_engith_music = null;
      boost_music = null;
      slow_down_music = null;
      fast_music = null;

      //game control variables
      game_start = false;
      car_boost = false;
      car_in_sand = false;
      car_in_road = false;
      car_collide = false;

      //main map color configure
      DESKTOP_CHROME_SAND_RED = "#e92026";
      DESKTOP_CHROME_SAND_ORANGE = "#db902e";
      DESKTOP_CHROME_BLACKAREA = "#000000";
      DESKTOP_CHROME_GREY = "#5b5d57";
      DESKTOP_CHROME_FINISH_STEP_ONE = "#d6ce13";
      DESKTOP_CHROME_FINISH_STEP_TWO = "#2337b0";
      DESKTOP_CHROME_AI_SEER_LEFT_GREY = "#5b5d57";
      DESKTOP_CHROME_AI_SEER_LEFT_ORANGE = "#db902e";
      DESKTOP_CHROME_AI_SEER_RIGHT_DARK = "#000000";
      DESKTOP_CHROME_AI_SEER_RIGHT_RED = "#e92026";
      DESKTOP_CHROME_AI_ROAD_SEER_LEFT_GREEN = "#98db2e";
      DESKTOP_CHROME_AI_ROAD_SEER_RIGHT_BLUE = "#2edbb9";

      DESKTOP_FIRE_AI_SEER_LEFT = "#ef262c";

      MOBILE_SAFAFI_SAND = "#e92126";
      MOBILE_SAFAFI_BLACKAREA= "#000000";
      MOBILE_SAFAFI_FINISH_STEP_ONE = "#d6ce13";
      MOBILE_SAFAFI_FINISH_STEP_TWO = "#2337b1";
      MOBILE_SAFAFI_AI_SEER_LEFT = "#ef272c";
      MOBILE_SAFAFI_AI_SEER_RIGHT = "#6dbf3f";

      com_car_can_turn = false;
      ai_cars = [];

}

theGame.prototype = {
  	create: function(){
	 console.log("in game"); 
      this.game.world.setBounds(0, 0, 3067, 1722);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 0;
    this.game.physics.p2.restitution = 5;
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.world.defaultContactMaterial.friction = 3;
    this.game.input.addPointer();//for mobile touching
    
    //load bg music 
    bg_music = this.game.add.audio('bg-musi');
    bg_music.volume = 0.1;
    bg_music.loop = true;  
    bg_music.play();
    //bg_music.onStop.add(function(sound){sound.volume = 0.1;sound.restart();},this);
    
    //collision music
    first_collision_music = this.game.add.audio('collision-musi');
    first_collision_music.volume = 1;
    
    //cheering music
    light_music = this.game.add.audio('lights-musi'); 
    light_music.play();
    cheering_music = this.game.add.audio('cheering-musi'); 
    cheering_music.play();
    
    //speed musics
    low_engith_music = this.game.add.audio('low-engine-musi'); 
    low_engith_music.loop = true; 
    boost_music = this.game.add.audio('boost-musi'); 
    slow_down_music = this.game.add.audio('slow-down-musi'); 
    fast_music = this.game.add.audio('fast-musi'); 


    bg = this.game.add.image(0, 0, 'track-hit');
    this.game.add.image(0, 0, 'map');
    bitBg = this.game.make.bitmapData();
    bitBg.load(bg);

    //car things
    car = this.game.add.sprite(1500,450, 'car');
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
    this.game.camera.follow(car);
    this.game.physics.p2.enableBody(car,true);
    car.body.clearShapes(); 
    car.body.world.restitution = 0; 
    car.body.loadPolygon('carPhysicsData','car');
    car.body.angle = 90;
    //car things
  
    var com_car1 = this.game.add.sprite(1350,400, 'ai-car');
    //game.camera.follow(com_car1);
    var com_car2 = this.game.add.sprite(1240,500, 'ai-car');
    var com_car3 = this.game.add.sprite(1140,450, 'ai-car');
    var com_car4 = this.game.add.sprite(1035,450, 'ai-car');
    com_cars.push(com_car1);
    com_cars.push(com_car2);
    com_cars.push(com_car3);
    com_cars.push(com_car4);
    initAICars(com_cars,this.game,checkGroup);

    //set timer
    setTimeout(function(){ 
      game_start = true; 
      car_boost = true; 
      car_in_road = true; 
      car.change_status = true; 
    }, 2000);

    checkGroup = this.game.add.group();
    checkGroup.add(car);
    checkGroup.add(com_car1);
    checkGroup.add(com_car2);
    checkGroup.add(com_car3);
    checkGroup.add(com_car4);

    //interval control ai cars turn left and right
    setInterval(function(){
        com_car_can_turn = true;
    }, 500);			
	
    setInterval(function(){ 
      if(car.speed < maxSpeed) {
        car.speed += 0.4;
        if(car.speed >= maxSpeed) {
          car.change_status = true; 
        }
      } 
    }, 400);
    
  },
  update:function(){
  this.changing_top_right = false; 
  //disable p2 physics collistion default effect 
  car.body.velocity.x = 0;
  car.body.velocity.y = 0;
  car.body.angularVelocity = 0;
  
  if(isTouching) {
    if(game.input.pointer1.position.x > (WINDOW_WIDTH/2)) {
      steerRight(car);
    }else if(game.input.pointer1.position.x < (WINDOW_WIDTH/2)) {
      steerLeft(car);
    }
  }

  
  if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
    steerLeft(car);
  }
  else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    steerRight(car);
  }

  car_top_left_point_update(car);
  car_top_right_point_update(car);
    car_top_left_point_update_Aicars(com_cars);

  if((getRgbByXYMainMap(car.top_right.x,car.top_right.y) == DESKTOP_CHROME_SAND_RED || getRgbByXYMainMap(car.top_right.x,car.top_right.y) == DESKTOP_CHROME_SAND_ORANGE)
     && (getRgbByXYMainMap(car.top_left.x,car.top_left.y) == DESKTOP_CHROME_SAND_RED || getRgbByXYMainMap(car.top_left.x,car.top_left.y) == DESKTOP_CHROME_SAND_ORANGE)) {
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

  /**hit computer cars**/
  aiCarControlls(com_cars);
    /**hit computer cars**/

  //computer cars
  if(game_start)  {
    moveCar(car);
      moveComCars(com_cars);
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
  }

}
