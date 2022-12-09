

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
(() => {
    const bodyElement = document.querySelector('body');
    const form = document.createElement('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const keyValue = keyInput.value;
        const cipherValue = cipherInput.value;

        const resultElement = document.createElement('p');
        const result = caesarDecipher(cipherValue, keyValue);
        resultElement.innerText = result;
        bodyElement.appendChild(resultElement);

    })


    const keyInput = document.createElement('input');
    keyInput.setAttribute('key', 'key');
    keyInput.setAttribute('class', 'key');
    keyInput.setAttribute('placeholder', 'Enter key');

    const cipherInput = document.createElement('input');
    cipherInput.setAttribute('cipher', 'cipher');
    cipherInput.setAttribute('class', 'cipher')
    cipherInput.setAttribute('placeholder', 'Enter cipher code')

    const formSubmitButton = document.createElement('button');
    formSubmitButton.innerHTML = 'Decipher';
   
    form.appendChild(cipherInput);
    form.appendChild(keyInput);
    form.appendChild(formSubmitButton);
    

    bodyElement.appendChild(form);

    //               0123456789...
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shiftChar = (c, shift) => {
        if (!alphabet.includes(c)) {
            return c;
        }

        const index = alphabet.indexOf(c.toUpperCase());
        const calculatedIndex = index - shift;

        if (calculatedIndex < 0) {
            const aa = alphabet.charAt(alphabet.length + calculatedIndex);
            return aa;
        }
        return alphabet.charAt(calculatedIndex);;
    };


    const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
        let result = '';
        for (const letter of str) {
            result += shiftChar(letter, shift);
        }
        return result
    };

    const caesarDecipher = (cipherText, usedKey) => {
        const cipher = cipherText.split(' ');
        let result = '';

        for (const word of cipher) {
            result += ' ' + shiftString(word, usedKey);
        }
        return result;
    };



    // albert einstein
    console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

    // john archibald wheeler
    console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

    // charles darwin
    console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));

})();