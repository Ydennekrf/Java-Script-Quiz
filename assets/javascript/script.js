 let highscore = document.querySelector("#highscore");
 let question = document.querySelector("#question");
//  let answer1 = document.querySelector("#answer1");
//  let answer2 = document.querySelector("#answer2");
//  let answer3 = document.querySelector("#answer3");
//  let answer4 = document.querySelector("#answer4");
 let answer = document.querySelector(".answer");
 let startBtn = document.querySelector("#start");
 let timer = document.querySelector("#timer");

 //correct answer counter
 let score = 0;
 let finalScore = 0;

 let scoreArray = [(initials,finalScore)]

printAnswers = () => {
 let answerPrint = [answer1,answer2,answer3,answer4];

 for (i = 0; i< answerPrint.length;i++) {
     answer = document.textContent.answerPrint[i];
 }
};

countdown = () => {
let timeLeft = 90;

let timeInterval = setInterval(function() {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(timeInterval);
        gameOver();
        alert("game over")

    } else if (userAnswer == false) {
      timeLeft = timeLeft - 10;
      alert("wrong");

    } else {
        timeLeft = timeLeft + 10;
        score++;
        alert("correct!");
    }
    
  }, 1000);
};

gameOver = () => {
    //todo make game board dissappear and say Game Over form to "enter initials" push obj to highscore sort
    scoreCount();
}

scoreCount = () => {
    if (questionPool === 0) {
        finalscore = score + timeLeft;
    } 
}

