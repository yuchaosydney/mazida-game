var pickPlayer = function(game){}

pickPlayer.prototype = {
  	create: function(){
	  console.log("pick up players...");	
      var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
	  	
    this.game.state.start("theGame");
	}
}
