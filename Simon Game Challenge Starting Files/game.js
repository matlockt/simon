var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0

function buttonPop(a) {
  $("#" + a).fadeOut(200).fadeIn(200);
  var buttonSound = new Audio("sounds/" + a + ".mp3");
  buttonSound.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
//   for (i = 0; i < gamePattern.length; i++) {
//   setTimeout(buttonPop(gamePattern[i]), i * 3000);
// }
i = 0;

function animation_loop() {
  buttonPop(gamePattern[i]);
  setTimeout(function() {
    i++;
    if (i < gamePattern.length) {
      animation_loop();
    }
  }, 1000);
};
animation_loop();
  level++;
  $("h2").text("Level " + level);
}



$('div.btn').click(function() {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  buttonPop(userChosenColor);
  for (i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] == userClickedPattern[i]) {
      console.log("Success");
      if ((gamePattern.length == userClickedPattern.length) && (gamePattern[level-1] == userClickedPattern[level-1])) {
        setTimeout(nextSequence, 1000);
        userClickedPattern.length = 0;
      }

    } else {
      console.log("Wrong");
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      $("body").toggleClass("game-over");
      setTimeout(function() {$("body").toggleClass("game-over")}, 300);
      $("h2").text("Game Over - Click Here to Restart");
      $("h2").one("click", startOver);
    }
  }
});

$("h2").one("click", nextSequence);

function startOver() {
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 0;
  nextSequence();
}
