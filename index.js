let squareSequenceArray = [];
let userSequenceArray = [];
let level = 0;

$(document).keypress(function () {
  if (squareSequenceArray.length === 0) {
    startGame();
  }
});

$(".game-button").click(function () {
  let buttonColor = $(this).attr("class").split(" ")[1];
  playAudioBasedOnColor(buttonColor);
  userSequenceArray.push(buttonColor);
  addAnimationToSquare(this);
  checkUserSequence(userSequenceArray.length - 1);
});

function startGame() {
  level = 0;
  squareSequenceArray = [];
  userSequenceArray = [];
  nextSequence();
}

function nextSequence() {
  userSequenceArray = [];
  level++;
  updateH1LevelText();
  let selectedSquare = selectRandomSquare();
  squareSequenceArray.push($(selectedSquare).attr("class").split(" ")[1]);
  animateSquareSequence();
}

function selectRandomSquare() {
  let buttons = $(".game-button");
  let randomNumber = Math.floor(Math.random() * buttons.length);
  let selectedSquare = buttons[randomNumber];
  return selectedSquare;
}

function addAnimationToSquare(selectedSquare) {
  $(selectedSquare).addClass("pressed");
  setTimeout(function () {
    $(selectedSquare).removeClass("pressed");
  }, 500);
}

function animateSquareSequence() {
  let i = 0;
  const interval = setInterval(function () {
    addAnimationToSquare($(`.game-button.${squareSequenceArray[i]}`));
    playAudioBasedOnColor(squareSequenceArray[i]);
    i++;
    if (i >= squareSequenceArray.length) {
      clearInterval(interval);
    }
  }, 1000);
}

function updateH1LevelText() {
  $("h1").text(`Level ${level}`);
}

function checkUserSequence(currentLevel) {
  if (userSequenceArray[currentLevel] === squareSequenceArray[currentLevel]) {
    if (userSequenceArray.length === squareSequenceArray.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  squareSequenceArray = [];
  userSequenceArray = [];
}

function playAudioBasedOnColor(color) {
  let audio;
  if (color == null) {
    audio = new Audio(`./audios/r.wav`);
  }
  audio = new Audio(`./audios/${color}.wav`);
  audio.play();
}
