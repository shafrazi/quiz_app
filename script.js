// set and initialize variables

let questionCount = 0;
let score = 0;
let userAnswer;
let timedOut = 0;
let rand;
let record = [];
let status = 0;

function $(elementId) {
  return document.getElementById(elementId);
};

let quiz = $("quiz");
let quizSet = $("quizSet");
let question = $("question");
let option1 = $("option1");
let option2 = $("option2");
let option3 = $("option3");
let option4 = $("option4");

let resultBox = $("resultBox");
let submit = $("submit");
let retake = $("retake");
let progress = $("progress");
let timer = $("timer");
let result = $("result");

let optionButtons = document.getElementsByClassName("button");
let button1 = $("btn1");
let button2 = $("btn2");
let button3 = $("btn3");
let button4 = $("btn4");

let tracker;
let countDown;
let secsInput = 5;
let seconds = secsInput;
let t;


// load current question into the app

function setQuestion(questionCount, rand) {
  let ques = questions[rand];
  question.textContent = `${questionCount + 1}. ${ques.question}`;
  option1.textContent = ques.option1;
  option2.textContent = ques.option2;
  option3.textContent = ques.option3;
  option4.textContent = ques.option4;
}

function changeProgressBar(questionCount) {
  progress.textContent = `Question ${questionCount + 1} of 10`;
  tracker = $(`no${questionCount + 1}`);
  tracker.style.backgroundColor = "#cc7a00";
}

function defaultOptionColors() {
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].style.backgroundColor = "#e6f3ff";
  }
}

function getQuestion(questionCount, rand) {
  if (questionCount === 9) {
    submit.innerHTML = "Submit test";
    submit.style.backgroundColor = "#00b300";
  }

  if (questionCount > 9) {
    return;
  }
  setQuestion(questionCount, rand);
  changeProgressBar(questionCount);
  defaultOptionColors();

  startTimer(seconds, "timer");
}

// create functions we need: setting tracker, setting result view, calculate score etc.

function setCorrect() {
  score++;
  tracker.style.backgroundColor = "#009900";
}

function setWrong() {
  tracker.style.backgroundColor = "#cc0000";
}

function finalScore() {
  if (score > 5) {
    result.innerHTML = `Congratulations! You passed! <br> Your score is ${score}!`;
  } else {
    result.innerHTML = `Sorry! You failed! <br> Your score is ${score}!`;
  }
}

function setResultPage() {
  quizSet.style.display = "none";
  resultBox.style.display = "block";
  progress.textContent = "Quiz completed.";
  timer.textContent = "00:00";
  finalScore();
}

// generate random and unused number to load a random question

function randomGenerator() {
  // while (status === 0) {
  //   rand = Math.round(Math.random() * 10) - 1;
  // }
  let num = parseInt(Math.random() * 10);
  if (!(record.includes(num)) && record.length < 10) {
    rand = num;
  } else if ((record.includes(num)) && record.length < 10)  {
    while ((record.includes(num))) {
      num = parseInt(Math.random() * 10);
    };
    rand = num;
  } else {
    return;
  }
  record.push(rand);
  return rand;
}

// setting up timer

function startTimer(seconds, element) {
  t = $(element);
  t.innerHTML = `00:${seconds}`;

  if (seconds < 0) {
    clearTimeout(countDown);
    //call the next question or set the result page if last question

    //conditions to evaluate whether options are selected, and then skip to the
    //next question

    //if no option is selected : wrong answer
    if (button1.style.backgroundColor !== "rgb(26, 255, 26)" &&
    button2.style.backgroundColor !== "rgb(26, 255, 26)" &&
    button3.style.backgroundColor !== "rgb(26, 255, 26)" &&
    button4.style.backgroundColor !== "rgb(26, 255, 26)") {

      //if we are at the last question
      if (questionCount === 9) {
        setWrong();
        setResultPage();
        return;
      } else {
        setWrong();
        //reset counter
        seconds = secsInput;
        getQuestion(++questionCount, randomGenerator());
      }
    } else {
        //if an option is selected
        if (questionCount === 9) {
          if (ans === questions[rand].answer) {
            setCorrect();
          } else {
            setWrong();
          }
          setResultPage();
          return;
        } else {
            if (ans === questions[rand].answer) {
              setCorrect();
              secs = secsInput;
              getQuestion(++questionCount, randomGenerator());
            } else {
              setWrong();
              secs = secsInput;
              getQuestion(++questionCount, randomGenerator());
            }
        }
    }
    return;
  }


  seconds--;
  countDown = setTimeout(startTimer, 1000, seconds, element);
}

// startTimer(seconds, "timer");
// making the option selection work

option1.addEventListener("click", optionSelect);
option2.addEventListener("click", optionSelect);
option3.addEventListener("click", optionSelect);
option4.addEventListener("click", optionSelect);

function optionSelect(event) {
  //get parent element and change backgroundColor
  let parentElem = event.target.parentElement;
  parentElem.style.backgroundColor = "#1aff1a";
  //switch statement: change other buttons color to default color
  switch(event.target.id) {
    case "option1": button2.style.backgroundColor = "#e6f3ff";
                    button3.style.backgroundColor = "#e6f3ff";
                    button4.style.backgroundColor = "#e6f3ff";
                    break;
    case "option2": button1.style.backgroundColor = "#e6f3ff";
                    button3.style.backgroundColor = "#e6f3ff";
                    button4.style.backgroundColor = "#e6f3ff";
                    break;
    case "option3": button2.style.backgroundColor = "#e6f3ff";
                    button1.style.backgroundColor = "#e6f3ff";
                    button4.style.backgroundColor = "#e6f3ff";
                    break;
    case "option4": button2.style.backgroundColor = "#e6f3ff";
                    button3.style.backgroundColor = "#e6f3ff";
                    button1.style.backgroundColor = "#e6f3ff";
                    break;
  }
  //set ans value based on the option selected
  ans = parseInt(event.target.id.replace("option", ""));
}

// load the next question when next question button is clicked

submit.addEventListener("click", nextQuestion);

function nextQuestion() {
  //no option selected
  if (button1.style.backgroundColor !== "rgb(26, 255, 26)" &&
      button2.style.backgroundColor !== "rgb(26, 255, 26)" &&
      button3.style.backgroundColor !== "rgb(26, 255, 26)" &&
      button4.style.backgroundColor !== "rgb(26, 255, 26)") {
        alert("Please select an option");
        return;
      } else {
        clearTimeout(countDown);
        secs = secsInput;
        //if in last question
        if (questionCount == 9 && questionCount != 10) {
          if (ans == questions[rand].answer) {
            setCorrect();
          } else {
            setWrong();
          }
          setResultPage();
          return;
        }

        if (ans == questions[rand].answer) {
          setCorrect();
          getQuestion(++questionCount, randomGenerator());
        } else {
          setWrong();
          getQuestion(++questionCount, randomGenerator());
        }

      }
}
// retake quiz functionality, setting up a new quiz session

//retake button

retake.addEventListener("click", retakeTest);

function retakeTest() {
  window.location.reload();
}

randomGenerator();


//onload function
window.onload = getQuestion(questionCount, rand);
