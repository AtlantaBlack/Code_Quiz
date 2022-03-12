var highScoresLink = document.getElementById("highscores");
var timerElement = document.getElementById("timer-span");
var quizBoxArea = document.getElementById("quiz-box");
var startQuizButton = document.getElementById("start-quiz-btn");


// questions and answers:
var questions = [
    { 
    id: 0,
    q: "Pick Javascript",
    a: [
        { text: "one", isCorrect: false },
        { text: "javascript", isCorrect: true },
        { text: "two", isCorrect: false } 
        ]
    },

    { 
    id: 1, 
    q: "Pick boolean",
    a: [
        { text: "one", isCorrect: false },
        { text: "boolean", isCorrect: true },
        { text: "two", isCorrect: false } 
        ]
    },

    { 
    id: 2, 
    q: "Pick string",
    a: [
        { text: "one", isCorrect: false },
        { text: "string", isCorrect: true },
        { text: "two", isCorrect: false }
    ]
    },
]

// results variables
var correctAnswers = 0;


// for player names and scores
var playerName = localStorage.getItem("playerName");
var playerScore = localStorage.getItem("playerScore");


// timer variables
var secondsLeft = 4; // set 4 for testing


// functions

function resultsPage() {


}

// timer function
function startTimer() {
    let timer = setInterval(function() {
        timerElement.textContent = secondsLeft;
        secondsLeft--;

        if (secondsLeft < 0) {
            clearInterval(timer);
            console.log(secondsLeft + " seconds left & working");
            // resultsPage();
        }
    }, 1000);
}


function startQuiz () {
    secondsLeft = 60;
    startTimer();
    loadQuestions();
}


// add event listeners:
// startQuizButton.addEventListener("click", startQuiz);