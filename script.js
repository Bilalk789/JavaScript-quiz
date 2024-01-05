const questions = [
    {
    question: "Commonly used data types DO NOT include:",
    options: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Booleans"
    },
    {
    question: "The condition in an if/else statement is enclosed with ______.",
    options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correctAnswer: "Parenthesis"
    },
    {
    question: "Array in JavaScript can be used to store______. ",
    options: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
    correctAnswer: "All of the above"
    },
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    options: ["JavaScript", "Terminal/ Bash", "For Loops", "Console.log"],
    correctAnswer: "Console.log"
    },
];
let currentQuestionIndex = 0;
let score = 0;
let initialsInput;
let timer;
let time = 120;
let timeRemaining = time;

const SELECTORS = {
    showHighScores: "High-Scores",
    startBtn: "#start-btn",
    questionContainer: "#question-container",
    saveScoreBtn: "#save-score-btn",
    timerElement: "#timer",
    scoreElement: "#score-value",
    highScoresContainer: "#high-scores-container",
    highScoresList: "high-scores-list",
    savedScores: "scores",
    initialsInput: "#initials-input"
};
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector(SELECTORS.startBtn);
    const saveScoreBtn = document.querySelector(SELECTORS.saveScoreBtn);

    startBtn.addEventListener("click", startQuiz);
    saveScoreBtn.addEventListener("click", saveScore);

function checkAnswer(selectedOption) {
        let currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correctAnswer) {
            score++;
            displayFeedback("Correct!");
        } else {
            time -= 15;
            displayFeedback("Incorrect!");
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }

        updateTimer();
    }
function saveScore() {
        initialsInput = document.querySelector(SELECTORS.initialsInput);
        initials = initialsInput.value.trim();

    if (initials !== '') {
        try {
            const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
            const newScore = { initials, timeRemaining };
            savedScores.push(newScore);
            localStorage.setItem("quizScores", JSON.stringify(savedScores));
            alert(`Score saved for ${initials}: ${timeRemaining}`);
            showHighScores();
        } catch (error) {
            console.error("Error saving score:", error.message); 
        
    }
}}
function endQuiz() {
        clearInterval(timer);
        questionContainer = document.querySelector(SELECTORS.questionContainer);
        questionContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your final score is: ${score}</p>`;
        showHighScores();
    }

function startQuiz() {
        startBtn.disabled = true;
        displayQuestion();
        startTimer();
    }

function displayQuestion() {
        let currentQuestion = questions[currentQuestionIndex];
        questionContainer = document.querySelector(SELECTORS.questionContainer);
        questionContainer.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            ${currentQuestion.options.map(option => `<button class="option-btn">${option}</button>`).join('')}
        `;
    
        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => checkAnswer(button.textContent));
        });
    }  

function startTimer() {
        timer = setInterval(() => {
            updateTimer();
    if (time <= 0) {
                endQuiz();
            }
        }, 1000);
    }

function updateTimer() {
        timerElement = document.querySelector(SELECTORS.timerElement);
        timerElement.textContent = `Time: ${timeRemaining}s`;
        timeRemaining--;
    }
function displayFeedback(message) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.textContent = message;
        document.body.appendChild(feedbackDiv); 
        setTimeout(() => {
        feedbackDiv.remove();
        },1000);
    }
});
function showHighScores() {
        const highScoresList = document.getElementById("high-scores-list");
        highScoresList.innerHTML = ""; 
        const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
        savedScores.sort((a, b) => b.score - a.score);
        savedScores.forEach((score, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
            highScoresList.appendChild(listItem);
        });
        const highScoresContainer = document.getElementById("high-scores-container");
        highScoresContainer.style.display = "block"; }