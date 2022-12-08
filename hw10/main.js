(() => {
  let cities = [
    "Vienna",
    "Warsaw",
    "London",
    "Tbilisi",
    "Sofia",
    "Barcelona",
    "Budapest",
    "Bratislava",
    "Oslo",
    "Stockholm",
  ];
  //'Prague', 'Instanbul', 'Moscow', 'Berlin', 'Madrid', 'Kyiv', 'Rome', 'Bucharest', 'Paris', 'Minsk',
  cities = cities.concat(cities);
  cities.sort(() => {
    return 0.5 - Math.random();
  });
  const gameField = document.querySelector("#game-field");
  const points = document.querySelector("#points");
  let firstCard = null;
  let secondCard = null;
  let score = 0;
  let numberOfMatchedCards = 0;

  const addCard = (city) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerText = city;
    flipCard(card);
    gameField.appendChild(card);
  };

  const flipCard = (card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("revealed")) {
        return false;
      }

      if (!firstCard) {
        firstCard = card;
        firstCard.classList.add("revealed");
        return false;
      }
      secondCard = card;
      secondCard.classList.add("revealed");

      if (firstCard.innerText === secondCard.innerText) {
        score += 1;
        numberOfMatchedCards += 1;
        points.innerText = score;
        firstCard = null;
        secondCard = null;

        if (numberOfMatchedCards === 10) {
          setTimeout(() => {
            alert(`Game over! Final score: ${points.innerText} `);
          }, 500);
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove("revealed");
          secondCard.classList.remove("revealed");
          firstCard = null;
          secondCard = null;

          if (score === 0) {
            return false;
          }

          score -= 1;
          points.innerText = score;
        }, 1000);
      }
    });
  };

  cities.forEach((city) => {
    addCard(city);
  });
})();
