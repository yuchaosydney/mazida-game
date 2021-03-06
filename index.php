<!DOCTYPE html>
<html>
  <head>
    <title>Simple Racer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="user-scalable=0, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="chrome=1, IE=10">
    <link rel="stylesheet" type="text/css" href="vendor/bootstrap/dist/css/bootstrap.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,700italic' rel='stylesheet' type='text/css'>
    <style>
      
      html {
        height: 100%; 
      } 
      
      body {
        background: #F2F2F2; 
        height: 100%; 
      } 
      
      #game {
        width: 100%;
        height: 100%;
        display: block;
        position: relative; 
      }
     
    
    .page-bg {
      background: #F2F2F2 url('assets/logo.png') no-repeat; 
      background-position: right 30px;
      position: absolute;
      top:0;
      width: 100%;
      height: 100%;
      z-index: 999;
    }
    .container {
      padding-top: 130px;
      max-width: 700px;
      margin: 0 auto;
    }
    #pick-up-player {
      display: none; 
    } 
    #pick-up-player a{
      display: block;
    }
    #pick-up-player .container{
      max-width: 764px; 
    }
    #pick-up-player .row {
      margin-bottom: 15px; 
    }
    #pick-up-player a{
      display: block; 
      width: 223px;
      height: 83px;
        margin: 0 auto;
    }
    #pick-up-player .active{
      background-position: 0 100% !important;
    }
    #pick-up-player #player1Button{
      background: #F2F2F2 url('assets/Ahmed.png') no-repeat; 
    }
    
    #pick-up-player #player2Button{
      background: #F2F2F2 url('assets/Hussey.png') no-repeat top right; 
    }
    #pick-up-player #player3Button{
      background: #F2F2F2 url('assets/Blizzard.png') no-repeat top right; 
    }
    
    #pick-up-player #player4Button{
      background: #F2F2F2 url('assets/Khawaja.png') no-repeat top right; 
    }
    #pick-up-player #player5Button{
      background: #F2F2F2 url('assets/Sandhu.png') no-repeat top right; 
    }
    #pick-up-player #player6Button{
      background: #F2F2F2 url('assets/Kallis.png') no-repeat top right; 
    }
    .play-btn{
      background: #F2F2F2 url('assets/play_button.png') no-repeat top right; 
      display: block; 
      width: 224px;
      height: 56px;
      float: right;
    }
    #pick-up-player .title{
      background: #F2F2F2 url('assets/playertitle.png') no-repeat top right; 
      display: block; 
      width: 286px;
      height: 58px;
      float: left;
      margin: 30px;
    }
    #instructurions {
      height: 100%; 
      display: none; 
    }

    #instructurions .container{
      max-width: 734px; 
    }

    #instructurions .title{
      background: #F2F2F2 url('assets/playertitle.png') no-repeat top right; 
      display: block; 
      width: 286px;
      height: 58px;
      float: left;
      margin: 30px;
    }
    #instructurions .text{
      background: #F2F2F2 url('assets/desktopinstrustions.png') no-repeat; 
      display: block; 
      width: 303px;
      height: 164px;
      margin: 30px;
    }
    #instructurions .turn-right{
      float: right; 
    }
    #instructurions .mobile-turn{
      margin-bottom: 20px; 
      display: none; 
    }
    #instructurions .mobile-text{
      background: #F2F2F2 url('assets/mobileinstructions.png') no-repeat; 
      display: none;
      background-size: contain;
      width: 100%;
      max-width: 360px; 
      min-height: 285px; 
      margin: 0 auto;
    }
    #instructurions .desktop-sprite{
      background: #F2F2F2 url('assets/instractionsSprite.png') no-repeat top right; 
      display: block; 
      width: 269px;
      height: 160px;
      -webkit-animation: play .8s steps(2) infinite;
       -moz-animation: play .8s steps(2) infinite;
        -ms-animation: play .8s steps(2) infinite;
         -o-animation: play .8s steps(2) infinite;
            animation: play .8s steps(2) infinite;
    } 
    #result {
      display: none; 
    }
    #result .container{
      padding-top: 100px; 
    }
    #result .play-btn {
      background: #F2F2F2 url('assets/replay-btn.png') no-repeat top right; 
      display: block; 
      width: 269px;
      height: 66px;
      margin: 0 auto;
        float: none;
    }
    #result .stars {
      width: 280px; 
      margin: 0 auto; 
    }

    #result .star {
      background: #F2F2F2 url('assets/star.png') no-repeat top right; 
      background-position: 0 100%; 
      display: inline-block; 
      width: 66px; 
      height: 65px;
      margin: 0 10px;
    }
    #result .active {
      background-position: 0 0%; 
    }
    
    #result h1 {
      text-align: center;
      background-position: 0 0%; 
        color: #97D700;
    }
    #result .container {
      text-align: center;
    }
    #result p {
      text-align: center;
    }
    #result .back-btn{
      margin: 60px 30px 0;
      display: block;
    }
    #result .back-btn a{
      display: block;
      width: 66px; 
      height: 18px; 
      background: #F2F2F2 url('assets/back-home-btn.png') no-repeat top right; 
    }
    @-webkit-keyframes play {
      from { background-position:    0 0; }
        to { background-position: 0 200%; }
    }

    @-moz-keyframes play {
      from { background-position:    0px; }
        to { background-position: 0 200%; }
    }

    @-ms-keyframes play {
      from { background-position:    0px; }
        to { background-position: 0 200%; }
    }

    @-o-keyframes play {
      from { background-position:    0px; }
        to { background-position: 0 200%; }
    }

    @keyframes play {
      from { background-position:    0 0; }
        to { background-position: 0 200%; }
    }
    #mute-btn {
      background: transparent url('assets/soundswitch.png') no-repeat top center; 
      background-position: 0 100%; 
      background-size: cover; 
      display: block; 
      height: 40px;
      width: 40px;
      position: absolute;
      z-index: 99999;
      right: 30px;
      bottom: 30px;
    } 
    .mute-btn-active {
      background-position: 0 0 !important; 
    }
    @media screen and (max-width: 767px) {
      body{
        overflow: scroll !important; 
      } 
      #mute-btn {
        display: none; 
      }
      .page-bg {
        height: auto;
      }
      #pick-up-player .title {
        
        display: none; 
      }
      #pick-up-player .mobile-title {
        background: #F2F2F2 url('assets/playertitle.png') no-repeat top center; 
        background-size: contain; 
        display: block; 
        height: 58px;
        margin: 30px;
      }
      #pick-up-player .row {
        margin: 0; 
      }
      #pick-up-player .play-btn{
        margin-top: 30px; 
      }
      #instructurions .title {
        display: none; 
      }
      .desktop-sprite {
        display: none !important; 
      }
      #instructurions {
      }
      #instructurions .mobile-text {
        display:block; 
      }
      #instructurions .text {
        display:none; 
      }
      #instructurions .mobile-turn{
        display: block; 
      }
      #result {
      }
      #result .back-btn a{
        display: block;
        width: 11px; 
        height: 17px; 
        background: #F2F2F2 url('assets/mobile-back-home-btn.png') no-repeat top right; 
      }
    }
    @media screen and (max-width: 400px) {
      .page-bg {
        height: auto;
        background-position: right 30px;
        background-size: 77%;
        padding-bottom: 30px;
      }
    }
    </style> 
  </head>
  <body style="padding:0; margin:0; overflow:hidden;">
    <!--mute button--> 
    <a href="#" id="mute-btn"></a>
    <!--mute button--> 
    <!--pick up players div--> 
    <div id="pick-up-player" style="display:none;"  class="page-bg">
      <div class="title"></div> 
      <div class="container">
        <div class="mobile-title"></div> 
        <!---row--> 
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <a href="#" class="player-btn" id="player1Button">
              <span class="player"></span> 
            </a>
          </div>
          <div class="col-xs-12 col-sm-4">
            <a href="#" class="player-btn" id="player2Button">
              <span class="player"></span> 
            </a>
          </div>
          <div class="col-xs-12 col-sm-4">
            <a href="#" class="player-btn" id="player3Button">
              <span class="player"></span> 
            </a>
          </div>
        </div> 
        <!---row-->
        <!---row--> 
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <a href="#" class="player-btn" id="player4Button">
              <span class="player"></span> 
            </a>
          </div>
          <div class="col-xs-12 col-sm-4">
            <a href="#" class="player-btn" id="player5Button">
              <span class="player"></span> 
            </a>
          </div>
          <div class="col-xs-12 col-sm-4">
            <a href="#" class="player-btn" id="player6Button">
              <span class="player"></span> 
            </a>
          </div>
        </div> 
        <!---row-->
        <a href="#" class="play-btn"></a>  
      </div> 
    </div>
    <!--pick up players div--> 
    <!--instructurions div--> 
    <div id="instructurions"  style="display:none;" class="page-bg">
      <div class="title"></div> 
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="desktop-sprite"></div> 
            <div class="mobile-text"></div> 
          </div> 
          <div class="col-sm-6">
            <div class="text"></div>
            <!--mobile turn left and right-->
            <div class="mobile-turn">
              <img src="assets/mobileleft.png?v=<?php echo time();?>"/> 
              <img class="turn-right" src="assets/mobileright.png?v=<?php echo time();?>"/> 
            </div>  
            <!--mobile turn left and right-->
          </div> 
        </div> 
        <a href="#" class="play-btn"></a>  
      </div> 
    </div>
    <!--instructurions div--> 
    <!--result div--> 
    <div id="result"  style="display:none;"class="page-bg">
      <div class="back-btn">
        <a href="#"></a> 
      </div> 
      <div class="container">
        <!--stars--> 
        <div class="stars">
          <span class="star first-star"></span> 
          <span class="star second-star"></span> 
          <span class="star third-star"></span> 
        </div> 
        <!--stars--> 
        <!--title-->
        <h1><i>There is always next time</i></h1> 
        <!--title-->
        <!--text-->
        <p><i>If you matched the eligility criteria for a chance to race on the live track for a crack at the Mazda3, stay tuned. Players drawn and notified 11th and 22nd of December.</i></p>
        <p><i>In the meantime keep practicing.</i></p>
        <!--text-->
        <a href="#" class="play-btn"></a>  
      </div> 
    </div>
    <!--result div--> 
    <div id="game">
      <input id="name-input" type="text" style="display: none;"/>
    </div>
    <img id="track-hit" style="display: none;" src="assets/track-hit.png?v=<?php echo time();?>" alt="The Scream">
    
    <canvas id="track-hit-canvas" style="display: none;" width="2800" height="1600" alt="The Scream"></canvas>
    <script src="vendor/jquery/dist/jquery.min.js?v=<?php echo time();?>"></script>
    <script src="vendor/phaser/build/phaser.min.js?v=<?php echo time();?>"></script>
    <script>
      var car_racing_time = 0; 
      var car_racing_rank = 0; 
      var which_player = 0; 
      var WINDOW_WIDTH = $("#game").width();
      var WINDOW_HEIGHT = $("#game").height();
      var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.CANVAS, 'game',{update: this.update});
  
      var track_canvas = document.getElementById("track-hit-canvas"); 
      var ctx = track_canvas.getContext("2d"); 
      //var memu_click_sound = game.add.audio('menu_click'); 
      var img = document.getElementById("track-hit");
      var imageData = null; 
      setTimeout(function(){
        ctx.drawImage(img, 0, 0);
        imageData = ctx.getImageData(0,0, 2800, 1600).data;
        console.log(imageData[0]);
      },1000); 
       
      //var p = ctx.getImageData(1, 1, 1, 1).data;

    </script>
    <script src="utils.js?v=<?php echo time();?>"></script>
    <script src="preload.js?v=<?php echo time();?>"></script>
    <script src="playMission.js?v=<?php echo time();?>"></script>
    <script src="pickPlayer.js?v=<?php echo time();?>"></script>
    <script src="thegame.js?v=<?php echo time();?>"></script>
    <script src="result.js?v=<?php echo time();?>"></script>
    <script>
			(function() {
        
				game.state.add("Preload",preload);
				game.state.add("playMission",playMission);
				game.state.add("pickPlayer",pickPlayer);
				game.state.add("theGame",theGame);
				game.state.add("result",result);
				game.state.start("Preload",true,true,null);
        
        //mute button click
        $("#mute-btn").click(function(e){
            e.preventDefault();
            if(game.sound.mute) {
              $(this).removeClass("mute-btn-active");
              game.sound.mute = false; 
            }else {
              $(this).addClass("mute-btn-active");
              game.sound.mute = true; 
            } 
        });


      })();    
		</script>
  </body>
</html>
