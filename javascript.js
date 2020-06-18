var questionPrompt = document.getElementById("question");
var pastScoresText = document.getElementById("pastScores");
var localStorage = window.localStorage;


var scoreText = document.getElementById("score");
var trueBtn = document.getElementById("abutton");
var falseBtn = document.getElementById("bbutton");
trueBtn.disabled = true;
falseBtn.disabled = true;

var questions = [ "Is grass green?", "Is New York a country?", "Is fire hot?", "Is the sky blue?"]
var correctAnswers = [true, false, true, true];



var startBtn = document.getElementById("startButton");
var score = 0;  
scoreText.innerHTML = score;  
var timer = document.getElementById("timer");

var timeRemaining = 60;
timer.innerHTML = timeRemaining;



startBtn.onclick = function() {
    var index = 0;
    timeRemaining = 60;
    timer.innerHTML = timeRemaining;
    score = 0;  
    scoreText.innerHTML = score;  
    pastScoresText.innerHTML = "";

    startBtn.disabled = true;
    trueBtn.disabled = false;
    falseBtn.disabled = false;
    questionPrompt.innerHTML = questions[index];

    trueBtn.onclick = function() { //true button functionality
        if(correctAnswers[index] == true) { //the answer is correct
            score++;
            scoreText.innerHTML = score; 
        }
        else { //answer is incorrect
            timeRemaining = timeRemaining - 5;
            timer.innerHTML = timeRemaining;        
        }
        index++;
        //we want to check if index > length of the question array, if it is then we STOP
        if(index >= questions.length) {
            endGame();
        }
        else {
            questionPrompt.innerHTML = questions[index];
        }
        
    }

    falseBtn.onclick = function() { //false button functionality
        if(correctAnswers[index] == false) { //the answer is correct
            score++;
            scoreText.innerHTML = score; 
        }
        else { //answer is incorrect
            timeRemaining = timeRemaining - 5;
            timer.innerHTML = timeRemaining;
        }
        index++;
        if(index >= questions.length) {
            endGame();
        }
        else {
            questionPrompt.innerHTML = questions[index];
        }
    }


    gameTimer = setInterval(() => {
        timeRemaining--;
        timer.innerHTML = timeRemaining;
        if(timeRemaining <= 0) {    
            endGame();
        }
    }, 1000);

};


function endGame(){
    startBtn.disabled = false;
    trueBtn.disabled = true;
    falseBtn.disabled = true;
    questionPrompt.innerHTML = "";
    clearInterval( gameTimer);
    var initialSave = prompt("Enter Initials here");
    if(initialSave != null) {
        var previousScores = JSON.parse(localStorage.getItem(initialSave));
        if(previousScores == null) { //first unique entry for initials
            previousScores = [];
        }
        previousScores.push(score);
        localStorage.setItem(initialSave, JSON.stringify(previousScores))
        renderPastScores();
    }
}

function renderPastScores() {
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);

        pastScoresText.innerHTML += `${key}: ${value}<br>`;
    }
}
    
    













