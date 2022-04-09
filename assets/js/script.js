// GLOBAL VARIABLES // 

// grab variables from HTML 
var timerElement = document.getElementById("timer-span");
var quizBoxArea = document.getElementById("quiz-box");
var linkToHighScores = document.getElementById("highscores");
var resetQuizButton = document.getElementById("reset-quiz-button");
var startQuizButton = document.getElementById("start-quiz-button");

// grab the variables for quiz box section
var welcomeMessage = document.getElementById("welcome-message");
var questionSection = document.getElementById("question-section");
var playerDetailsSection = document.getElementById("player-details-section")
var highScoresSection = document.getElementById("high-scores-section");

// grab the variables for answer check section
var answerCheckArea = document.getElementById("answer-check-area")
var messageCorrect = document.getElementById("correct");
var messageIncorrect = document.getElementById("incorrect");

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
        title: "To store groups of data in a single variable, we use ____.",
        choices: ["Arrays", "Variables", "Booleans", "Strings"],
        answer: "Arrays"
    },
    {   // javascript - variables
        title: "How are variables assigned?",
        choices: ["let", "var", "const", "All of the above"],
        answer: "All of the above"
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

// set the variable to use for showing and hiding different sections
var steps = {
    "welcome": welcomeMessage,
    "quizsection": questionSection,
    "playerdetails": playerDetailsSection,
    "scoresection": highScoresSection
}

// timer variables
var secondsLeft;
var timer;


// FUNCTIONS

// to determine what section to show or hide when cycling through each quiz box section
function showSteps(name) {
    for (key in steps) {
        var selected = steps[key];
        if (key === name) {
            selected.classList.remove("hide");
        } else {
            selected.classList.add("hide");
        }
    }
}

// timer functions

// main timer function that counts the seconds down
function startTimer() {
    timer = setInterval(function () {
        secondsLeft--;

        // show timer as seconds remaining on the clock
        if (secondsLeft >= 0) {
            timerElement.textContent = secondsLeft;
        }

        // if seconds reach 0, clear timer and set text to 0
        if (secondsLeft <= 0) {
            clearInterval(timer);
            secondsLeft = 0;
            timerElement.textContent = secondsLeft;
            addPlayerDetails();
        }

    }, 1000);
}

// take off 5 seconds for an incorrect answer
function deductTime() {
    secondsLeft = secondsLeft - 5;
    if (secondsLeft <= 0) {
        secondsLeft = 0;
    }
}

// stop the timer
function stopTimer() {
    if (timer) {
    clearInterval(timer);
    }
}

// set seconds back to original value
function resetTimer() {
    secondsLeft = 60;
}

// answer check functions

// fade-out effect for 'correct' and 'incorrect' notificiations
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

// delay the fade effect so people can read the text before it fades out
function answerDisplay() {
    setTimeout(fadeOutEffect, 800);
}

// display message functions: hide and unhide the relevant divs for 'correct' or 'incorrect'; reset the fade delay
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

// load the main quiz
function loadQuestions() {
    // disallow reset quiz button to work while quiz is in progress
    disableReset();
    // clear the section
    questionSection.innerHTML = "";
    
    // show quiz box area and hide all other sections
    showSteps("quizsection");

    // if you wish to turn the reset button invisible while the quiz is running, uncomment the following line of code to hide the button from view

    // resetQuizButton.classList.add("invisible");

    // create title and choice variables for readability
    var questionTitle = questionsBank[index].title;
    var questionChoices = questionsBank[index].choices;

    // add the question bank title to the question container div
    // NB: append for strings; appendChild for DOM elements
    questionSection.append(questionTitle);

    // create area for buttons to reside (for styling)
    var buttonArea = document.createElement("div");
    buttonArea.setAttribute("id", "button-area");
    questionSection.appendChild(buttonArea);

    // create a button for each choice
    for (let i = 0; i < questionChoices.length; i++) {
        var userOptionBtn = document.createElement("button");
        userOptionBtn.textContent = (i + 1) + ". " + questionChoices[i];
        userOptionBtn.setAttribute("id", "user-option-button");
        userOptionBtn.setAttribute("style", "text-align:left;");

        // add data attributes to decide if option is true or false
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
    
}

// check values of selected answer to determine if right or wrong
function checkAnswers(event) {
    // grab btn data attributes set in loadQuestions function
    var value = event.currentTarget.dataset.value;
    answerCheckArea.classList.remove("hide");

    // if user clicks right answer: display 'correct!' message and advance index by 1
    if (value === "true") {
        displayCorrect();
        index++;
        // if index reaches max questionsBank length---NOT THE SAME AS REACHING THE LAST QUESTION---stop timer and go to next section; otherwise load the questions again
        if (index === questionsBank.length) {
            stopTimer();
            //enable reset button before going to next section
            enableReset();
            addPlayerDetails();
        } else {
            loadQuestions();
        }
    // if user clicks wrong answer, display 'incorrect! message and advance index by 1
    } else if (value === "false") {
        displayIncorrect();
        deductTime();
        index++;
        // the rest of the conditions are the same as above
        if (index === questionsBank.length) {
            stopTimer();
            enableReset();
            addPlayerDetails();
        } else {
            loadQuestions();
        }
    }

    // reset answerCheckArea opacity to 1 to ready fadeout effect for next button click
    answerCheckArea.style.opacity = 1;
}

// input details function

// place for players to submit their name to the scoreboard
function addPlayerDetails() {
    // clear the area
    playerDetailsSection.innerHTML = "";
    
    // show player-details-section and hide all other sections
    showSteps("playerdetails");

    // update timer display so it accurately shows the seconds left
    timerElement.textContent = secondsLeft;

    // if you had the reset quiz button invisible durin quiz, uncomment the following line of code to display the button on screen again

    // resetQuizButton.classList.remove("invisible");

    // create heading and append to DOM
    var pdsTitle = document.createElement("h2");
    pdsTitle.classList.add("fancy", "italicised");
    pdsTitle.append("You finished the quiz!");
    playerDetailsSection.appendChild(pdsTitle);

    // list the final score and append to DOM
    var finalScoreText = document.createElement("p");
    finalScoreText.textContent = "Your final score is " + secondsLeft + ".";
    playerDetailsSection.appendChild(finalScoreText);

    // add some congratulatory message and append to DOM
    var flavourText = document.createElement("p");
    flavourText.textContent = "Well done! We hope you enjoyed the quiz and learnt a thing or two about Javascript.";
    playerDetailsSection.appendChild(flavourText);

    // add a heading and append to DOM
    var inputDetailsTitle = document.createElement("h3");
    inputDetailsTitle.textContent = "Now, let's add you to the high scores."
    playerDetailsSection.appendChild(inputDetailsTitle);

    // create div to contain elements of the user input form
    var formArea = document.createElement("div");
    formArea.setAttribute("id", "user-form-area");

    // create the user form and set its attributes
    var userForm = document.createElement("form");
    userForm.setAttribute("id", "user-form");
    userForm.setAttribute("method", "post");

    // create the form label and set its text content
    var formLabel = document.createElement("label");
    formLabel.setAttribute("for", "player-initials");
    formLabel.textContent = "Your initials:";

    // create the form input and set its attributes
    var formInput = document.createElement("input");
    formLabel.setAttribute("for", "player-initials");
    formInput.setAttribute("type", "text");
    formInput.setAttribute("id", "player-initials-input");

    // create button for the form
    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "submit-button");

    // append label, input, button to form; append form to form area (for styling); append formArea to DOM
    playerDetailsSection.appendChild(formArea);
    formArea.appendChild(userForm);
    userForm.appendChild(formLabel);
    userForm.appendChild(formInput);
    userForm.appendChild(submitBtn);

    // add event listener to set the score
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // set the score and then show the scoreboard
        setPlayerScore();
        showHighScores();
    })

}

