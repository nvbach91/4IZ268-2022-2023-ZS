/*
 *
 * Page elements
 *
 */
// Page body
const pageBody = document.querySelector('body');

// Page main
const pageMain = document.createElement('main');
pageBody.appendChild(pageMain);

// Page heading
const pageHeading = document.createElement('h1');
pageHeading.innerText = 'Long live Sparta!';
pageMain.appendChild(pageHeading);

const cipherForm = document.createElement('form');
pageMain.appendChild(cipherForm);

// Cipher textarea
const cipherTextArea = document.createElement('textarea');
cipherTextArea.setAttribute('placeholder', 'Text...');
cipherForm.appendChild(cipherTextArea);
cipherTextArea.focus();

// Key input 
const cipherKeyInput = document.createElement('input');
cipherKeyInput.setAttribute('placeholder', 'Key');
cipherKeyInput.setAttribute('value', '5');
cipherKeyInput.setAttribute('min', '1');
cipherKeyInput.setAttribute('max', '25');
cipherKeyInput.setAttribute('type', 'number');
cipherForm.appendChild(cipherKeyInput);

// Decipher button
const decipherButton = document.createElement('button');
decipherButton.setAttribute('type', 'button');
decipherButton.innerText = 'Decipher!';
cipherForm.appendChild(decipherButton);

//Cipher button
const cipherButton = document.createElement('button');
cipherButton.setAttribute('type', 'button');
cipherButton.innerText = 'Cipher!';
cipherForm.appendChild(cipherButton);


const writeResult = (cipher) => {
    const text = cipherTextArea.value.toUpperCase().trim();
    const key = cipherKeyInput.value.trim();

    if (key < 1 || key > 25) {
        alert('Key must be greater than 1 and lower than 25!');
    }
    else {
        const resultParagraph = pageBody.contains(pageBody.querySelector('p')) ? pageBody.querySelector('p') : document.createElement('p');
        resultParagraph.innerText = caesareCipher(text, key, cipher);
        pageBody.appendChild(resultParagraph);
    }
}

decipherButton.addEventListener('click', (e) => {
    writeResult(false);
});

cipherButton.addEventListener('click', (e) => {
    writeResult(true);
});


/**
 * Encrypting / decrypting mechanism
 * 
 * 
 * 
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


const shiftChar = (c, shift, cipher) => {
    const charAlphabetPosition = alphabet.indexOf(c);

    if (charAlphabetPosition < 0) {
        return c;
    }

    const newAlphabetCharPosition = cipher ? (parseInt(charAlphabetPosition) + parseInt(shift)) % 26 : ((charAlphabetPosition - shift + 26) % 26);
    const newChar = alphabet.charAt(newAlphabetCharPosition);
    return newChar;
};


const shiftString = (str, shift, cipher) => {
    var resultString = "";

    for (var i = 0; i < str.length; i++) {
        resultString = resultString.concat(shiftChar(str[i], shift, cipher));
    }

    return resultString;
};

const caesareCipher = (cipherText, usedKey, cipher = false) => {
    var resultText = "";

    cipherText.split(' ').forEach(element => {
        resultText = resultText.concat(shiftString(element, usedKey, cipher), ' ');
    });

    return resultText;
};