var highScoresLink = document.getElementById("highscores");
var timerElement = document.getElementById("timer-span");
var quizBoxArea = document.getElementById("quiz-box");
var startQuizButton = document.getElementById("start-quiz-btn");

// set welcome msg and container variables
var welcomeMessage = document.getElementById("welcome-message");
var questionContainer = document.getElementById("question-container");
var highScoresContainer = document.getElementById("high-scores-container");



// to use index later, set it to 0 here first
var index = 0;

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
var secondsLeft;
var timer;


// functions

function loadQuestions() {
    //clear the question container box
    questionContainer.innerHTML = "";

    // hide the welcome message
    welcomeMessage.style.display = "none";

    // create title and choice variables for readability
    var questionTitle = questionsBank[index].title;
    var questionChoices = questionsBank[index].choices;


    // add the question bank title to the question container div
    // append for strings; appendChild for DOM elements
    questionContainer.append(questionTitle);

    // create a button for each choice
    for (let i = 0; i < questionChoices.length; i++) {
        var userOptionBtn = document.createElement("button");
        userOptionBtn.textContent = (i + 1) + ". " + questionChoices[i];

        // add a condition and data attribute to decide if an option is true or false, or at the end of the block of questions or not
        if (questionChoices[i] === questionsBank[index].answer) {
            userOptionBtn.setAttribute("data-value", "true");
            userOptionBtn.setAttribute("data-atEnd", "false");
        } else {
            userOptionBtn.setAttribute("data-value", "false");
            userOptionBtn.setAttribute("data-atEnd", "false");
        } 

        // add the button to the div container
        questionContainer.appendChild(userOptionBtn);

        // when user option is clicked, check the answers
        userOptionBtn.addEventListener("click", checkAnswers);
        
    }
}

// check values of the click event to determine if answer is right or wrong
function checkAnswers(event) {
    // grab btn data attributes set in loadQuestions function
    var value = event.currentTarget.dataset.value;
    var isAtEnd = event.currentTarget.dataset.atEnd;

    // first, if index's added total matches the number of the last question's index, then "is at the end (of the question block)" becomes true
    if (index === (questionsBank.length - 1)) {
        isAtEnd = "true";
        clearInterval(timer);
        showHighScores();
    }

    // if user chose incorrect answer and there are still more questions, apply timer penalty
    else if (value === "false" && (index < questionsBank.length - 1)) {
    deductTime();
    index++;
        if (secondsLeft < 0) {
            timerElement.textContent = 0 + " s";
            showHighScores();
        } else {
            loadQuestions();
        }
    } 

    // if user chose correct answer AND index under question bank length, add index -- then, IF timer is under 0, go to high score section; otherwise load the next q
    else if (value === "true" && index < (questionsBank.length - 1)) {
        index++;
            if (secondsLeft < 0) {
                showHighScores();
            } else {
                loadQuestions();
            }
        }

    

}

function showHighScores() {
    highScoresContainer.innerHTML = "";

    welcomeMessage.style.display = "none";
    questionContainer.style.display = "none";

    highScoresContainer.append("working");
    
}


// take off 10 seconds
function deductTime() {
    secondsLeft = secondsLeft - 10;
    timerElement.textContent = secondsLeft + " s";
}

// timer function
function startTimer() {
    let timer = setInterval(function() {
        timerElement.textContent = secondsLeft + " s";
        secondsLeft--;

        // if seconds reach 0, clear timer and set text to 0
        if (secondsLeft < 0) {
            clearInterval(timer);
            timerElement.textContent = 0 + " s";
        
        // if index reaches the index of the last question, clear the timer
        } else if (index === questionsBank.length - 1) {
            clearInterval(timer);
        }

    }, 1000);
}


function startQuiz () {
    secondsLeft = 20;
    loadQuestions();
    startTimer();

    //make a next button
    // var nextButton = document.createElement("button");
    // nextButton.textContent = "next";
    // nextButton.addEventListener("click", () => {
    //     if (index < questionsBank.length) {
    //         index++;
    //         loadQuestions();
    //         }
    //     })
    // quizBoxArea.appendChild(nextButton);
}


// add event listeners:
startQuizButton.addEventListener("click", startQuiz);