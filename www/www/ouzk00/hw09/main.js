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
const alphabetSplit = alphabet.split("");

const shiftChar = (c, shift) => {
  if (alphabetSplit.includes(c) === true) {
    c = alphabet.indexOf(c) - shift + 26;
    for (; c > 25; ) {
      c = c - 26;
    }
    return alphabet[c];
  } else {
    return c;
  }
  // a helper function to shift one character inside the
  // alphabet based on the shift value and return the result
};

const shiftString = (str, shift) => {
  let shiftedString = "";
  for (let i = 0; i < str.length; i++) {
    let stringByLetters = str[i];
    shiftedString += shiftChar(stringByLetters, shift);
  }
  return shiftedString;
  // a helper function to shift one entire string inside the
  // alphabet based on the shift value and return the result
};

const caesarDecipher = (cipherText, usedKey) => {
  return shiftString(cipherText, usedKey);
  // your implementation goes here
  // good to know:
  //    str.indexOf(c) - returns the index of the specified character in the string
  //    str.charAt(i) - returns the character at the specified index in the string
  //    when the shifted character is out of bound, it goes back to the beginning and count on from there
};

// albert einstein
console.log(
  caesarDecipher(
    "MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG",
    19
  )
);

// john archibald wheeler
console.log(
  caesarDecipher(
    "YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW",
    5
  )
);

// charles darwin
console.log(
  caesarDecipher(
    "M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ",
    12
  )
);

const inputElement = document.querySelector("#input");
const keyElement = document.querySelector("#key-and-button");
const outputElement = document.querySelector("#output");

const encryptedInput = document.createElement("textarea");
encryptedInput.setAttribute("placeholder", "Write you encrypted text here");
encryptedInput.setAttribute("class", "encrypted");

const keyInput = document.createElement("textarea");
keyInput.setAttribute("placeholder", "Key value");
keyInput.setAttribute("class", "key");

const decipheredResult = document.createElement("p");
decipheredResult.setAttribute("class", "output");

const buttonDecipher = document.createElement("button");
buttonDecipher.innerText = "Decipher!";
buttonDecipher.addEventListener("click", () => {
  console.log(caesarDecipher(encryptedInput.value, keyInput.value));
  decipheredResult.innerText = caesarDecipher(
    encryptedInput.value,
    keyInput.value
  );
});

inputElement.appendChild(encryptedInput);
keyElement.appendChild(keyInput);
keyElement.appendChild(buttonDecipher);
outputElement.appendChild(decipheredResult);
