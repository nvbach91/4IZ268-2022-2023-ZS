function selectCategory(category) {
    var request = new XMLHttpRequest();
    var url = 'https://kitsu.io/api/edge/anime?filter[categories]=' + category.toLowerCase() + '&filter[subtype]=TV&sort=-popularityRank&page[limit]=20&page[offset]=0'
    sendRequest(request, url, category);
}

function sendRequest(request, url, category) {
    request.open('GET', url);
    request.send();
    request.addEventListener('load', async function () {
        try {
            Global.DATA = await JSON.parse(request.responseText);
            createElemntsForGuessing(category);
        } catch (error) {
            console.error(error);
        }

    });
}

function showNextQuestion(category) {
    var wholeCategory = Global.CATEGORIES.find((cat) => cat.name == category)
    var img = document.getElementById('poster');
    img.src = Global.DATA.data[wholeCategory.reached].attributes.posterImage.small;
    var answers = document.getElementsByClassName('answersContainer')

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

    answers[0].children[0].innerText = Global.DATA.data[answersRandom[0]].attributes.canonicalTitle;
    answers[0].children[1].innerText = Global.DATA.data[answersRandom[1]].attributes.canonicalTitle;
    answers[0].children[2].innerText = Global.DATA.data[answersRandom[2]].attributes.canonicalTitle;

    if (document.getElementsByClassName('correct')[0]) {
        document.getElementsByClassName('correct')[0].classList.remove('correct');
        document.getElementsByClassName('answersContainer')[0].classList.remove('finished');
        document.getElementsByClassName('nextButton')[0].classList.add('unclickable')
    }
    else if (document.getElementsByClassName('incorrect')) {
        document.getElementsByClassName('incorrect')[0].classList.remove('incorrect');
        document.getElementsByClassName('answersContainer')[0].classList.remove('finished');
        document.getElementsByClassName('nextButton')[0].classList.add('unclickable')
    }

}

function checkAnswer(category, button) {
    var wholeCategory = Global.CATEGORIES.find((cat) => cat.name == category);
    var answerSelected = document.getElementById(button);

    if (answerSelected.innerText === Global.DATA.data[wholeCategory.reached].attributes.canonicalTitle) {
        wholeCategory.correct++
        answerSelected.classList.add('correct');
    } else {
        wholeCategory.incorrect++
        answerSelected.classList.add('incorrect');
    }
    wholeCategory.reached++;
    document.getElementsByClassName('answersContainer')[0].classList.add('finished');
    document.getElementsByClassName('nextButton')[0].classList.remove('unclickable')
}
