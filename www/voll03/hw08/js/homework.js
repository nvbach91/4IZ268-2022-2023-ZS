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
console.log('Ahoj světe');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

let pepeAge = 25;
console.log(`Pepe's age is ${pepeAge}`);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

// C to F conversion
let temp = 20;

console.log(`${temp}°C = ${((temp * 9) / 5) + 32}°F`);

// F to C conversion
temp = 68;
console.log(`${temp}°F = ${((temp - 32) * 5) / 9}°C`);

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
 * buttonSayHello.addEventListener('click', () => {
 *   sayHello();
 * });
 * 
 * // výběr existujícího elementu na stránce s id="tasks"
 * const tasks = document.querySelector('#tasks');
 * // vložení vytvořeného tlačítka do vybraného elementu na stránce
 * tasks.appendChild(buttonSayHello);
 */
// Solution here

const showPepesAge = () => {
    let pepeAge = 25;
    return `Pepe's age is ${pepeAge}`;
}

const celsiusToFahrenheit = (temp) => {
    return Math.round(((((temp * 9) / 5) + 32) + Number.EPSILON) * 100) / 100;
}

const fahrenheitToCelsius = (temp) => {
    return Math.round(((((temp - 32) * 5) / 9) + Number.EPSILON) * 100) / 100;
}

// výběr existujícího elementu pro výpis výsledků s id="results"
const resultField = document.querySelector('#results');

// vytvoření tlačítek
const buttonShowPepesAge = document.createElement('button');
buttonShowPepesAge.innerText = 'Show Pepe\'s Age';
buttonShowPepesAge.setAttribute('id', 'task-1');
buttonShowPepesAge.addEventListener('click', () => {
    resultField.innerHTML = `<p>${showPepesAge()}</p>`;
});

const buttonCelsiusToFahrenheit = document.createElement('button');
buttonCelsiusToFahrenheit.innerText = 'Temperature conversion (20°C to °F)';
buttonCelsiusToFahrenheit.setAttribute('id', 'task-2-1');
buttonCelsiusToFahrenheit.addEventListener('click', () => {
    let temp = 20;
    resultField.innerHTML = `<p>${temp}°C = ${celsiusToFahrenheit(temp)}°F</p>`;
});

const buttonFahrenheitToCelsius = document.createElement('button');
buttonFahrenheitToCelsius.innerText = 'Temperature conversion (451°F to °C)';
buttonFahrenheitToCelsius.setAttribute('id', 'task-2-2');
buttonFahrenheitToCelsius.addEventListener('click', () => {
    let temp = 451;
    resultField.innerHTML = `<p>${temp}°F = ${fahrenheitToCelsius(temp)}°C</p>`;
});

// výběr existujícího elementu na stránce s id="tasks"
const tasks = document.querySelector('#tasks');

// vložení tlačítek na stránku
tasks.appendChild(buttonShowPepesAge);
tasks.appendChild(buttonCelsiusToFahrenheit);
tasks.appendChild(buttonFahrenheitToCelsius);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const getProportion = (x, y) => {
    // volitelna kontrola datoveho typu ziskanych parametru
    if (typeof x === 'string' || typeof y === 'string') {
        return `At least one parameter is not a number.`;
    }

    if (x === 0 || y === 0) {
        return `Can't divide by zero!`;
    }

    if (x === y) {
        return `${x} is 100% of ${y}`;
    } else if (x > y) {
        return `${y} is ${((y / x).toFixed(2)) * 100}% of ${x}`;
    } else {
        return `${x} is ${((x / y).toFixed(2)) * 100}% of ${y}`;
    }
}

// vytvoření tlačítek
const buttonGetProportion01 = document.createElement('button');
buttonGetProportion01.innerText = 'Get number proportions (22, 43)';
buttonGetProportion01.setAttribute('id', 'task-4-1');
buttonGetProportion01.addEventListener('click', () => {
    let x = 22;
    let y = 43;
    resultField.innerHTML = `<p>${getProportion(x, y)}</p>`;
});

const buttonGetProportion02 = document.createElement('button');
buttonGetProportion02.innerText = 'Get number proportions (35, 32)';
buttonGetProportion02.setAttribute('id', 'task-4-2');
buttonGetProportion02.addEventListener('click', () => {
    let x = 35;
    let y = 32;
    resultField.innerHTML = `<p>${getProportion(x, y)}</p>`;
});

