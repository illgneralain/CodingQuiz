// Assigning soon to be used HTML elements
var quizBody = document.getElementById("quiz");
var resultsEL = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScoreBtn");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Creating Questionaire Object 

var quizQuestions = [{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"
},
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "c"},
];

// Time, Score, and other Global Variables 

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0
var correctAnswer; 

// This function pulls the questions from our quizQuestion object

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;   
};

// A function that will start our quiz generating our 1st question and set our time range while 
// hiding the start div and game over 

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();
}

timerInterval = setInterval(function() {
// -- to decrease the time 
    timeLeft--;
// displays time remaining
    quizTimer.textContent = "Time Left:" + timeLeft;
// if time runs out clear/reset timer and show score
    if(timeLeft === 0) {
        clearInterval(timerInterval);
        showScore();
    }
}, 1000);
quizBody.style.display = "block";


function showScore(){
    quizBody.style.display = "none";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of" + quizQuestions.length + " correct!"; 
}

submitScoreBtn.addEventListener("click", function highscore(){
// prevent user from not entering initials for high score
    if(highscoreInputName.value === ""){
        alert("No initials entered!");
        return false;
        
    }else
    {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores") || []);
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        // game over div 

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display= "flex";

        // push current High score by user to saved high scores storage

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify("savedHighscores"));
        generateHighscores();
    }
    });

    // keeps adding more than just one high score 

    function generateHighscores(){
        highscoreDisplayName.innerHTML ="";
        highscoreDisplayScore.innerHTML ="";
        var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        // for loop
        for (i=0; i<highscores.length; i++){
            var newChallenger = document.createElement("li");
            var newRecord = document.createElement("li");
            newChallenger.textContent = highscores[i].name;
            newRecord.textContent = highscores[i].score;
            highscoreDisplayName.appendChild(newChallenger);
            highscoreDisplayScore.appendChild(newRecord);
        }
    }
    // show high score page hide others 
function showHighscore(){
    startQuizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();
}
// clear storage

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent ="";
    highscoreDisplayName.textContent = "";
}

// replay quiz

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}
// function if answer is correct, alert 
function checkAnswer(answer){
    correctQuestion = quizQuestions[currentQuestionIndex].correctAnswer;
    if (answer === correctQuestion && currentQuestion !== finalQuestionIndex){
      score++;
      alert("Correct!");
      // add another question from the quizQuestion that stored in currentQuestionIndex array 
      currentQuestionIndex++;
      // generate next question
      generateQuizQuestion();  
    }
    else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
    }
startQuizButton.addEventListener("click", startQuiz);
// add event listener to start quiz 

// Creating an action for the submit button to store the high score
// initials then create a function that will store the new user and score, may need to create a a child variable
// display high score  

// use parse, local store, and get item to retrieve all saved high scores 
// saw online a trim can be used to take initials away 
// more childs? variables needed 

// append new high score and initial 
// hide other divs and show high score div only 
// clear list of high scores 
// clear local storage 