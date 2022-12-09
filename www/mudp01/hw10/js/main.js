const points = document.querySelector("#points");
const board = document.querySelector("#game-field");

let pointCounter = 0;
let cardCounter = 1;
let turned = 0;
let idCounter = 1;
let lastCard;

//delay in ms
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

//randomizing cards on board
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//creating cards
let pack = "Prague Prague London London Paris Paris Kabul Kabul Baku Baku Brasilia Brasilia Sofia Sofia Havana Havana Tehran Tehran Dublin Dublin".split(" ");
//shuffleArray(pack);
pack.forEach(createCards)

function createCards(card) {
    const theCard = document.createElement("p");
    theCard.setAttribute("id", card + idCounter);
    idCounter++;
    theCard.setAttribute("class", card);
    theCard.style.backgroundColor = "#224B0C"

    theCard.addEventListener("click", function () {

        //preparing variables for not clicking on same card twice
        let tmp1 = theCard.getAttribute("id");
        let tmp2;
        if (turned === 1) {
            tmp2 = lastCard.getAttribute("id");
        } else {
            tmp2 = "";
        }

        //check for clicking on the same card twice + check for clicking on already solved card
        if ((tmp1 !== tmp2) && (theCard.className.localeCompare("disabled") !== 0)) {
            // second card revelation
            if (turned === 1) {
                turned--;
                //cards matched
                if (theCard.className === lastCard.className) {
                    theCard.style.backgroundColor = "#C1D5A4"
                    theCard.innerText = card;
                    theCard.setAttribute("class", "disabled");
                    lastCard.setAttribute("class", "disabled");
                    pointCounter++;
                    cardCounter = cardCounter + 2;
                    points.innerHTML = pointCounter;
                    if (cardCounter === idCounter) {
                        delay(100).then(() => alert("Your total points: " + pointCounter));
                    }
                    //cards didnt match
                } else {
                    theCard.style.backgroundColor = "#C1D5A4";
                    theCard.innerText = card;
                    delay(600).then(() => theCard.style.backgroundColor = "#224B0C")
                    delay(600).then(() => theCard.innerText = "")
                    delay(600).then(() => lastCard.style.backgroundColor = "#224B0C")
                    delay(600).then(() => lastCard.innerText = "")
                    if (pointCounter > 0) {
                        pointCounter--;
                    }
                    points.innerHTML = pointCounter;
                }
                //first card revelation
            } else {
                turned++;
                lastCard = theCard;
                theCard.style.backgroundColor = "#C1D5A4";
                theCard.innerText = card;
            }
        }
    })
    board.appendChild(theCard);
}


