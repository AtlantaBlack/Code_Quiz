

// var highScoresLink = document.getElementById("highscores");
var timerElement = document.getElementById("timer-span");
var quizBoxArea = document.getElementById("quiz-box");
var startQuizButton = document.getElementById("start-quiz-btn");

// set welcome msg and container variables
var welcomeMessage = document.getElementById("welcome-message");
var questionSection = document.getElementById("question-section");
var playerDetailsSection = document.getElementById("player-details-section")
var highScoresSection = document.getElementById("high-scores-section");


// to use index later, set it to 0 here first
var index = 0;

// timer variables
var secondsLeft;
var timer;

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


// set an object for the player upon submission
// var player = {
//     playerName: playerNameInput.value.trim(),
//     playerScore: secondsLeft
// };

// for retrieving the player scores
// var playerScore = JSON.parse(localStorage.getItem("player"));


// functions

function loadQuestions() {
    //clear the question container box
    questionSection.innerHTML = "";

    // hide the welcome message, player details box, highscores box
    welcomeMessage.style.display = "none";
    playerDetailsSection.style.display = "none";
    highScoresSection.style.display="none";

    // create title and choice variables for readability
    var questionTitle = questionsBank[index].title;
    var questionChoices = questionsBank[index].choices;


    // add the question bank title to the question container div
    // append for strings; appendChild for DOM elements
    questionSection.append(questionTitle);

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
        questionSection.appendChild(userOptionBtn);

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
        // setPlayerScore();
        // console.log("setting the score");
        addPlayerDetails();
    }

    // if user chose incorrect answer and there are still more questions, apply timer penalty
    else if (value === "false" && (index < questionsBank.length - 1)) {
    deductTime();
    index++;
        if (secondsLeft < 0) {
            secondsLeft = 0;
            timerElement.textContent = 0 + " s";
            // setPlayerScore();
            // console.log("setting the score");
            addPlayerDetails();
        } else {
            loadQuestions();
        }
    } 

    // if user chose correct answer AND index under question bank length, add index -- then, IF timer is under 0, go to high score section; otherwise load the next q
    else if (value === "true" && index < (questionsBank.length - 1)) {
        index++;
            if (secondsLeft < 0) {
                // setPlayerScore();
                // console.log("setting the score");
                addPlayerDetails();
            } else {
                loadQuestions();
            }
        }
}


// function setPlayerScore() {
//     localStorage.setItem("player", JSON.stringify(player));
// }

// function retrievePlayerScore() {
//     playerScore;
//     console.log("retrieving");
// }


function addPlayerDetails() {
    playerDetailsSection.innerHTML = "";

    welcomeMessage.style.display = "none";
    questionSection.style.display = "none";
    highScoresSection.style.display = "none";


    var titleTag = document.createElement("h2");
    titleTag.append("The quiz has ended!");

    var flavourText = document.createElement("p");
    flavourText.textContent = "Your score is: " + secondsLeft;

    var userForm = document.createElement("form");
    userForm.setAttribute("method", "post");

    var formLabel = document.createElement("label");
    formLabel.textContent = "Your name: ";

    var formInput = document.createElement("input");
    formInput.setAttribute("type", "text");
    formInput.setAttribute("name", "username");

    var submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Submit");

    userForm.appendChild(formLabel);
    userForm.appendChild(formInput);
    userForm.appendChild(submitBtn);

    playerDetailsSection.appendChild(titleTag);
    playerDetailsSection.appendChild(flavourText);
    playerDetailsSection.appendChild(userForm);


    // set the score
    
    
}

function showHighScores() {
    //code
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

// take off 10 seconds
function deductTime() {
    secondsLeft = secondsLeft - 10;
    timerElement.textContent = secondsLeft + " s";
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