const buttonGetProportion03 = document.createElement('button');
buttonGetProportion03.innerText = 'Get number proportions (42, 42)';
buttonGetProportion03.setAttribute('id', 'task-4-3');
buttonGetProportion03.addEventListener('click', () => {
    let x = 42;
    let y = 42;
    resultField.innerHTML = `<p>${getProportion(x, y)}</p>`;
});

const buttonGetProportion04 = document.createElement('button');
buttonGetProportion04.innerText = 'Get number proportions (42, 0)';
buttonGetProportion04.setAttribute('id', 'task-4-4');
buttonGetProportion04.addEventListener('click', () => {
    let x = 42;
    let y = 0;
    resultField.innerHTML = `<p>${getProportion(x, y)}</p>`;
});

// vložení tlačítek na stránku
tasks.appendChild(buttonGetProportion01);
tasks.appendChild(buttonGetProportion02);
tasks.appendChild(buttonGetProportion03);
tasks.appendChild(buttonGetProportion04);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const cmpNumbers = (x, y) => {
    if (x === y) {
        return `The numbers ${x} and ${y} are equal.`;
    } else if (x > y) {
        return `${x} is greater than ${y}`;
    } else {
        return `${y} is greater than ${x}`;
    }
}

// vytvoření tlačítek
const buttonCompare01 = document.createElement('button');
buttonCompare01.innerText = 'Compare numbers (17, 30)';
buttonCompare01.setAttribute('id', 'task-5-1');
buttonCompare01.addEventListener('click', () => {
    let x = 17;
    let y = 30;
    resultField.innerHTML = `<p>${cmpNumbers(x, y)}</p>`;
});

const buttonCompare02 = document.createElement('button');
buttonCompare02.innerText = 'Compare numbers (29, 15)';
buttonCompare02.setAttribute('id', 'task-5-2');
buttonCompare02.addEventListener('click', () => {
    let x = 29;
    let y = 15;
    resultField.innerHTML = `<p>${cmpNumbers(x, y)}</p>`;
});

const buttonCompare03 = document.createElement('button');
buttonCompare03.innerText = 'Compare numbers (55, 55)';
buttonCompare03.setAttribute('id', 'task-5-3');
buttonCompare03.addEventListener('click', () => {
    let x = 55;
    let y = 55;
    resultField.innerHTML = `<p>${cmpNumbers(x, y)}</p>`;
});

const buttonCompare04 = document.createElement('button');
buttonCompare04.innerText = 'Compare numbers (3.1415, 9/4)';
buttonCompare04.setAttribute('id', 'task-5-4');
buttonCompare04.addEventListener('click', () => {
    let x = 3.1415;
    let y = 9 / 4;
    resultField.innerHTML = `<p>${cmpNumbers(x, y)}</p>`;
});

// vložení tlačítek na stránku
tasks.appendChild(buttonCompare01);
tasks.appendChild(buttonCompare02);
tasks.appendChild(buttonCompare03);
tasks.appendChild(buttonCompare04);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const getMultiples = (x, y) => {
    let results = [];

    for (let i = 0; i <= y; i += x) {
        if (i % x === 0) {
            results.push(i);
        }
    }

    return results;
}

// vytvoření tlačítka
const buttonMultiples = document.createElement('button');
buttonMultiples.innerText = 'Show multiples of 13 from 0 up to 730';
buttonMultiples.setAttribute('id', 'task-6');
buttonMultiples.addEventListener('click', () => {
    let multiples = getMultiples(13, 730);
    resultField.innerHTML = `<p>${multiples.join(", ")}</p>`;
});

// vložení tlačítka na stránku
tasks.appendChild(buttonMultiples);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const getCircleArea = (radius) => {
    // na 3 desetinna mista
    return (Math.PI * Math.pow(radius, 2)).toFixed(3);
}

// vytvoření tlačítka
const buttonCircleArea = document.createElement('button');
buttonCircleArea.innerText = 'Calculate circle area (r = 25cm)';
buttonCircleArea.setAttribute('id', 'task-7');
buttonCircleArea.addEventListener('click', () => {
    let radius = 25;
    resultField.innerHTML = `<p>Circle with radius of ${radius} cm has area of ${getCircleArea(radius)} cm²</p>`;
});

// vložení tlačítka na stránku
tasks.appendChild(buttonCircleArea);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const getConeVolume = (height, radius) => {
    // na 2 desetinna mista
    return (1 / 3 * Math.PI * Math.pow(radius, 2) * height).toFixed(2);
}

