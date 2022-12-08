(() => {
    let cities = ['Prague', 'Hanoi', 'Washington', 'Tokyo', 'Brussels', 'Cairo', 'Rome', 'Oslo', 'London', 'Peking'];
    let firstCard = null;
    let secondCard = null;
    cities = cities.concat(cities);
    cities.sort(() => { return 0.5 - Math.random(); });

    const cardList = document.querySelector('#game-field');
    const pointsElement = document.querySelector('#points');

    const createCards = (city) => {
        const cardElement = document.createElement('div');
        const cardText = document.createElement('div');
        cardText.classList.add('invisible');
        cardText.innerText = city;
        cardElement.appendChild(cardText);
        cardElement.classList.add('card');
        cardElement.addEventListener('click', () => {

            if (!firstCard) {
                cardElement.childNodes[0].classList.remove('invisible');
                cardText.parentNode.classList.add('disabled');
                firstCard = cardText;
                cardText.parentNode.classList.add('revealed');
                return;
            };

            if (!secondCard) {
                cardElement.childNodes[0].classList.remove('invisible');
                cardText.parentNode.classList.add('disabled');
                secondCard = cardText;
                cardText.parentNode.classList.add('revealed');
                if (firstCard.innerText === secondCard.innerText) {
                    pointsElement.innerText = Number(pointsElement.innerText) + 1;
                    setTimeout(() => {
                        firstCard.parentNode.classList.add('disabled');
                        secondCard.parentNode.classList.add('disabled');
                        firstCard = null;
                        secondCard = null;
                        return;
                    }, '2000');
                }

                else {
                    pointsElement.innerText = Number(pointsElement.innerText) - 1;
                    if (pointsElement.innerText === '-1') {
                        pointsElement.innerText = 0;
                    };

                    setTimeout(() => {
                        firstCard.classList.add('invisible');
                        firstCard.parentNode.classList.remove('disabled');
                        secondCard.classList.add('invisible');
                        secondCard.parentNode.classList.remove('disabled');
                        firstCard.parentNode.classList.remove('revealed');
                        secondCard.parentNode.classList.remove('revealed');
                        firstCard = null;
                        secondCard = null;
                    }, "2000");
                }; return;
            } return;
        });

        cardList.appendChild(cardElement);
    };

    cities.forEach(item => createCards(item));
})();