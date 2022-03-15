

var linkToHighScores = document.getElementById("highscores");
var timerElement = document.getElementById("timer-span");
var quizBoxArea = document.getElementById("quiz-box");
var startQuizButton = document.getElementById("start-quiz-button");

var answerCheckArea = document.getElementById("answer-check-area")
var messageCorrect = document.getElementById("correct");
var messageIncorrect = document.getElementById("incorrect");

// set welcome msg and container variables
var welcomeMessage = document.getElementById("welcome-message");
var questionSection = document.getElementById("question-section");
var playerDetailsSection = document.getElementById("player-details-section")
var highScoresSection = document.getElementById("high-scores-section");


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

// timer variables
var secondsLeft = 60;


welcomeMessage.classList.remove("hide");
messageCorrect.classList.add("hide");
messageIncorrect.classList.add("hide");

// FUNCTIONS GO HERE

linkToHighScores.addEventListener("click", viewTheScores);

function viewTheScores() {
    showHighScores();
}

// add event listener:
startQuizButton.addEventListener("click", startQuiz);


function startQuiz () {
    startTimer();
    loadQuestions();
}


// timer function
function resetTimer() {
    secondsLeft = 60;
}

function startTimer() {
    var timer = setInterval(function() {
        console.log(secondsLeft);
        
        timerElement.textContent = secondsLeft;
        secondsLeft--;

        // if seconds reach 0, clear timer and set text to 0
        if (secondsLeft < 0) {
            clearInterval(timer);
            secondsLeft = 0;
            addPlayerDetails();
        
        // if index reaches the index of the last question in questionsBank array, clear the timer
        } else if (index === questionsBank.length - 1) {
            clearInterval(timer);
        }

    }, 1000);
}

// take off 10 seconds
function deductTime() {
    secondsLeft = secondsLeft - 10;
}


