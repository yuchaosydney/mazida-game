var result = function(game){}

result.prototype = {
	create: function(){ 
	  console.log("result..." + car_racing_rank);	
    this.game.add.image(0, 0, 'menu-bg');
    
    if(this.game.device.desktop) {
      memu_bg_sound.play();
      
      star_1_sound =  game.add.audio('start_1'); 
      star_2_sound =  game.add.audio('start_2'); 
      star_3_sound =  game.add.audio('start_3');
    }
      
    
    $('#result').attr("style","display:block;");
    $("#result .star").removeClass('active');
    
    switch(parseInt(car_racing_rank)) {
      case 1:
        if(this.game.device.desktop) {
          star_3_sound.play();
        } 
        $("#result .first-star").addClass('active');
        $("#result .second-star").addClass('active');
        $("#result .third-star").addClass('active');
        $("#result h1 i").text('Awesome!');
        break;
      case 2:
        if(this.game.device.desktop) {
          star_2_sound.play();
        } 
        $("#result .first-star").addClass('active');
        $("#result .second-star").addClass('active');
        $("#result h1 i").text('Well done!');
        break;
      case 3:
        if(this.game.device.desktop) {
          star_1_sound.play();
        } 
        $("#result .first-star").addClass('active');
        $("#result h1 i").text('Nice Try!');
        break;
    } 


    $("#result .play-btn").click(function(e){
        e.preventDefault();
        if(game.device.desktop) {
          play1_click_sound.play();
        } 
        result.prototype.replay.call();
    });
    
    $("#result .back-btn a").click(function(e){
        e.preventDefault();
        if(game.device.desktop) {
          memu_bg_sound.stop();     
          memu_bg_sound.destroy();  
        }
      
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
