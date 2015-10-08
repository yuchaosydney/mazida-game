var theGame = function(game){
  console.log("the game constructor");   
  //game variables
  total_laps = 2; 
  
  timer_start = 0; 
  timer_current = 0; 
  timer_elapsed = 0; 
  
  rankingCounter = 0; 
  isTouching = false;
  counter = 0;
  bg = null,ai_bg1 = null,ai_bg2 = null,ai_bg3 = null,ai_bg4 = null,ai_bg5 = null, bitBg = null, ai_bit_bg1 = null,ai_bit_bg2 = null,ai_bit_bg3 = null,ai_bit_bg4 = null,ai_bit_bg5 = null;
  TO_RADIANS = Math.PI/180;
  slow_speed = 2.5;
  normal_speed = 4;
  com_speed = 5;
  maxSpeed = 5;
  rotate_step = 3;
  traffic_light = null; 
  top_bar = null; 
  player_image = null; 
  timer_text = null; 
  lap_text = null; 
  car = null;
  com_cars = [];
  com_car = null;
  checkGroup = null;
  car_width = 56;
  car_height = 112;
  car_radius = Math.sqrt((car_width/2)*(car_width/2) + (car_height/2)*(car_height/2));

  bg_music = null;
  first_collision_music = null;
  second_collision_music = null;
  cheering_music = null;
  light_music = null;
  low_engith_music = null;
  boost_music = null;
  slow_down_music = null;
  fast_music = null;
  is_fast_playing = false;

  //game control variables
  game_start = false;
  car_boost = false;
  car_in_sand = false;
  car_in_road = false;
  car_collide = false;
  

  //intervals
  ai_car_interval = null; 
  
  //main map color configure
  DESKTOP_CHROME_SAND_RED = "#e92026";
  DESKTOP_CHROME_SAND_ORANGE = "#ff8b00";
  DESKTOP_CHROME_BLACKAREA = "#000000";
  DESKTOP_CHROME_GREY = "#5b5d57";
  DESKTOP_CHROME_FINISH_STEP_ONE = "#ffec00";
  DESKTOP_CHROME_FINISH_STEP_TWO = "#2337b0";
  DESKTOP_CHROME_AI_SEER_LEFT_GREY = "#5b5d57";
  DESKTOP_CHROME_AI_SEER_LEFT_ORANGE = "#ff8b00";
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

  first_com_car_can_turn = false;
  second_com_car_can_turn = false;
  third_com_car_can_turn = false;
  fourth_com_car_can_turn = false;
  com_car1 = null;
  com_car2 = null;
  com_car3 = null;
  com_car4 = null;
  com_car5 = null;
  ai_cars = [];
  aiCarCollisionGroup = null;
  playerCollisionGroup = null;
}

