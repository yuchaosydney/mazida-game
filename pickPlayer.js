var pickPlayer = function(game){
  
}

pickPlayer.prototype = {
  	create: function(){
	  console.log("pick up players...");	
    $('#result').attr("style","display:none;");
    $('#pick-up-player').attr("style","display:block;");
    $(".player-btn").each(function(){
    $(this).click(function(e){
      e.preventDefault();
      $(".player-btn").removeClass("active");
      switch($(this).attr("id")){
        case "player1Button":
          which_player = 1;
        break;
        case "player2Button":
          which_player = 2;
          break;
        case "player3Button":
          which_player = 3;
        break;
        case "player4Button":
            which_player = 4;
          break;
        case "player5Button":
            which_player = 5;
          break;
        case "player6Button":
            which_player = 6;
          break;
        } 
      $(this).addClass("active");
    });

  });

    $("#pick-up-player .play-btn").click(function(e){
        e.preventDefault();
        if(which_player != 0)  {
          console.log("your picking player----" + which_player);
          $('#instructurions').attr("style","display:block;");
          $('#pick-up-player').attr("style","display:none;");
        }else {
          alert("Please pick a player."); 
        }
        //pickPlayer.prototype.playTheGame.call();
    });
    $("#instructurions .play-btn").click(function(e){
        e.preventDefault();
        pickPlayer.prototype.playTheGame.call();
    });
	},
  
	playTheGame: function(){
      game.state.start("theGame");
	}
}


