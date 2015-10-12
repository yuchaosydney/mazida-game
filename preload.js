var preload = function(game){}

preload.prototype = {
	preload: function(){ 
		this.game.load.image('menu-bg', 'assets/menu_bg.jpg');
		this.game.load.image('logo', 'assets/logo.png');
		this.game.load.image('play-mission-btn', 'assets/play-mission-btn.jpg');
		this.game.load.image('play-btn', 'assets/play_button.png');
		this.game.load.image('clock', 'assets/clock.png');
		this.game.load.image('replay', 'assets/replay.png');
		this.game.load.spritesheet('play1', 'assets/Ahmed_29.png', 224, 103,2);
		this.game.load.spritesheet('play2', 'assets/Hussey_01.png', 224, 103,2);
		this.game.load.spritesheet('play3', 'assets/Blizzard_10.png', 224, 103,2);
		this.game.load.spritesheet('play4', 'assets/Khawaja_07.png', 224, 103,2);
		this.game.load.spritesheet('play5', 'assets/Sandhu_09.png', 224, 103,2);
		this.game.load.spritesheet('play6', 'assets/Kallis_15.png', 224, 103,2);
		this.game.load.image('top-bar', 'assets/top_bar.png');
		this.game.load.image('submitBtn', 'assets/submitBtn.png');
		this.game.load.spritesheet('traffic-light', 'assets/trafficlight.png', 68, 150,3);
		this.game.load.spritesheet('players', 'assets/players.png', 142, 156,6);
	  this.game.load.spritesheet('star', 'assets/star.png', 66, 65);
    this.game.load.image('map', 'assets/map.jpg');;
    this.game.load.image('car', 'assets/car.png');
    this.game.load.image('ai-car', 'assets/ai-car.png');
    this.game.load.audio('menu-musi', ['assets/menumusic.mp3','assets/menumusic.ogg']);
    this.game.load.audio('bg-musi', ['assets/bg.mp3','assets/bg.mp3']);
    this.game.load.audio('collision-musi1', ['assets/bump_1.mp3']);
    this.game.load.audio('collision-musi2', ['assets/bump_2.mp3']);
    this.game.load.audio('lights-musi', ['assets/lights.mp3']);
    this.game.load.audio('low-engine-musi', ['assets/low_engine.mp3']);
    this.game.load.audio('boost-musi', ['assets/engine_normal_to_fast.mp3']);
    this.game.load.audio('slow-down-musi', ['assets/engine_fast_to_normal.mp3']);
    this.game.load.audio('fast-musi', ['assets/engine_normal.mp3']);
    this.game.load.audio('menu_click', ['assets/menu_click.mp3','assets/menu_click.ogg']);
    this.game.load.audio('start_1', ['assets/star_1.mp3','assets/star_1.ogg']);
    this.game.load.audio('start_2', ['assets/star_2.mp3','assets/star_2.ogg']);
    this.game.load.audio('start_3', ['assets/star_3.mp3','assets/star_3.ogg']);
    this.game.load.physics('carPhysicsData', 'assets/car.json');
	},
  	create: function(){
		
		this.game.state.start("pickPlayer");
		//this.game.state.start("result");
  }
}
