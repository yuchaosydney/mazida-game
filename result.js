var result = function(game){}

result.prototype = {
	create: function(){ 
	  console.log("result..." + car_racing_rank);	
    this.game.add.image(0, 0, 'menu-bg');
    
    $('#result').attr("style","display:block;");
    	
    
    switch(parseInt(car_racing_rank)) {
      case 1:
        $("#result .first-star").addClass('active');
        $("#result .second-star").addClass('active');
        $("#result .third-star").addClass('active');
        $("#result h1 i").text('Awesome!');
        break;
      case 2:
        $("#result .first-star").addClass('active');
        $("#result .second-star").addClass('active');
        $("#result h1 i").text('Well done!');
        break;
      case 3:
        $("#result .first-star").addClass('active');
        $("#result h1 i").text('Nice Try!');
        break;
    } 


    $("#result .play-btn").click(function(e){
        e.preventDefault();
        result.prototype.replay.call();
    });
    
    $("#result .back-btn a").click(function(e){
        e.preventDefault();
        result.prototype.gohome.call();
    });
	},
  replay: function(){
		this.game.state.start("theGame");
  },
  gohome: function(){
		this.game.state.start("pickPlayer");
  }
}
