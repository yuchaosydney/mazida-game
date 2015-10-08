var pickPlayer = function(game){
  player1Button = null;
  player2Button = null;
  player3Button = null;
  player4Button = null;
  player5Button = null;
  player6Button = null;
}

pickPlayer.prototype = {
  	create: function(){
	  console.log("pick up players...");	
    $('#name-input').attr("style","display:none;");
    this.game.stage.backgroundColor = 0xF2F2F2;
    
    var style_1 = { font: "30px Roboto-Regular", fill: "#ADADAD", wordWrap: true, wordWrapWidth: "400px", align: "left" };
    text = this.game.add.text(20, 20, "Pick your\nCricket Player", style_1);
    text.lineSpacing = -10;
    text.anchor.set(0);
    
    //players 
    player1Button = this.game.add.button(120,150,"play1",this.player1,this);
		player1Button.anchor.setTo(0.5,0.5);
    
    player2Button = this.game.add.button(370,150,"play2",this.player2,this);
		player2Button.anchor.setTo(0.5,0.5);
    
    player3Button = this.game.add.button(620,150,"play3",this.player3,this);
		player3Button.anchor.setTo(0.5,0.5);
    
    player4Button = this.game.add.button(120,280,"play4",this.player4,this);
		player4Button.anchor.setTo(0.5,0.5);
    
    player5Button = this.game.add.button(370,280,"play5",this.player5,this);
		player5Button.anchor.setTo(0.5,0.5);
    
    player6Button = this.game.add.button(620,280,"play6",this.player6,this);
		player6Button.anchor.setTo(0.5,0.5);
    //players 
    
    var playButton = this.game.add.button(this.game.width - 115,370,"play-btn",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
  player1:function(btn){
    btn.setFrames(1);
    player2Button.setFrames(0,2);
    player3Button.setFrames(0,2);
    player4Button.setFrames(0,2);
    player5Button.setFrames(0,2);
    player6Button.setFrames(0,2);
    which_player = 1;  
  },
  player2:function(btn){
    btn.setFrames(1);
    player1Button.setFrames(0,2);
    player3Button.setFrames(0,2);
    player4Button.setFrames(0,2);
    player5Button.setFrames(0,2);
    player6Button.setFrames(0,2);
    which_player = 2;  
  },
  player3:function(btn){
    btn.setFrames(1);
    player1Button.setFrames(0,2);
    player2Button.setFrames(0,2);
    player4Button.setFrames(0,2);
    player5Button.setFrames(0,2);
    player6Button.setFrames(0,2);
    which_player = 3;  
  },
  player4:function(btn){
    btn.setFrames(1);
    player1Button.setFrames(0,2);
    player2Button.setFrames(0,2);
    player3Button.setFrames(0,2);
    player5Button.setFrames(0,2);
    player6Button.setFrames(0,2);
    which_player = 4;  
  },
  player5:function(btn){
    btn.setFrames(1);
    player1Button.setFrames(0,2);
    player2Button.setFrames(0,2);
    player3Button.setFrames(0,2);
    player4Button.setFrames(0,2);
    player6Button.setFrames(0,2);
    which_player = 5;  
  },
  player6:function(btn){
    btn.setFrames(1);
    player1Button.setFrames(0,2);
    player2Button.setFrames(0,2);
    player3Button.setFrames(0,2);
    player4Button.setFrames(0,2);
    player5Button.setFrames(0,2);
    which_player = 6;  
  },
	playTheGame: function(){
    if(which_player != 0)  {
	    console.log("your picking player----" + which_player);
      this.game.state.start("theGame");
    }else {
      alert("Please pick a player."); 
    } 
	}
}
