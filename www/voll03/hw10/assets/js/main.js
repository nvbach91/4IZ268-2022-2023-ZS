(() => {
    // DOM variables
    const pointsCount = document.getElementById('points-count');
    const cardBoard = document.querySelector('.container-cards');

    // global state variables
    let firstCard = null;
    let secondCard = null;
    let turns = 0;
    let points = 0;
    let totalMatches = 0;
    let freeze = false;

    /** Fill the card board with pexeso cards */
    const fillCardBoard = () => {
        let candidates = ['Andrej Babiš', 'Petr Pavel', 'Danuše Nerudová', 'Pavel Fischer',
            'Marek Hilšer', 'Josef Středula', 'Jaroslav Bašta', 'Tomáš Zima', 'Denisa Rohanová', 'Karel Diviš'];
        candidates = candidates.concat(candidates);
        candidates.sort(() => { return 0.5 - Math.random(); });

        let cards = [];

        candidates.forEach((candidate) => {
            cards.push(createCardElement(candidate));
        });

        cardBoard.append(...cards);
    };

    /** Create individual pexeso card element */
    const createCardElement = (cardTitle) => {
        // parse candidate's name in order to find the fitting picture 
        let cardImgName = cardTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');

        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-wrapper">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="./assets/img/${cardImgName}.png" alt="${cardTitle}">
                    <h2 class="card-title">${cardTitle}</h2>
                </div>
            </div>
        `;

        cardElement.addEventListener('click', () => {
            // prevent from picking the same card again or picking for the third time
            if (freeze || cardElement.querySelector('.card-wrapper').classList.contains('flip')) {
                return;
            }

            cardElement.querySelector('.card-wrapper').classList.add('flip');
            applyTurn(cardElement);
        });

        return cardElement;
    };

    /** Turn game logic */
    const applyTurn = (chosenCard) => {
        // check if player picks for the first or second time
        if (turns === 0) {
            firstCard = chosenCard;
        } else if (chosenCard === firstCard) {
            return;
        }

        secondCard = chosenCard;
        turns++;

        // check chosen pair after second pick and during that, freeze the game for 2 seconds
        if (turns === 2) {
            ((firstCard, secondCard) => {
                freeze = true;
                setTimeout(() => {
                    checkMatch(firstCard, secondCard);
                    freeze = false;
                }, 2000);
            })(firstCard, secondCard);

            resetTurns();
        }
    }

    /** Check whether the player picked matching cards */
    const checkMatch = (firstCard, secondCard) => {
        firstCardTitle = firstCard.querySelector('.card-title').textContent;
        secondCardTitle = secondCard.querySelector('.card-title').textContent;

        // both cards match - success
        if (firstCardTitle === secondCardTitle) {
            points++;
            pointsCount.innerHTML = points;
            totalMatches++;

            // check for winning condition
            if (totalMatches === 10) {
                alert(`Vyhráli jste!

Finální skóre: ${points}`);
            }

            return;
        }

        firstCard.querySelector('.card-wrapper').classList.remove('flip');
        secondCard.querySelector('.card-wrapper').classList.remove('flip');

        if (points > 0) {
            points--;
            pointsCount.innerHTML = points;
        }

    }

    /** Reset turns after a pair was picked in order to continue the game */
    const resetTurns = () => {
        turns = 0;
        firstCard = null;
        secondCard = null;
    };

    fillCardBoard();
})();
