(() => {
    // prepare cities
    let cities = ['Prague', 'Lisbon', 'Madeira', 'Mexico City', 'Berlin', 'Kuala Lumpur', 'Nairobi', 'San Francisco', 'Chicago', 'Brno'];
    let firstCard = null;
    let secondCard = null;
    cities = cities.concat(cities);
    cities.sort(() => { return 0.5 - Math.random(); });

    // get elements from html
    const cardList = document.querySelector('#game-field');
    const pointsElement = document.querySelector('#points');

    // create card function
    const createCard = (city) => {
        const cardElement = document.createElement('div');
        const cardText = document.createElement('div');
        cardText.classList.add('invisible');
        cardText.innerText = city;
        cardElement.appendChild(cardText);
        cardElement.classList.add('card');
        cardElement.addEventListener('click', () => {
            if (!firstCard) { // check if one card was opened already
                cardElement.childNodes[0].classList.remove('invisible'); // show the city
                cardText.parentNode.classList.add('disabled'); // disable click
                firstCard = cardText; // store the city name
                cardText.parentNode.classList.add('revealed'); // reveal the card
                return;
            };
            if (!secondCard) { // check if second card was opened already
                cardElement.childNodes[0].classList.remove('invisible'); // show the city
                cardText.parentNode.classList.add('disabled'); // disable click (is someone click the same card twice)
                secondCard = cardText; // store the city name
                cardText.parentNode.classList.add('revealed'); // display the card
                if (firstCard.innerText === secondCard.innerText) { // if the cards are the same
                    pointsElement.innerText = Number(pointsElement.innerText) + 1; //add points
                    if (pointsElement.innerText === '10') { // if 10 show winner
                        pointsElement.insertAdjacentHTML('afterend', '<div class="winner">Winner!<div>');
                    };
                    setTimeout(() => {
                        firstCard.parentNode.classList.add('disabled'); // disable click
                        secondCard.parentNode.classList.add('disabled');
                        firstCard = null; // remove values
                        secondCard = null;
                        return;
                    }, '2000');
                } else {
                    setTimeout(() => { // the cards arent the same
                        firstCard.classList.add('invisible'); // hide value
                        firstCard.parentNode.classList.remove('disabled'); // enable click
                        secondCard.classList.add('invisible'); // hide value
                        secondCard.parentNode.classList.remove('disabled'); // enable click
                        firstCard.parentNode.classList.remove('revealed'); // hide the card
                        secondCard.parentNode.classList.remove('revealed'); // hide the second card
                        firstCard = null; // remove value from variable
                        secondCard = null;
                    }, "2000");
                };
                return;
            }
            return;
        });
        cardList.appendChild(cardElement); // add the cards to the div
    };

    // create the table with cards
    cities.forEach(item => createCard(item));
})();