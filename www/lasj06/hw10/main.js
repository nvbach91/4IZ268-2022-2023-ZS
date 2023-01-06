var values = ['Prague', 'London', 'Paris', 'Moscow', 'California', 'Vancouver', 'Sydney', 'Tokyo', 'Beijing', 'New York'];
values = values.concat(values);
values.sort(function() {
    return 0.5 - Math.random();
});

var points = 0;
var firstCard = null;
var secondCard = null;
var correctPairCount = 0;

var pexeso = document.querySelector('#pexeso');
var pointsDisplay = document.querySelector('#pointsDisplay');

var main = (card => {
    card.addEventListener('click', function() {
        if (card.classList.contains('revealed')) {
            return false;
        }
        
        if (firstCard && secondCard) {
            return false;
        }

        card.classList.add('revealed');
        
        if (!firstCard) {
            firstCard = card;
            return false;
        }

        secondCard = card;

        if (firstCard.innerText === secondCard.innerText) {
            points++;
            correctPairCount++;
            firstCard = null;
            secondCard = null;
            if (correctPairCount === 10) {
                setTimeout(function() {
                    alert('You won!');
                }, 1000);
            }
        } else {
            points--;
            if (points < 0) {
                points = 0;
            }
            setTimeout(function() {
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
        pointsDisplay.innerText = points;
    });
});

var addCard = (name => {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    main(card);
    pexeso.appendChild(card);
});

values.forEach(value => {
    addCard(value);
});