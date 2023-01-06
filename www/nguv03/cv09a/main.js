// local scope
(() => {

    var xname = 'abc';
    console.log(xname);

})();

// one global object
const App = {};
App.xname = 'heyman';



const myString = 'Barrack Obama';
console.log(myString.length);
console.log(myString.indexOf('r'));

console.log(myString[myString.indexOf('r')])
console.log(myString[2])
// console.log(myString[0])
// console.log(myString[1])
// console.log(myString[2])
// console.log(myString[3])
// console.log(myString[4])
// console.log(myString[5])
// console.log(myString[6])
// console.log(myString[7])
// console.log(myString[8])
// console.log(myString[9])
// console.log(myString[10])
// console.log(myString[11])
// console.log(myString[12])
// console.log(myString[13]) // undefined
for (let i = 0; i < myString.length; i++) {
    console.log(myString[i]);
}
// 0123456789
// Barrack Obama
console.log(myString.slice(1, 4));
console.log(myString.slice(1));
console.log(myString.slice(-3));

console.log(myString.replace('a', 'x'));
console.log(myString.replace(/a/g, 'x'));
console.log(myString.toUpperCase());
console.log(myString.toLowerCase());

console.log(myString.split(''));
console.log(myString.split(' '));

console.log('   abcdef   xx    '.trim());
console.log('   abcdef   xx    '.replace(/ /g, ' ').trim());