theGame.prototype = {
  	create: function(){
    
    $('#name-input').attr("style","display:none;");
    console.log("in game"); 
    com_car1 = null;
    com_car2 = null;
    com_car3 = null;
    com_car4 = null;
    com_car5 = null;
    game_start = false;
    this.game.world.setBounds(0, 0, 3067, 1722);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 0;
    this.game.physics.p2.restitution = 5;
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.world.defaultContactMaterial.friction = 3;
    this.game.input.addPointer();//for mobile touching
    aiCarCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
    playerCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
    //load bg music 
    bg_music = this.game.add.audio('bg-musi');
    bg_music.volume = 0.1;
    bg_music.loop = true;  
    bg_music.play();
    //bg_music.onStop.add(function(sound){sound.volume = 0.1;sound.restart();},this);
    
    //collision music
    first_collision_music = this.game.add.audio('collision-musi1');
    first_collision_music.volume = 1;
    second_collision_music = this.game.add.audio('collision-musi2');
    second_collision_music.volume = 1;
    
    //cheering music
    light_music = this.game.add.audio('lights-musi'); 
    light_music.volume = 1;
    light_music.play();
    
    //speed musics
    low_engith_music = this.game.add.audio('low-engine-musi'); 
    low_engith_music.volume = 0.25;
    low_engith_music.loop = true; 
    boost_music = this.game.add.audio('boost-musi'); 
    slow_down_music = this.game.add.audio('slow-down-musi'); 
    fast_music = this.game.add.audio('fast-musi'); 
    fast_music.volume = 0.25;

    bg = this.game.add.image(0, 0, 'track-hit');
    bitBg = this.game.make.bitmapData();
    bitBg.load(bg);
    this.game.add.image(0, 0, 'map');
    
    //car things
    car = this.game.add.sprite(1750,460, 'car');
    car.lap = 0; 
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
    this.game.physics.p2.enableBody(car,false);
    car.body.clearShapes(); 
    car.body.world.restitution = 0; 
    car.body.loadPolygon('carPhysicsData','car');
    car.body.angle = 90;
    car.body.setCollisionGroup(playerCollisionGroup);
    //car things
  
    com_car1 = this.game.add.sprite(1650,400, 'ai-car');
    com_car1.lap = -1;
    //game.camera.follow(com_car1);
    com_car2 = this.game.add.sprite(1540,500, 'ai-car');
    com_car2.lap = -1;
    com_car3 = this.game.add.sprite(1440,450, 'ai-car');
    com_car3.lap = -1;
    com_car4 = this.game.add.sprite(1335,450, 'ai-car');
    com_car4.lap = -1;
    
    com_cars.push(com_car1);
    com_cars.push(com_car2);
    com_cars.push(com_car3);
    com_cars.push(com_car4);
    initAICars(com_cars,this.game,checkGroup,aiCarCollisionGroup);
    var timer_interval_counter = 1;

    var timer_interval = setInterval(function(){
      traffic_light.frame = timer_interval_counter; 
      timer_interval_counter ++; 
    },1000);
    //set timer
    setTimeout(function(){ 
      game_start = true; 
      car_boost = true; 
      car_in_road = true; 
      car.change_status = true; 
      player_image.kill();
      traffic_light.kill();
      clearInterval(timer_interval);
      timer_start = new Date().getTime(); 
    }, 3000);

    checkGroup = this.game.add.group();
    checkGroup.add(car);
    checkGroup.add(com_car1);
    checkGroup.add(com_car2);
    checkGroup.add(com_car3);
    checkGroup.add(com_car4);

    
    //light image
    traffic_light = this.game.add.sprite(1925,380, 'traffic-light');
    traffic_light.fixedToCamera = true; 
    traffic_light.cameraOffset.x = this.game.width - 70;
    traffic_light.cameraOffset.y =  this.game.height- 315;
    //topbar image
    top_bar = this.game.add.sprite(1925,380, 'top-bar');
    top_bar.fixedToCamera = true; 
    top_bar.cameraOffset.x = this.game.width - 310;
    top_bar.cameraOffset.y =  this.game.height- 400;
    
    //timer text 
    var style_big = { font: "36px Roboto", fill: "#0189CF", wordWrap: true,wordWrap: true, wordWrapWidth: "400px", align: "center" };
    if(game_start) {
      timer_text = this.game.add.text(310, 250, formatTime((new Date().getTime() - timer_start)), style_big );
    }else {
      timer_text = this.game.add.text(310, 250, formatTime(0), style_big );
    } 
    timer_text.fixedToCamera = true; 
    timer_text.cameraOffset.x = this.game.width - 260;
    timer_text.cameraOffset.y =  this.game.height- 380;
    timer_text.anchor.set(0);
    //timer text 
    
    //lap text
    var style_small = { font: "22px Roboto", fill: "#0189CF", wordWrap: true,wordWrap: true, wordWrapWidth: "400px", align: "center" };
    text = this.game.add.text(310, 250, "LAP", style_small);
    text.fixedToCamera = true; 
    text.cameraOffset.x = this.game.width - 117;
    text.cameraOffset.y =  this.game.height- 366;
    text.anchor.set(0);
    //lap text
    
    //lap number text
    lap_text = this.game.add.text(310, 250, "1/3", style_big);
    lap_text.fixedToCamera = true; 
    lap_text.cameraOffset.x = this.game.width - 75;
    lap_text.cameraOffset.y =  this.game.height- 378;
    lap_text.anchor.set(0);
    //lap number text
    
    //player image
    player_image = this.game.add.sprite(1680,290, 'players'); 
    console.log("which player---" + parseInt(which_player)); 
    player_image.frame = parseInt(which_player - 1);
    
    
    
    //interval control ai cars turn left and right
    console.log("create"); 
    ai_car_interval = setInterval(function(){
      if(game_start) {
        first_com_car_can_turn = true;
        second_com_car_can_turn = true;
        third_com_car_can_turn = true;
        fourth_com_car_can_turn = true;
      } 
      
    }, 500);			
	
    setInterval(function(){ 
      if(car.speed < maxSpeed) {
        car.speed += 0.4;
        if(car.speed >= maxSpeed) {
          car.change_status = true; 
        }
      } 
    }, 100);
    
  },
  update:function(){
  //update top bar lap number
    if(car.lap == 0) {
      lap_text.setText("1/3");
    }else if(car.lap == 1) {
      lap_text.setText("2/3");
    }else if(car.lap == 2) {
      lap_text.setText("3/3");
    }
    if(game_start) {
      timer_text.setText(formatTime((new Date().getTime() - timer_start)/1000));
    }else {
      timer_text.setText(formatTime(0));
    }
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

  if((getRgbByXYMainMap(car.x,car.y) == DESKTOP_CHROME_SAND_RED || getRgbByXYMainMap(car.x,car.top_right.y) == DESKTOP_CHROME_SAND_ORANGE)) {
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
    //fast_music.stop(); 
    //boost_music.play(); 
  }
  if(car_in_sand && car.change_status) {
    boost_music.stop(); 
    fast_music.stop(); 
    is_fast_playing = false;
    low_engith_music.loop = true;
    low_engith_music.play();
    // slow_down_music.play();
    // slow_down_music.onStop.add(function(){low_engith_music.play();}); 
  }
  if(car_in_road && car.change_status && game_start && !is_fast_playing) {
    console.log("here"); 
    slow_down_music.stop();
    low_engith_music.stop();
    //boost_music.play(); 
    
    fast_music.loop = true; 
    fast_music.play(); 
    is_fast_playing = true;
  }
  
  // if(car.speed >= maxSpeed  && car.change_status) {
  //   boost_music.stop(); 
  // }

  if(car_collide && car.change_status) {
    // fast_music.stop(); 
    // slow_down_music.play();
    
    // slow_down_music.onStop.add(function(){
    //   car.change_status = true;
    //   car_in_road = true; 
    // },this); 
  }
  //check if car finish or not
  $.each(com_cars,function(index,com_car){
    if(isFinished(com_car,com_car.body.x,com_car.body.y)) {
      if(com_car.lap == total_laps) {
        rankingCounter ++;
      }
      com_car.lap ++;
    }
  });
  
  
  if(isFinished(car,car.body.x,car.body.y)) {
    if(car.lap == total_laps) {
		  car_racing_rank = rankingCounter + 1;
      car_racing_time = formatTime((new Date().getTime() - timer_start)); 
      destroyAiCars(com_cars);
      
      //turn off all souncs
      fast_music.stop(); 
      bg_music.stop(); 
      light_music.stop();
      low_engith_music.stop();
      clearInterval(ai_car_interval);
      com_cars = [];
      //turn off all souncs
      this.game.state.start("result");
    } 
    car.lap ++; 
  } 
  
  //flush all control variables
  car_boost = false;
  car_collide = false;
  car.change_status = false;
  
  car.body.collides(aiCarCollisionGroup, hitAiCars, this);
  }
}