// local storage functions

// set the player data to local storage
function setPlayerScore() {
    // make an object for player name and player score
    var player = {
        playerInitials: document.getElementById("player-initials-input").value.trim(),
        playerScore: secondsLeft
    }
    // if user doesn't input text, give them the name 'Player'
    if (!player.playerInitials) {
        player.playerInitials = "Player";
    }

    // first retrieve results from local storage
    let highscores = JSON.parse(localStorage.getItem("Results"));
    // but if there are no results, create an empty array (this will be filled with scores)
    if (highscores === null) {
        highscores = [];
    }

    // add object 'player' to the empty high scores array
    highscores.push(player);
    // put the player score into local storage
    localStorage.setItem("Results", JSON.stringify(highscores));
}

// retrieve player data from local storage
function retrievePlayerScore() {
    // retrieve results from local storage
    var data = JSON.parse(localStorage.getItem("Results"));

    // create ordered list to hold the scores
    var dataList = document.createElement("ol");
    dataList.setAttribute("id", "data-list");
    highScoresSection.appendChild(dataList);

    // if there is data from local storage
    if (data) {
        // sort in descending order from highest score to lowest
        data.sort(function(a, b) {
            return parseFloat(b.playerScore) - parseFloat(a.playerScore);
        })
        // then, create list item for each array in the object
        for (i = 0; i < data.length; i++) {
            var dataListItems = document.createElement("li");
            dataListItems.textContent = data[i].playerInitials + " — " + data[i].playerScore;
            // add list item to the list
            dataList.appendChild(dataListItems);
        }
    // if there is no data recordered
    } else {
        // create a single list item with text saying no scores
        var emptyDataList = document.createElement("li");
        emptyDataList.textContent = "No scores here!";
        // add empty score message to the list
        dataList.appendChild(emptyDataList);
    }
}

