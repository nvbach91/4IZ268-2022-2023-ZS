// lokalni scope pomoci funkce
(() => {
    console.log('ahoj');

    var something = 'someone';
    var somethingElse = 'someoneElse';

    console.log(something);
})();

// jeden globalni objekt
var App = {};
App.something = 'someone';


(() => {
    //                0123456789
    const myString = 'Barrack Obama';
    console.log(myString.length);

    console.log(myString.indexOf('r'));
    console.log(myString.slice(3, 7));
    console.log(myString.slice(3));
    console.log(myString.slice(-3));

    console.log(myString.replace('a', 'x'));
    console.log(myString.replace(/a/g, 'x'));
    console.log(myString);

    console.log(myString.toUpperCase());
    console.log(myString.toLowerCase());

    console.log(myString.split(''));
    console.log(myString.split(' '));

    const someString = ' asdwq   qwead    ';
    console.log(someString);
    console.log(someString.trim());
})();

















