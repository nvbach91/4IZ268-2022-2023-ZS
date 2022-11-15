console.log('Ahoj, světe!');

/* Creates button with specific properties and binds onclick funciton. */
function createButton(id, buttonText, functionName, ...funcitonArguments) {
    let button = document.createElement('button');

    button.innerHTML = buttonText;
    button.id = id;
    button.onclick = function () { functionName(...funcitonArguments) };
    document.getElementById('task-buttons').appendChild(button);
}

function writeResult(result) {
    document.getElementById('result').innerHTML = result;
}


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */

const pepesBirthYear = 2005;
console.log(`Pepovi je ${(new Date()).getFullYear() - pepesBirthYear} let.`);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
const temperatureC = 22;
const temperatureF = 50;

console.log(` °C = ${(temperatureC * 9 / 5 + 32).toFixed(2)}  °F`);
console.log(` °F = ${((temperatureF - 32) * 5 / 9).toFixed(2)}  °C`);

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvoříte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 * 
 * Pro testování funkce:
 * - Pouze pomocí JavaScriptu (bez knihoven) vytvořte HTML tlačítko s názvem této úlohy, resp. co funkce dělá, a 
 * id s číslem úlohy <button id="task-1">Úloha 1 (Pepe's age)</button>, umístěte ho na stránku do předem vytvořeného 
 * místa <div id="tasks"></div> a pomocí posluchače události "click" nabindujte implementovanou funkci na toto tlačítko.
 * 
 * Výsledkem má být tlačítko, na které když kliknete, tak se provede to, co je implementováno ve funkci.
 * 
 */
function calculateAge(birthYear) {
    const age = (new Date()).getFullYear() - birthYear;
    console.log(`Pepovi je ${age} let.`);
}

createButton('task-3-1', 'Úloha 3-1 (Pepe\'s age - function)', calculateAge, 2005);


function celsiusToFahrenheit(temperature) {
    const convertedTemperature = (temperature * 9 / 5 + 32);
    writeResult(`${temperature}°C = ${convertedTemperature.toFixed(2)} °F`);
}

function fahrenheitToCelsius(temperature) {
    const convertedTemperature = ((temperature - 32) * 5 / 9);
    writeResult(`${temperature}°F = ${convertedTemperature.toFixed(2)} °C`);
}

createButton('task-3-2-1', 'Úloha 3-2-1 (Temperature conversion (22 °C to °F) - function)', celsiusToFahrenheit, 22);
createButton('task-3-2-1', 'Úloha 3-2-2 (Temperature conversion (55 °F to °C) - function)', fahrenheitToCelsius, 55);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
/*document.getElementById('task-4').addEventListener('click', function () {
    document.getElementById('result').innerText = getProportion(21, 42);
});*/

function getProportion(number1, number2) {
    if (number2 == 0) {
        return writeResult('Nemůžu dělit 0.');
    }

    const proportion = number1 / number2;
    writeResult(`${number1} je ${proportion.toFixed(2) * 100} % z ${number2}.`);
}
createButton('task-4-1', 'Úloha 4-1 (Proportion - 21, 42)', getProportion, 21, 42);
createButton('task-4-2', 'Úloha 4-2 (Proportion - 42, 21) - function)', getProportion, 42, 21);
createButton('task-4-3', 'Úloha 4-3 (Proportion - 42, 0) - function)', getProportion, 42, 0);


/**
 * 5) Kdo z koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
/*document.getElementById('').addEventListener('click', function () { compareNumbers(5, 2) });
document.getElementById('task-5-2').addEventListener('click', function () { compareNumbers(5.5, 6.1) });
document.getElementById('task-5-3').addEventListener('click', function () { compareNumbers(3 / 5, 5 / 4) });*/

function compareNumbers(number1, number2) {
    if (number1 > number2) {
        writeResult(`Číslo ${number1} je větší než ${number2}.`);
    } else if (number1 < number2) {
        writeResult(`Číslo ${number1} je menší než ${number2}.`);
    }
    else {
        writeResult(`Číslo ${number1} je rovno ${number2}.`);
    }
}
createButton('task-5-1', 'Úloha 5-1 (Number comparator)', compareNumbers, 21, 42);
createButton('task-5-2', 'Úloha 5-2 (Number comparator)', compareNumbers, 5.5, 6.1);
createButton('task-5-3', 'Úloha 5-3 (Number comparator)', compareNumbers, 3 / 5, 5 / 4);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */

function getNumberMultiples() {
    let result = 'Násobky 13 menší než 730:<br>';

    for (i = 0; i <= 730; i += 13) {
        result += i + ',<br>';
    }

    writeResult(result);
}
createButton('task-6', 'Úloha 6 (Multiples of 13)', getNumberMultiples);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
function getCircleArea(radius) {
    writeResult(`Obsah kružnice s poloměrem ${radius} cm je ${(Math.pow(Math.PI, 2) * radius).toFixed(2)} cm2.`);
}
createButton('task-7', 'Úloha 7 (Around and about)', getCircleArea, 5);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
function getConeVolume(height, radius) {
    writeResult(`Objem kuželu s poloměrem ${radius} cm a výškou ${height}cm je ${(1 / 3 * Math.pow(radius, 2) * height * Math.PI).toFixed(2)} cm3.`);
}
createButton('task-8', 'Úloha 8 (Another dimension)', getConeVolume, 5, 2);


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
function isTriangle(a, b, c) {
    return a + b > c && b + c > a && c + a > b;
}

function formatIsTriangle(a, b, c) {
    writeResult(isTriangle(a, b, c) ? 'Ze zadaných hodnot lze sestrojit trojúhelník.' : 'Ze zadaných hodnot nelze sestrojit trojúhelník.');
}

createButton('task-9', 'Úloha 9 (Not sure if triangle, or just some random values)', formatIsTriangle, 5, 3, 7);


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
function getTriangleSurface(a, b, c) {
    if (!isTriangle(a, b, c)) {
        return writeResult('Ze zadaných hodnot nelze sestrojit trojúhelník. Dále nepočítám.');
    }

    let s = (a + b + c) / 2;
    writeResult(`Obsah trojúhelníku (a = ${a} cm, b = ${b} cm, c = ${c} cm) je ${Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2)} cm2.`);
}
createButton('task-10', 'Úloha 10 (Not sure if triangle, or just some random values)', getTriangleSurface, 5, 3, 7);