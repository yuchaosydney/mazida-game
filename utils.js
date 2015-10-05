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
    car.body.angle -= car.rotationStep * (car.speed/maxSpeed);
    car.body.rotationStep = rotate_step;
}

function steerRight(car){
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

function getRgbByXYAIMapFirst(x,y) {
    var rgbObj = ai_bit_bg1.getPixelRGB(Math.round(x), Math.round(y));
    console.log(Phaser.Color.RGBtoString(rgbObj.r,rgbObj.g,rgbObj.b));
    return Phaser.Color.RGBtoString(rgbObj.r,rgbObj.g,rgbObj.b);
}

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