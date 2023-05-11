// Javascript and JQuery demo

const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Watch for key press to start game
$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// add random button to game pattern
// increase level by 1 and reset player pattern
function nextSequence() {
  started = true;
  $(".press").text("");
  $(".score").text(" ");
  const randomNumber = Math.floor(Math.random() * 4);
  randomColour = buttonColours[randomNumber];
  animatePress(randomColour);
  gamePattern.push(randomColour);
  playSound(randomColour);
  level += 1;
  $("#level-title").text("Level: " + level);
  userClickedPattern = [];
}

// watch for button clicks and push the choice
// to the users pattern
$(".btn").click(function () {
  if (started) {
    userClickedPattern.push(this.id);
    animatePress(this.id);
    playSound(this.id);

    checkAnswer(userClickedPattern.length - 1);
  }
});

// play any of the sounds
function playSound(name) {
  const audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// animate the clicked button

function animatePress(currentColour) {
  $("#" + currentColour)
    .fadeOut(100)
    .fadeIn(100);
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// check for player error and display graphics for end of game
// if correct add to game pattern, else
// display final level reached and restart option
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER!");
    $(".score").text("Final Level: " + (level - 1));
    $(".press").text("Press any key...");
    startOver();
  }
  if (currentLevel + 1 === level) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

// reset vars and restart game
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
