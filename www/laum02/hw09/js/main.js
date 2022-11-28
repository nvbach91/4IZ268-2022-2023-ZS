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
 * 'Decipher!' se na určeném místě zobrazí dešifrovaný text. Rozhraní také vhodně
 * nastylujte.
 */
//              0123456789...
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    if (!alphabet.includes(c)) return c
    let new_index = alphabet.indexOf(c) + shift;
    if (new_index + 1 >= alphabet.length) new_index = new_index - alphabet.length;
    if (new_index < 0) new_index = alphabet.length + new_index;
    return alphabet.charAt(new_index);
};

const shiftString = (str, shift) => {
    let out = '';
    for (i = 0; i < str.length; i++) {
        const letter = str.charAt(i);
        out = out.concat(shiftChar(letter, shift));
    }
    return(out)
};

const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    let out = '';
    for (i = 0; i < cipherText.length; i++) {
        const letter = cipherText.charAt(i);
        out = out.concat(shiftChar(letter, -usedKey));
    }
    return(out)
};

// albert einstein
caesarDecipher('MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B\'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG', 19);

// john archibald wheeler
caesarDecipher('YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW', 5);

// charles darwin
caesarDecipher('M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ', 12);

document.querySelector('#solve').addEventListener('click', () => {
    const text = document.querySelector('#cypher').value;
    const key = document.querySelector('#key').value;
    const res = caesarDecipher(text, key);
    document.querySelector('#result').innerHTML = res;
})