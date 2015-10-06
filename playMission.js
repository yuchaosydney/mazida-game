var playMission = function(game){}

playMission.prototype = {
  	create: function(){
	  console.log("play mission..");	
      var playButton = this.game.add.button(160,320,"play",this.nextStep,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	nextStep: function(){
		this.game.state.start("pickPlayer");
	}
}
