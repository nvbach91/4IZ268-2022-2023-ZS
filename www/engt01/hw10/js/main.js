/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = ["Prague", "London", "Paris", "Madrid", "Rome", "Oslo", "Stockholm", "Copenhagen", "Kyiv", "Warsaw"];
cities = cities.concat(cities);
cities.sort(() => (0.5 - Math.random()));

let card1 = null;
let card2 = null;
let points = 0;
let revealedTracker = 0;

for (const city of cities) {
    createCityElem(city);
}

function createCityElem(cityName) {
    const cityElem = document.createElement("div");
    const cityNameSpan = document.createElement("span");
    cityNameSpan.innerText = cityName;
    cityElem.append(cityNameSpan);
    cityElem.classList.add("card");
    cityElem.addEventListener("click", () => cardClick(cityElem));
    document.getElementById("game-field").append(cityElem);
}

function cardClick(card) {
    if (card.classList.contains("revealed")) return;
    if (card1 && card2) return;

    card.classList.add("revealed");

    if (card1 === null) {
        card1 = card;
        return;
    } else card2 = card;

    if (card1.innerText === card2.innerText) {
        revealedTracker += 2;
        points++;
        document.getElementById("points").innerText = points;
        card1 = null;
        card2 = null;

        if (revealedTracker === cities.length) alert("Winner Winner Chicken Dinner");
    } else {
        if (points > 0) points--;
        document.getElementById("points").innerText = points;

        setTimeout(() => {
            card1.classList.remove("revealed");
            card2.classList.remove("revealed");
            card1 = null;
            card2 = null;
        }, 2000);
    }
}
