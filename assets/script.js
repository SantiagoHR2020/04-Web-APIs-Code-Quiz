// Global Variables

var startBtn = document.querySelector("#start-btn");
var quizScreen = document.querySelector("#quiz-screen");
var results = document.querySelector("#results");
var submitBtn = document.querySelector("#submit-btn");
var scoreBoard = document.querySelector("#scoreBoard");
var initialForm = document.querySelector("#initialForm");
var initialF = document.querySelector("#initial");
var scoreboardDisplay = document.querySelector("#scoreboardDisplay");
var restartBtn = document.querySelector("#restart-btn");
var startScreen = document.querySelector("#start-screen");

var timerId;
var Q = 0;
var time = 25;
var score = 0;
var highScore = [];

// Event Listeners

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", storeInitial);
restartBtn.addEventListener("click", restart);

// Function to start the quiz

function startGame() {
  startScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  buildQuestion();

  timerID = setInterval(runClock, 1000);
}

// Function to build the questions

function buildQuestion() {
  var questionEl = document.getElementById("question");
  var answerbox = document.getElementById("answers");

  questionEl.textContent = questionArray[Q].question;

  answerbox.innerHTML = "";

  questionArray[Q].choices.forEach(function (choice) {
    var button = document.createElement("button");
    button.setAttribute("value", choice);

    button.textContent = choice;
    button.setAttribute("class", "btn");

    button.onclick = selectAnswer;

    answerbox.appendChild(button);
  });
}

// Function to check for the correct answer

function selectAnswer() {
  console.log(this.value);

  if (this.value !== questionArray[Q].answer) {
    console.log("wrong");
    time -= 10;
    this.classList.add("wrong");

    console.log(this);
  } else {
    this.classList.add("correct");
    console.log("right");
    time += 10;
    score++;
  }
  Q++;
  if (Q === questionArray.length) {
    setTimeout(endGame, 500);
  } else {
    setTimeout(buildQuestion, 500);
  }
}

// Function to end the quiz

function endGame() {
  quizScreen.setAttribute("class", "hide");
  clearInterval(timerID);
  results.classList.remove("hide");
}

// Timer Function

function runClock() {
  time--;
  var timer = document.getElementById("timer");
  timer.textContent = time;

  console.log(time);
  if (time <= 0) {
    setTimeout(endGame, 500);
  }
}

// function to create and store the high score

function storeInitial(e) {
  e.preventDefault();
  var initialSt = initialF.value.trim();
  console.log(initialSt);
  console.log(score);

  var initOb = { initialSt, score };
  console.log(initOb);
  highScore.push(initOb);

  highScore.sort((a, b) => {
    return b.score - a.score;
  })

  localStorage.setItem("initOb", JSON.stringify(highScore));
  highScore = JSON.parse(localStorage.getItem("initOb"));


  var output = "";
  for (var i = 0; i < highScore.length; i++) {
    output += highScore[i].initialSt + " " + highScore[i].score + "<br>";
  }
  scoreboardDisplay.innerHTML = output;

  scoreBoard.classList.remove("hide");
  initialForm.classList.add("hide");
}

//Function restart the quiz

function restart() {
  Q = 0;
  time = 25;
  score = 0;
  scoreBoard.classList.add("hide");
  initialForm.classList.remove("hide");
  results.classList.add("hide");
  startScreen.classList.remove("hide");
  initialForm.classList.remove("hide");
}

// array of objects the question and answers

var questionArray = [
  {
    question: "Is it possible to nest functions in JavaScript? ",
    choices: ["True", "False"],
    answer: "True",
  },
  {
    question: "Which of the following is true? ",
    choices: [
      "If onKeyDown returns false, the key-press event is cancelled.",
      "If onKeyPress returns false, the key-down event is cancelled.",
      " If onKeyDown returns false, the key-up event is cancelled.",
      "If onKeyPress returns false, the key-up event is canceled.",
    ],
    answer: "If onKeyDown returns false, the key-press event is cancelled.",
  },
  {
    question: "Scripting language are",
    choices: [
      "High Level Programming language",
      "Assembly Level programming language",
      "Machine level programming language",
    ],
    answer: "High Level Programming language",
  },
  {
    question: "Which best explains getSelection()?",
    choices: [
      "Returns the VALUE of a selected OPTION.",
      "Returns document.URL of the window in focus.",
      "Returns the value of cursor-selected text",
      "Returns the VALUE of a checked radio input.",
    ],
    answer: "Returns the value of cursor-selected text",
  },
  {
    question: "Are java and javascript the same?",
    choices: ["NO", "YES"],
    answer: "NO",
  },
];