function loadQuestions() {
    //clear the question container box
    questionSection.innerHTML = "";

    // hide the welcome message, player details box, highscores box
    welcomeMessage.classList.add("hide");
    questionSection.classList.remove("hide");
    answerCheckArea.classList.remove("hide");
    playerDetailsSection.classList.add("hide");
    highScoresSection.classList.add("hide");

    // create title and choice variables for readability
    var questionTitle = questionsBank[index].title;
    var questionChoices = questionsBank[index].choices;

    // add the question bank title to the question container div
    // NB: append for strings; appendChild for DOM elements
    questionSection.append(questionTitle);

    // create a button for each choice
    for (let i = 0; i < questionChoices.length; i++) {
        var userOptionBtn = document.createElement("button");
        userOptionBtn.textContent = (i + 1) + ". " + questionChoices[i];

        // add a condition and data attribute to decide if an option is true or false, or at the end of the block of questions or not
        if (questionChoices[i] === questionsBank[index].answer) {
            userOptionBtn.setAttribute("data-value", "true");
        } else {
            userOptionBtn.setAttribute("data-value", "false");
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

    if (value === "true") {
        displayCorrect();
        index++;
            if (index === questionsBank.length) {
                addPlayerDetails();
            } else if (secondsLeft < 0) {
                secondsLeft = 0;
                addPlayerDetails();
            } else {
                loadQuestions();
            }
        }

    else if (value === "false") {
        displayIncorrect();
        deductTime();
        index++;
            if (index === questionsBank.length) {
                addPlayerDetails();
            } else if (secondsLeft < 0) {
                secondsLeft = 0;
                addPlayerDetails();
            } else {
                loadQuestions();
            }
    } 

}

function displayCorrect() {
    messageCorrect.classList.remove("hide");
    messageIncorrect.classList.add("hide");
}

function displayIncorrect() {
    messageCorrect.classList.add("hide");
    messageIncorrect.classList.remove("hide");
}


function addPlayerDetails() {
    playerDetailsSection.innerHTML = "";

    welcomeMessage.classList.add("hide");
    questionSection.classList.add("hide");
    answerCheckArea.classList.add("hide");
    playerDetailsSection.classList.remove("hide");
    highScoresSection.classList.add("hide");


    var pdsTitle = document.createElement("h2");
        pdsTitle.append("The quiz has ended!");
        playerDetailsSection.appendChild(pdsTitle);

    var flavourText = document.createElement("p");
        flavourText.textContent = "Your final score is " + secondsLeft;
        playerDetailsSection.appendChild(flavourText);

    // create the user form and set its attributes
    var userForm = document.createElement("form");
        userForm.setAttribute("method", "post");
    
    // create the form label and set its text content
    var formLabel = document.createElement("label");
        formLabel.textContent = "Your initials: ";

    // create the form input and set its attributes
    var formInput = document.createElement("input");
        formInput.setAttribute("type", "text");
        formInput.setAttribute("id", "player-initials-input");

    // create button for the form
    var submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("id", "submit");

    // append label, input, button to form; append form to DOM
    playerDetailsSection.appendChild(userForm);
        userForm.appendChild(formLabel);
        userForm.appendChild(formInput);
        userForm.appendChild(submitBtn);


    // add event listener to set the score
    userForm.addEventListener("submit", function(event) {
        event.preventDefault();

        setPlayerScore();
        showHighScores();
    })
}


function setPlayerScore() {
    var player = {
        playerInitials: document.getElementById("player-initials-input").value.trim(),
        playerScore: secondsLeft
    }

    if (!player.playerInitials) {
        player.playerInitials = "Player";
    }

    let highscores = JSON.parse(localStorage.getItem("Results"));
        if (highscores === null) {
            highscores = [];
        }
    
    highscores.push(player);

    localStorage.setItem("Results", JSON.stringify(highscores));
}


function retrievePlayerScore() {
    var data = JSON.parse(localStorage.getItem("Results"));

    console.log(data);

    var dataList = document.createElement("ul");
    dataList.style.listStyleType = "none";
    highScoresSection.appendChild(dataList);
  
    if (data) {
        for (i = 0; i < data.length; i++) {
        var dataListItems = document.createElement("li");
            dataListItems.textContent = "Name: " + data[i].playerInitials + " Score: " + data[i].playerScore;

            dataList.appendChild(dataListItems);
            }
    } else {
        var emptyDataList = document.createElement("li");
        emptyDataList.textContent = "Name: --" + " " + "Score: --";
        dataList.appendChild(emptyDataList);
    }
}


function showHighScores() {
    highScoresSection.innerHTML = "";

    welcomeMessage.classList.add("hide");
    questionSection.classList.add("hide");
    answerCheckArea.classList.add("hide");
    playerDetailsSection.classList.add("hide");
    highScoresSection.classList.remove("hide");

    var hssTitle = document.createElement("h2");
    hssTitle.textContent = "High Scores";

    highScoresSection.appendChild(hssTitle);

    retrievePlayerScore();

    // create button for returning to start of quiz
    var goBackBtn = document.createElement("button");
        goBackBtn.textContent = "Return To Start";
        goBackBtn.setAttribute("type", "button");
        goBackBtn.setAttribute("id", "back-to-main");

    highScoresSection.appendChild(goBackBtn);

    goBackBtn.addEventListener("click", returnToStart);

    // creating button to clear the scores
    var clearScoresBtn = document.createElement("button");
        clearScoresBtn.textContent = "Clear Scores";
        clearScoresBtn.setAttribute("type", "button");
        clearScoresBtn.setAttribute("id", "clear-scores");

    highScoresSection.appendChild(clearScoresBtn);

    clearScoresBtn.addEventListener("click", clearTheScores);
}


function returnToStart() {
    welcomeMessage.classList.remove("hide");
    questionSection.classList.add("hide");
    answerCheckArea.classList.add("hide");
    playerDetailsSection.classList.add("hide");
    highScoresSection.classList.add("hide");

    index = 0;
    resetTimer();
}


// function to clear the high scores
function clearTheScores() {
    window.localStorage.clear();
    showHighScores();
}


