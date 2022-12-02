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
//                0123456789...
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


const shiftChar = (c, shift) => {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result

    let exCharIndex = alphabet.indexOf(c);
    let char;
    if (shift < 0) {
        shift = alphabet.length + shift;
    }


    if (exCharIndex + shift >= alphabet.length && ((exCharIndex + shift) % alphabet.length == 0)) {
        char = alphabet[exCharIndex];
    }
    if (exCharIndex + shift >= alphabet.length) {
        char = alphabet[(exCharIndex + shift) % alphabet.length];
    }

    else {
        char = alphabet[exCharIndex + shift];

    }



    return char;

};

const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result

    let newString = "";

    for (let i = 0; i < str.length; i++) {
        switch (str.charAt(i)) {
            case '.':
                newString += '.';
                break;
            case "'":
                newString += "'";
                break;
            case ":":
                newString += ":";
                break;
            case "-":
                newString += "-";
                break;
            case ",":
                newString += ",";
                break;
            case ";":
                newString += ";";
                break;
            default:
                newString += shiftChar(str.charAt(i), shift);
        }
    }
    return newString;
};

const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there

    let formatedString = '';
    let textArray = cipherText.split(' ').filter(w => w !== '');
    for (let i = 0; i < textArray.length; i++) {
        formatedString += shiftString(textArray[i], usedKey);
        formatedString += " ";

    }
    return formatedString;


};



console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", -19));
console.log(caesarDecipher("MJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", -5));
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. - OTMDXQE PMDIUZ", -12));

document.getElementById('decipherBtn').addEventListener('click', () => {
    const cipherText = document.getElementById('cipherText').value;
    const resultBox = document.getElementById('resultBox');

    if (cipherText.length === 0) {
        resultBox.value = 'Message plssss.'
        return;
    }

    const usedKey = document.getElementById('usedKey').value;
    if (usedKey == null) {
        resultBox.value = 'Key plssss.';
        return;
    }

    resultBox.value = caesarDecipher(cipherText, Number.parseInt(usedKey));
})

