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

const encryptChar = (key) => (char) => {
    const sourceIndex = charToIndex[char];
    if (sourceIndex !== undefined) {
        const targetIndex = sourceIndex + key;
        const normalizedTargetIndex = targetIndex >= ALPHABET_LENGTH ? targetIndex - ALPHABET_LENGTH : targetIndex;
        return indexToChar[normalizedTargetIndex];
    }
    return char;
};

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

const encrypt = createCryptingFunction(encryptChar);
const decrypt = createCryptingFunction(decryptChar);

const encryptForm = document.querySelector('#encrypt-form');
const sourceTextElement = document.querySelector('#source-text');
const encryptionKeyElement = document.querySelector('#encryption-key');
const encryptedResultElement = document.querySelector('#encrypted-result');

encryptForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const encryptedText = encrypt(sourceTextElement.value.toUpperCase(), parseInt(encryptionKeyElement.value));
    const encryptedTextElement = document.createTextNode(encryptedText)
    encryptedResultElement.appendChild(encryptedTextElement);
});

const decryptForm = document.querySelector('#decrypt-form');
const encryptedTextElement = document.querySelector('#encrypted-text');
const decryptionKeyElement = document.querySelector('#decryption-key');
const decryptedResultElement = document.querySelector('#decrypted-result');

decryptForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const decryptedText = decrypt(encryptedTextElement.value.toUpperCase(), parseInt(decryptionKeyElement.value));
    const decryptedTextElement = document.createTextNode(decryptedText)
    decryptedResultElement.appendChild(decryptedTextElement);
});
