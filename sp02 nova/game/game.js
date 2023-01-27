(() => {
    const question = document.getElementById('question');
    const options = Array.from(document.getElementsByClassName('option-text'));
    const progressText = document.getElementById('progressText');
    const scoreText = document.getElementById('score');
    const progressFull = document.getElementById('progressFull');
    const saveButton = document.getElementById('saveButton');
    const gameContents = document.getElementById('game');
    const resultScore = document.getElementById('result');
    const load = document.getElementById('load');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const playAgain = document.getElementById('playAgain');

    let currentQuestion = {};
    let acceptingAnswers = false;
    let score = 0;
    let questionCounter = 0;
    let availableQuesions = [];

    var myPics = new Array("../pics/1.jpg", "../pics/2.jpg", "../pics/3.jpg", "../pics/4.jpg", "../pics/5.jpg",
        "../pics/6.jpg", "../pics/7.jpg", "../pics/8.jpg", "../pics/9.jpg", "../pics/10.jpg");

    var bonus = 1;
    var maxQuestions = 10;

    let questions = [];

    fetch(
        'https://opentdb.com/api.php?amount=10&category=10&type=multiple'
    )
        .then((res) => {
            return res.json();
        })
        .then((loadedQuestions) => {
            questions = loadedQuestions.results.map((loadedQuestion) => {
                const formattedQuestion = {
                    question: loadedQuestion.question,
                    difficulty: loadedQuestion.difficulty,
                };

                const answerOptions = [...loadedQuestion.incorrect_answers];
                formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                answerOptions.splice(
                    formattedQuestion.answer - 1,
                    0,
                    loadedQuestion.correct_answer
                );

                answerOptions.forEach((option, index) => {
                    formattedQuestion['option' + (index + 1)] = option;
                });

                return formattedQuestion;
            });
            const difficultyValues = {
                easy: 0,
                medium: 1,
                hard: 2,
            }
            questions.sort(function(a,b) {
                const aDiff = difficultyValues[a.difficulty];
                const bDiff = difficultyValues[b.difficulty];
                if(aDiff>bDiff) { return 1;}
                if(aDiff<bDiff) { return -1;}
                return 0;
            });
            console.log(questions);
            startGame();
        })
        .catch((err) => {
            console.error(err);
        });

    let startGame = () => {
        questionCounter = 0;
        score = 0;
        availableQuesions = [...questions];
        getNewQuestion();
        gameContents.classList.remove('hidden');
        saveButton.classList.add('hidden');
        load.classList.add('hidden');
        scoreText.innerText = 0;
        resultScore.innerHTML = "";
    };

    let getNewQuestion = () => {
        if (availableQuesions.length === 0 || questionCounter >= maxQuestions) {
            localStorage.setItem('mostRecentScore', score);
            submit();
        };
        currentQuestion = availableQuesions[questionCounter];
        question.innerHTML = currentQuestion.question;
        questionCounter++;
        progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
        progressFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

        

        options.forEach((option) => {
            const number = option.dataset['number'];
            option.innerHTML = currentQuestion['option' + number];
        });


        acceptingAnswers = true;
        choosePics();
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

    let incrementScore = (num) => {
        score += num;
        scoreText.innerText = score;
    };

    let choosePics = () => {
        var randomNum = Math.floor(Math.random() * myPics.length);
        document.getElementById("picture").src = myPics[randomNum];
        myPics.splice(randomNum, 1);
    };

    function submit() {
        gameContents.classList.add('hidden');
        saveButton.classList.remove('hidden');
        playAgain.classList.remove('hidden');
        resultScore.classList.add('end');
        resultScore.innerHTML = 'You got ' + score + ' points out of ' + maxQuestions;
    };

    saveButton.addEventListener('click', save);

    function save() {
        highScores.push(score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
    };

    playAgain.addEventListener('click', function () {
        startGame();
    });

})();