// show the high scores page
function showHighScores() {
    enableReset();
    // clear the section
    highScoresSection.innerHTML = "";

    // show scores section and hide all others
    showSteps("scoresection");

    // create the heading and append to document
    var hssTitle = document.createElement("h2");
    hssTitle.textContent = "High Scores"
    highScoresSection.appendChild(hssTitle);

    // collect player info
    retrievePlayerScore();

    // make a container for the go-back and clear score buttons
    var utilityButtonArea = document.createElement("div");
    utilityButtonArea.setAttribute("id", "utility-button-area");
    highScoresSection.appendChild(utilityButtonArea);

    // create button for returning to welcome message
    var goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Back To Start";
    goBackBtn.setAttribute("type", "button");
    goBackBtn.setAttribute("id", "back-to-main");
    // add button to DOM
    utilityButtonArea.appendChild(goBackBtn);
    // give button event listener
    goBackBtn.addEventListener("click", hardReset);

    // creating button to clear the scores
    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.textContent = "Clear Scores";
    clearScoresBtn.setAttribute("type", "button");
    clearScoresBtn.setAttribute("id", "clear-scores");
    // add button to DOM
    utilityButtonArea.appendChild(clearScoresBtn);
    // give button event listening to clear the high scores
    clearScoresBtn.addEventListener("click", clearTheScores);
}

// utility functions below

// disable click on reset quiz button
function disableReset() {
    resetQuizButton.disabled = true;
    resetQuizButton.style.textDecoration = "line-through";
}

// enable click on reset quiz button
function enableReset() {
    resetQuizButton.disabled = false;
    resetQuizButton.style.textDecoration = "none";
}

// when user presses reset quiz: 
// (1) stop and restart timer; (2) return to the welcome page; (3) reset timer countdown to show full seconds left
function hardReset() {
    stopTimer();
    resetTimer();
    returnToStart();
    timerElement.textContent = secondsLeft;
}

// return to welcome page (index resets to 0)
function returnToStart() {
    showSteps("welcome");
    index = 0;
}

// show scoreboard
function viewTheScores() {
    stopTimer();
    showHighScores();
}

// clear the scoreboard
function clearTheScores() {
    window.localStorage.clear();
    showHighScores();
}

// start the quiz
function startQuiz() {
    resetTimer();
    timerElement.textContent = secondsLeft;
    startTimer();
    disableReset();
    loadQuestions();
}

// initiate the page
function initiate() {
    showSteps("welcome");
    answerCheckArea.classList.add("hide");
}


// EVENT LISTENERS

// event listener button for viewing high scores
linkToHighScores.addEventListener("click", viewTheScores);
// button to reset the quiz
resetQuizButton.addEventListener("click", hardReset);
// button to start the quiz
startQuizButton.addEventListener("click", startQuiz);


// start the whole thing
initiate();
