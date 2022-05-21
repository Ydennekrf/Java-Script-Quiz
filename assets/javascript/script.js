 let highscore = document.querySelector("#highscore");
 let question = document.querySelector("#question");
 let questionContainer = document.querySelector(".questioncontainer");
 let answerContainer = document.querySelector(".answercontainer");
 let answer1 = document.querySelector(".answers");

  let startBtn = document.querySelector("#start");
 let timerEl = document.querySelector("#timer");
 let quizOver = document.querySelector(".quiz-over");

 //correct answer counter
 let score = 0;
 let finalScore = 0;
 let isFinish = false;
 let timer;
 let timeLeft;
 let questionIndex = 0;

let questions = [    
    {question: question.textContent = "this is question1",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctIndex: "2"},
    {question: question.textContent = "this is question2",
    answers: ["ANSWER1", "ANSWER2", "ANSWER3", "ANSWER4"],
    correctIndex: "3"},
    {question: question.textContent = "this is question3",
    answers: ["ANSWER1", "ANSWER2", "ANSWER3", "ANSWER4"],
    correctIndex: "1"} 
];


init = () => {
    getScore();
};

startGame = () => {
    isWin = false;
    timeLeft = 10;
    //disables start button to be hit during game play
    startBtn.disabled = true;
    //switches the question area and timer box from hidden to visable
    timerEl.setAttribute("style", "display: block;");
    questionContainer.setAttribute("style", "display: block;");
    // starts timer counting
    startTimer();
    // startQuestions();
};

startTimer = () => {
    timer = setInterval(function() {
        timeLeft--
        timerEl.textContent = "Remaining Time:"+ timeLeft;
        if (timeLeft >= 0) {
            //tests if quiz is complete
            if (isFinish && timeLeft > 0) {
                //stops timer and begins post quiz
                clearInterval(timer);
                // postQuiz();
            }
        }
        // tests if timer has run out
        if (timeLeft === 0) {
            //stops timer and game over
            clearInterval(timer);
            // postQuiz();
            gameOver();
        }
    }, 1000);
};

gameOver = () => {
    timerEl.setAttribute("style", "display: none;");
    questionContainer.setAttribute("style", "display: none;");
    quizOver.setAttribute("style", "display: block;");
    quizOver.textContent = "OUT OF TIME";
}

checkAnswer = (answerIndex) => {
    if (questions[0].correctIndex === answerIndex){
        console.log("correct")
        questionIndex++
        //next question, add score, add time
    } else {
        console.log("fail")
        questionIndex++
        //next question, minus time
    }
}

  //attach event listeners to start button, and answer buttons
  startBtn.addEventListener("click", startGame);
  answerContainer.addEventListener("click", function(event){
      let element = event.target;

      if (element.matches(".answers")){
          let answerIndex = element.dataset.index
          checkAnswer(answerIndex);
      }
  })