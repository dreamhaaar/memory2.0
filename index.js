const randomBox = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
];
var playerPattern = [];
var gamePattern = [];
var level = 1;
var difficulty = 1;

let message = "Memory Sequence Game";
function animatePressAdd(box) {
  $("#" + box).addClass("press-effect");
}

function animatePressRemove(box) {
  $("#" + box).removeClass("press-effect");
}

function removePress() {
  for (let i = 0; i < playerPattern.length; i++) {
    setTimeout(function () {
      animatePressRemove(playerPattern[i]);
    }, playerPattern.length * 100);
  }
}

function meow() {
  var audio = new Audio("meow.mp3");
  audio.playbackRate = 2.0;
  audio.play();
}

function showPopUp() {
  $(".start").addClass("hide-startbutton");
  $(".main-box").addClass("hide-mainbox");
  $(".popup").addClass("show-popup");
  $(".level").html("⭐ Level " + (level - 1) + " ⭐");
}

function closePopUp() {
  $(".start").removeClass("hide-startbutton");
  $(".main-box").removeClass("hide-mainbox");
  $(".popup").removeClass("show-popup");
  message = "💆‍♀️ Memory Sequence Game 👓";
  $(".title").html(message);
  $(".t").html(message);
}

function gameOver() {
  message = "Wrong Sequence 😧";
  $(".title").html(message);
  $(".t").html(message)
  var audio = new Audio("wrong.mp3");
  audio.play();
  $(".box").off("click");
}
function startGame() {
  level = 1;
  difficulty = 1;
  setTimeout(gameSequence, 1000);
}

function gameSequence() {
  playerPattern = [];
  gamePattern = [];
  $(".title").html("Level " + level);
  $(".t").html("Level " + level);


  for (var i = 0; i < difficulty; i++) {
    let generatedRandomBox;
    do {
      var randomNumber = Math.floor(Math.random() * randomBox.length);
      generatedRandomBox = randomBox[randomNumber];
    } while (gamePattern.includes(generatedRandomBox));
    gamePattern.push(generatedRandomBox);
  }

  for (let i = 0; i < difficulty; i++) {
    setTimeout(function () {
      meow();
      animatePressAdd(gamePattern[i]);
    }, i * 300);
  }
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      animatePressRemove(gamePattern[i]);
    }, gamePattern.length * 500);
  }

  console.log(gamePattern);
}

function playerSequence() {
  $(".box").off("click").on("click", function () {
      var idName = this.id;
      playerPattern.push(idName);
      animatePressAdd(idName);
      console.log("player" + playerPattern);
      meow();
      playerSequenceChecker(playerPattern.length - 1);
    });
}

function playerSequenceChecker(index) {
  console.log("player" + playerPattern.length);
  console.log("game" + gamePattern.length);
  if (playerPattern[index] === gamePattern[index]) {
    if (playerPattern.length === gamePattern.length) {
      removePress();
      difficulty++;
      level++;
      setTimeout(gameSequence, 1000);
    }
  } else {
    setTimeout(function () {
      gameOver();
      showPopUp();
      removePress();
    }, 1000);
  }
}

function isStartClicked() {
  $(".start-button")
    .off("click")
    .on("click", function () {
      startGame();
      setTimeout(playerSequence, 500);
      console.log("start clicked");
    });
}

isStartClicked();
