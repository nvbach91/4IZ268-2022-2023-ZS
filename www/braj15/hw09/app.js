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


const bodyElement = document.querySelector('body');
const formElement = document.createElement('form');
formElement.classList.add('app__form');
const divElement = document.createElement('div');
const encryptedTextArea = document.createElement('input');
const decipherButton = document.createElement('input');
const decipheredText = document.createElement('p');
const keyValue = document.createElement('input');
const heading = document.querySelector('h1');
heading.setAttribute('id', 'myHeading');


encryptedTextArea.classList.add('form__area');
decipheredText.classList.add('output');
keyValue.classList.add('form__area');
keyValue.classList.add('key');

decipherButton.classList.add('submit__button');


decipherButton.setAttribute('type', 'button');
decipherButton.value = 'DECIPHER!';

encryptedTextArea.setAttribute('type', 'text');
encryptedTextArea.setAttribute('placeholder', 'Your cypher here');

keyValue.setAttribute('type', 'text');
keyValue.setAttribute('placeholder', 'Your key value');

decipheredText.setAttribute('type', 'text');
decipheredText.setAttribute('placeholder', 'Your deciphered text');

formElement.appendChild(encryptedTextArea);
formElement.appendChild(keyValue);
formElement.appendChild(decipherButton);
formElement.appendChild(decipheredText);


divElement.appendChild(formElement);

bodyElement.appendChild(divElement);



const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    let upperLetter = c.toUpperCase();
    let position = alphabet.indexOf(upperLetter);
    let newPosition = position-shift;

    while(newPosition < 0) {
        newPosition += alphabet.length;
    }

    const newLetter = alphabet.charAt(newPosition);
    return newLetter;

    // if (newPosition < 0) {
    //     newPosition += alphabet.length;
    //     const newLetter = alphabet.charAt(newPosition);
    //     return newLetter;
    // } else {
    //     const newLetter = alphabet.charAt(newPosition);
    //     return newLetter; 
    // }

    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
};
const shiftString = (str, shift) => {
    let newString = "";
    let letterInString = "";
    let newLetterInString = "";
    str = str.toUpperCase();

    let stringArray = str.split('');
    console.log(stringArray);
    let splittedAlphabet = alphabet.split('');

    for (let index = 0; index < stringArray.length; index++) {
        letterInString = stringArray[index];
        if(!splittedAlphabet.includes(letterInString)){
            newString = newString + letterInString;
        } else {
            newLetterInString = shiftChar(letterInString, shift);
            newString = newString + `${newLetterInString}`;
        }
    }
    return newString;
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};
const caesarDecipher = (cipherText, usedKey) => {
    
    const shiftedText = shiftString(cipherText, usedKey);
    decipheredText.innerText = shiftedText;
};

decipherButton.addEventListener('click', () => {
    const stringToUse = encryptedTextArea.value;
    console.log(stringToUse);
    const keyToUse = parseInt(keyValue.value);
    console.log(keyToUse);
    caesarDecipher(stringToUse,keyToUse);
})





