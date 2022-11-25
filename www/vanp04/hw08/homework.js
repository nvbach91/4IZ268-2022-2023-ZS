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

var results = document.querySelector('#results')
const tasks = document.querySelector('#tasks');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here


function pepesAge(birthYear) {
    console.log(new Date().getFullYear() - birthYear);
    return;
};

pepesAge(1954);



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const tempToFar = 222;
const tempToCel = 420;

function tempConv(tempToFar, tempToCel) {
    console.log(calcFar(tempToFar));
    console.log(calcCel(tempToCel));
    return;
};

function calcFar(tempToFar) {
    const tempFar = tempToFar * (9 / 5) + 32;
    return `Temperature ${tempToFar} Celsius is ${tempFar} in Fahrenheiht when converted.`;
};

function calcCel(tempToCel) {
    const tempCel = (5 / 9) * (tempToCel - 32);
    return `Temperature ${tempToCel} Fahrenheiht is ${tempCel} in Celsius when converted.`;
};

tempConv(tempToFar, tempToCel);


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
 * 
 * // výběr existujícího elementu na stránce s id="tasks"
 * const tasks = document.querySelector('#tasks');
 * // vložení vytvořeného tlačítka do vybraného elementu na stránce
 * tasks.appendChild(buttonSayHello);
 */
// Solution here

/*
Předchozí úkoly už jsou ve funkcích
*/

const buttonPepesAge = document.createElement('button');
const buttonTempConv = document.createElement('button');

buttonPepesAge.innerText = 'Task 1 - Pepes Age';
buttonTempConv.innerText = 'Task 2 - Temperature convert';

buttonPepesAge.setAttribute('id', 'task-1');
buttonTempConv.setAttribute('id', 'task-2');

buttonPepesAge.addEventListener('click', () => {pepesAge(1938)});
buttonTempConv.addEventListener('click', () => {tempConv(150, 800)});

tasks.appendChild(buttonPepesAge);
tasks.appendChild(buttonTempConv);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. vaFixr pi = 3.1415926535; pi.toed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const censored = (a, b) => {
    if (b === 0) {
        throw new RangeError('Cannot divide by zero.')
    }

    const res = ((a / b) * 100).toFixed(2);


    results.textContent = `Quotient of ${a} and ${b} is ${res}%`;
};

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}


const buttonCesored = document.createElement('button');
buttonCesored.innerText = 'Task 3 - Censored';
buttonCesored.setAttribute('id', 'task-3');
buttonCesored.addEventListener('click', () => {censored(getRandomNumber(), getRandomNumber())});
tasks.appendChild(buttonCesored);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

function getBiggerNumber(a, b) {
    if (a === b) {
        results.textContent = `Numbers are equal`;
        return
    }

    const res = Math.max(a, b);

    results.textContent = `Number ${res} is greater.`
};

const buttonBiggerNumber = document.createElement('button');
buttonBiggerNumber.innerText = 'Task 4.1 - Kdo z koho - cela cisla';
buttonBiggerNumber.setAttribute('id', 'task-4.1');
buttonBiggerNumber.addEventListener('click', () => {getBiggerNumber(10, 20)});
tasks.appendChild(buttonBiggerNumber);

const buttonBiggerNumber1 = document.createElement('button');
buttonBiggerNumber1.innerText = 'Task 4.2 - Kdo z koho - desetina cisla';
buttonBiggerNumber1.setAttribute('id', 'task-4.2');
buttonBiggerNumber1.addEventListener('click', () => {getBiggerNumber(9.8, 5.5)});
tasks.appendChild(buttonBiggerNumber1);


const buttonBiggerNumber2 = document.createElement('button');
buttonBiggerNumber2.innerText = 'Task 4.3 - Kdo z koho - zlomky';
buttonBiggerNumber2.setAttribute('id', 'task-4.3');
buttonBiggerNumber2.addEventListener('click', () => {getBiggerNumber(1/4, 1/20)});
tasks.appendChild(buttonBiggerNumber2);

