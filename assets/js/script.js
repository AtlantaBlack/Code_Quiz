var highScoresLink = document.getElementById("highscores");
var timerElement = document.getElementById("timer-span");
var quizBoxArea = document.getElementById("quiz-box");
var startQuizButton = document.getElementById("start-quiz-btn");

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

var userChoice = "";

// for player names and scores
var playerName = localStorage.getItem("playerName");
var playerScore = localStorage.getItem("playerScore");


// timer variables
var secondsLeft = 4; // set 4 for testing


// functions



function loadQuestions() {
    // set welcome msg and container variables
    var welcomeMessage = document.getElementById("welcome-message");
    var questionContainer = document.getElementById("question-container");

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
        userOptionBtn.textContent = questionChoices[i];

        // add a condition and data attribute to decide if an option is true or false
        if (questionChoices[i] === questionsBank[index].answer) {
            userOptionBtn.setAttribute("data-value", "true");
        } else {
            userOptionBtn.setAttribute("data-value", "false");
        } 

        // add the button to the div container
        questionContainer.appendChild(userOptionBtn);

        // when user option is clicked, check the answers
        userOptionBtn.addEventListener("click", checkAnswers);
    }
}

// check values of the click event to determine if answer is right or wrong
function checkAnswers(event) {
    let value = event.currentTarget.dataset.value;

    if (value === "true") {
        console.log("yay");
    } else {
        console.log("noo")
    }

}



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

    //make a next button
    var nextButton = document.createElement("button");
    nextButton.textContent = "next";
    nextButton.addEventListener("click", () => {
        if (index < questionsBank.length) {
            index++;
            loadQuestions();
            }
        })
    quizBoxArea.appendChild(nextButton);
}


// add event listeners:
startQuizButton.addEventListener("click", startQuiz);