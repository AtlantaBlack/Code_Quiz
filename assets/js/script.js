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



// for player names and scores
var playerName = localStorage.getItem("playerName");
var playerScore = localStorage.getItem("playerScore");


// timer variables
var secondsLeft = 4; // set 4 for testing


// functions



function loadQuestions() {
    // clear the area
    document.querySelector("#question-container").innerHTML = "";

    // hide the welcome message
    document.querySelector("#welcome-message").style.display = "none";

    var questionTitle = questionsBank[index].title;
    var questionChoices = questionsBank[index].choices;

    // add the question bank title to the question container div
    // append for strings; appendChild for DOM elements
    document.querySelector("#question-container").append(questionTitle);

    for (let i = 0; i < questionChoices.length; i++) {
        const button = document.createElement("button");
        button.textContent = questionChoices[i];

       document.querySelector("#question-container").appendChild(button);
    }



    // var questionsBox = document.createElement("div");
    // questionsBox.style.backgroundColor = "blue";
    


    // var questionsBoxContent = document.createTextNode("blah blah");

    // questionsBox.appendChild(questionsBoxContent);

    // quizBoxArea.appendChild(questionsBox);

}

// loadQuestions();

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
    const button = document.createElement("button");
    button.textContent = "next";
    button.addEventListener("click", () => {
        index++;
        loadQuestions();
        })
    quizBoxArea.appendChild(button);
}


// add event listeners:
startQuizButton.addEventListener("click", startQuiz);