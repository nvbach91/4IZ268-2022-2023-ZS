console.log('Ahoj z main.js');


/* 
 komentar multi line 
 dalsi radek
 */
// komentar one line
// dalsi komentar


const name = 'Adam';
// name = 'Anicka';
console.log(name);
// let name = 'Adam';
// name = 'David';
// var name = 'Adam';
// name = 'Anicka';

// string
const myString = 'my string';

// number
const myNumber = 123;

// boolean
const myBoolean = true; // false

// undefined
const myUndefined = undefined;

// null
const myNull = null;

// Symbol...

const myObject = {
    age: 42,
    name: 'Eva',
    gender: 'female',
};

const myArray = [ 1, 2, 3, 4, 5 ];

console.log(myObject.name);
console.log(myObject.gender);

console.log(myArray[0]);
console.log(myArray[2]);
console.log(myArray[1]);
console.log(myArray[4]);
console.log(myArray[6]); // undefined (out of bound)

console.log(typeof myArray);
console.log(typeof myBoolean);
console.log(typeof myNumber);

// 1991
const calculateAge = (birthYear) => {
    const age = 2022 - birthYear;
    return age;
};

const myAge = calculateAge(1991);

console.log(myAge);


const fruits = ['apple', 'pineapple', 'orange', 'strawberry'];
console.log(fruits);
console.log(fruits.length);

const book = {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    year: 1995,
    price: 100,
    currency: 'CZK',
};
console.log(book.author);

// strict comparison
console.log(1 === '1');
console.log(1 !== 1);
console.log(myNumber === 123);

// loose comparison - not recommended
console.log(1 == '1');
console.log(1 != 1);


console.log(true && false); // false
console.log(true && true); // true
console.log(true || false); // true
console.log(myBoolean); // true
console.log(!myBoolean); // false

const word1 = 'Ahoj';
const word2 = 'svete';
const word3 = '!';
// string concatenation / zretezeni
// const sentence = word1 + ' ' + word2 + word3;

// string interpolation
const sentence = `${word1} ${word2}${word3}`;
console.log(sentence);

// const html = `
//     <div>
//         <div>${sentence}</div>
//     </div>
// `;

const sayHello = (yourName) => {
    const sentence = `Hello, my name is ${yourName}`;
    console.log(sentence);
};

sayHello('David');
sayHello('Anna');
sayHello('Dick');
sayHello('Pep');

console.log(fruits);

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
