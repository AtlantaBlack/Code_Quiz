var linkToHighScores = document.getElementById("highscores");
var timerElement = document.getElementById("timer-span");
var resetQuizButton = document.getElementById("reset-quiz-button");
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
var questionsBank = [
    {   // javascript - primitive types
        title: "Which of the following are primitive data types?",
        choices: ["Strings", "Number", "Undefined", "All of the above"],
        answer: "All of the above"
    },
    {   // javascript - logical comparison operators
        title: "What does the strict equality comparison operator (===) compare?",
        choices: ["Value only", "Value and type", "Type only", "Numbers only"],
        answer: "Value and type"
    },
    {   // javascript - arrays
        title: "To store groups of data in a single variable, we use ____?",
        choices: ["Arrays", "Variables", "Booleans", "Strings"],
        answer: "Arrays"
    },
    {   // javascript - variables
        title: "How are variables assigned?",
        choices: ["let", "var", "const", "All of the above"],
        answer: "Arrays"
    },
    {   // javascript - conditional statements
        title: "What are if/else statements known as?",
        choices: ["Objects", "Primitive data types", "Conditional statements", "Logical comparison operators"],
        answer: "Conditional statements"
    },
    {   // javascript - booleans
        title: "What values do Booleans return?",
        choices: ["Right and Wrong", "True and Wrong", "False and True", "Right and False"],
        answer: "False and True"
    },
    {   // javascript - iteration methods
        title: "forEach() is a type of ____ method for arrays.",
        choices: ["Mutator", "Iteration", "Accessor", "Concatenation"],
        answer: "Iteration"
    }
];

// timer variables
var secondsLeft;

var steps = {
    "welcome": welcomeMessage,
    "quizsection": questionSection,
    // "answercheck": answerCheckArea,
    "playerdetails": playerDetailsSection,
    "scoresection": highScoresSection
}


// FUNCTIONS GO HERE


function initiate() {
    showSteps("welcome");
    answerCheckArea.classList.add("hide");
}

function showSteps(name) {
    for (key in steps) {
        var selected = steps[key];
        if (key === name) {
            selected.classList.remove("hide");
            console.log("showing " + key)
        } else {
            selected.classList.add("hide");
            selected.classList.remove("show");
            console.log("hiding " + key);
        }
    }
}


function viewTheScores() {
    showHighScores();
}


function startQuiz() {
    resetTimer();
    timerElement.textContent = secondsLeft;
    startTimer();
    loadQuestions();
}


// timer function
function resetTimer() {
    secondsLeft = 60;
}

function startTimer() {
    var timer = setInterval(function () {
        console.log(secondsLeft);
        secondsLeft--;

        if (secondsLeft >= 0) {
            timerElement.textContent = secondsLeft;
        }

        // if seconds reach 0, clear timer and set text to 0
        if (secondsLeft <= 0) {
            clearInterval(timer);
            secondsLeft = 0;
            timerElement.textContent = secondsLeft;
            addPlayerDetails();

            // if index reaches the index of the last question in questionsBank array, clear the timer
        } else if (index === questionsBank.length) {
            clearInterval(timer);
            timerElement.textContent = secondsLeft;
        }

    }, 1000);
}

// take off 10 seconds
function deductTime() {
    secondsLeft = secondsLeft - 5;
    if (secondsLeft <= 0) {
        secondsLeft = 0;
    }
}


function fadeOutEffect() {
    let fadeTarget = answerCheckArea;

    let fadeEffect = setInterval(function() {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }

        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 35);
}

function answerDisplay() {
    setTimeout(fadeOutEffect, 800);
}

function displayCorrect() {
    messageCorrect.classList.remove("hide");
    messageIncorrect.classList.add("hide");
    answerDisplay();
}

function displayIncorrect() {
    messageCorrect.classList.add("hide");
    messageIncorrect.classList.remove("hide");
    answerDisplay();
}


function loadQuestions() {
    //clear the question container box
    questionSection.innerHTML = "";

    questionSection.style.fontWeight = "bold";

    showSteps("quizsection");

    // create title and choice variables for readability
    var questionTitle = questionsBank[index].title;
    var questionChoices = questionsBank[index].choices;

    // add the question bank title to the question container div
    // NB: append for strings; appendChild for DOM elements
    questionSection.append(questionTitle);


    var buttonArea = document.createElement("div");
    buttonArea.setAttribute("id", "button-area");
    questionSection.appendChild(buttonArea);


    // create a button for each choice
    for (let i = 0; i < questionChoices.length; i++) {
        var userOptionBtn = document.createElement("button");
        userOptionBtn.textContent = (i + 1) + ". " + questionChoices[i];
        userOptionBtn.setAttribute("id", "user-option-button");
        userOptionBtn.setAttribute("style", "text-align:left;");

        // add a condition and data attribute to decide if an option is true or false, or at the end of the block of questions or not
        if (questionChoices[i] === questionsBank[index].answer) {
            userOptionBtn.setAttribute("data-value", "true");
        } else {
            userOptionBtn.setAttribute("data-value", "false");
        }

        // add the button to the div container
        buttonArea.appendChild(userOptionBtn);

        // when user option is clicked, check the answers
        userOptionBtn.addEventListener("click", checkAnswers);
    }

    resetQuizButton.addEventListener("click", function() {
        resetTimer();
        return;
    })
}

// check values of the click event to determine if answer is right or wrong
function checkAnswers(event) {
    // grab btn data attributes set in loadQuestions function
    var value = event.currentTarget.dataset.value;
    answerCheckArea.classList.remove("hide");


    if (value === "true") {
        displayCorrect();
        index++;
        if (index === questionsBank.length) {
            addPlayerDetails();
        } else {
            loadQuestions();
        }
    } else if (value === "false") {
        displayIncorrect();
        deductTime();
        index++;
        if (index === questionsBank.length) {
            addPlayerDetails();
        } else {
            loadQuestions();
        }
    }

    // reset answerCheckArea opacity to 1, ready for next button click
    answerCheckArea.style.opacity = 1;
}



function addPlayerDetails() {
    playerDetailsSection.innerHTML = "";
    timerElement.textContent = secondsLeft;

    showSteps("playerdetails");

    var pdsTitle = document.createElement("h2");
    pdsTitle.append("The quiz has ended!");
    playerDetailsSection.appendChild(pdsTitle);

    var finalScoreText = document.createElement("p");
    finalScoreText.textContent = "Your final score is " + secondsLeft + ".";
    playerDetailsSection.appendChild(finalScoreText);

    var flavourText = document.createElement("p");
    flavourText.textContent = "Well done! We hope you enjoyed the quiz and learnt a thing or two about Javascript.";
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
    userForm.addEventListener("submit", function (event) {
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

    showSteps("scoresection");

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
    showSteps("welcome");
    index = 0;
}

function end() {
    return;
}

// function to clear the high scores
function clearTheScores() {
    window.localStorage.clear();
    showHighScores();
}


linkToHighScores.addEventListener("click", viewTheScores);

resetQuizButton.addEventListener("click", returnToStart);

startQuizButton.addEventListener("click", startQuiz);

initiate();