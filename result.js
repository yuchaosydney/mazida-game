var result = function(game){}

result.prototype = {
	create: function(){ 
	  console.log("result..." + car_racing_rank);	
    this.game.add.image(0, 0, 'menu-bg');
    
    var sprite_star_1 = this.game.add.sprite(230, 150, 'star');
    var sprite_star_2 = this.game.add.sprite(330, 150, 'star');
    var sprite_star_3 = this.game.add.sprite(430, 150, 'star');
    sprite_star_1.frame = 1;
    sprite_star_2.frame = 1;
    sprite_star_3.frame = 1;
    
    switch(parseInt(car_racing_rank)) {
      case 1:
        sprite_star_1.frame = 0;
        sprite_star_2.frame = 0;
        sprite_star_3.frame = 0;
        break;
      case 2:
        sprite_star_1.frame = 0;
        sprite_star_2.frame = 0;
        break;
      case 3:
        sprite_star_1.frame = 0;
        break;
    } 
    this.game.add.image(270, 250, 'clock');

    var style_1 = { font: "36px Arial", fill: "#000000", wordWrap: true,wordWrap: true, wordWrapWidth: "400px", align: "center" };
    text = this.game.add.text(310, 250, car_racing_time, style_1);
    text.anchor.set(0);	


    var replayButton = this.game.add.button(335,300,"replay",this.replay,this);
	},
  replay: function(){
		this.game.state.start("theGame");
  }
}
