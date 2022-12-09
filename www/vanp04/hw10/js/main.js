/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

const cities = ['Prague', 'Berlin', 'Warsaw', 'London', 'Singapur', 'Paris', 'Vienna', 'Tokyo', 'Cairo', 'Rome', 'Prague', 'Berlin', 'Warsaw', 'London', 'Singapur', 'Paris', 'Vienna', 'Tokyo', 'Cairo', 'Rome'];
cities.sort(() => {
    return 0.5 - Math.random();
});

const pickedCards = new Array();
var succesfulPairings = 0;
var gameField = document.getElementById('game-field');
var pointsElement = document.getElementById('points');
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
                    alert('You have succesfully completed this game with: ' + points + ' points.');
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

const createCard = (cityName) => {
    var card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('unrevealed');
    card.innerText = cityName;
    initCard(card);
    gameField.appendChild(card);
}

cities.forEach(cityName => {
    createCard(cityName);
});