// vytvoření tlačítka
const buttonConeVolume = document.createElement('button');
buttonConeVolume.innerText = 'Calculate cone volume (r = 10cm, height = 18cm)';
buttonConeVolume.setAttribute('id', 'task-8');
buttonConeVolume.addEventListener('click', () => {
    let height = 18;
    let radius = 10;
    resultField.innerHTML = `<p>Cone with height of ${height} cm and radius of ${radius} cm has volume of ${getConeVolume(height, radius)} cm³</p>`;
});

// vložení tlačítka na stránku
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
const checkTriangle = (a, b, c) => {
    return (a + b > c && a + c > b && b + c > a);
}

// vytvoření tlačítek
const buttonTriangleCheck01 = document.createElement('button');
buttonTriangleCheck01.innerText = 'Check triangle (a = 7cm, b = 10cm, c = 12cm)';
buttonTriangleCheck01.setAttribute('id', 'task-9-1');
buttonTriangleCheck01.addEventListener('click', () => {
    let a = 7;
    let b = 10;
    let c = 12;

    let result;
    if (checkTriangle(a, b, c)) {
        result = `Triangle with given sides a = ${a}, b = ${b}, c = ${c} is a valid triangle.`;
    } else {
        result = `Triangle with given sides a = ${a}, b = ${b}, c = ${c} is NOT a valid triangle.`;
    }

    resultField.innerHTML = `<p>${result}</p>`;
});


const buttonTriangleCheck02 = document.createElement('button');
buttonTriangleCheck02.innerText = 'Check triangle (a = 5cm, b = 1000cm, c = 1cm)';
buttonTriangleCheck02.setAttribute('id', 'task-9-2');
buttonTriangleCheck02.addEventListener('click', () => {
    let a = 5;
    let b = 1000;
    let c = 1;

    let result;
    if (checkTriangle(a, b, c)) {
        result = `Triangle with given sides a = ${a}, b = ${b}, c = ${c} is a valid triangle.`;
    } else {
        result = `Triangle with given sides a = ${a}, b = ${b}, c = ${c} is NOT a valid triangle.`;
    }

    resultField.innerHTML = `<p>${result}</p>`;
});

// vložení tlačítek na stránku
tasks.appendChild(buttonTriangleCheck01);
tasks.appendChild(buttonTriangleCheck02);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
// - krok 1 - vytvořte funkci
//   - krok 1.1 - pomocí selektoru vyberte container pro výpis výsledků a uložte ho do proměnné
//   - krok 1.2 - zvalidujte vstupní argumenty pomocí funkce z úlohy č. 9
//     - v případě nevalidních hodnot vypište chybovou hlášku na místo pro výpis výsledků a funkci ukončete
//     - v případě validních hodnot pokračujte s výpočtem
//   - krok 1.3 - spočítejte obsah trojúhelníku podle Heronovy vzorce a výsledek uložte do proměnné
//   - krok 1.4 - vypište výsledek na místo pro výpis výsledků
// - krok 2 - vytvořte tlačítko
// - krok 3 - nabindujte na toto tlačítko callback, ve kterém zavoláte implementovanou funkci pro výpočet a výpis výsledků
// - krok 4 - tlačítko umístěte na stránku
// - krok 5 - otestujte řešení klikáním na tlačítko

const heronFormula = (a, b, c) => {
    if (!checkTriangle(a, b, c)) {
        return `Given triangle is NOT valid.`;
    }

    let s = (a + b + c) / 2;
    let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    return `Triangle with sides a = ${a}cm, b = ${b}cm, c = ${c}cm has an area of ${area.toFixed(2)} cm²`;
}

// vytvoření tlačítek
const buttonHeronFormula01 = document.createElement('button');
buttonHeronFormula01.innerText = 'Heron formula (a = 7cm, b = 10cm, c = 12cm)';
buttonHeronFormula01.setAttribute('id', 'task-10-1')
buttonHeronFormula01.addEventListener('click', () => {
    let a = 7;
    let b = 10;
    let c = 12;
    resultField.innerHTML = `<p>${heronFormula(a, b, c)}</p>`;
});

const buttonHeronFormula02 = document.createElement('button');
buttonHeronFormula02.innerText = 'Heron formula (a = 5cm, b = 1000cm, c = 1cm)';
buttonHeronFormula02.setAttribute('id', 'task-10-2')
buttonHeronFormula02.addEventListener('click', () => {
    let a = 5;
    let b = 1000;
    let c = 1;
    resultField.innerHTML = `<p>${heronFormula(a, b, c)}</p>`;
});

// vložení tlačítek na stránku
tasks.appendChild(buttonHeronFormula01);
tasks.appendChild(buttonHeronFormula02);