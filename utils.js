/*
 *
 *useful algrithoms
 **/

function moveCar(car) {
    var speedAxis = speedXY(car.angle, car.speed);
    car.body.x += speedAxis.x;
    car.body.y += speedAxis.y;
    //car.distance ++;
}

function speedXY (rotation, speed) {
    return {
        x: Math.sin(rotation * TO_RADIANS) * speed,
        y: Math.cos(rotation * TO_RADIANS) * speed * -1,
    };
}

function steerLeft(car){
  //car.body.angularVelocity -= rotate_step;   
  car.body.angle -= car.rotationStep * (car.speed/maxSpeed);
    car.body.rotationStep = rotate_step;
}

function steerRight(car){
  //car.body.angularVelocity = rotate_step;   
    car.body.angle += car.rotationStep * (car.speed/maxSpeed);
    car.body.rotationStep = rotate_step;
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

//function getRgbByXYAIMapFirst(x,y) {
//    var rgbObj = ai_bit_bg1.getPixelRGB(Math.round(x), Math.round(y));
//    console.log(Phaser.Color.RGBtoString(rgbObj.r,rgbObj.g,rgbObj.b));
//    return Phaser.Color.RGBtoString(rgbObj.r,rgbObj.g,rgbObj.b);
//}

function is_touching_device() {
    isTouching = false;

    return isTouching;
}

function isFinished(car,x,y) {

    if(getRgbByXYMainMap(x,y) == DESKTOP_CHROME_FINISH_STEP_ONE ||
        getRgbByXYMainMap(x,y) == MOBILE_SAFAFI_FINISH_STEP_ONE) {
        car.finish_step_one = true;
    }

    if(getRgbByXYMainMap(x,y) == DESKTOP_CHROME_FINISH_STEP_TWO ||
        getRgbByXYMainMap(x,y) == MOBILE_SAFAFI_FINISH_STEP_TWO) {
        if(car.finish_step_one) {
            car.finish_step_two = true;
        }
    }


    if(car.finish_step_two && car.finish_step_one) {
        car.finish_step_one = false;
        car.finish_step_two = false;
        return true;
    }else {
        return false;
    }


}

$("#game").on("touchstart mousedown",function(e){
    isTouching = true;
});

$("#game").on("touchend mouseup touchcancel",function(e){
    isTouching = false;
});

function collisionHandler(car, com_car) {
    car.speed = 0.5;
    car_collide = true;
    car.change_status = true;
    if(first_collision_music.onPlay.active) {
        first_collision_music.play();
    }
}

function initAICars (ai_cars,game,checkGroup,aiCarCollisionGroup) {
  $.each(ai_cars,function(index,com_car){
        car.control_by_border = false;
        com_car.anchor.setTo(0.5,0.5);
        com_car.rotationStep = rotate_step;
        com_car.top_left = {x:com_car.x,y:com_car.y,angle:0};
        com_car.top_right = {x:com_car.x + car_width,y:com_car.y,angle:0};
        com_car.speed = com_speed;
        game.physics.p2.enableBody(com_car,false);
        com_car.body.clearShapes();
        com_car.body.loadPolygon('carPhysicsData','car');
        com_car.body.sprite = com_car;
        com_car.body.world.restitution = 0;
        com_car.body.angle = 90;

        com_car.top_left.angle = Math.atan2(com_car.top_left.x - com_car.x,com_car.y - com_car.top_left.y);
        com_car.top_right.angle = Math.atan2(com_car.top_right.x - com_car.x,com_car.y - com_car.top_right.y);
        com_car.body.setCollisionGroup(aiCarCollisionGroup);
        com_car.body.collides([aiCarCollisionGroup, playerCollisionGroup]);
        //checkGroup.add(com_car);
        //create counter
    });
}

function hitAiCars(body1, body2) {
  if(Math.floor((Math.random() * 2) + 0) == 0) {
    first_collision_music.play();
  }else {
    second_collision_music.play();
  }
}

function destroyAiCars(ai_cars) {
  $.each(ai_cars,function(index,com_car){
    com_car.destroy();       
  });
}


function aiCarControlls(ai_cars) {
    $.each(ai_cars,function(index,com_car){
        com_car.body.velocity.x = 0;
        com_car.body.velocity.y = 0;
        com_car.body.angularVelocity = 0;
        /**hit computer cars**/
        //computer cars
        //border collision
        if(getRgbByXYMainMap(com_car.top_left.x,com_car.top_left.y) == DESKTOP_CHROME_AI_SEER_LEFT_GREY
            ||getRgbByXYMainMap(com_car.top_left.x,com_car.top_left.y) == DESKTOP_CHROME_AI_SEER_LEFT_ORANGE) {
            com_car.rotationStep = 16;
            steerLeft(com_car);
        }else {

        }

        if(getRgbByXYMainMap(com_car.top_right.x,com_car.top_right.y) == DESKTOP_CHROME_AI_SEER_RIGHT_DARK
            ||getRgbByXYMainMap(com_car.top_right.x,com_car.top_right.y) == DESKTOP_CHROME_AI_SEER_RIGHT_RED) {
            com_car.rotationStep = 16;
            steerRight(com_car);
        }
        //border collision

        //road turn left and right
        if(getRgbByXYMainMap(com_car.top_left.x,com_car.top_left.y) == DESKTOP_CHROME_AI_ROAD_SEER_LEFT_GREEN) {
            com_car.rotationStep = 2;
            steerLeft(com_car);
            com_car.control_by_border = true;
        }else {
            com_car.control_by_border = false;
        }

        if(getRgbByXYMainMap(com_car.top_right.x,com_car.top_right.y) == DESKTOP_CHROME_AI_ROAD_SEER_RIGHT_BLUE) {
            com_car.rotationStep = 2;
            steerRight(com_car);
            com_car.control_by_border = true;
        }else {
            com_car.control_by_border = false;
        }

        if(!com_car.control_by_border) {
          switch(index){
            case 0:
              if(first_com_car_can_turn) {
                com_car.speed = Math.floor(Math.random() * 5) + parseInt(2);
                if(Math.floor((Math.random() * 2) + 0) == 0) {
                    //turn left

                    com_car.rotationStep = 16;
                    steerLeft(com_car);
                }else {
                    //turn right
                    com_car.rotationStep = 16;
                    steerRight(com_car);
                }
                first_com_car_can_turn = false;     
              }
             break;
             case 1:
              if(second_com_car_can_turn) {
                com_car.speed = Math.floor(Math.random() * 4) + parseInt(3);
                if(Math.floor((Math.random() * 2) + 0) == 0) {
                    //turn left

                    com_car.rotationStep = 16;
                    steerLeft(com_car);
                }else {
                    //turn right
                    com_car.rotationStep = 16;
                    steerRight(com_car);
                }
                second_com_car_can_turn = false;     
              }
             break;
           case 2:
              if(third_com_car_can_turn) {
                com_car.speed = Math.floor(Math.random() * 3) + parseInt(4);
                if(Math.floor((Math.random() * 2) + 0) == 0) {
                    //turn left

                    com_car.rotationStep = 16;
                    steerLeft(com_car);
                }else {
                    //turn right
                    com_car.rotationStep = 16;
                    steerRight(com_car);
                }
                third_com_car_can_turn = false;     
              }
             break;
           
           case 3:
              if(fourth_com_car_can_turn) {
                com_car.speed = Math.floor(Math.random() * 1) + parseInt(6);
                if(Math.floor((Math.random() * 2) + 0) == 0) {
                    //turn left

                    com_car.rotationStep = 16;
                    steerLeft(com_car);
                }else {
                    //turn right
                    com_car.rotationStep = 16;
                    steerRight(com_car);
                }
                fourth_com_car_can_turn = false;     
              }
             break; 
          }   
          
        }
        //road turn left and right
        /**hit computer cars**/
    });
}

function car_top_left_point_update_Aicars (com_cars) {
    $.each(com_cars,function(index,com_car){
        car_top_left_point_update(com_car);
        car_top_right_point_update(com_car);
    });
}

function moveComCars(com_cars) {
    $.each(com_cars,function(index,com_car){
        moveCar(com_car);
    });
}
function formatTime(seconds) {
  
  var ms = Math.floor((seconds*1000) % 1000);
  var s = Math.floor(seconds%60);
  var m = Math.floor((seconds*1000/(1000*60))%60);
  var strFormat = "MM:SS:XX";
  
  if(s < 10) s = "0" + s;
  if(m < 10) m = "0" + m;
  if(ms < 10) ms = "0" + ms;

  strFormat = strFormat.replace(/MM/, m);
  strFormat = strFormat.replace(/SS/, s);
  strFormat = strFormat.replace(/XX/, ms.toString().slice(0,2));
  
  return strFormat; 
}
