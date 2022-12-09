(() => {
  let cities = [
    "Barcelona",
    "Dortmund",
    "Madrid",
    "Turin",
    "Prague",
    "London",
    "Paris",
    "Bangkok",
    "Antalya",
    "Dubai",
  ];
  cities = cities.concat(cities);
  cities.sort(() => {
    return 0.5 - Math.random();
  });

  let firstCard = null;
  let secondCard = null;
  let cardsRevealed = null;

  const bodyElement = document.querySelector("body");

  const hOneElement = document.createElement("h1");
  hOneElement.innerText = "The Ultimate Pexeso";
  const hTwoElement = document.createElement("h2");
  hTwoElement.innerText = "Your points:";
  const containerElement = document.createElement("div");
  containerElement.setAttribute("id", "container");
  const paragraphElement = document.createElement("p");
  paragraphElement.innerText = "0";

  bodyElement.appendChild(hOneElement);
  bodyElement.appendChild(hTwoElement);
  bodyElement.appendChild(containerElement);
  hTwoElement.appendChild(paragraphElement);

  paragraphElement.setAttribute("id", "points");

  const pointsSelector = document.querySelector("#points");
  const cardContainer = document.querySelector("#container");

  const cardCreation = (city) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerText = city;
    cardContainer.appendChild(cardElement);

    cardElement.addEventListener("click", () => {
      if (cardElement.classList.contains("card-new")) {
        return false;
      }

      if (!firstCard) {
        cardElement.classList.add("card-new");
        firstCard = cardElement;
        return;
      }

      if (!secondCard) {
        cardElement.classList.add("card-new");
        secondCard = cardElement;

        if (firstCard.innerText === secondCard.innerText) {
          cardsRevealed += 2;

          if (cardsRevealed === cities.length) {
            setTimeout(function () {
              alert(
                `Congratulations! You have completed the game with ${pointsSelector.innerText} points.`
              );
            }, 1000);
          }
          pointsSelector.innerText = Number(pointsSelector.innerText) + 1;
          setTimeout(() => {
            firstCard = null;
            secondCard = null;
          }, "1000");
        } else {
          setTimeout(() => {
            firstCard.classList.remove("card-new");
            secondCard.classList.remove("card-new");
            firstCard = null;
            secondCard = null;
            pointsSelector.innerText = Number(pointsSelector.innerText) - 1;
            if (pointsSelector.innerText < 0) {
              pointsSelector.innerText = 0;
            }
          }, "1000");
        }
      }
    });
  };

  cities.forEach((item) => cardCreation(item));
})();
