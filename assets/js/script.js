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

        // add a condition and data attribute to decide if an option is true or false
        if (questionChoices[i] === questionsBank[index].answer) {
            userOptionBtn.setAttribute("data-value", "true");
            userOptionBtn.setAttribute("data-end", "false");
        } else {
            userOptionBtn.setAttribute("data-value", "false");
            userOptionBtn.setAttribute("data-end", "false");
        } 

        // add the button to the div container
        questionContainer.appendChild(userOptionBtn);

        // when user option is clicked, check the answers
        userOptionBtn.addEventListener("click", checkAnswers);
        
    }
}

// check values of the click event to determine if answer is right or wrong
function checkAnswers(event) {
    var value = event.currentTarget.dataset.value;
    var atEnd = event.currentTarget.dataset.end;

    if (value === "true" && index < questionsBank.length) {
        console.log("at the end? " + atEnd);
        console.log("yay");
        index++;
        loadQuestions();
    } else if (value === "false" && index < questionsBank.length) {
        console.log("at the end? " + atEnd);
        console.log("noo");
        // deductTime();
        index++;
        loadQuestions();
    }

    if (index === questionsBank.length) {
        atEnd = "true";
        console.log("last at the end? " + atEnd);
        showHighScores();
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
    let timePenalty = 10;

    secondsLeft = secondsLeft - timePenalty;
}

// timer function
function startTimer() {

    let timer = setInterval(function() {
        timerElement.textContent = secondsLeft + " s";
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