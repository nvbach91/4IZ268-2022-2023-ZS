const points = document.querySelector('#points');
const field = document.querySelector('#game-field');

var firstCard = null;
var secondCard = null;
var cities = ['Tokyo', 'Kyoto', 'Osaka', 'Sapporo', 'Hiroshima', 'Yokohama', 'Fukuoka', 'Kobe', 'Chiba', 'Nagasaki'];
cities = cities.concat(cities);
cities.sort(() => { return 0.5 - Math.random(); });

cities.forEach(function (city) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = city;
    addEvents(card)
    field.appendChild(card);
});

function addEvents(card) {
    card.addEventListener('click', function () {
        if (card.classList.contains('onDisplay') || (firstCard && secondCard)) {
            return false;
        }

        card.classList.add('onDisplay');

        if (!firstCard) {
            firstCard = card;
            return false;
        }

        secondCard = card;

        if (firstCard.innerText === secondCard.innerText) {
            points.innerText = Number(points.innerText) + 1;
            firstCard = null;
            secondCard = null;
            if (points.innerText === '10') {
                setTimeout(function () {
                    alert('Win!');
                }, 500);
            }
        } else {
            setTimeout(function () {
                firstCard.classList.remove('onDisplay');
                firstCard = null;
                secondCard.classList.remove('onDisplay');
                secondCard = null;
            }, 500);

        }
    })
}

