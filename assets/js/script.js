var highScoresLink = document.getElementById("highscores");
var timerElement = document.getElementById("timer-span");
var quizBoxArea = document.getElementById("quiz-box");
var startQuizButton = document.getElementById("start-quiz-btn");


// questions and answers:

// dummy questions/answers for testing first
var questionsBank = [
    {
        title: "pick javascript",
        choices: ["a", "b", "c", "javascript"],
        answer: "javascript"
    },
    {
        title: "pick boolean",
        choices: ["a", "b", "c", "boolean"],
        answer: "boolean"
    },
    {
        title: "pick string",
        choices: ["a", "b", "c", "string"],
        answer: "string"
    },
    {
        title: "pick array",
        choices: ["a", "b", "c", "array"],
        answer: "array"
    }
];



// for player names and scores
var playerName = localStorage.getItem("playerName");
var playerScore = localStorage.getItem("playerScore");


// timer variables
var secondsLeft = 4; // set 4 for testing


// functions



function loadQuestions() {
    var questionsBox = document.createElement("div");
    var questionsBoxContent = document.createTextNode("blah blah");

    questionsBox.appendChild(questionsBoxContent);

    quizBoxArea.appendChild(questionsBox);

}

loadQuestions();

// timer function
function startTimer() {
    let timer = setInterval(function() {
        timerElement.textContent = secondsLeft;
        secondsLeft--;

        if (secondsLeft < 0) {
            clearInterval(timer);
            console.log(secondsLeft + " seconds left & working");
        }
    }, 1000);
}


function startQuiz () {
    secondsLeft = 60;
    loadQuestions();
    startTimer();
}


// add event listeners:
// startQuizButton.addEventListener("click", startQuiz);