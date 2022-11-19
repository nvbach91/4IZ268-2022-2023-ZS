/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "tasks" - <div id="tasks"></div>). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result" - <div id="results"></div>).
 * 
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * console.log('Ahoj světe');
 */
console.log('Ahoj svete');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const yearOfPepesBirth = 1984;
const currentYear = (new Date()).getFullYear();
const pepeAge = currentYear - yearOfPepesBirth;
const pepePrintAge = 'Pepe is currently ' + pepeAge + ' years old. FeelsOldMan';

console.log(pepePrintAge);






/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

//Fahrenheit to Celsius
const fahrenheit1 = 110;
const fToC = (fahrenheit1 - 32) * 5 / 9;
console.log(fahrenheit1 + '°F = ' + fToC.toFixed(2) + '°C');
//Celsius to Fahrenheit
const celsius1 = 40;
const cToF = (celsius1 * 9/5) + 32;
console.log(celsius1 + '°C = ' + cToF.toFixed(2) + '°F');






/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvoříte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 * 
 * Pro testování funkce:
 * - Pouze pomocí JavaScriptu (bez knihoven) vytvořte HTML tlačítko s názvem této úlohy, resp. co funkce dělá, a 
 * id s číslem úlohy <button id="task-1">Uloha 1 (Pepe's age)</button>, umístěte ho na stránku do předem vytvořeného 
 * místa <div id="tasks"></div> a pomocí posluchače události "click" nabindujte implementovanou funkci na toto tlačítko.
 * 
 * Výsledkem má být tlačítko, na které když kliknete, tak se provede to, co je implementováno ve funkci.
 *
 * Příklad vytvoření tlačítka s funkcí:
 * 
 * // deklarace a implementace funkce
 * const sayHello = () => {
 *   console.log('Hello');
 * };
 * 
 * // vytvoření tlačítka
 * const buttonSayHello = document.createElement('button');
 * // nastavení textu tlačítka
 * buttonSayHello.innerText = 'Say Hello';
 * // nastavení atributu id tlačítka
 * buttonSayHello.setAttribute('id', 'task-0');
 * // nabindování funkce na událost click tlačítka
 * buttonSayHello.addEventListener('click', sayHello); 
 * // výběr existujícího elementu na stránce s id="tasks"
 * const tasks = document.querySelector('#tasks');
 * // vložení vytvořeného tlačítka do vybraného elementu na stránce
 * tasks.appendChild(buttonSayHello);
 */
// Solution here

const tasks = document.querySelector('#tasks');


const helloWorld = (text) => {
    text = "Čau. ";
    const result1 = document.querySelector('#result1');
    result1.innerHTML += text;
    console.log(text);
};
const buttonSayHello = document.createElement('button');
buttonSayHello.innerText = 'Pozdrav svět';
buttonSayHello.setAttribute('id', 'task-0');
buttonSayHello.addEventListener('click', helloWorld);
tasks.appendChild(buttonSayHello);

const convertCToF = (celsius) => {
    celsius = 20
    const result2 = document.querySelector('#result2');
    result2.innerHTML = `${celsius} °C je ${celsius * 9 / 5 + 32} °F. `;
    console.log(celsius * 9 / 5 + 32); 
};
const buttonCToF = document.createElement('button');
buttonCToF.innerText = '°C na °F';
buttonCToF.setAttribute('id', 'task-0');
buttonCToF.addEventListener('click', convertCToF);
tasks.appendChild(buttonCToF);

const convertFToC = (fahrenheit) => {
    fahrenheit = 451
    const result3 = document.querySelector('#result3');
    result3.innerHTML = ` ${fahrenheit} °F je ${((fahrenheit- 32) * 5 / 9).toFixed(2)} °C. `
    console.log((fahrenheit- 32) * 5 / 9);
};
const buttonFToC = document.createElement('button');
buttonFToC.innerText = '°F na °C';
buttonFToC.setAttribute('id', 'task-0');
buttonFToC.addEventListener('click', convertFToC);
tasks.appendChild(buttonFToC);

const getPepeAge = (birthYear) => {
    birthYear = 1984
    const result4 = document.querySelector('#result4');
    result4.innerHTML = 'Pepovi je ' + (new Date().getFullYear() - birthYear) + ' let, feelsoldman. ';
    console.log('Pepovi je ' + (new Date().getFullYear() - birthYear) + ' let, feelsoldman. ');
};
const buttonPepeAge = document.createElement('button');
buttonPepeAge.innerText = 'Pepův věk';
buttonPepeAge.setAttribute('id', 'task-0');
buttonPepeAge.addEventListener('click', () => {
getPepeAge(1984)
});
tasks.appendChild(buttonPepeAge);





/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. const pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const percentageBetweenTwo = (a, b) => {
    const result5 = document.querySelector('#result5');
    if (b === 0) {
        result5.innerHTML ='Nulou se nedělí ani v neděli bráško. ';
    }
    result5.innerHTML = `Podíl čísla ${a} z ${b} je ${(a / b * 100).toFixed(2)}%. `;
};
const buttonPercentage = document.createElement('button');
buttonPercentage.innerText = 'Poměr';
buttonPercentage.setAttribute('id', 'task-0');
buttonPercentage.addEventListener('click', () => {
    percentageBetweenTwo(20, 40)
    });
tasks.appendChild(buttonPercentage);





/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here



const comparasion = (a, b) => {
    const result6 = document.querySelector('#result6');
    if (a > b) {
        result6.innerHTML = a;
    }
    if (a < b) {
        result6.innerHTML = a;
    }
    if (a === b) {
        result6.innerHTML = 'Čísla jsou stejná. '
    }
};

const buttonTwoNumbers = document.createElement('button');
buttonTwoNumbers.innerText = 'Dvě čísla';
buttonTwoNumbers.setAttribute('id', 'task-0');
buttonTwoNumbers.addEventListener('click', () => {
    comparasion(69, 69)
    });
tasks.appendChild(buttonTwoNumbers);






/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

for (var i = 0; i < 730; i += 13){
    console.log(i);
};                





/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circleArea = (radius) => {
    const result7 = document.querySelector('#result7');
    result7.innerHTML = (Math.PI * radius ** 2);
};
const buttonCircleArea = document.createElement('button');
buttonCircleArea.innerText = 'Obsah kružnice';
buttonCircleArea.setAttribute('id', 'task-0');
buttonCircleArea.addEventListener('click', () => {
    circleArea(120)
    });
tasks.appendChild(buttonCircleArea);





/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const coneVolume = (height, radius) => {
    const result8 = document.querySelector('#result8');
    result8.innerHTML = (Math.PI * radius ** 2 * height / 3);
};
const buttonConeVolume = document.createElement('button');
buttonConeVolume.innerText = 'Objem kuželu';
buttonConeVolume.setAttribute('id', 'task-0');
buttonConeVolume.addEventListener('click', () => {
    coneVolume(16, 8)
    });
tasks.appendChild(buttonConeVolume);




/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const testThatTriangle = (a, b, c) => {
    const result9 = document.querySelector('#result9');
    if (a + b > c && a + c > b && b + c > a) {
        result9.innerHTML = 'Jop, je to trojúhelník. ';
    } else {
        result9.innerHTML = 'Nope, to trojúhelník nebude. '
    };
};

const buttonIsThatAMfTriangle = document.createElement('button');
buttonIsThatAMfTriangle.innerText = 'Test trojúhelníku';
buttonIsThatAMfTriangle.setAttribute('id', 'task-0');
buttonIsThatAMfTriangle.addEventListener('click', () => {
    testThatTriangle(20, 40, 30)
    });
tasks.appendChild(buttonIsThatAMfTriangle);



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getTriangleArea = (a, b, c) => { 
    const result10 = document.querySelector('#result10');
    if(!(a + b > c && a + c > b && b + c > a)) {
        result10.innerHTML = 'Neplatné rozměry trojúhelníku';
    } else {
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        result10.innerHTML = area;
    }
}
const buttonGetTraingleArea = document.createElement('button');
buttonGetTraingleArea.innerText = 'Obsah trojúhelníku';
buttonGetTraingleArea.setAttribute('id', 'task-0');
buttonGetTraingleArea.addEventListener('click', () => {
    getTriangleArea(20, 30, 40)
    });
tasks.appendChild(buttonGetTraingleArea);

