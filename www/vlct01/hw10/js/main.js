(() => {
    //Cities
    let cities = ['Praue', 'Berlin', 'Bratislava', 'Budapest', 'Wienna', 'Madrid', 'Roma', 'Lisboa', 'Paris', 'Amsterdam', 'London', 'Moscow', 'Los Angeles', 'Vancouver', 'Sydney'];
    cities.sort(() => { return 0.5 - Math.random(); });


    //Gamefield
    const gameField = document.querySelector('#game-field');

    //Points
    const pointsElement = document.querySelector('#points');
    let points = 0;
    const setPoints = () => {
        pointsElement.innerText = points;
    }

    //Cards
    let flippedCards = [];
    let canAdd = false;
    let remainingCards;


    const createCard = (buttonId) => {
        const card = document.createElement('button');
        card.classList.add('card');
        card.innerText = cities[buttonId];

        card.addEventListener('click', () => {
            if (flippedCards[0] === card) {
                alert('You can not flip the same card in one move!');
                return false;
            }

            if (canAdd) {
                flippedCards.push(card);
                card.classList.add('revealed');
            }

            if (flippedCards.length == 2 && canAdd) {
                canAdd = false;
                setTimeout(flipCardBack, 1000);
            }
        });

        return card;
    }

    const prepareGameField = (cardNumber) => {
        gameField.innerHTML = "";
        remainingCards = cardNumber / 2;
        canAdd = true;
        setPoints();

        cities = cities.slice(0, cardNumber / 2);
        cities = cities.concat(cities);

        cities.sort(() => { return 0.5 - Math.random(); });

        for (i = 0; i < cardNumber; i++) {
            gameField.appendChild(createCard(i));
        }
    }

    //Creates form
    const startFormDiv = document.querySelector('#start-form');

    const pageHeading = document.createElement('h3');
    pageHeading.innerText = 'Set a number of card pairs in your new game:';

    const cardNumberInput = document.createElement('input');
    cardNumberInput.setAttribute('type', 'number');
    cardNumberInput.setAttribute('value', '15');
    cardNumberInput.setAttribute('min', '1');
    cardNumberInput.setAttribute('max', '15');
    cardNumberInput.setAttribute('required', '');

    const startForm = document.createElement('form');
    startForm.appendChild(pageHeading);
    startForm.appendChild(cardNumberInput);

    const startGameButton = document.createElement('button');
    startGameButton.innerText = 'Start a new game';
    startForm.appendChild(startGameButton);

    startFormDiv.appendChild(startForm);

    startForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const cardNumber = cardNumberInput.value.trim() < cities.length ? cardNumberInput.value.trim() * 2 : 30;
        prepareGameField(cardNumber);
    });

    const flipCardBack = () => {
        if (!isMatch()) {
            flippedCards.forEach(card => {
                card.classList.remove('revealed');
            });
        }

        setPoints();
        flippedCards = [];

        if (remainingCards == 0) {
            alert('Congratulations! You have completed the game with ' + points + ' point(s).');
            return;
        }

        canAdd = true;
    }

    const isMatch = () => {
        if (flippedCards[0].innerText == flippedCards[1].innerText) {
            points++;
            remainingCards--;

            return true
        }
        else {
            points == 0 ? 0 : points--;
            return false;
        }
    }
})();