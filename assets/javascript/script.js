 let one = document.querySelector("#one");
 let two = document.querySelector("#two");
 let three = document.querySelector("#three");
 let four = document.querySelector("#four");
 let five = document.querySelector("#five");
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
 let check = false;
 
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
 let highscoreArr = [];
 

 init = () => {
    getScore();
};

 scoreBoard = () => {
    let finalScore = (score + timeLeft);
    let scoreObj = {name: userName, score: finalScore};
    highscoreArr.push(scoreObj);
    highscoreArr.sort(sortScores).reverse();
    trimScore(); 
    pushScore();
    highscoreArr.forEach(renderScores);
 };
 // sorts the highscores in the highscore array
 sortScores = (a, b) => {
     return a.score - b.score;
 };
 renderScores = () => {
    one.textContent = highscoreArr[0].name + " : " + highscoreArr[0].score;
    two.textContent = highscoreArr[1].name + " : " + highscoreArr[1].score;
    three.textContent = highscoreArr[2].name + " : " + highscoreArr[2].score;
    four.textContent = highscoreArr[3].name + " : " + highscoreArr[3].score;
    five.textContent = highscoreArr[4].name + " : " + highscoreArr[4].score; 
     
 };
 //trims the high score board down to 5 entries
 trimScore = () => {
     if(highscoreArr.length === 6) {
         highscoreArr.pop();
     }
 };


//saves the high score array in local storage
pushScore = () => {
    localStorage.setItem("highscoreArr", JSON.stringify(highscoreArr));
}
getScore = () => {
    let savedScore = JSON.parse(localStorage.getItem("highscoreArr"));
    if (savedScore === null){
        highscoreArr = [];
    } else { 
    highscoreArr = savedScore;
    renderScores();
};
}
 

startGame = (event) => {
    timeLeft = 10;
    //disables start button to be hit during game play
    startBtn.disabled = true;
    // startBtn.setAttribute("style","background-color: #d538749f")
    //switches the question area and timer box from hidden to visable
    timerEl.setAttribute("style", "display: block;");
    questionContainer.setAttribute("style", "display: block;");
    event.preventDefault();
    // starts timer counting
    startTimer();
    startQuestions();
};

startQuestions = () => {
    if (questionIndex<questions.length) {
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
                //push username and score into highscoreOBJ
                quizOver.setAttribute("style", "display: block;");
                quizOver.textContent = "Good Job!  " + userName + "\nyour score was : " + (score + timeLeft);
                //push userName and score into an obj array from here
                
                scoreBoard();
                return;          
                //maybe do my check if high score here.
            }
        }
    }, 1000);
};

// used if user cannot complete questions in alloted time
gameOver = () => {
    timerEl.setAttribute("style", "display: none;");
    questionContainer.setAttribute("style", "display: none;");
    quizOver.setAttribute("style", "display: block;");
    quizOver.textContent = "OUT OF TIME";
    //add push userName + score to score list
    userName = prompt("enter your initials");
    scoreBoard();
    return;
}
//checks the guessed answer against the answer index in the questions obj array
//adjusts time according to the answer being correct or not
//adjusts the score for a correct answer and runs the correct answer function
checkAnswer = (answerIndex) => {
    if (questions[questionIndex].answerIndex === answerIndex){
        questionIndex++;
        timeLeft = timeLeft + 10;
        score++;
        startQuestions();
        //runs the correct answer animation.
        correctAnswer();
    } else {
        questionIndex++;
        timeLeft = timeLeft - 10;
        startQuestions();
    }
}

//changes the color of the question container in flashes based on a correct or wrong guess
correctAnswer = () => {
    check = true
    startQuestions();
    return;
}


//resets the game without using the refresh in the browser
resetGame = () => {
    questionIndex = 0;
    score = 0;
    quizOver.setAttribute("style", "display:none;");
    startBtn.disabled = false;
    timeLeft = 0;
    isFinish = false;
    answer1.setAttribute("style", "animation-name: none; animation-duration: 0s;");
    answer2.setAttribute("style", "animation-name: none; animation-duration: 0s;");
    answer3.setAttribute("style", "animation-name: none; animation-duration: 0s;");
    answer4.setAttribute("style", "animation-name: none; animation-duration: 0s;");
    resetScore();
}
resetScore = () => {

    let reset = confirm("Do you want to reset the highscoreboard?");
    if (reset === true) {
        highscoreArr = [];
        localStorage.setItem("highscoreArr", JSON.stringify(highscoreArr));
        renderScores();
    }
}


//variable is at bottom so that everything required is declared first.

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
          if(check === true) {
            element.setAttribute("style"," animation-name: correct; animation-duration: 1s;")
            check = false;
          } else {
            element.setAttribute("style"," animation-name: wrong; animation-duration: 1s;")
          }
      }
  })

  init();





    
    
