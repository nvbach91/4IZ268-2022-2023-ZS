/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "task-buttons"). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result").
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

const birthYears = [ 1999, 2000, 2023, 1 ];

const calculateAge = (birthYear) => {
    if (isNaN(birthYear)) return 'Year of birth is not a number';
    if (birthYear > 2022) return 'Pepe was not born yet.';
    const calculatedAge = 2022 - birthYear;
    // oldest living person is 118 yo now based on wikipedia
    if (calculatedAge > 118) return 'Pepe would be ' + calculatedAge + ' years old now.';
    return "Pepe is " + calculatedAge + " years old.";    
};

const ageAnswer = calculateAge(1000);
console.log(ageAnswer);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const units = [ '°C', '°F' ];
const temperatures = [ '20°C', '68°F', '18.3333333340 °C' ];

const convertTemp = (temp) => {
    // získat správnou jednotku
    const tempUnit = temp.trim().slice(-2);
    if (units.indexOf(tempUnit) === -1) return 'I cannot convert this unit.';

    // získat hodnotu
    const tempValue = temp.trim().slice(0,-2);
    // error pokud není hodnota
    if (!tempValue) return 'No value detected.';
    // error pokud je hodnota jiný typ než number 
    if (isNaN(tempValue)) return 'The value detected is not a number.';

    let conversion = tempUnit === units[0] ?
        ((tempValue * 9)/5)+32 + units[1] :
        ((tempValue-32)*5)/9 + units[0];
    return conversion + ' = ' + temp;
}

console.log(convertTemp(temperatures[1]));

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
 */
// Solution here

console.log('# test pro úlohu 2');
temperatures.forEach(function(item) { console.log(convertTemp(item))});

console.log('# test pro úlohu 1');
birthYears.forEach(function(item) { console.log(calculateAge(item))});

// uložit elementy z index.html do proměnné
const taskDiv = document.getElementById('tasks');
const results = document.getElementById('result');

// vytvoření tlačítka pro úlohu 1
const buttonTaskOne = document.createElement('button');
buttonTaskOne.setAttribute('id', 'task-1');
buttonTaskOne.textContent = "Uloha 1 (Pepe's age)";
buttonTaskOne.addEventListener('click', () => {
    const ageResult = calculateAge('1999');
    console.log(ageResult);
    results.textContent = ageResult;
});

// vytvoření tlačítka pro úlohu 2
const buttonTaskTwo = document.createElement('button');
buttonTaskTwo.setAttribute('id', 'task-2');
buttonTaskTwo.textContent = "Uloha 2 (WTF)";
buttonTaskTwo.addEventListener('click', () => {
    const conversionResult = convertTemp('20°C');
    console.log(conversionResult);
    results.textContent = conversionResult;
});

// přidání tlačítek do div tasks
taskDiv.appendChild(buttonTaskOne);
taskDiv.appendChild(buttonTaskTwo);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const divideTwoNumbers = (a, b) => {
    if ( b === 0 ) return 'Nelze dělit nulou.';
    const result = ((a / b)*100).toFixed(2);
    return a + ' je ' + result + '%' + ' z ' + b;
};

// vytvoření tlačítka pro úlohu 4
const buttonTaskFour = document.createElement('button');
buttonTaskFour.setAttribute('id', 'task-4');
buttonTaskFour.textContent = "Uloha 4 (%CENSORED%)";

// add to the resutlts
buttonTaskFour.addEventListener('click', () => {
    const twoNumbers = divideTwoNumbers(21, 10.55555555);
    console.log(twoNumbers);
    results.textContent = twoNumbers;
});

taskDiv.appendChild(buttonTaskFour);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na stránce. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const compareValues = (a, b) => {
    if (isNaN(a)) return 'první zadaná hodnota není číslo';
    if (isNaN(b)) return 'druhá zadaná hodnota není číslo';
    if ( a > b ) return a + ' je větší než ' + b;
    if ( b > a ) return b + ' je větší než ' + a;
    if ( a === b ) return  'hodnoty se rovnají';
    return 'něco je špatně';
};

// vytvoření tlačítka pro úlohu 5
const buttonTaskFive = document.createElement('button');
buttonTaskFive.setAttribute('id', 'task-5');
buttonTaskFive.textContent = "Uloha 5 (Kdo s koho)";

buttonTaskFive.addEventListener('click', () => {
    const comparedValues = compareValues(10.5, 10.55555555);
    console.log(comparedValues);
    results.textContent = comparedValues;
});

taskDiv.appendChild(buttonTaskFive);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const magicThirteen = () => {
    let res = '';
    for ( let i = 0; i <= 730; i ) {
        console.log(i); // vypíše popořadě v konzoli
        res = res.concat(i + ' ');
        i += 13;
    };
    return res;
};

// vytvoření tlačítka pro úlohu 6
const buttonTaskSix = document.createElement('button');
buttonTaskSix.setAttribute('id', 'task-6');
buttonTaskSix.textContent = "Uloha 6 (I can cleary see the pattern)";
buttonTaskSix.addEventListener('click', () => {
    const thirteen = magicThirteen();
    results.textContent = thirteen;
});

taskDiv.appendChild(buttonTaskSix);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circleArea = (r) => {
    return Math.PI * r * r;
};

// vytvoření tlačítka pro úlohu 7
const buttonTaskSeven = document.createElement('button');
buttonTaskSeven.setAttribute('id', 'task-7');
buttonTaskSeven.textContent = "Uloha 7 (Around and about)";
buttonTaskSeven.addEventListener('click', () => {
    const circle = circleArea(10);
    console.log(circle);
    results.textContent = circle;
});

taskDiv.appendChild(buttonTaskSeven);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const coneVolume = (r, v) => {
    return (1/3) * Math.PI * r * r * v;
};

// vytvoření tlačítka pro úlohu 8
const buttonTaskEight = document.createElement('button');
buttonTaskEight.setAttribute('id', 'task-8');
buttonTaskEight.textContent = "Uloha 8 (Another dimension)";
buttonTaskEight.addEventListener('click', () => {
    const coneResult = coneVolume(10,10);
    console.log(coneResult);
    results.textContent = coneResult;
});

taskDiv.appendChild(buttonTaskEight);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const isTriangle = (a, b, c) => {
    const sides = [a+b, b+c, c+a];
    if (sides.some(isNaN)) return false;
    if (sides[0] < c || sides[1] < b || sides[2] < a ) return false;
    return true;
};

// vytvoření tlačítka pro úlohu 9
const buttonTaskNine = document.createElement('button');
buttonTaskNine.setAttribute('id', 'task-9');
buttonTaskNine.textContent = "Uloha 9 (Not sure if triangle, or just some random values)";
buttonTaskNine.addEventListener('click', () => {
    const pithResult = isTriangle(10,10,10);
    console.log(pithResult);
    results.textContent = pithResult;
});

taskDiv.appendChild(buttonTaskNine);

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

const heronTriangleArea = (a, b, c) => {
    if (!isTriangle(a, b, c)) return 'nejedná se o trojúhelník';
    const s = (a + b + c)/2;
    return Math.sqrt( s * (s-a) * (s-b) * (s-c) );
};

// vytvoření tlačítka pro úlohu 10
const buttonTaskTen = document.createElement('button');
buttonTaskTen.setAttribute('id', 'task-10');
buttonTaskTen.textContent = "Uloha 10 (Heroic performance)";
buttonTaskTen.addEventListener('click', () => {
    const heronResult = heronTriangleArea(10,10,10);
    console.log(heronResult);
    results.textContent = heronResult;
});

taskDiv.appendChild(buttonTaskTen);
