// Declare variables
let cards = ['Prague','Prague', 'London', 'London', 'Paris', 'Paris', 'Moscow', 'Moscow', 'Los Angeles', 'Los Angeles', 'Vancouver', 'Vancouver', 'Sydney', 'Sydney', 'Helsinki', 'Helsinki', 'Singapore', 'Singapore', 'Tokyo', 'Tokyo'];
let currentCards = [];
let points = 0;
let firstCard, secondCard;
let flippedCards = 0;

// Shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create the board
function createGameBoard() {
  let gameField = document.getElementById('game-field');
  let shuffledCards = shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = shuffledCards[i];
    card.addEventListener('click', flipCard);
    gameField.appendChild(card);
    currentCards.push(card);
  }
}

// Flip cards
function flipCard() {
  if (flippedCards === 0) {
    firstCard = this;
    firstCard.innerHTML = firstCard.dataset.name;
    firstCard.classList.add('flipped');
    flippedCards++;
  } else {
    secondCard = this;
    secondCard.innerHTML = secondCard.dataset.name;
    secondCard.classList.add('flipped');
    flippedCards--;

    // If cards match
    if (firstCard.dataset.name === secondCard.dataset.name) {
      setTimeout(() => {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        points++;
        document.getElementById('points').innerHTML = points;
      }, 500);

    // If cards don't match
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
        if (points > 0) {
          points--;
          document.getElementById('points').innerHTML = points;
        }
      }, 500);
    }
  }
}

// Initialize
createGameBoard();