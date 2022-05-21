 let highscore = document.querySelector("#highscore");
 let question = document.querySelector("#question");
 let questionContainer = document.querySelector(".questioncontainer");

//  let answer1 = document.querySelector("#answer1");
//  let answer2 = document.querySelector("#answer2");
//  let answer3 = document.querySelector("#answer3");
//  let answer4 = document.querySelector("#answer4");
 let answerEl = document.querySelector(".answer");
 let startBtn = document.querySelector("#start");
 let timerEl = document.querySelector("#timer");

 //correct answer counter
 let score = 0;
 let finalScore = 0;
 let isFinish = false;
 let timer;
 let timeLeft;


//  let scoreArray = [(initials,finalScore)]

init = () => {
    getScore();
}

startGame = () => {
    isWin = false;
    timeLeft = 90;
    //disables start button to be hit during game play
    startBtn.disabled = true;
    //switches the question area and timer box from hidden to visable
    timerEl.setAttribute("style", "display: block;");
    questionContainer.setAttribute("style", "display: block;");
    // starts timer counting
    startTimer();
    startQuestions();
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
            // gameOver();
        }
    }, 1000);
};






// printAnswers = () => {
//     let answerPrint = [answer1,answer2,answer3,answer4];
   
//     for (i = 0; i< answerPrint.length;i++) {
//         answer = document.textContent.answerPrint[i];
//     }
//    };

// gameOver = () => {
//     //todo make game board dissappear and say Game Over form to "enter initials" push obj to highscore sort
//     scoreCount();
// } 

// scoreCount = () => {
//     if (questionPool === 0) {
//         finalscore = score + timeLeft;
//     } 
// }

// let timeInterval = setInterval(function() {
//     timeLeft--;
//     timer.textContent = timeLeft;

    
//   }, 1000);

  //attach event listeners to start button, and answer buttons
  startBtn.addEventListener("click", startGame);