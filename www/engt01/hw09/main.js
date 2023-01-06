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

const caesarDecipher = (cipherText, usedKey, mode) => {
    let result = "";
    for (let i = 0; i < cipherText.length; i++) {
        if (alphabet.indexOf(cipherText[i]) === -1) {
            result += cipherText[i];
            continue;
        }

        let currCharCode = 0;
        if (mode === "decrypt") {
            currCharCode = alphabet.indexOf(cipherText[i]) - usedKey;
            if (currCharCode < 0) currCharCode += alphabet.length;
        } else if (mode === "encrypt") {
            currCharCode = alphabet.indexOf(cipherText[i]) + usedKey;
            if (currCharCode >= alphabet.length) currCharCode -= alphabet.length;
        }

        result += alphabet.charAt(currCharCode);
    }
    return result;
};

function crypt(mode) {
    const message = document.getElementById("message").value;
    const shift = document.getElementById("shift").value;

    if (message.length === 0) return;

    document.getElementById("result").innerText = caesarDecipher(message, parseInt(shift), mode);
    document.getElementById("result").classList.add("shown");
}

document.getElementById("encrypt").addEventListener("click", () => crypt("encrypt"));
document.getElementById("decrypt").addEventListener("click", () => crypt("decrypt"));

// albert einstein
// caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19, "decrypt");

// john archibald wheeler
// caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5, "decrypt");

// charles darwin
// caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12, "decrypt");
