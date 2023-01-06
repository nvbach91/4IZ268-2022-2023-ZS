(() => {
    /** Prepare HTML structure */
    // select elements and store them in variables
    const bodyElement = document.querySelector('body');
    const bodyWrapperElement = document.createElement('div');
    
    // create new elements 
    const appHeading = document.createElement('h1');
    const textInputArea = document.createElement('textarea');
    const keyInputArea = document.createElement('input');
    const decryptButton = document.createElement('button');
    const encryptButton = document.createElement('button');
    const clearButton = document.createElement('button');
    const resultArea = document.createElement('div');
    const resultAreaHeader = document.createElement('h2');
    const resultAreaText = document.createElement('textarea');
    const textInputAreaError = document.createElement('p');
    const keyInputAreaError = document.createElement('p');

    // add text, placeholders, attributes and styles
    appHeading.innerText = 'Caesar cipher';
    textInputArea.setAttribute('rows', '5')
    textInputArea.setAttribute('placeholder', 'Input text!');
    keyInputArea.setAttribute('placeholder', 'What is the key?');
    decryptButton.innerText = 'Decrypt!';
    encryptButton.innerText = 'Encrypt!';
    clearButton.innerText = 'Clear!';
    resultArea.classList.add('resultAreaDisabled');
    resultAreaHeader.innerText = 'Decrypted message!';
    resultAreaText.setAttribute('rows', '5');
    resultArea.appendChild(resultAreaHeader);
    resultArea.appendChild(resultAreaText);
    decryptButton.disabled = true;
    encryptButton.disabled = true;

    // classes
    bodyWrapperElement.classList.add('body-wrapper');
    textInputAreaError.classList.add('disabled');
    textInputAreaError.classList.add('error');
    keyInputAreaError.classList.add('disabled');
    keyInputAreaError.classList.add('error');
    clearButton.classList.add('disabled');

    /** Add event listeners */
    // disabled on input
    textInputArea.addEventListener('input', () => {
        if (textInputAreaError.classList.contains('enabled')) {
            textInputAreaError.classList.remove('enabled');
            textInputAreaError.classList.add('disabled');
        }
        disableDecryptedMessage();
    });

    keyInputArea.addEventListener('input', () => {
        if (keyInputAreaError.classList.contains('enabled')) {
            keyInputAreaError.classList.remove('enabled');
            keyInputAreaError.classList.add('disabled');
        }
        disableDecryptedMessage();
        return;
    });

    // implement error hadling
    // empty text field
    textInputArea.addEventListener('input', () => {
        if (textInputArea.value.trim().toUpperCase().length === 0) {
            textInputAreaError.innerText = 'You must insert the encrypted text!'
            textInputAreaError.classList.remove('disabled');
            textInputAreaError.classList.add('enabled');
            disableButtons();
            return;
        };
        if ( textInputArea.value.length > 0 && keyInputArea.value.length > 0) {
            enableButtons();
            return;
        };
        return;
    });

    // issue with a key
    keyInputArea.addEventListener('input', () => {
        // check that the inputs are not empty on click
        const keyInputAreaValue = keyInputArea.value.trim();

        if (keyInputAreaValue.length === 0) {
            keyInputAreaError.innerText = 'You must insert the key!'
            keyInputAreaError.classList.remove('disabled');
            keyInputAreaError.classList.add('enabled');
            disableButtons();
            return;
        };

        // check that key is a number
        if (isNaN(keyInputAreaValue)) {
            keyInputAreaError.innerText = 'Key must be a number!'
            keyInputAreaError.classList.remove('disabled');
            keyInputAreaError.classList.add('enabled');
            disableButtons();
            return;
        };

        // check the number is within 0 and 26
        if (keyInputAreaValue > 26 || keyInputAreaValue < 0) {
            keyInputAreaError.innerText = 'Key must be a number between 0 and 26!'
            keyInputAreaError.classList.remove('disabled');
            keyInputAreaError.classList.add('enabled');
            disableButtons();
            return;
        };

        if ( textInputArea.value.length > 0 && keyInputArea.value.length > 0) {
            enableButtons();
            return;
        };
        return;
    });

    clearButton.addEventListener('click', () => {
        textInputArea.value = '';
        keyInputArea.value = '';
        resultAreaText.innerText = '';
        disableButtons();
        disableDecryptedMessage();
        return;
    });

    // add event to button
    decryptButton.addEventListener('click', () => {
        const textInputAreaValue = textInputArea.value.toUpperCase();
        const keyInputAreaValue = keyInputArea.value.trim();
        resultArea.classList.remove('resultAreaDisabled');
        resultArea.classList.add('resultAreaEnabled');
        clearButton.classList.remove('disabled');
        clearButton.classList.add('enabled');
        const textToDisplay = caesarDecrypt(textInputAreaValue, keyInputAreaValue);
        resultAreaText.innerText = textToDisplay;
        return;
    });

    encryptButton.addEventListener('click', () => {
        const textInputAreaValue = textInputArea.value.toUpperCase();
        const keyInputAreaValue = keyInputArea.value.trim();
        resultArea.classList.remove('resultAreaDisabled');
        resultArea.classList.add('resultAreaEnabled');
        clearButton.classList.remove('disabled');
        clearButton.classList.add('enabled');
        const textToDisplay = caesarEncrypt(textInputAreaValue, keyInputAreaValue);
        resultAreaText.innerText = textToDisplay;
        return;
    });

    /** Another functions */
    // disable decrypted message and remove text
    const disableDecryptedMessage = () => {
        resultArea.classList.remove('resultAreaEnabled');
        resultArea.classList.add('resultAreaDisabled');
        resultAreaText.innerText = '';
        clearButton.classList.remove('enabled');
        clearButton.classList.add('disabled');
        return;
    };

    const disableButtons = () => {
        decryptButton.disabled = true;
        encryptButton.disabled = true;
        return;
    };

    const enableButtons = () => {
        decryptButton.disabled = false;
        encryptButton.disabled = false;
        return;
    };

    // append to body 
    bodyElement.appendChild(bodyWrapperElement);
    bodyWrapperElement.appendChild(appHeading);
    bodyWrapperElement.appendChild(textInputArea);
    bodyWrapperElement.appendChild(textInputAreaError);
    bodyWrapperElement.appendChild(keyInputArea);
    bodyWrapperElement.appendChild(keyInputAreaError);
    bodyWrapperElement.appendChild(decryptButton);
    bodyWrapperElement.appendChild(encryptButton);
    bodyWrapperElement.appendChild(resultArea);
    bodyWrapperElement.appendChild(clearButton);

    /** Caesar cipher  */
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const shiftCharBack = (c, shift) => {
        var shiftValue = (alphabet.indexOf(c.toUpperCase()) - shift + 26) % 26;
        return alphabet[shiftValue];
    };

    const shiftCharFront = (c, shift) => {
        var shiftValue = (alphabet.indexOf(c.toUpperCase()) + shift) % 26;
        return alphabet[shiftValue]
    };

    const caesarDecrypt = (cipherText, usedKey) => {
        const splitMessage = cipherText.trim().split('');
        let decryptedMessage = '';
        splitMessage.forEach((item) => {
            if (alphabet.indexOf(item) === -1) {
                decryptedMessage += item;
            } else {
                decryptedMessage += shiftCharBack(item, usedKey);
            };
        });
        return decryptedMessage;
    };

    const caesarEncrypt = (textToEncrypt, keyToUse) => {
        const splitMessageEncrypt = textToEncrypt.trim().split('');
        let encryptedMessage = '';
        splitMessageEncrypt.forEach((item) => {
            if (alphabet.indexOf(item) === -1) {
                encryptedMessage += item;
            } else {
                encryptedMessage += shiftCharFront(item, keyToUse);
            };
        });
        return encryptedMessage;
    };

    /** Console tests */
    console.log(caesarDecrypt("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));
    console.log(caesarDecrypt("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));
    console.log(caesarDecrypt("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));
})();