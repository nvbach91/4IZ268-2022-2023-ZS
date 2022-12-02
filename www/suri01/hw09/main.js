/**
 * Long live Sparta! Vytvořte funkci, která vyřeší Caesarovu širfu. Funkce dostane
 * na vstup zašifrovaný text a také hodnotu, která byla použita při šifrování, a pak
 * vrátí dešifrovaný text. Předpokládejte pouze anglickou abecedu s velkými
 * písmeny, ostatní znaky ignorujte. Poté v konzoli dešifrujte/dešiftujte následující texty.
 *
 * key used - encrypted text
 *       19 - MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG
 *        5 - YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW
 *       12 - M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ
 *
 * Následně vytvořte uživatelské rozhraní, ve kterém bude možné zadat zmíněné dvě
 * vstupní hodnoty (zašifrovaný text a použitý klíč) a po kliknutí na tlačítko
 * "Decipher!" se na určeném místě zobrazí dešifrovaný text. Rozhraní také vhodně
 * nastylujte.
 */
//              0123456789...
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const bodyElement = document.querySelector("body");
const interface = document.createElement("div");
interface.setAttribute("id", "interface-container");
const headerText = document.createElement("h1");
headerText.innerText = "Caesarova šifra";
bodyElement.appendChild(headerText);
bodyElement.appendChild(interface);

const cipherInput = document.createElement("input");
cipherInput.setAttribute("placeholder", "Insert your cipher here!");
interface.appendChild(cipherInput);

const keyInput = document.createElement("input");
keyInput.setAttribute("placeholder", "Insert your key here!");
interface.appendChild(keyInput);

const cipherButton = document.createElement("button");
cipherButton.innerText = "DECIPHER!";
cipherButton.setAttribute("id", "cipherbutton");
interface.appendChild(cipherButton);

const decipheredText = document.createElement("div");
decipheredText.setAttribute("id", "decipheredtext");
interface.appendChild(decipheredText);

const decipheredTextP = document.createElement("p");
decipheredText.appendChild(decipheredTextP);

const shiftChar = (c, shift) => {
  // a helper function to shift one character inside the
  // alphabet based on the shift value and return the result
  var solved = "";

  let upperCaseLetter = c.toUpperCase();
  const letter = alphabet.indexOf(upperCaseLetter) - shift;

  if (letter >= 0 && letter <= 24) {
    solved += alphabet.charAt(letter);
  } else if (letter + shift === -1) {
    solved += upperCaseLetter;
  } else {
    solved += alphabet.charAt(letter + 26);
  }

  return solved;
};
const shiftString = (str, shift) => {
  // a helper function to shift one entire string inside the
  // alphabet based on the shift value and return the result
  var solved = "";

  for (let i = 0; i < str.length; i++) {
    var stringWord = str[i];
    solved += shiftChar(stringWord, shift);
  }
  return solved;
};

const caesarDecipher = (cipherText, usedKey) => {
  const shiftedText = shiftString(cipherText, usedKey);
  decipheredTextP.innerText = shiftedText;
};

cipherButton.addEventListener("click", () => {
  const stringUsed = cipherInput.value;
  const keyToUse = parseInt(keyInput.value);
  caesarDecipher(stringUsed, keyToUse);
});

console.log(
  shiftString(
    "MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG",
    19
  )
);

console.log(
  shiftString(
    "YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW",
    5
  )
);

console.log(
  shiftString(
    "M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ",
    12
  )
);
