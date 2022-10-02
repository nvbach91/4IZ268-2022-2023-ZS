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
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
  const index = ALPHABET.indexOf(c.toUpperCase());

  // invalid char
  if (index === -1) {
    return c;
  }

  let newIndex = index + shift;

  if (newIndex > (ALPHABET.length - 1)) {
    // use while in case the cipher key is a big number
    while (newIndex > (ALPHABET.length - 1)) {
      newIndex = newIndex - ALPHABET.length;
    }
  }

  if (newIndex < 0) {
    // use while in case the cipher key is a big number
    while (newIndex < 0) {
      newIndex = ALPHABET.length + newIndex;
    }
  }

  return ALPHABET.charAt(newIndex);
};

const shiftString = (str, shift) => {
  return str.split('').map(char => shiftChar(char, shift)).join('');
};

const caesarDecipher = (cipherText, usedKey) => {
  return shiftString(cipherText, -usedKey);
};

const caesarCipher = (text, usedKey) => {
  return shiftString(text, usedKey);
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));


// UI


document.getElementById('cipher-btn').addEventListener('click', () => {
  const resultBox = document.getElementById('cipher-result');

  const message = document.getElementById('cipher-text').value;
  if (!message || message.length === 0) {
    resultBox.value = 'Nezadali jste žádnou zprávu pro zašifrování!'
    return;
  }

  const key = document.getElementById('cipher-key').value;
  if (!key || key < 1) {
    resultBox.value = 'Klíč pro šifrování musí být vyplněn a nesmí být menší než 1.';
    return;
  }

  resultBox.value = caesarCipher(message, Number.parseInt(key));
})

document.getElementById('decipher-btn').addEventListener('click', () => {
  const resultBox = document.getElementById('decipher-result');

  const message = document.getElementById('decipher-text').value;
  if (!message || message.length === 0) {
    resultBox.value = 'Nezadali jste žádnou zprávu pro dešifrování!'
    return''
  }

  const key = document.getElementById('decipher-key').value;
  if (!key || key < 1) {
    resultBox.value = 'Klíč pro dešifrování musí být vyplněn a nesmí být menší než 1.';
    return;
  }

  resultBox.value = caesarDecipher(message, Number.parseInt(key));
})