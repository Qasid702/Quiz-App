const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const startQuizButton = document.getElementById('start-quiz-btn');

let currentQuestion = 0;
let correctAnswers = 0; // To count correct answers
let timer; // To handle the countdown
const timeLimit = 30; // 30 seconds for each question
let timeRemaining = timeLimit; // Time remaining for current question
const totalQuestions = quizData.length;

function loadQuestion() {
    clearInterval(timer); // Clear any existing timer
    timeRemaining = timeLimit; // Reset time for new question
    updateTimerDisplay(); // Update timer display

    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = `Question #${currentQuestion + 1} ${currentQuiz.emoji}: ${currentQuiz.question}`;
    optionsElement.innerHTML = ''; // Clear previous options
    resultElement.textContent = ''; // Clear previous result message

    // Load options
    currentQuiz.options.forEach((option, index) => {
        const optionElement = document.createElement('li');
        optionElement.textContent = `${index + 1}. ${option}`;
        optionElement.id = `option-${index + 1}`;
        optionsElement.appendChild(optionElement);
    });

    // Start countdown timer
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timer); // Stop the timer
            moveToNextQuestion(); // Move to the next question when time runs out
        }
    }, 1000); // Timer updates every second
}


function updateTimerDisplay() {
    timerElement.textContent = `Time Remaining: ${timeRemaining} seconds`;
}

function moveToNextQuestion() {
    const selectedOption = document.querySelector('li.selected');
    const answer = quizData[currentQuestion].answer;

    if (selectedOption) {
        const selectedAnswer = parseInt(selectedOption.id.split('-')[1]) - 1;

        // Check if the answer is correct
        if (selectedAnswer === answer) {
            correctAnswers++; // Increment correct answers count
            resultElement.textContent = '✅ Correct!';
        } else {
            resultElement.textContent = `❌ Incorrect! The correct answer is ${quizData[currentQuestion].options[answer]}.`;
        }
    } else {
        resultElement.textContent = `⏰ Time's up! No answer selected.`;
    }

    // Show feedback for a short time and then move to the next question
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            loadQuestion(); // Load the next question
        } else {
            // End of quiz
            questionElement.textContent = "Quiz Completed!";
            optionsElement.innerHTML = ''; // Clear options
            scoreElement.textContent = `Your final score is ${correctAnswers}/${totalQuestions}.`; // Display fraction score
            submitButton.style.display = 'none'; // Hide submit button
            timerElement.style.display = 'none'; // Hide timer
        }
    }, 2000); // Show result for 2 seconds before moving to the next question
}

// When the start button is clicked, hide the start container and show the quiz container
startQuizButton.addEventListener('click', () => {
    startContainer.style.display = 'none'; // Hide the start container
    quizContainer.style.display = 'block'; // Show the quiz container
    loadQuestion(); // Start the quiz
});

// When submit button is clicked, evaluate the answer
submitButton.addEventListener('click', () => {
    clearInterval(timer); // Stop the timer when submit button is clicked
    moveToNextQuestion(); // Check the answer and move to the next question
});

// Add event listener to select the clicked option
optionsElement.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const selectedOption = document.querySelector('li.selected');
        if (selectedOption) {
            selectedOption.classList.remove('selected');
        }
        e.target.classList.add('selected');
    }
});
