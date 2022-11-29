//Nastavení atributů pro elementy

const cipheredText = document.querySelector("#cipheredText");
cipheredText.setAttribute("autofocus"," ");
cipheredText.setAttribute("required", "");
cipheredText.setAttribute("placeholder", "What do you want to decript?");

const key = document.querySelector("#key");
key.setAttribute("type", "number");
key.setAttribute("required", "");

const buttonSubmit = document.querySelector("#buttonSubmit");
buttonSubmit.setAttribute("type", "submit")
buttonSubmit.setAttribute("value", "decrypt")
buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    decipher(cipheredText.value, key.value);
})

const decipheredText = document.querySelector("#decipheredText");
decipheredText.setAttribute("placeholder", "Place for your deciprehered output...");
decipheredText.setAttribute("readonly", "");


const lowercaseAlphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z";
let lowercaseAlphabetArray = [];
lowercaseAlphabetArray = lowercaseAlphabet.split(" ");
const uppercaseAlphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
let uppercaseAlphabetArray = [];
uppercaseAlphabetArray = uppercaseAlphabet.split(" ");


const decipher = (text, pKey) => {
let ciphered = text;
let cKey = pKey;
let deciphered = "";


while(cKey>26){
    cKey = cKey%26;
}

let originalText = [];
originalText = ciphered.split("");

for(i = 0; i !== originalText.length; i++){
   if((lowercaseAlphabetArray.indexOf(originalText[i])=== -1)&&(uppercaseAlphabetArray.indexOf(originalText[i])=== -1)){
    deciphered += originalText[i];
    continue;
   }

// returns deciphered index, if its over 25, it counts again from 0 
let rawIndex = lowercaseAlphabetArray.indexOf(originalText[i].toLowerCase()) - cKey * 1;
let cleanIndex;


if(rawIndex < 0){
    cleanIndex = rawIndex + 26; 
}else{
    cleanIndex = rawIndex;
}
//deciphering a letter and putting it into final "deciphered" aray
if(originalText[i].toString() === originalText[i].toLowerCase().toString()){
    deciphered += lowercaseAlphabetArray[cleanIndex];
}else{
    deciphered += uppercaseAlphabetArray[cleanIndex];
}
}

const output = document.createElement("p");
output.innerText = deciphered;
decipheredText.innerText = deciphered;

buttonSubmit.setAttribute("value", "DECRYPTED!");

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  delay(1000).then(() => buttonSubmit.setAttribute("value", "decrypt"));


}