const buttonBiggerNumber3 = document.createElement('button');
buttonBiggerNumber3.innerText = 'Task 4.4 - Kdo z koho - rovnaji se';
buttonBiggerNumber3.setAttribute('id', 'task-4.4');
buttonBiggerNumber3.addEventListener('click', () => {getBiggerNumber(1, 1)});
tasks.appendChild(buttonBiggerNumber3);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const printMultiples = () => {
    var arrayForPrint = [];

    for (let index = 0; index <= 730; index = index + 13) {
        arrayForPrint.push(index);
    }

    console.log(arrayForPrint);
    results.textContent = arrayForPrint;
};

const buttonMultiples = document.createElement('button');
buttonMultiples.innerText = 'Task 5 - I can see the pattern';
buttonMultiples.setAttribute('id', 'task-5');
buttonMultiples.addEventListener('click', () => {printMultiples()});
tasks.appendChild(buttonMultiples);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

function calculateVolumeCircle(radius) {
    const res = 2 * Math.PI * Math.pow(radius, 2);

    results.textContent = `Volume of circle with radius of ${radius} is ${res}.`;
};

const buttonVolumeCircle = document.createElement('button');
buttonVolumeCircle.innerText = 'Task-6 - Around and about';
buttonVolumeCircle.setAttribute('id', 'task-6');
buttonVolumeCircle.addEventListener('click', () => {calculateVolumeCircle(8)});
tasks.appendChild(buttonVolumeCircle);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

function calculateVolumeCone(height, radius) {
    const res = 1 / 3 * Math.PI * Math.pow(radius, 2) * height;

    results.textContent = `Volume of a cone with height of ${height}, and radius of ${radius} is: ${res}.`
};

const buttonVolumeCone = document.createElement('button');
buttonVolumeCone.innerText = 'Task-7 - Another dimension';
buttonVolumeCone.setAttribute('id', 'task-7');
buttonVolumeCone.addEventListener('click', () => {calculateVolumeCone(10, 3)});
tasks.appendChild(buttonVolumeCone);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

function isTriangle(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        results.textContent = true;
        return true;
    } else {
        results.textContent = false;
        return false;
    }
};

const buttonIsTriangle = document.createElement('button');
buttonIsTriangle.innerText = 'Task-8 - Around and about';
buttonIsTriangle.setAttribute('id', 'task-8');
buttonIsTriangle.addEventListener('click', () => {isTriangle(1, 2, 3)});
tasks.appendChild(buttonIsTriangle);

const buttonIsTriangle1 = document.createElement('button');
buttonIsTriangle1.innerText = 'Task-8.1 - Around and about';
buttonIsTriangle1.setAttribute('id', 'task-8.1');
buttonIsTriangle1.addEventListener('click', () => {isTriangle(7, 10, 5)});
tasks.appendChild(buttonIsTriangle1);

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

const calculateTriangleArea = (a, b, c) => {
    if (isTriangle(a, b, c) === false) {
        results.textContent = `Values ${a}, ${b}, ${c} cannot make a triangle.`
        return;
    }

    const s = (a + b + c) / 2;

    const res = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    results.textContent = `Volume of a triangle with sides a:${a}, b:${b}, c:${c} is: ${res}.`
};

const buttonTriangleVolume = document.createElement('button');
buttonTriangleVolume.innerText = 'Task-9 - Around and about';
buttonTriangleVolume.setAttribute('id', 'task-9');
buttonTriangleVolume.addEventListener('click', () => {calculateTriangleArea(7, 10, 5)});
tasks.appendChild(buttonTriangleVolume);

const buttonTriangleVolume1 = document.createElement('button');
buttonTriangleVolume1.innerText = 'Task-9.1 - Around and about';
buttonTriangleVolume1.setAttribute('id', 'task-9.1');
buttonTriangleVolume1.addEventListener('click', () => {calculateTriangleArea(1, 2, 3)});
tasks.appendChild(buttonTriangleVolume1);