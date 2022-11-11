console.log('Ahoj svete z main.js');
console.log('Dalsi ahoj');


// komentar
// dalsi komentar

/**
 * multiline comments
 * multiline comments
 * multiline comments
 * multiline comments
 */
// number
const age = 42; // inicializace promenne
// age = 20;
console.log(age);

// let age = 42;
// age = 12;
// age = 20;
// var age = 42;
// age = 30;

// string
const name = 'David';

console.log(name);

// boolean
const myBoolean = true; // nebo false

console.log(myBoolean);

// undefined
const myUndefined = undefined;

// null
const myNull = null;

// Symbol...

// object
const person = {
    name: 'Jenicek',
    age: 42,
    gender: 'M',
};
console.log(person);

// pole (taky objekt)
const myArray = [1, 2, 3, 4, 1];

console.log(myArray);


console.log(typeof age);
console.log(typeof myBoolean);
console.log(typeof myNull);
console.log(typeof myUndefined);
console.log(typeof name);
console.log(typeof person);
console.log(typeof myArray);


const add = (a, b) => {
    return a + b;
};

const result = add(5, 6);

console.log(result);


// []
// const ...
// 'Prague', 'London'...
const cities = ['Prague', 'London', 'Kiev', 'Warsaw', 'Bratislava'];
console.log(cities.length);

const mobilePhone = {
    name: 'IpHone 14 Pre Max',
    price: 40000,
    currency: 'CZK',
};
const mobilePhone2 = {
    name: 'IpHone 14 Pre Max',
    price: 40000,
    currency: 'CZK',
};
console.log(mobilePhone === mobilePhone2); // false

console.log(mobilePhone.name);
console.log(mobilePhone.price);
console.log(mobilePhone.currency);

const word1 = 'Ahoj';
const word2 = 'svete';
const word3 = '!';
// zretezeni stringu (string concatenation)
// const sentence = word1 + ' ' + word2 + word3;

// zretezeni stringu pomoci interpolace
const sentence = `${word1} ${word2} ${word3}`;
console.log(sentence);

const numberA = 20; //number
const numberB = '20'; //number
//strict equality
console.log(numberA === numberB);
console.log(numberA == numberB);


const person2 = {
    name: 'Jirka',
    age: 18,
    school: 'VSE',
    major: 'Informatika', 
};

const greeting = (person) => {
    const sentence = `Ahoj, jmenuji se ${person.name}, je mi ${person.age} a studuji ${person.major} na ${person.school}`;
    console.log(sentence);
};

greeting(person2);


const person3 = {
    name: 'Marek',
    age: 42,
    school: 'VSE',
    major: 'Finance', 
};
greeting(person3);


for (let i = 0; i < cities.length; i++) {
    console.log(cities[i]);
}
