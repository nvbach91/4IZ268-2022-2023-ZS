(() => {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    var point_round;
    var array;
    var url = 0;
    var points = 0;
    var currentImageIndex;
    let currentQuestionNumber = 1;
    let waifu_game = false;

    const triviaElement = document.getElementById('trivia');
    triviaElement.addEventListener('click', chooseTrivia);
    const navigationElement = document.getElementById("menu_nav")
    const startButton = document.getElementById('start_btn');
    const nextButton = document.getElementById('next_btn');
    const imageContainer = document.getElementById('image_container');
    const imageElement = document.getElementById('image');
    const asnwerButtonElement = document.getElementById('answers_btns');
    const pointsElement = document.getElementById('points');
    const loading = document.getElementById("loading");
    const waifusStartButton = document.getElementById('waifus_btn');
    waifusStartButton.addEventListener('click', startWaifus);
    startButton.addEventListener('click', startGame);

    function chooseTrivia() {
        url = "https://the-trivia-api.com/api/questions?limit=20&categories=science,history";
        Array.from(navigationElement.children).forEach(e => {
            e.classList.add('hide');
        })
        startGame()
    }

    function startGame() {
        startButton.classList.add('hide')
        points = 0;
        currentImageIndex = 0;
        currentQuestionNumber = 1;
        point_round = true;
        loadQuotes();
    }

    function loadQuotes() {
        array = [];
        loading.classList.remove('hide');
        imageContainer.classList.add('hide');
        asnwerButtonElement.classList.add('hide');
        $.ajax({
            url: url,
            type: 'get',
            error: function (response) {
                console.log(response['responseText']);
            },
            complete: function (response) {
                loading.classList.add('hide');
                imageContainer.classList.remove('hide');
                asnwerButtonElement.classList.remove('hide');
                array = JSON.parse(response['responseText']);
                console.log(array);
                setNextQuestion(array);
                pointsElement.innerText = `Points: ${points} / ${currentQuestionNumber}`;
                imageContainer.classList.remove('hide');
                if (startButton.innerText !== 'Restart') {
                    nextButton.addEventListener('click', () => {
                        point_round = true;
                        currentImageIndex = currentImageIndex + 1;
                        currentQuestionNumber = currentQuestionNumber + 1;
                        pointsElement.innerText = `Points:  ${points} / ${currentQuestionNumber}`;
                        console.log(currentImageIndex);
                        setNextQuestion(array);
                    })
                }
            }
        });
    }

    function setNextQuestion(array) {
        resetState()
        showQuestion(array[currentImageIndex])
    }

    function showQuestion(question) {
        imageElement.innerText = question.question;
        let answers = [];
        answers.push(...question.incorrectAnswers);
        answers.push(question.correctAnswer);
        answers.sort(() => Math.random() - 0.5);
        answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer;
            button.classList.add('btns_trivia');
            if (answer === question.correctAnswer) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer);
            asnwerButtonElement.appendChild(button);
        })
    }

    function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (asnwerButtonElement.firstChild) {
            asnwerButtonElement.removeChild(asnwerButtonElement.firstChild)
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        if (point_round) {
            point_round = false;
            if (correct) {
                points = points + 1;
            }
            setStatusClass(document.body, correct)
            Array.from(asnwerButtonElement.children).forEach(button => {
                setStatusClass(button, button.dataset.correct)
            })
            if (array.length > currentImageIndex + 1) {
                nextButton.classList.remove('hide')
            } else if (waifu_game) {
                waifusStartButton.innerText = 'Restart'
                waifusStartButton.classList.remove('hide')
            }
            else {
                startButton.innerText = 'Restart'
                startButton.classList.remove('hide')
            }
            pointsElement.innerText = `Points:  ${points} / ${currentQuestionNumber}`;
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element)
        if (correct) {
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }

    const waifusElement = document.getElementById('waifus');
    waifusElement.addEventListener('click', chooseWaifus);

    function chooseWaifus() {
        url = "https://animechan.vercel.app/api/quotes";
        Array.from(navigationElement.children).forEach(e => {
            e.classList.add('hide');
        })
        startWaifus();
    }

    function startWaifus() {
        waifusStartButton.classList.add('hide')
        waifu_game = true;
        points = 0;
        currentImageIndex = 0;
        currentQuestionNumber = 1;
        point_round = true;
        loadWaifus();
    }

    function loadWaifus() {
        array = [];
        loading.classList.remove('hide');
        imageContainer.classList.add('hide');
        asnwerButtonElement.classList.add('hide');
        $.ajax({
            url: url,
            type: 'get',
            error: function (response) {
                console.log(response['responseText']);
            },
            complete: function (response) {
                asnwerButtonElement.classList.remove('hide');
                imageContainer.classList.remove('hide');
                loading.classList.add('hide');
                array = JSON.parse(response['responseText']);
                console.log(array);
                setNextWaifu(array);
                pointsElement.innerText = `Points: ${points} / ${currentQuestionNumber}`;
                imageContainer.classList.remove('hide');
                showProgress(array);
                if (waifusStartButton.innerText !== 'Restart') {
                    nextButton.addEventListener('click', () => {
                        point_round = true;
                        currentImageIndex = currentImageIndex + 1;
                        currentQuestionNumber = currentQuestionNumber + 1;
                        pointsElement.innerText = `Points:  ${points} / ${currentQuestionNumber}`;
                        console.log(currentImageIndex);
                        setNextWaifu(array);
                    })
                }
            }
        });
    }

    function setNextWaifu(array) {
        resetState()
        showWaifus(array)
    }

    function showWaifus(question) {
        imageElement.innerText = question[currentImageIndex].quote;
        let answers = [];
        for (let index = 0; index < 2; index++) {
            var num = Math.floor(Math.random() * 9);
            while (num === currentImageIndex) {
                num = Math.floor(Math.random() * 9);
            }
            answers.push(question[num].character);
        }
        answers.push(question[currentImageIndex].character);
        answers.sort(() => Math.random() - 0.5);
        answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer;
            button.classList.add('btn')
            if (answer === question[currentImageIndex].character) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer);
            asnwerButtonElement.appendChild(button);
        })
    }

    const progrresElement = document.getElementById('progress');
    function showProgress(array) {
        array.forEach(element => {
            const div = document.createElement('div');
            div.classList.add('square');
            progrresElement.appendChild(div);
        });
    }
})();