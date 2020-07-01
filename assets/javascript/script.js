//Logic for Quiz Game

//Variables
var time = 60;
var timeLeft;
var questionsList = 0;

//Tone for correct & incorrect
var correctSound = new Audio("assets/audio/correct.mp3");
var incorrectSound = new Audio("assets/audio/incorrect.mp3")

//When start Quiz button is clicked hide the start instructions

$("#startQuiz").on("click", function () {
    $(".main").hide();

    //Start timer
    timeLeft = setInterval(timeLapse, 1000);

    //Start Quiz function 
    startQuestions();

});

//Function for time ticking down
function timeLapse() {
    $("#timer").text(time);
    time--;
    
    if (time <= 0) {
        finQuiz();
    } 
};

//Display Questions
function startQuestions() {

    //Get question index of 0
    var showQ = questions[questionsList];

    //Render Question
    var titleQ = $("#quizHeading").text(showQ.questionsTitle);
    titleQ.textContent = questionsList.questionsTitle;

    //Clear html questions choice 
    $("#multiChoice").text("");

    //Render Multiple Choices
    showQ.multiChoice.forEach(function (multiChoice, i) {

        //Render buttons
        var multiButton = document.createElement("button");
        multiButton.setAttribute("class", "choice");
        multiButton.setAttribute("value", multiChoice);

        multiButton.textContent = i + 1 + ". " + multiChoice;

        //addEvent Listener for multiple choice
        multiButton.onclick = (multiSelect);

        //Append multiple choice to page
        $("#multiChoice").append(multiButton);

    });
}

//Multiple choice selection Logic
function multiSelect() {

    if (this.value !== questions[questionsList].correctAns) {
        //minus 10 seconds 
        time -= 10;

        //if out of time
        if (time < 0) {
            time = 0;
        }

        //decreased new time
        $("#timer").text(time);

        //Show, hide alert, play sound
        incorrectSound.play();
        $(".alert-danger").attr("hidden", false);

        setTimeout(function () {
            $(".alert-danger").attr("hidden", true);
        }, 1000);

    } else {

        correctSound.play();
        $(".alert-success").attr("hidden", false);

        setTimeout(function () {
            $(".alert-success").attr("hidden", true);
        }, 500);
    }

    //Next Question in the List
    questionsList++;

    //if end of questions list
    if (questionsList === questions.length) {
        finQuiz();
    } else {
        startQuestions();
    }
}

function finQuiz() {
    //stop timer count down
    clearInterval(timeLeft);

    //show Game over screen 
    $("#gameOver").attr("hidden", false);

    //Display score
    var userScore = $("#userScore");
    userScore.text(time);

    //Hide Questions
    $("#questions").hide();
}

//Saving User High Score
function storeHS() {
    var userInitials = $("#initials").val();
  
    //block null input for initials
    if (userInitials !== "") {
        var userHS = JSON.parse(window.localStorage.getItem("highScoreList")) || [];

        var score = {
            score: time,
            initials: userInitials
        };

        //save to local storage
        userHS.push(score);
        window.localStorage.setItem("highScoreList", JSON.stringify(userHS));

        // redirect to next page
        window.location.href = "HighScore.html";
    }
}

//Click submit initials button
$("#submit").on("click", storeHS);


