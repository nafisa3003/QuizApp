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
       question: "Which language runs in a web browser?",
       options: ["Java","C","Python","JavaScript"],
    answer: 3
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

let currentIndex = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
    answered = false;
    nextBtn.disable = true;

    const currentQuestion = quizData[currentIndex];

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
}

function selectAnswer(button, selectedIndex) {
    if (answered) return;
    answered = true;

    const correctIndex = quizData[currentIndex].answer;
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

function nextQuestion() {
    currentIndex++;

    if(currentIndex < quizData.length) {
        loadQuestion();
    }
    else {
        questionEl.textContent = "Quiz Finished";
        optionsEl.innerHTML = "";
        nextBtn.disabled = true;
    }
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();