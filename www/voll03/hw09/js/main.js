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
const alphabetLength = alphabet.length;

// DOM variables
const inputForm = document.getElementById('inputForm');
const inputText = document.getElementById('input-text');
const inputKey = document.querySelector('[name=used-key]');
const resultField = document.querySelector('.result');

// submit event
inputForm.addEventListener('submit', (event) => {
    // prevent default form behaviour upon send
    event.preventDefault();

    // clear result field in case of re-using
    resultField.innerHTML = "";

    // creation of element with deciphered text
    const resultText = document.createElement('p');

    // task is meant to be solved for upper case letters only - normal text is transformed
    const result = caesarDecipher((inputText.value).toUpperCase(), inputKey.value)

    if (result !== false) {
        resultText.innerText = result;

        // insert result text into the page
        resultField.appendChild(resultText);
    }
})

/** shiftChar - a helper function to shift one character inside the
 *  alphabet based on the shift value and return the result
 */
const shiftChar = (c, shift) => {
    // pushes given letter to the left by given key (shift)
    if (alphabet.includes(c)) {
        let charIndex = alphabet.indexOf(c);

        return (charIndex - shift < 0)
            ? alphabet.charAt(alphabetLength - (shift - charIndex))
            : alphabet.charAt(charIndex - shift);
    }

    return c;
};

/** shiftString - a helper function to shift one entire string inside the 
 *  alphabet based on the shift value and return the result
 */
const shiftString = (str, shift) => {
    // splits given string into array of chars that is used by helper function;
    // helper function returns shifted (deciphered) chars that are stored into original array.
    let charArray = str.split('');

    for (let i = 0; i < charArray.length; i++) {
        let currentChar = charArray[i];
        charArray[i] = shiftChar(currentChar, shift);
    }

    // deciphered array is joined into a single string and returned
    return charArray.join('');
};

/** caesarDecipher - deciphers given message from caesar cypher into normal
 * text that can be understood. Needs a key in order to work properly.
 */
const caesarDecipher = (cipherText, usedKey) => {
    // error checks
    if (!cipherText || cipherText.length === 0) {
        alert('Given message is empty or in incorrect format!');
        return false;
    }

    if (!usedKey || usedKey < 1 || usedKey > 25) {
        alert('Given key is empty or invalid!');
        return false;
    }

    // splits given string into array of strings (words) that is used by helper function;
    // helper function returns shifted (deciphered) strings (words) that are stored into original array
    let stringArray = cipherText.split(' ');

    for (let i = 0; i < stringArray.length; i++) {
        let currentString = stringArray[i];
        stringArray[i] = shiftString(currentString, usedKey);
    }

    // deciphered array is joined into a single string and returned
    return stringArray.join(' ');
};


// simple test of functionality

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));