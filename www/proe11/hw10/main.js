let cities = ['Prague', 'Cairo', 'Berlin', 'London', 'Singapur', 'Paris', 'Bangkok', 'Warsaw', 'Tokyo', 'Rome'];
cities = cities.concat(cities);
cities.sort(() => { return 0.5 - Math.random(); });

const pickedCards = new Array();
var succesfulPairings = 0;
var gameField = document.getElementById('field');
var pointsElement = document.getElementById('pointCounter');
var points = 0;

const initCard = (card) => {
    card.addEventListener('click', () => {
        if (pickedCards.length == 2) {
            return false;
        }

        if (card.classList.contains('revealed') || card.classList.contains('done')) {
            return false;
        }

        card.classList.remove('unrevealed');
        card.classList.add('revealed');
        pickedCards.push(card);

        console.log(pickedCards);

        if (pickedCards.length == 1) {
            return;
        }

        if (pickedCards[0].innerText === pickedCards[1].innerText) {
            succesfulPairings += 1;
            points += 1;
            pointsElement.innerText = points;

            setTimeout(() => {
                pickedCards.forEach(element => {
                    element.classList.remove('revealed');
                    element.classList.add('done');
                })
                pickedCards.length = 0;

            }, 800)

            if (succesfulPairings == 10) {
                setTimeout(() => {
                    alert('Good job, you have scored ' + points + ' points.');
                }, 1500);
            }

            return;
        }

        if (points > 0) {
            points -= 1;
        } else {
            points = 0;
        }

        pointsElement.innerText = points;

        setTimeout(() => {
            pointsElement.innerText = points;
            pickedCards.forEach(element => {
                element.classList.remove('revealed');
                element.classList.add('unrevealed');
            })
            pickedCards.length = 0;
        }, 1200);

    })

}

let cardMaker = (cityName) => {
    var card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('unrevealed');
    card.innerText = cityName;
    initCard(card);
    gameField.appendChild(card);
}

cities.forEach(cityName => {
    cardMaker(cityName);
});