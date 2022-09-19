console.log('Ahoj svete');
console.log('Jsem skvelej');
// jednoradkovy komentar

/*
vice
radkovy
komentar
*/


// vybereme misto, kde se bude zobrazovat ten text
const body = document.querySelector('body');

// vytvorime element, ktery bude obsahovat ten text
const paragraph = document.createElement('p');
paragraph.innerText = 'Ahoj svete';

// umistime tento element na vybrane misto
body.appendChild(paragraph);


// vytvorime element, ktery bude obsahovat ten text
const button = document.createElement('button');
button.innerText = 'Click me';
// button.innerText = '';
// button.innerText = 'Click me 2';
// button.innerText = '';


// umistime tento element na vybrane misto
body.appendChild(button);


// nedoporucuje se
// var something = 123;

const isAlive = true;
//isAlive = false;
const isDead = false;

const age = 42;

let something = 123;
something = 456;

const name = 'Justin Bieber';

const iDontKnow = undefined;

const xyz = 1;
// console.log(xyz);

const nothing = null;

console.log(typeof isAlive, isAlive);
console.log(typeof isDead, isDead);
console.log(typeof age, age);
console.log(typeof name, name);
console.log(typeof something, something);
console.log(typeof iDontKnow, iDontKnow);
console.log(typeof xyz, xyz);
console.log(typeof nothing, nothing);


const createButtonWithText = (buttonText) => {
    const body = document.querySelector('body');
    const button = document.createElement('button');
    button.innerText = buttonText;
    body.appendChild(button);
};

button.addEventListener('click', () => {
    createButtonWithText('What is this?');
});

// createButtonWithText('Some thing awesome');
// createButtonWithText('Something else');



const multiplyThreeNumbers = (a, b, c) => {
    const result = a * b * c;
    return result;
};

const result = multiplyThreeNumbers(4, 5, 6);
console.log(result);

const animals = ['crocodile', 'alpaka', 'squid'];
console.log(animals);

const book = {
    title: 'JavaScript Programming od A do Z',
    price: 500,
    year: 2020,
    isbn: '8-123-456-789',
};

console.log(book.price);
console.log(book.isbn);


const me = {
    age: 29,
    name: 'Bach',
    school: 'VSE',
    major: 'Computer Science',
};

const printInformation = (person) => {
    // operator zretezeni
    console.log(
        'Hello, my name is ' + me.name +
        ', I am ' + me.age + ' years old.' +
        'I study ' + me.major + ' at ' + me.school + '.'
    );
    // string interpolation
    console.log(`
        Hello, my name is ${me.name}, I am ${me.age} years old.
        I study ${me.major} at ${me.school}.
    `)
};

printInformation(me);


//podminene prikazy

if (isAlive) {
    console.log(123);
    console.log(456);
    console.log(789);
} else {
    console.log(0);
}

for (let i = 0; i < 5; i += 1) {
    console.log(i, 'hello!!');
}


