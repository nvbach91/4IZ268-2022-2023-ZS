const charToIndex = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
};

const indexToChar = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];

const ALPHABET_LENGTH = 26;

const normalizeKey = (key) => key % ALPHABET_LENGTH;

const decryptChar = (key) => (char) => {
    const sourceIndex = charToIndex[char];
    if (sourceIndex !== undefined) {
        const decryptedIndex = sourceIndex - key;
        const normalizedTargetIndex = decryptedIndex < 0 ? ALPHABET_LENGTH + decryptedIndex : decryptedIndex;
        return indexToChar[normalizedTargetIndex];
    }
    return char;
};

const createCryptingFunction = (strategy) => (text, key) =>
    Array.from(text)
        .map(strategy(normalizeKey(key)))
        .join('');

const decrypt = createCryptingFunction(decryptChar);
const decryptForm = document.querySelector('#decrypt-form');
const encryptedTextElement = document.querySelector('#encrypted-text');
const decryptionKeyElement = document.querySelector('#decryption-key');
const decryptedResultElement = document.querySelector('#decrypted-result');

decryptForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const decryptedText = decrypt(encryptedTextElement.value.toUpperCase(), parseInt(decryptionKeyElement.value));
    decryptedResultElement.innerHTML = decryptedText;
});