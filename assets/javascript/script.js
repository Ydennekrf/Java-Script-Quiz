 let highscoreEl = document.querySelector("#highscore");
 let questionEl = document.querySelector("#question");
 let questionContainer = document.querySelector(".questioncontainer");
 let answerContainer = document.querySelector(".answercontainer");
 let answersEl = document.querySelector(".answers");
 let answer1 = document.querySelector("#answer1");
 let answer2 = document.querySelector("#answer2");
 let answer3 = document.querySelector("#answer3");
 let answer4 = document.querySelector("#answer4");
 let resetbtn = document.querySelector("#reset");
 let startBtn = document.querySelector("#start");
 let timerEl = document.querySelector("#timer");
 let quizOver = document.querySelector(".quiz-over");

 //correct answer counter
 let score = 0;
 let isFinish = false;
 let timer;
 let timeLeft= 0;
 let questionIndex = 0;
 let userName = "";

 highScoreOBJ = (name, score) => {
    this.name = name;
    this.score = score;
 }


 scoreBoard = () => {
    highScoreOBJ.push(`${userName} : ${score+timeLeft}`);
    document.createElement('li');
    

    //ensures the highscore list is in order and only 10 items long
    if (highScoreOBJ.length === 11) {
        highScoreOBJ.sort().reverse().pop();
        } else {
            highScoreOBJ.sort().reverse();
        }

        highscoreEl.textContent = highScoreOBJ
        console.log(highScoreOBJ)
   }
 



let questions = [    
    {question: "this is question1",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    answerIndex: "2"},
    {question: "this is question2",
    answers: ["ANSWER1", "ANSWER2", "ANSWER3", "ANSWER4"],
    answerIndex: "3"},
    {question: "this is question3",
    answers: ["ANSWER1", "ANSWER2", "ANSWER3", "ANSWER4"],
    answerIndex: "1"} 
];
console.log(questions[0].answers[0]);

init = () => {
    getScore();
};

startGame = () => {
    timeLeft = 10;
    //disables start button to be hit during game play
    startBtn.disabled = true;
    startBtn.setAttribute("style","background-color: #d538749f")
    //switches the question area and timer box from hidden to visable
    timerEl.setAttribute("style", "display: block;");
    questionContainer.setAttribute("style", "display: block;");
    // starts timer counting
    startTimer();
    startQuestions();
};

startQuestions = () => {
    if (questionIndex<questions.length) {
        console.log(questions[questionIndex.answerIndex])
        question.textContent = questions[questionIndex].question;
        answer1.textContent = questions[questionIndex].answers[0];
        answer2.textContent = questions[questionIndex].answers[1];
        answer3.textContent = questions[questionIndex].answers[2];
        answer4.textContent = questions[questionIndex].answers[3];
    } else {
        isFinish = true;
    }
}

startTimer = () => {
    timer = setInterval(function() {
        timeLeft--
        timerEl.textContent = "Remaining Time:"+ timeLeft;
        // tests if timer has run out
        if (timeLeft <= 0) {
            //stops timer and game over
            clearInterval(timer);
             gameOver();
        } 
        if (timeLeft >= 0) {
            //tests if quiz is complete
            if (isFinish && timeLeft > 0) {
                //stops timer and begins post quiz
                clearInterval(timer);
                timerEl.setAttribute("style", "display: none;");
                questionContainer.setAttribute("style", "display: none;");
                userName = prompt("enter your initials");
                quizOver.setAttribute("style", "display: block;");
                quizOver.textContent = "Good Job!  " + userName + "\nyour score was : " + (score + timeLeft);
                //push userName and score into an obj array from here
                scoreBoard();               
                //maybe do my check if high score here.
            }
        }
        
      
    }, 1000);
};

gameOver = () => {
    timerEl.setAttribute("style", "display: none;");
    questionContainer.setAttribute("style", "display: none;");
    quizOver.setAttribute("style", "display: block;");
    quizOver.textContent = "OUT OF TIME";
    //add push userName + score to score list
    userName = prompt("enter your initials");
    scoreBoard();
}
//checks the guessed answer against the answer index in the questions obj array
//adjusts time according to the answer being correct or not
//adjusts the score for a correct answer and runs the correct answer function
checkAnswer = (answerIndex) => {
    if (questions[questionIndex].answerIndex === answerIndex){
        console.log("correct")
        questionIndex++;
        timeLeft = timeLeft + 10;
        score++;
        startQuestions();
        //runs the correct answer animation.
        // correctAnswer();
    } else {
        console.log("fail")
        questionIndex++;
        timeLeft = timeLeft - 10;
        //runs the incorrect answer animation
        // wrongAnswer();
        startQuestions();
         
    }
}
resetGame = () => {
    questionIndex = 0;
    score = 0;
    quizOver.setAttribute("style", "display:none;");
    startBtn.disabled = false;
    timeLeft = 0;
    isFinish = false;

}



//variable is at bottom so that everything required is declared first.
let finalScore = score + timeLeft;
  //attach event listeners to start button, and answer buttons
  startBtn.addEventListener("click", startGame);
  //resets the game without using the refresh page in browser
  resetbtn.addEventListener("click", resetGame);
  //checks which answer button was clicked and checks if the answer was correct.
  answerContainer.addEventListener("click", function(event){
      let element = event.target;

      if (element.matches(".answers")){
          let answerIndex = element.dataset.index
          checkAnswer(answerIndex);
      }
  })





    
    
