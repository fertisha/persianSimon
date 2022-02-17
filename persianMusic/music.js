//This var is defined to be used in the upcoming loop
var numberOfboxs = document.querySelectorAll(".box").length;
//This object has been defined to decide if the audio is playing or not
var buttonState = {
  w: false,
  a: false,
  s: false,
  d: false,
  j: false,
  k: false,
  l: false
}
//All the sounds have been defined in specfic varaible, because we need them for both make and pause sound function
//So it is better to point a varaible for them to avoid confucion
var wAudio = new Audio("sounds/one.mp3");
var aAudio = new Audio("sounds/two.mp3");
var sAudio = new Audio("sounds/three.mp3");
var dAudio = new Audio("sounds/four.mp3");
var jAudio = new Audio("sounds/five.mp3");
var kAudio = new Audio("sounds/six.mp3");
var lAudio = new Audio("sounds/seven.mp3");

//This loop is decide which button has been clicked
for (var i = 0; i < numberOfboxs; i++) {
  document.querySelectorAll(".box")[i].addEventListener("click", function() {
    // detecting button press
    var buttonInnerHTML = this.innerHTML;
    if (buttonState[buttonInnerHTML]) {
      pauseSound(buttonInnerHTML);
      buttonState[buttonInnerHTML] = false;
    } else {
      makeSound(buttonInnerHTML);
      buttonState[buttonInnerHTML] = true;
    }
    buttonAnimation(buttonInnerHTML);
  });
}
// detecting keyword press
document.addEventListener("keydown", function(event) {
  if (buttonState[event.key]) {
    pauseSound(event.key);
    buttonState[event.key] = false;
  } else {
    makeSound(event.key);
    buttonState[event.key] = true;
  }
  buttonAnimation(event.key);

})
//Function of playing sounds
function makeSound(key) {
  switch (key) {
    case "w":
      wAudio.play();
      break;
    case "a":
      aAudio.play();
      break;
    case "s":
      sAudio.play();
      break;
    case "d":
      dAudio.play();
      break;
    case "j":
      jAudio.play();
      break;
    case "k":
      kAudio.play();
      break;
    case "l":
      lAudio.play();
      break;

    default:
  }
}
//Function to pause the sound
function pauseSound(key) {
  switch (key) {
    case "w":
      wAudio.pause();
      break;
    case "a":
      aAudio.pause();
      break;
    case "s":
      sAudio.pause();
      break;
    case "d":
      dAudio.pause();
      break;
    case "j":
      jAudio.pause();
      break;
    case "k":
      kAudio.pause();
      break;
    case "l":
      lAudio.pause();
      break;

    default:
  }
}
//Function for the flashing of buttons when they are cliked
function buttonAnimation(currentKey) {

  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");
//setTimeout will call a function after a mentioned time 
  setTimeout(function() {

    activeButton.classList.remove("pressed");

  }, 100);
}
