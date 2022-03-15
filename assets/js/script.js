

var linkToHighScores = document.getElementById("highscores");
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


// questions and answers:
// dummy questions/answers for testing first
var questionsBank = [
    {
        title: "jsdlfkjs",
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


// screen index
var screenIndex = [ 
    {welcomeMessage}, 
    {questionSection},
    {playerDetailsSection},
    {highScoresSection}
]



// functions


function loadQuestions() {
    //clear the question container box
    questionSection.innerHTML = "";

    // hide the welcome message, player details box, highscores box
    welcomeMessage.classList.add("hide");
    questionSection.classList.remove("hide");
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
  

    // first, if index's added total matches the number of the last question's index, then "is at the end (of the question block)" becomes true
    if (index === (questionsBank.length - 1)) {
        clearInterval(timer);
        addPlayerDetails();
    }

    // if user chose correct answer AND index under question bank length, add index -- then, IF timer is under 0, go to high score section; otherwise load the next q
    else if (value === "true" && index < (questionsBank.length - 1)) {
        index++;
            if (secondsLeft < 0) {
                secondsLeft = 0;
                addPlayerDetails();
            } else {
                loadQuestions();
            }
        }

    // if user chose incorrect answer and there are still more questions, apply timer penalty
    else if (value === "false" && (index < questionsBank.length - 1)) {
        deductTime();
        index++;
            if (secondsLeft < 0) {
                secondsLeft = 0;
                timerElement.textContent = 0;
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
        submitBtn.textContent = "submit";
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
    
    // change the second line to a for- or for-each loop to extract data out of the new Results array
    // data.forEach(function (item, index) {
    //     var showData = document.createElement("li");
    //     showData.textContent = item[i];
    // });

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

    welcomeMessage.style.display = "none";
    questionSection.style.display = "none";
    playerDetailsSection.style.display = "none";
    highScoresSection.style.display = "block";

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

function returnToStart(event) {
    
}

// function to clear the high scores
function clearTheScores() {
    window.localStorage.clear();
    showHighScores();
}


// timer function
function startTimer() {
    // to prevent a delay in the timer: set a function outside of setInterval
    
    var timer = setInterval(function() {
        console.log(secondsLeft);
        timerElement.textContent = secondsLeft;
        secondsLeft--;

        // if seconds reach 0, clear timer and set text to 0
        if (secondsLeft < 0) {
            clearInterval(timer);
            secondsLeft = 0;
            timerElement.textContent = 0;
            addPlayerDetails();
        
        // if index reaches the index of the last question, clear the timer
        } else if (index === questionsBank.length - 1) {
            clearInterval(timer);
            addPlayerDetails();
        }

    }, 1000);
}

// take off 10 seconds
function deductTime() {
    secondsLeft = secondsLeft - 10;
}


function startQuiz () {
    secondsLeft = 20;
    startTimer();
    loadQuestions();

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