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
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberOfLetters = alphabet.length - 1;

const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');

const inputTextArea = document.createElement('textarea');
const inputShiftByNumber = document.createElement('input');
const inputButton = document.createElement('button');
const outputTextArea = document.createElement('p');

inputTextArea.setAttribute('type', 'text');
inputShiftByNumber.setAttribute('type', 'number');
inputButton.setAttribute('type', 'button');
inputTextArea.setAttribute('id', 'inputText');
inputShiftByNumber.setAttribute('id', 'shiftBy');
inputButton.setAttribute('id', 'inputButton');
inputButton.innerText = 'Decipher!'

inputElement.appendChild(inputTextArea);
inputElement.appendChild(inputShiftByNumber);
inputElement.appendChild(inputButton);

outputElement.appendChild(outputTextArea);

var inputText = '';
var shiftBy = 0;

const shiftChar = (c, shift) => {
    shift = Number(shift);
    if (alphabet.indexOf(c) < 0) {
        return c;
    }

    var index = alphabet.indexOf(c) - shift;
    if (index < 0) {
        index += alphabet.length;
    }

    return alphabet.charAt(index);
};

const shiftString = (str, shift) => {
    var shiftedSubstring = '';
    var arrayOfLetters = str.split('');

    for (let i = 0; i < arrayOfLetters.length; i++) {
        shiftedSubstring += shiftChar(arrayOfLetters[i], shift);
    }

    return shiftedSubstring;
};

const caesarDecipher = (cipherText, usedKey) => {
    var shiftedString = '';
    const splitArray = cipherText.split(' ');

    splitArray.forEach(element => {
        shiftedString += ' ' + shiftString(element, usedKey);
    });

    return shiftedString;
};

inputButton.addEventListener('click', (event) => {
    event.preventDefault;

    inputText = inputTextArea.value;
    shiftBy = inputShiftByNumber.value;

    outputTextArea.innerText = caesarDecipher(inputText, shiftBy);
})

// albert einstein
//caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
//caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
//caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);