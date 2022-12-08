//declare 10 cities, duplicate and shuffle
var cities = [
    'Toronto',
    'Helsinki',
    'Stockholm',
    'Brussels',
    'Prague',
    'Vienna',
    'Venice',
    'Florence',
    'Valletta',
    'Havana'];

var duplicates = cities.concat(cities);

var shuffled = duplicates.sort(() => { return 0.5 - Math.random(); });

var points = document.querySelector('#points');
var gameField = document.querySelector('#game-field');

var first = null;
var second = null;
var pointsCount = 0;
var revealedCount = 0;
//main card function
var createCard = function(card) {
    card.addEventListener('click', function() {
        //nothing happens if the card was revealed or both are open
        if (card.classList.contains('revealed')) {
            return false;
        }
        if (first && second) {
            return false;
        }
        //if no card was opened first, make this card the 1st one,
        //otherwise make it the 2nd one
        card.classList.add('revealed');
        if (!first) {
            first = card;
            return false; 
        } 
            second = card;
        
        //compare city values, reset and add a point if they match
        if (first.innerText === second.innerText) {
            first = null;
            second = null;
            pointsCount++;
            revealedCount += 2;
            if (revealedCount === duplicates.length) {
                setTimeout(function() {
                    alert('You\'ve won the game! Final score: ' + pointsCount)
                }, 1000);
            }
        //if they don't match remove a point and reset
        } else {
            pointsCount--;
            if (pointsCount < 0) {
                pointsCount = 0;
            }
            setTimeout(function() {
                first.classList.remove('revealed');
                second.classList.remove('revealed');
                first = null;
                second = null;
            }, 2000);
        }
        points.innerText = pointsCount;
    });
};

//set up the game field by making and adding cards
var addCard = function(name) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    createCard(card);
    gameField.appendChild(card);
};

shuffled.forEach(function(city) {
    addCard(city);
});
