var game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'game',{ preload: preload, create: create, update: update });

var car;

function preload() {
  game.load.image('track-hit', 'assets/track-hit.png');
  game.load.image('car', 'assets/car.png');
}

function create() {
  game.add.image(0, 0, 'track-hit');
  car = game.add.sprite(0, 0, 'car');
  game.physics.enable(car, Phaser.Physics.ARCADE);
  car.body.velocity.x=150;
}

function update() {
  
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
     console.log("left"); 
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
     console.log("right"); 
      
  }
}



/*
 *
 *useful algrithoms
 **/
function speedXY (rotation, speed) {
	return {
		x: Math.sin(rotation * TO_RADIANS) * speed,
		y: Math.cos(rotation * TO_RADIANS) * speed * -1,
	};
}

function steerLeft () {
  if (this.isMoving()){
    this.rotation -= this.rotationStep * (this.speed/this.maxSpeed);
  }
}

function steerRight(){
  if (this.isMoving()){
    this.rotation += this.rotationStep * (this.speed/this.maxSpeed);
  }
}
