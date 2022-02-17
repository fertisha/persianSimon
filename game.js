//We should have an empty array to save the results of the next sequence function
var gamePattern = [];
//We should have an array with the name of the buttons, so they can be targeted
var buttonColours = ["red", "blue", "green", "yellow"];
//This var should be created to store the button that has been clicked
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keydown.
var started = false;

//Create a new variable called level and start at level 0.
var level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
//The following call back function is used for the first time when the game is begining
$(document).keydown(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  //this is used to refer to .btn and attr is used to address the id that has been clicked
  var userChosenColour = $(this).attr("id");

  //Add the contents of the variable userChosenColour to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  //In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //If the user got the most recent answer right in previous, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    //In the sounds folder, there is a sound called wrong.mp3, call playsound function with the input of wrong.mp3
    playSound("wrong");

    //Apply game-over class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 7000);

    //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Call startOver() if the user gets the sequence wrong.
    startOver();
  }

}


//This function is to create the sequence of the game by using 4 random numbers
function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  //Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //To access the name of the buttons, we use the outcome of randomNumber as an index
  var randomChosenColour = buttonColours[randomNumber];
  //Next line is used to add the name of a random color to the empty array we had
  gamePattern.push(randomChosenColour);
  //Using jQuery target the button that has the same id as randomChosenColour
  //Fadein and fadeout are used to bring an animated flash to the selected button
  $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);
  //Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);

}

function playSound(name) {
  //To add an audio to Javascript you should use the call back function of audio and play
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //Using setTimeout function we can remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 1000);
  //After creating this function you have to add it to the button click function on the top so it would work
}

//Create a new function called startOver(), for the times the user get the incorrect pattern
function startOver() {

  //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
