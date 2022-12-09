/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

const cities = [
    'Prague',
    'Kingston',
    'Malabo',
    'Montevideo',
    'Addis Ababa',
    'San Salvador',
    'Bangkok',
    'Belmopan',
    'Rabat',
    'Zagreb',
];

const duplicatedCities = [...cities, ...cities];
for (let i = duplicatedCities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = duplicatedCities[i];
    duplicatedCities[i] = duplicatedCities[j];
    duplicatedCities[j] = temp;
}

const shuffledCities = duplicatedCities;

let pair = [];
let matchedPairsCount = 0;

const points = document.querySelector('#points');
const gameField = document.querySelector('#game-field');

const createCard = (text) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.addEventListener('click', () => {
        if (pair.length === 2 || card.classList.contains('revealed')) {
            return;
        }

        card.classList.add('revealed');
        card.innerText = text;

        pair.push(card);

        if (pair.length === 2) {
            const currentPoints = parseInt(points.innerText);

            if (pair[0].innerText === pair[1].innerText) {
                matchedPairsCount++;

                points.innerText = currentPoints + 1;
                pair.forEach((element) => element.classList.replace('revealed', 'matched'));
                pair = [];

                if (matchedPairsCount === cities.length) {
                    setTimeout(
                        () => alert(`Congratulations! You have finished the game with ${points.innerText} points!`),
                        500
                    );
                }
            } else {
                setTimeout(() => {
                    points.innerText = Math.max(currentPoints - 1, 0);
                    pair.forEach((element) => {
                        element.classList.remove('revealed');
                        element.innerText = '';
                    });
                    pair = [];
                }, 1000);
            }
        }
    });

    return card;
};

const cards = shuffledCities.map(createCard);
gameField.append(...cards);
