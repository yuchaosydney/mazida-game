var preload = function(game){}

preload.prototype = {
	preload: function(){ 
		this.game.load.image('menu-bg', 'assets/menu_bg.jpg');
		this.game.load.image('play-mission-btn', 'assets/play-mission-btn.jpg');
		this.game.load.image('clock', 'assets/clock.png');
		this.game.load.image('replay', 'assets/replay.png');
	  this.game.load.spritesheet('star', 'assets/star.png', 66, 65);
		this.game.load.image('track-hit', 'assets/track-hit.png');
    this.game.load.image('map', 'assets/map.jpg');;
    this.game.load.image('car', 'assets/car.png');
    this.game.load.image('ai-car', 'assets/ai-car.png');
    this.game.load.audio('bg-musi', ['assets/bg.mp3']);
    this.game.load.audio('collision-musi1', ['assets/bump_1.mp3']);
    this.game.load.audio('collision-musi2', ['assets/bump_2.mp3']);
    this.game.load.audio('lights-musi', ['assets/lights.mp3']);
    this.game.load.audio('low-engine-musi', ['assets/low_engine.mp3']);
    this.game.load.audio('boost-musi', ['assets/engine_normal_to_fast.mp3']);
    this.game.load.audio('slow-down-musi', ['assets/engine_fast_to_normal.mp3']);
    this.game.load.audio('fast-musi', ['assets/engine_normal.mp3']);
    this.game.load.physics('carPhysicsData', 'assets/car.json');
	},
  	create: function(){
		
		this.game.state.start("playMission");
  }
}
