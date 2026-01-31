document.querySelector(".quiz-container").style.display = "none";

/*Questions*/
const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "None"],
    answer: 0
  },
  {
       question: "What does CSS stand for?",
       options: ["Cascading Style Sheets","Computer Style Sheets","Creative Style System","Colorful Style Sheets"],
    answer: 0
  },
  {
      question: "Which HTML element do we put the JS code in?",
      options: ["<scripting>","<js>","<script>","<javascript>"],
    answer: 2 
 }, 
  {   
        question: "What does DOM stand for?", 
        options: ["Document Object Model","Display Object Management","Data Object Model","Desktop Oriented Mode"], 
    answer: 0 
  }, 
  { 
        question: "Which operator is used for strict equality in JavaScript?", 
        options: ["=","==","===","!=="], 
    answer: 2 
}
];

/* Shuffle the questions*/
function shuffle(arr) {
    let a = arr.slice();
    for(let i=a.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}
/* Prepare the quiz */
let quiz = [];
function prepareQuiz() {
    const shuffleQuestions = shuffle(quizData);
    quiz = shuffleQuestions.map(q => {
        const optionPairs = q.options.map((opt, idx) => ({opt, idx}));
        const shuffledOptions = shuffle(optionPairs);
        const newAnswerIndex = shuffledOptions.findIndex(o => o.idx === q.answer);
        return {
            question: q.question,
            options: shuffledOptions.map(o => o.opt),
            answer: newAnswerIndex
        };
    });
}
/* Initialize the quiz */
let currentIndex = 0;
let score = 0;
let answered = false;
let timerId = null;
let timeLeft = 30;

/* DOM Elements */
const startBtn = document.getElementById("start-btn");
const questionNumber = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");

function startQuiz() {
  startBtn.style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  currentIndex = 0;
  score = 0;
  prepareQuiz();
  loadQuestion();
}

/* Load the question */
function loadQuestion() {
    answered = false;
    nextBtn.disabled = true;
    timeLeft = 30;
    timerEl.textContent = "Time: " + timeLeft;

    const currentQuestion = quiz[currentIndex];

    questionNumber.textContent = "Question " + (currentIndex + 1);
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => selectAnswer(button, index));
        
        optionsEl.appendChild(button);
    });

    updateProgress();
    startTimer();
}

/* Update the progress bar */
function updateProgress() {
  const percent = Math.round((currentIndex / quiz.length) * 100);
  progressEl.style.width = percent + "%";
}

/* Timer */
function startTimer() {
    stopTimer();
    timerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            stopTimer();
            handleTimeOut();
        }
    }, 1000);
}

function stopTimer() {
    if(timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

/* Answer selection */
function selectAnswer(button, selectedIndex) {
    if (answered) return;
    answered = true;
    stopTimer();

    const correctIndex = quiz[currentIndex].answer;
    const buttons = document.querySelectorAll(".option-btn");

    if(selectedIndex === correctIndex) {
        score++;
        button.classList.add("correct");
    }
    else {
        button.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }

    buttons.forEach(b => b.disabled = true);

    scoreEl.textContent = "Score: " + score;
    nextBtn.disabled = false;
}

/* Handle time out */
function handleTimeOut() {
    if(answered) return;
    answered = true;

    const correctIndex = quizData[currentIndex].answer;
    const buttons = document.querySelectorAll(".option-btn");

    buttons[correctIndex].classList.add("correct");

    buttons.forEach(b => b.disabled = true);
    scoreEl.textContent = "Score: " + score;
    nextBtn.disabled = false;
}

/* Move to the next question */
function nextQuestion() {
    currentIndex++;

    if(currentIndex < quizData.length) {
        loadQuestion();
    }
    else {
        stopTimer();
        questionEl.textContent = "Quiz Finished";
        optionsEl.innerHTML = "";
        nextBtn.disabled = true;
        timerEl.textContent = "";
        progressEl.style.width = "100%";
    }
}
/* Start quiz */
startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", nextQuestion);