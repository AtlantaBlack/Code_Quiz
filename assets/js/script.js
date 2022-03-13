

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



// functions

function loadQuestions() {
    //clear the question container box
    questionSection.innerHTML = "";

    // hide the welcome message, player details box, highscores box
    welcomeMessage.style.display = "none";
    questionSection.style.display = "block";
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
            userOptionBtn.setAttribute("data-end", "false");
        } else {
            userOptionBtn.setAttribute("data-value", "false");
            userOptionBtn.setAttribute("data-end", "false");
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
    var isAtEnd = event.currentTarget.dataset.end;

    // first, if index's added total matches the number of the last question's index, then "is at the end (of the question block)" becomes true
    if (index === (questionsBank.length - 1)) {
        isAtEnd = "true";
        clearInterval(timer);
        addPlayerDetails();
    }

    // if user chose incorrect answer and there are still more questions, apply timer penalty
    else if (value === "false" && (index < questionsBank.length - 1)) {
    deductTime();
    index++;
        if (secondsLeft < 0) {
            secondsLeft = 0;
            timerElement.textContent = 0 + " s";
            addPlayerDetails();
        } else {
            loadQuestions();
        }
    } 

    // if user chose correct answer AND index under question bank length, add index -- then, IF timer is under 0, go to high score section; otherwise load the next q
    else if (value === "true" && index < (questionsBank.length - 1)) {
        index++;
            if (secondsLeft < 0) {
                addPlayerDetails();
            } else {
                loadQuestions();
            }
        }
}


function addPlayerDetails() {

    playerDetailsSection.innerHTML = "";

    // welcomeMessage.style.display = "none";
    questionSection.style.display = "none";
    playerDetailsSection.style.display = "block";
    // highScoresSection.style.display="none";


    var pdsTitle = document.createElement("h2");
    pdsTitle.append("The quiz has ended!");
    playerDetailsSection.appendChild(pdsTitle);

    var flavourText = document.createElement("p");
    flavourText.textContent = "Your score is: " + secondsLeft;
    playerDetailsSection.appendChild(flavourText);


    var formLabel = document.createElement("label");
    formLabel.textContent = "Your initials: ";
    playerDetailsSection.appendChild(formLabel);

    var formInput = document.createElement("input");
    formInput.setAttribute("type", "text");
    formInput.setAttribute("id", "playerInitialsInput");
    playerDetailsSection.appendChild(formInput);
    

    var submitBtn = document.createElement("button");
    submitBtn.textContent = "submit";
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "Submit");
    playerDetailsSection.appendChild(submitBtn);

    // setting the score

    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();

        setPlayerScore();
        showHighScores();
    })
}

function setPlayerScore() {
    var player = {
        playerInitials: document.getElementById("playerInitialsInput").value.trim(),
        playerScore: secondsLeft
    }

    localStorage.setItem("Results", JSON.stringify(player));

}


function retrievePlayerScore() {
    // variable, for loop, append
    var data = JSON.parse(localStorage.getItem("Results"));
    

    var showData = document.createElement("li");
    showData.textContent = data.playerInitials + " " + data.playerScore;


    highScoresSection.appendChild(showData)

}


function showHighScores() {
    highScoresSection.innerHTML = "";

    welcomeMessage.style.display = "none";
    questionSection.style.display = "none";
    playerDetailsSection.style.display = "none";
    highScoresSection.style.display = "block";

    var hssTitle = document.createElement("h2");
    hssTitle.textContent = "High Scores";
    
    highScoresSection.appendChild(hssTitle);

    retrievePlayerScore();

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
            addPlayerDetails();
        
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