const question = document.getElementById('question');
const options = Array.from(document.getElementsByClassName('option-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressFull = document.getElementById('progressFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
var myPics = new Array("../../pics/1.jpg", "../../pics/2.jpg", "../../pics/3.jpg","../../pics/4.jpg","../../pics/5.jpg",
"../../pics/6.jpg","../../pics/7.jpg","../../pics/8.jpg","../../pics/9.jpg","../../pics/10.jpg");

const bonus = 1;
const maxQuestions = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('../../end/index.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
    progressFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    options.forEach((option) => {
        const number = option.dataset['number'];
        option.innerText = currentQuestion['option' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
    choosePics();
};

choosePics = () => {
    var randomNum = Math.floor(Math.random()*myPics.length);
    document.getElementById("picture").src=myPics[randomNum];
};

options.forEach((option) => {
    option.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(bonus);
        }

        selectedOption.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedOption.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};