function removeElementsOnPage() {
    var scripts = [];
    while (document.body.firstChild) {
        if (document.body.firstChild.localName == 'script') {
            scripts.push(document.body.firstChild);
        }
        document.body.removeChild(document.body.firstChild);
    }

    scripts.forEach(script => {
        document.body.appendChild(script);
    });
}

function createElementsForHomePage() {
    //Making sure page is empty
    removeElementsOnPage();

    var mainDiv = document.createElement('div');
    var headingsDiv = document.createElement('div');
    var h1 = document.createElement('h1');
    var h2 = document.createElement('h2');
    var categoryDiv = document.createElement('div');
    var scoreBoard = document.createElement('button');
    scoreBoard.addEventListener('click', () => {
        loadScoreBoard();
    });
    scoreBoard.innerText = 'Score Board'

    h1.innerHTML = 'Anime Guessing Game';
    h2.innerHTML = 'Choose category';

    mainDiv.classList.add('mainContainer');
    headingsDiv.classList.add('headingsContainer');
    categoryDiv.classList.add('categoriesContainer');
    scoreBoard.classList.add('scoreButton');

    var categories = Global.CATEGORIES.map(({ name }) => name)
    categories.forEach(category => {
        var categoryButton = document.createElement('button');
        categoryButton.classList.add('category');
        categoryButton.innerText = category.charAt(0).toUpperCase() + category.slice(1);;
        categoryButton.addEventListener('click', () => {
            selectCategory(category);
        });
        categoryDiv.appendChild(categoryButton);
    })

    document.body.appendChild(mainDiv);
    mainDiv.append(headingsDiv, categoryDiv, scoreBoard);
    headingsDiv.append(h1, h2)
}

async function createElemntsForGuessing(category) {
    //Making sure page is empty
    removeElementsOnPage();

    // Creating elements
    var mainDiv = document.createElement('div');
    var backHome = document.createElement('button');
    var h1 = document.createElement('h1');
    var questionDiv = document.createElement('div')
    var pictureDiv = document.createElement('div');
    var img = document.createElement('img');
    var answersDiv = document.createElement('div');

    var optionOne = document.createElement('button');
    optionOne.addEventListener('click', () => {
        checkAnswer(category, 'one');
    });
    var optionTwo = document.createElement('button');
    optionTwo.addEventListener('click', () => {
        checkAnswer(category, 'two');
    });
    var optionThree = document.createElement('button');
    optionThree.addEventListener('click', () => {
        checkAnswer(category, 'three');
    });

    var nextQuestion = document.createElement('button');

    // Insert text
    h1.innerHTML = 'Category ' + category;
    backHome.innerText = 'Return to main menu';
    backHome.addEventListener('click', () => {
        createElementsForHomePage();
    });
    nextQuestion.innerText = 'Next question';
    nextQuestion.addEventListener('click', () => {
        showNextQuestion(category);
    });

    // Adding classes
    mainDiv.classList.add('mainContainer');
    questionDiv.classList.add('questionsContainer')
    pictureDiv.classList.add('pictureContainer');
    answersDiv.classList.add('answersContainer');
    optionOne.classList.add('answer');
    optionOne.id = 'one'
    optionTwo.classList.add('answer');
    optionTwo.id = 'two'
    optionThree.classList.add('answer');
    optionThree.id = 'three'
    nextQuestion.classList.add('nextButton');
    nextQuestion.classList.add('unclickable');
    img.id = 'poster'

    // Appending to document
    document.body.appendChild(mainDiv);
    mainDiv.append(backHome, h1, questionDiv);
    questionDiv.append(pictureDiv, answersDiv, nextQuestion)
    pictureDiv.appendChild(img)
    answersDiv.append(optionOne, optionTwo, optionThree);

    showNextQuestion(category);
}

function loadScoreBoard() {
    //Making sure page is empty
    removeElementsOnPage();

    var mainDiv = document.createElement('div');
    var backHome = document.createElement('button')
    backHome.innerText = 'Return to main menu';
    backHome.addEventListener('click', () => {
        createElementsForHomePage();
    });

    var h1 = document.createElement('h1');
    h1.innerHTML = 'Score in categories'

    mainDiv.classList.add('mainContainer');
    mainDiv.append(backHome, h1);

    Global.CATEGORIES.forEach(category => {
        var categoryDiv = document.createElement('div');
        categoryDiv.classList.add('categoryDivScore')

        var h2 = document.createElement('h2');
        h2.innerHTML = category.name;

        var info = document.createElement('div');

        var reached = document.createElement('h3');
        reached.innerHTML = 'Reached: ' + category.reached;
        var correct = document.createElement('h3');
        correct.innerHTML = 'Correct: ' + category.correct;
        var incorrect = document.createElement('h3');
        incorrect.innerHTML = 'Incorrect: ' + category.incorrect;

        mainDiv.appendChild(categoryDiv);
        categoryDiv.append(h2, info);
        info.append(reached, correct, incorrect)
    })

    document.body.appendChild(mainDiv);
}