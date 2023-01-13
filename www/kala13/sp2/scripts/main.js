document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};

window.addEventListener("load", () => {
    if (localStorage.getItem("Score") !== null) {
        var dataFromLocalStorage = localStorage.getItem("Score");
        App.CATEGORIES = JSON.parse(dataFromLocalStorage)
    }
    App.createElementsForHomePage();
});

const App = {
    MAIN_DIV: document.getElementById('mainContainer'),
    DATA: "",
    IMG: "",
    ANSWERS: "",
    HINTS: "",

    CATEGORIES: [
        {
            name: 'Action',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Adventure',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Comedy',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Horror',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Action',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Fantasy',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Isekai',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Action',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Ecchi',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Shounen',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Shoujo',
            reached: 0,
            correct: 0,
            incorrect: 0
        },
        {
            name: 'Sports',
            reached: 0,
            correct: 0,
            incorrect: 0
        }
    ]
}

App.selectCategory = function (category) {
    var request = new XMLHttpRequest();
    var url = 'https://kitsu.io/api/edge/anime?filter[categories]=' + category.toLowerCase() + '&filter[subtype]=TV&sort=-popularityRank&page[limit]=20&page[offset]=0'
    App.sendRequest(request, url, category);
}

App.sendRequest = function (request, url, category) {
    request.open('GET', url);
    request.send();
    request.addEventListener('load', async function () {
        try {
            App.DATA = JSON.parse(request.responseText);
            App.createElemntsForGuessing(category);
        } catch (error) {
            console.error(error);
        }
    });
}

App.showHints = function () {
    if (App.HINTS.children[1].style.visibility === "hidden") {
        App.HINTS.style.height = "150px";
        App.HINTS.children[1].style.visibility = "visible";
        App.HINTS.children[2].style.visibility = "visible";
        App.HINTS.children[3].style.visibility = "visible";
    } else {
        App.HINTS.style.height = "50px";
        App.HINTS.children[1].style.visibility = "hidden";
        App.HINTS.children[2].style.visibility = "hidden";
        App.HINTS.children[3].style.visibility = "hidden";
    }
}

App.showNextQuestion = function (category) {
    var wholeCategory = App.CATEGORIES.find((cat) => cat.name == category)
    App.IMG.src = App.DATA.data[wholeCategory.reached].attributes.posterImage.small;

    App.IMG.onload = function () {
        var numbers = [];
        numbers.push(wholeCategory.reached);
        for (var i = 0; i < 2; i++) {
            var randomNumber = Math.floor(Math.random() * 20)
            while (randomNumber === wholeCategory.reached) {
                randomNumber = Math.floor(Math.random() * 20);
            }
            while (numbers.indexOf(randomNumber) !== -1) {
                randomNumber = Math.floor(Math.random() * 20);
            }
            numbers.push(randomNumber);
        }

        var answersRandom = numbers.sort(() => Math.random() - 0.5)

        for (i = 0; i < 3; i++) {
            App.ANSWERS.children[i].innerText = App.DATA.data[answersRandom[i]].attributes.canonicalTitle;
        }

        if (document.querySelector('.correct')) {
            document.querySelector('.correct').classList.remove('correct');
            document.querySelector('.answersContainer').classList.remove('finished');
            document.querySelector('.nextButton').classList.add('unclickable')
        }
        else if (document.querySelector('.incorrect')) {
            document.querySelector('.incorrect').classList.remove('incorrect');
            document.querySelector('.answersContainer').classList.remove('finished');
            document.querySelector('.nextButton').classList.add('unclickable')
        }

        App.HINTS.children[1].innerText = "Age rating guide: " + App.DATA.data[wholeCategory.reached].attributes.ageRatingGuide
        App.HINTS.children[2].innerText = "Avrage rating: " + App.DATA.data[wholeCategory.reached].attributes.averageRating;
        App.HINTS.children[3].innerText = "Description: " + App.DATA.data[wholeCategory.reached].attributes.description.split('\n')[0];
    }
}

App.checkAnswer = function (category, button) {
    var wholeCategory = App.CATEGORIES.find((cat) => cat.name == category);
    var answerSelected = document.getElementById(button);
    if (answerSelected.innerText === App.DATA.data[wholeCategory.reached].attributes.canonicalTitle) {

        wholeCategory.correct++
        answerSelected.classList.add('correct');
    } else {
        wholeCategory.incorrect++
        answerSelected.classList.add('incorrect');
    }
    wholeCategory.reached++;
    window.localStorage.setItem('Score', JSON.stringify(App.CATEGORIES))
    document.getElementsByClassName('answersContainer')[0].classList.add('finished');
    document.getElementsByClassName('nextButton')[0].classList.remove('unclickable')
}
