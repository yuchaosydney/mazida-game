var playMission = function(game){}

playMission.prototype = {
  	create: function(){
    $('#name-input').attr("style","display:block;");
	  console.log("play mission..");	
    this.game.add.image(0, 0, 'menu-bg');

    var style_1 = { font: "36px Arial", fill: "#000000", wordWrap: true,wordWrap: true, wordWrapWidth: "400px", align: "center" };
    text = this.game.add.text(210, 207, "Play Mazda Mission", style_1);
    text.anchor.set(0);
  
    var style_2 = { font: "18px Arial", fill: "#000000", wordWrap: true,wordWrap: true, wordWrapWidth: "400px", align: "center" };
    text = this.game.add.text(130, 277, "Ready to test your skills? Enter your festival number below\nand get a bonus entry into the prize draw!", style_2);
    text.anchor.set(0);


    var nextStpButton = this.game.add.button(355,150,"play-mission-btn",this.nextStep,this);
		nextStpButton.anchor.setTo(0.5,0.5);
	},
	nextStep: function(){
    console.log($('#name-input').val());
		this.game.state.start("theGame");
	}
}
