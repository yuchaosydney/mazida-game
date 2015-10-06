var pickPlayer = function(game){}

pickPlayer.prototype = {
  	create: function(){
	  console.log("pick up players...");	
    $('#name-input').attr("style","display:none;");
    this.game.stage.backgroundColor = 0xffffff;
    
    var style_1 = { font: "36px Arial", fill: "#000000", wordWrap: true,wordWrap: true, wordWrapWidth: "400px", align: "center" };
    text = this.game.add.text(190, 20, "Pick your Cricket Player", style_1);
    text.anchor.set(0);
    
    var playButton = this.game.add.button(60,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
	  	
    this.game.state.start("theGame");
	}
}
