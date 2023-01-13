window.onload = (() => {

    var point_round;
    var questions_array;
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
    const triviaCategoryElement = document.getElementById("trivia_category");
    const categoriesElement = document.getElementById("categories");
    const limitElement = document.getElementById("limit");
    const quizElement = document.getElementById("quiz");
    const homeElement = document.getElementById("home");
    homeElement.addEventListener('click', reset());
    const triviaCategoriesDivElement = document.getElementById('trivia_categories_div');

    const prevBtn = document.getElementById('prev_btn');

    var previous_answer = null;
    var tempStorage;


    function reset() {
        // ??
    }

    function getTriviaCategoryList() {
        var categoryList;
        var first = true;
        Array.from(categoriesElement.children).forEach(e => {
            if (e.firstChild.checked) {
                if (first) {
                    categoryList = e.innerText;
                    first = false;
                }
                else {
                    categoryList = categoryList + ',' + e.innerText;
                }
            }
        });
        return categoryList;
    }

    function chooseTrivia() {
        tempStorage = [];
        const category = getTriviaCategoryList();
        console.log(category);
        var limit = limitElement.value;
        if (limitElement.value === "") {
            limit = 10;
        }
        url = `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${category}`
        console.log(url);
        Array.from(navigationElement.children).forEach(e => {
            e.classList.add('hide');
        })
        triviaCategoriesDivElement.classList.add('hide');
        startGame()
    }

    function startGame() {
        prevBtn.classList.remove('hide');
        startButton.classList.add('hide')
        points = 0;
        currentImageIndex = 0;
        currentQuestionNumber = 1;
        loadQuotes();
    }

    function loadQuotes() {
        questions_array = [];
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
                questions_array = JSON.parse(response['responseText']);
                console.log(questions_array);
                setNextQuestion(questions_array);
                pointsElement.innerText = `Points: ${points} / ${currentQuestionNumber}`;
                imageContainer.classList.remove('hide');
                if (startButton.innerText !== 'Restart') {
                    nextButton.addEventListener('click', () => {
                        currentImageIndex = currentImageIndex + 1;
                        if (currentQuestionNumber < currentImageIndex + 1) {
                            currentQuestionNumber = currentQuestionNumber + 1;
                        }
                        pointsElement.innerText = `Points:  ${points} / ${currentQuestionNumber}`;
                        console.log(currentImageIndex);
                        setNextQuestion(questions_array);
                    })
                    prevBtn.addEventListener('click', () => {
                        if (currentImageIndex > 0) {
                            currentImageIndex = currentImageIndex - 1;
                        }
                        previous_answer = null;
                        pointsElement.innerText = `Points:  ${points} / ${currentQuestionNumber}`;
                        console.log(currentImageIndex);
                        setNextQuestion(questions_array);
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
                console.log(answer + " " + question.correctAnswer)
                button.dataset.correct = answer.correct;
            }
            if (tempStorage[currentImageIndex] !== undefined) {
                if(button.innerText === tempStorage[currentImageIndex]){
                    button.classList.add('orange');
                }
                else{
                    setStatusClass(button,button.dataset.correct);
                }
            }
            button.addEventListener('click', selectAnswer);
            asnwerButtonElement.appendChild(button);
        })
    }

    function resetState() {
        clearStatusClass(document.body)
        asnwerButtonElement.innerHTML = "";
    }


    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        if (tempStorage[currentImageIndex] === undefined) {
            console.log(tempStorage[currentImageIndex]);
            tempStorage[currentImageIndex] = selectedButton.innerText;
            console.log(tempStorage);
            if (correct) {
                points = points + 1;
            }
            setStatusClass(document.body, correct)
            Array.from(asnwerButtonElement.children).forEach(button => {
                setStatusClass(button, button.dataset.correct)
            })
            console.log(questions_array.length + " " + currentImageIndex);
            if (questions_array.length > currentImageIndex + 1) {
                nextButton.classList.remove('hide')
                if (currentImageIndex === 0) {
                    prevBtn.classList.add('hide');
                }
                if (currentImageIndex === 9) {
                    nextButton.classList.add('hide');
                }
                else {
                    prevBtn.classList.remove('hide');
                }
                prevBtn.classList.remove('hide');
            } else if (waifu_game) {
                waifusStartButton.innerText = 'Restart'
                waifusStartButton.classList.remove('hide')
            }
            else {
                startButton.innerText = 'Restart'
                startButton.classList.remove('hide')
                nextButton.classList.add('hide');
                prevBtn.classList.add('hide')
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
        triviaCategoriesDivElement.classList.add('hide');
        startWaifus();
    }

    function startWaifus() {
        waifusStartButton.classList.add('hide')
        waifu_game = true;
        points = 0;
        currentImageIndex = 0;
        currentQuestionNumber = 1;
        loadWaifus();
    }

    function loadWaifus() {
        questions_array = [];
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
                questions_array = JSON.parse(response['responseText']);
                console.log(questions_array);
                setNextWaifu(questions_array);
                pointsElement.innerText = `Points: ${points} / ${currentQuestionNumber}`;
                imageContainer.classList.remove('hide');
                showProgress(questions_array);
                if (waifusStartButton.innerText !== 'Restart') {
                    nextButton.addEventListener('click', () => {
                        currentImageIndex = currentImageIndex + 1;
                        currentQuestionNumber = currentQuestionNumber + 1;
                        pointsElement.innerText = `Points:  ${points} / ${currentQuestionNumber}`;
                        console.log(currentImageIndex);
                        setNextWaifu(questions_array);
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
        array.forEach(e => {
            const button = document.createElement('button');
            button.classList.add('square');
            progrresElement.appendChild(button);
        });
    }
})();