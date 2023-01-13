App.removeElementsOnPage = function () {
    App.MAIN_DIV.innerHTML = ""
}
App.createElementsForHomePage = function () {
    //Making sure page is empty
    App.removeElementsOnPage();

    var headingsDiv = document.createElement('div');
    var h1 = document.createElement('h1');
    var h2 = document.createElement('h2');
    var categoryDiv = document.createElement('div');
    var scoreBoard = document.createElement('button');
    scoreBoard.addEventListener('click', () => {
        App.loadScoreBoard();
    });
    scoreBoard.innerText = 'Score Board'

    h1.innerHTML = 'Anime Guessing Game';
    h2.innerHTML = 'Choose category';

    headingsDiv.classList.add('headingsContainer');
    categoryDiv.classList.add('categoriesContainer');
    scoreBoard.classList.add('scoreButton');

    var categories = App.CATEGORIES.map(({ name }) => name)
    categories.forEach(category => {
        var categoryButton = document.createElement('button');
        categoryButton.classList.add('category');
        categoryButton.innerText = category.charAt(0).toUpperCase() + category.slice(1);;
        categoryButton.addEventListener('click', () => {
            App.selectCategory(category);
        });
        categoryDiv.appendChild(categoryButton);
    })

    App.MAIN_DIV.append(headingsDiv, categoryDiv, scoreBoard);
    headingsDiv.append(h1, h2)
}

App.createElemntsForGuessing = function (category) {
    //Making sure page is empty
    App.removeElementsOnPage();

    // Creating elements
    var backHome = document.createElement('button');
    var h1 = document.createElement('h1');

    var hintsDiv = document.createElement('div');

    var showHits = document.createElement('button');
    showHits.innerText = 'Show hints'
    showHits.addEventListener('click', () => {
        App.showHints();
    });
    var hintOne = document.createElement('p');
    hintOne.style.visibility = "hidden";
    var hintTwo = document.createElement('p');
    hintTwo.style.visibility = "hidden";
    var hintThree = document.createElement('p');
    hintThree.style.visibility = "hidden";

    var questionDiv = document.createElement('div')
    var pictureDiv = document.createElement('div');
    var img = document.createElement('img');
    var answersDiv = document.createElement('div');

    var optionOne = document.createElement('button');
    optionOne.addEventListener('click', () => {
        App.checkAnswer(category, 'one');
    });
    var optionTwo = document.createElement('button');
    optionTwo.addEventListener('click', () => {
        App.checkAnswer(category, 'two');
    });
    var optionThree = document.createElement('button');
    optionThree.addEventListener('click', () => {
        App.checkAnswer(category, 'three');
    });

    var nextQuestion = document.createElement('button');

    // Insert text
    h1.innerHTML = 'Category ' + category;
    backHome.innerText = 'Return to main menu';
    backHome.addEventListener('click', () => {
        App.createElementsForHomePage();
    });
    nextQuestion.innerText = 'Next question';
    nextQuestion.addEventListener('click', () => {
        App.showNextQuestion(category);
    });

    // Adding classes
    hintsDiv.classList.add('hintsContainer');
    questionDiv.classList.add('questionsContainer');
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
    App.MAIN_DIV.append(backHome, h1, questionDiv);
    hintsDiv.append(showHits, hintOne, hintTwo, hintThree);
    questionDiv.append(hintsDiv, pictureDiv, answersDiv, nextQuestion);
    pictureDiv.appendChild(img);
    answersDiv.append(optionOne, optionTwo, optionThree);

    App.IMG = document.getElementById('poster');
    App.ANSWERS = document.querySelector(".answersContainer");
    App.HINTS = document.querySelector(".hintsContainer");

    App.showNextQuestion(category);
}

App.loadScoreBoard = function () {
    //Making sure page is empty
    App.removeElementsOnPage();

    var backHome = document.createElement('button')
    backHome.innerText = 'Return to main menu';
    backHome.addEventListener('click', () => {
        App.createElementsForHomePage();
    });

    var h1 = document.createElement('h1');
    h1.innerHTML = 'Score in categories'

    App.MAIN_DIV.append(backHome, h1);

    App.CATEGORIES.forEach(category => {
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

        App.MAIN_DIV.appendChild(categoryDiv);
        categoryDiv.append(h2, info);
        info.append(reached, correct, incorrect)
    })
}