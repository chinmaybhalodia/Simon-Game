
const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var hasStarted = false;

$(document).on("keypress", function () {
    if (!hasStarted) {
        $(".result").addClass("hidden").text("Correct Answer!");
        nextSequence();
        hasStarted = true;
    }
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(className) {
    $("." + className).addClass("pressed");
    setTimeout(function () {
        $("." + className).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Sucess");
        if (userClickedPattern.length === gamePattern.length) {
            $(".result").removeClass("hidden");
            setTimeout(function () {
                $(".result").addClass("hidden");
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        $("#level-title").text("Game Over!");
        $(".result").text("Press any key to restart.").removeClass("hidden");
        startOver();
    }
}

function startOver(){
    hasStarted = false;
    level = 0;
    gamePattern = [];
}