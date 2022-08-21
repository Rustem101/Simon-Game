let sequence = []; //sequence of buttons set by computer
let current = []; //sequence of buttons pressed by the user
let cur_level = 1; //current level

function rand() {
  //generates a random integer number in the range [0, 3];
  let res = Math.random();
  res *= 4;
  res = Math.floor(res);
  $(".btn")
    .slice(res, res + 1)
    .fadeOut(100);
  $(".btn")
    .slice(res, res + 1)
    .fadeIn(100);
  let audio = new Audio("sounds/" + $(".btn")[res].classList[1] + ".mp3"); //making a sound
  audio.play();
  return res;
}

$(document).on("keypress", function () {
  //if a key was pressed
  if (
    $("#level-title").text() === "Press A Key to Start" ||
    $("#level-title").text() === "Game Over, Press Any Key to Restart"
  ) {
    $("#level-title").text("Level 1"); //start the game again
    cur_level = 1;
    current = [];
    sequence = [];
    sequence.push(rand());
  }
});

$(".btn").on("click", function (event) {
  //if the button was clicked on
  let color = event.target.classList[1]; //color of the button pressed
  if (color === "green") {
    current.push(0);
  } else if (color === "red") {
    current.push(1);
  } else if (color === "yellow") {
    current.push(2);
  } else {
    current.push(3);
  }
  press(color); //animation on a corresponding button
  let len = current.length;

  let flag = false;
  for (let i = 0; i < len; ++i) {
    if (current[i] != sequence[i]) {
      //if some press doesn't match the correct sequences
      flag = true;
      break;
    }
  }

  if (flag === true) {
    //if a mismatch occurred
    let audio = new Audio("sounds/wrong.mp3"); //making a sound
    audio.play();
    $("body").addClass("game-over"); //special screen
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    $("#level-title").text("Game Over, Press Any Key to Restart");
  }

  if (flag === false && len === sequence.length && len > 0) {
    cur_level++; //increasing the current level;
    $("#level-title").text("Level " + cur_level); //changing the title
    current = []; //emptying the current sequence of buttons pressed

    setTimeout(function () {
      sequence.push(rand()); //adding one more button to be pressed
    }, 500);
  }
});

function press(color) {
  let audio = new Audio("sounds/" + color + ".mp3"); //making a sound
  audio.play();
  $("." + color).addClass("pressed");
  setTimeout(function () {
    $("." + color).removeClass("pressed");
  }, 100);
}
