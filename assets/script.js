var startBtn = document.querySelector("#start-btn")
var quizScreen = document.querySelector("#quiz-screen")
var timerId;
startBtn.addEventListener("click", startGame)


var Q = 0;
var time = 10;


function startGame(){
var startScreen = document.getElementById("start-screen")
startScreen.setAttribute("class", "hide")
quizScreen.removeAttribute("class", "hide")
buildQuestion();


timerID = setInterval(runClock, 1000)
}

function buildQuestion(){
var questionEl = document.getElementById("question")
var answerbox = document.getElementById("answers")

questionEl.textContent = questionArray[Q].question;

answerbox.innerHTML = "";

questionArray[Q].choices.forEach(function(choice) {
    var button = document.createElement("button");
    button.setAttribute("value", choice)

    button.textContent = choice;

    button.onclick = selectAnswer;

    answerbox.appendChild(button)
})
}

function selectAnswer(){
console.log(this.value)

if(this.value !== questionArray[Q].answer) {
    console.log("wrong")
}else{
    console.log("wright")
}
Q++;
if(Q === questionArray.length) {
    endGame()
} else {
buildQuestion();
}
}

function endGame(){
    quizScreen.setAttribute("class", "hide")
    clearInterval(timerID)

}

function runClock(){
    time--;
    var timer = document.getElementById("timer")
    timer.textContent = time;

    console.log(time)
    if(time <= 0){
       endGame();
    }
}


var questionArray = [{
    question:"blahblahblah",
    choices:["a","b","c","d"],
    answer:"a"
},{
    question:"blahblahblah2222",
    choices:["a","b","c","d"],
    answer:"b"
}
]