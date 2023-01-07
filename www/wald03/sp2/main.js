var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);


var currentImageIndex;
let points = 0;
let currentQuestionNumber = 1;


const startButton = document.getElementById('start_btn');
const nextButton = document.getElementById('next_btn');
const imageContainer = document.getElementById('image_container');
const imageElement = document.getElementById('image');
const asnwerButtonElement = document.getElementById('answers_btns');
const pointsElement = document.getElementById('points');
const inputElement = document.getElementById('anime_title');
const starButton2 = document.getElementById('start_btn_by_anime');
//starButton2.addEventListener('click', startGameByTitle);
startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide')
    currentImageIndex = 0;
    imageContainer.classList.remove('hide')
    loadQuotes();
}

function setNextQuestion(array){
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
        button.classList.add('btn')
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
    setStatusClass(document.body, correct)
    Array.from(asnwerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (20 > currentImageIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
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

const url = "https://the-trivia-api.com/api/questions?limit=20&categories=science,history";


function loadQuotes() {
    var array = [];
    $.ajax({
        url: url,
        type: 'get',
        contentType: false,
        cache: false,
        processData: false,
        error: function (response) {
            console.log(response['responseText']);
        },
        complete: function (response) {
            $(".priceClear").val("");
            array = JSON.parse(response['responseText']);
            console.log(array);
            setNextQuestion(array);
            nextButton.addEventListener('click', () => {
                currentImageIndex++;
                currentQuestionNumber++;
                console.log(currentImageIndex);
                setNextQuestion(array);
            })
            
        }
    });


}

