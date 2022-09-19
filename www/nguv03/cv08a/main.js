console.log('Ahoj svete');
console.log('Jsem skvelej');

// single line comment

/*
multiline comment
*/

// vybrat element body a dosadit do promenne "body"
const body = document.querySelector('body');

// vytvorit element p  a dosadit do promenne "paragraph"
const paragraph = document.createElement('p');

// dosadit text 'Ahoj svete' do paragrafu
paragraph.innerText = 'Ahoj svete';

// umistit paragraf do body
body.appendChild(paragraph);


const button = document.createElement('button');
button.innerText = 'Click me';
button.addEventListener('click', () => {
    createButtonWithText('abcd');
});


body.appendChild(button);

// deklarace a inicializace promenne

// const = neda se zmenit
const isAlive = true;
//isAlive = false;
const isDead = false;

// let = da se zmenit
let somethingElse = 456;

// var uz nepouzivat;
//var something = 123;

const sentence = 'lorem ipsum';

const nothing = undefined;

const nothingAtAll = null;

console.log(isAlive);
console.log(isDead);
console.log(somethingElse);
console.log(sentence);
console.log(nothing);
console.log(nothingAtAll);


const createButtonWithText = (buttonText) => {
    const button = document.createElement('button');
    button.innerText = buttonText;
    const body = document.querySelector('body');
    body.appendChild(button);
};

createButtonWithText('Something as well');

const multiplyThreeNumbers = (a, b, c) => {
    const result = a * b * c;
    return result;

    //return a * b * c;
};

const result = multiplyThreeNumbers(4, 5, 6);
console.log(result);

const fruits = ['orange', 'apple', 'melon'];

const myCar = {
    color: 'silver',
    speed: 200,
    productionYear: 2020,
    wheels: ['black', 'blue', 'yellow', 'pink'],
};

console.log(myCar.color);

const writeCarInfo = (car) => {
    console.log(
        'Moje auto ma ' + car.color + 
        ' barvu, ma ' + car.speed +
        ' rychlosti, jeho rok vyroby je ' + car.productionYear);
    console.log(`Moje auto ma barvu ${car.color}`);
    console.log('Moje auto ma barvu ' + car.color);
};

if (isAlive) {
    console.log('Yes');
} else {
    
    console.log('No');
}

for (let i = 0; i < 5; i += 1) {
    console.log(i, 123);
}