const ANIMALS = [
  { id: 1, name: 'Kůň' },
  { id: 2, name: 'Zebra' },
  { id: 3, name: 'Zajíc' },
  { id: 4, name: 'Pes' },
  { id: 5, name: 'Kočka' },
  { id: 6, name: 'Křeček' },
  { id: 7, name: 'Slon' },
  { id: 8, name: 'Kapybara' },
  { id: 9, name: 'Wombat' },
  { id: 10, name: 'Šnek' },
];

let finishedCards = 0; // number of finished cards

let card1 = null; // selected card1
let card2 = null; // selected card2

let points = 0; // number of points

const changePoints = n => {
  // points cannot be negative
  if (points + n < 0) {
    return;
  }

  points += n;

  document.getElementById('points').innerText = points;
}

const handleClick = event => {
  const card = event.currentTarget;

  // card is already revealed
  if (card.classList.contains('revealed') || card.classList.contains('finished')) {
    return;
  }

  // two cards are currently showing waiting to be flipped back
  if (card1 !== null && card2 !== null) {
    return;
  }

  // reveal card
  revealCard(card);

  if (card1 !== null && card2 !== null) {
    processRevealedCards();
  }
}

const finnishCard = id => {
  const card = document.querySelector(`[data-id="${id}"].revealed:not(.finished)`);

  if (!card) {
    throw new Error(`Undefined card ID ${id}!`);
  }

  card.classList.add('finished');

  finishedCards++;
}

const hideCard = id => {
  const card = document.querySelector(`[data-id="${id}"].revealed:not(.finished)`);

  if (!card) {
    throw new Error(`Undefined card ID ${id}!`);
  }

  card.classList.remove('revealed');
}

const revealCard = card => {
  const id = Number.parseInt(card.getAttribute('data-id'));

  card.classList.add('revealed');

  if (card1 === null) {
    card1 = id;
  } else {
    card2 = id;
  }
}

const checkFinish = () => {
  if (finishedCards < 2 * ANIMALS.length) {
    return;
  }

  window.setTimeout(() => {
    alert(`You finished the game with ${points} points!`);
    reset(); // reset deck after finish
  }, 500); // dispatch alert after 0.5s so the transition can finish
}

const processRevealedCards = () => {
  if (card1 === null || card2 === null) {
    return;
  }

  // -> cards match
  if (card1 === card2) {
    finnishCard(card1);
    finnishCard(card2);

    card1 = null;
    card2 = null;

    changePoints(1);

    checkFinish();

    return;
  }

  // -> cards don't match
  window.setTimeout(() => {
    hideCard(card1);
    hideCard(card2);

    card1 = null;
    card2 = null;

    changePoints(-1);
  }, 2000); // 2s
}

const createCard = item => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', item.id);

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div')
  cardFront.classList.add('card-front');

  const cardBack = document.createElement('div')
  cardBack.innerText = item.name;
  cardBack.classList.add('card-back');

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  // attach event listener
  card.addEventListener('click', handleClick);

  return card;
}

function reset() {
  card1 = null;
  card2 = null;

  finishedCards = 0;

  changePoints(-points); // reset points to 0

  init();
}

function init() {
  const gameField = document.getElementById('game-field');

  // clear playing board
  while(gameField.firstChild) {
    gameField.removeChild(gameField.lastChild);
  }

  // 1. duplicate every item in the array
  // 2. randomize
  // 3. place the card into the field
  ANIMALS.flatMap(item => [item, item])
    .sort(() => 0.5 - Math.random())
    .forEach(item => {
      gameField.appendChild(createCard(item));
    });
}

init();