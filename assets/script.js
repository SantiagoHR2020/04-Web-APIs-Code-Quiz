var startBtn = document.querySelector("#start-btn");
var quizScreen = document.querySelector("#quiz-screen");
var results = document.querySelector("#results");
var submitBtn = document.querySelector("#submit-btn");
var scoreBoard = document.querySelector("#scoreBoard");
var initialForm = document.querySelector("#initialForm");

var timerId;
var Q = 0;
var time = 25;
var score =0;


startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", storeInitial);


function startGame() {
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");
  quizScreen.removeAttribute("class", "hide");
  buildQuestion();

  timerID = setInterval(runClock, 1000);
}

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

function selectAnswer() {
  console.log(this.value);

  if (this.value !== questionArray[Q].answer) {
    console.log("wrong");
    time -= 4;
    this.classList.add("wrong");

    console.log(this);
  } else {
    this.classList.add("correct");
    console.log("right");
    time += 4;
    score++
  }
  Q++;
  if (Q === questionArray.length) {
    setTimeout(endGame, 500);
  } else {
    setTimeout(buildQuestion, 500);
  }
}

function endGame() {
  quizScreen.setAttribute("class", "hide");
  clearInterval(timerID);
  results.classList.remove("hide");
}

function runClock() {
  time--;
  var timer = document.getElementById("timer");
  timer.textContent = time;

  console.log(time);
  if (time <= 0) {
    setTimeout(endGame, 500);
  }
}

function storeInitial(e){
  e.preventDefault();
  scoreBoard.classList.remove("hide");
  initialForm.classList.add("hide");
}

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
