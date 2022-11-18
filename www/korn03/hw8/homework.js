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
var currentTime = new Date();
var year = currentTime.getFullYear();
let pepeBornYear = 2012;
let pepeAge = year - pepeBornYear;
const sentence = `Pepe's age is ${pepeAge}`;
//console.log(sentence);








/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here:
let teplotaC = 20;
let teplotaF = 68;
let teplotaFtoC = ((teplotaF - 32) * 5) / 9;
console.log(teplotaFtoC);
let teplotaCtoF = ((teplotaC * 9) / 5) + 32;
console.log(teplotaCtoF);





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
 *  */
// deklarace a implementace funkce


//something for global attributes reading
const buttonAtrbs = document.getElementById('buttonArgs')
buttonAtrbs.addEventListener('click', wtf);


const result = document.getElementById('result');

let arg1;
let arg2;
let arg3;
let myArray = [];

function wtf() {

    let arguments = document.getElementById('input').value;
    console.log("arguments are " + arguments);

    myArray = arguments.split(",");
    arg1 = myArray[0];
    arg2 = myArray[1];
    arg3 = myArray[2];
    console.log(myArray);
    result.innerHTML = ("Your arguments are " + myArray);
}











const sayHello = () => {
    console.log('Hello');
    result.innerHTML = "Hello!";
    return "Hello!";
};

// vytvoření tlačítka
const buttonSayHello = document.createElement('button');
// nastavení textu tlačítka
buttonSayHello.innerText = 'Say Hello';
// nastavení atributu id tlačítka
buttonSayHello.setAttribute('id', 'task-0');
// nabindování funkce na událost click tlačítka
buttonSayHello.addEventListener('click', sayHello);

// výběr existujícího elementu na stránce s id="tasks"
const tasks = document.querySelector('#tasks');
// vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonSayHello);
// Solution here

















function calculatePepeAge(pepeBornYear) {
    let pepeAge = year - pepeBornYear;
    const sentence = `Pepe's age is ${pepeAge}`;
    //return sentence;
    //console.log(sentence);
    result.innerHTML = sentence;
}

//console.log(calculatePepeAge(2022));
//console.log(calculatePepeAge(0));
//console.log(calculatePepeAge(1900));

// vytvoření tlačítka
const buttonPepeAge = document.createElement('button');
// nastavení textu tlačítka
buttonPepeAge.innerText = "Pepe's age";
// nastavení atributu id tlačítka
buttonPepeAge.setAttribute('id', 'task-1');
// nabindování funkce na událost click tlačítka
buttonPepeAge.addEventListener('click', () => { calculatePepeAge(arg1) });

// výběr existujícího elementu na stránce s id="tasks"
const tasks1 = document.querySelector('#tasks');
// vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonPepeAge);





function calculateFtoC(teplotaF) {
    teplotaFtoC = ((teplotaF - 32) * 5) / 9;
    result.innerHTML = (teplotaF + "F " + "je " + teplotaFtoC.toFixed(2) + " C");
    return teplotaFtoC;
}

//console.log(calculateFtoC(0));
//console.log(calculateFtoC(10));
//console.log(calculateFtoC(100));


const buttonFtoC = document.createElement('button');
buttonFtoC.innerText = "F to C converter";
buttonFtoC.setAttribute('id', 'task-2');
buttonFtoC.addEventListener('click', () => { calculateFtoC(arg1) });
const tasks2 = document.querySelector('#tasks');
tasks.appendChild(buttonFtoC);

function calculateCtoF(teplotaC) {
    let teplotaCtoF = ((teplotaC * 9) / 5) + 32;
    result.innerHTML = (teplotaC + "C " + "je " + teplotaCtoF.toFixed(2) + " F");
    return teplotaCtoF;
}

//console.log(calculateCtoF(0));
//console.log(calculateCtoF(10));
//console.log(calculateCtoF(100));


const buttonCtoF = document.createElement('button');
buttonCtoF.innerText = "C to F converter";
buttonCtoF.setAttribute('id', 'task-3');
buttonCtoF.addEventListener('click', () => { calculateCtoF(arg1) });
const tasks3 = document.querySelector('#tasks');
tasks.appendChild(buttonCtoF);




/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

function podilCisel(prvniCislo, druheCislo) {
    let sentence = ``;
    if (druheCislo == 0)
        sentence = "Go away hacker u can't divide by 0"

    else {
        res = prvniCislo / druheCislo * 100;
        sentence = `${prvniCislo} je ${res.toFixed(2)}% z ${druheCislo}`;
    }

    //console.log(sentence);
    result.innerHTML = sentence;
    return sentence;
}


const buttonPodilCisel = document.createElement('button');
buttonPodilCisel.innerText = "PodilCisel";
buttonPodilCisel.setAttribute('id', 'task-4');
buttonPodilCisel.addEventListener('click', () => { podilCisel(arg1, arg2) });
const tasks4 = document.querySelector('#tasks');
tasks.appendChild(buttonPodilCisel);


//console.log(podilCisel(21, 63));
//console.log(podilCisel(21, 0));
//console.log(podilCisel(50, 100));




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na stránce. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
function kdoKoho(prvniCislo, druheCislo) {

    if (prvniCislo > druheCislo) {
        result.innerHTML = prvniCislo;
        return prvniCislo;
    }
    if (prvniCislo < druheCislo) {
        result.innerHTML = druheCislo;
        return druheCislo;
    }
    else {
        result.innerHTML = "Cisla se rovnaji";
        return "Cisla se rovnaji";
    }
}

//console.log(kdoKoho(-100, -100))

const buttonKdoKoho = document.createElement('button');
buttonKdoKoho.innerText = "Kdo koho?";
buttonKdoKoho.setAttribute('id', 'task-5');
buttonKdoKoho.addEventListener('click', () => { kdoKoho(arg1, arg2) });
const tasks5 = document.querySelector('#tasks');
tasks.appendChild(buttonKdoKoho);




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

function pattern() {
    let myArray2 = [];
    for (i = 0; i * 13 <= 730; i++) {
        //console.log(i * 13);
        myArray2[i] = i * 13

    }
    result.innerHTML = myArray2
}

//pattern();


const buttonPattern = document.createElement('button');
buttonPattern.innerText = "Pattern násobků 13";
buttonPattern.setAttribute('id', 'task-6');
buttonPattern.addEventListener('click', pattern);
const tasks6 = document.querySelector('#tasks');
tasks.appendChild(buttonPattern);



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
function aroundAndAbout(polomer) {
    obsah = polomer ** 2 * Math.PI;
    result.innerHTML = obsah;
    return obsah;
}
//console.log(aroundAndAbout(4));


const buttonAaA = document.createElement('button');
buttonAaA.innerText = "Around and about: obsah kruznice";
buttonAaA.setAttribute('id', 'task-7');
buttonAaA.addEventListener('click', () => { aroundAndAbout(arg1) });
const tasks7 = document.querySelector('#tasks');
tasks.appendChild(buttonAaA);




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

function objemKuzelu(vyska, polomer) {
    result.innerHTML = (aroundAndAbout(polomer) * vyska * 1 / 3);
    return aroundAndAbout(polomer) * vyska * 1 / 3;
}

//console.log(objemKuzelu(1, 2));

const buttonObjem = document.createElement('button');
buttonObjem.innerText = "Objem kuzelu";
buttonObjem.setAttribute('id', 'task-8');
buttonObjem.addEventListener('click', () => { objemKuzelu(arg1, arg2) });
const tasks8 = document.querySelector('#tasks');
tasks.appendChild(buttonObjem);


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
    //return (a + b > c && a + c > b && b + c > a);
    result.innerHTML = (a + b > c && a + c > b && b + c > a);
}

//console.log(isTriangle(1, 10, 1));
//console.log(isTriangle(1, 1, 1));

const buttonIsTriangle = document.createElement('button');
buttonIsTriangle.innerText = "Is Triangle?";
buttonIsTriangle.setAttribute('id', 'task-9');
buttonIsTriangle.addEventListener('click', () => { isTriangle(arg1, arg2, arg3) });
const tasks9 = document.querySelector('#tasks');
tasks.appendChild(buttonIsTriangle);





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
function getTriangleArea(a, b, c) {
    if (!isTriangle(a, b, c)) {
        result.innerHTML = "Neni trojúhelník"
        return `Neni trojuhelnik`;
    }
    let s = (a + b + c) / 2;
    //return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    result.innerHTML = Math.sqrt(s * (s - a) * (s - b) * (s - c));
};

//console.log(getTriangleArea(1, 1, 1));

const buttonTriangleArea = document.createElement('button');
buttonTriangleArea.innerText = "Triangle area";
buttonTriangleArea.setAttribute('id', 'task-10');
buttonTriangleArea.addEventListener('click', () => { getTriangleArea(arg1, arg2, arg3) });
const tasks10 = document.querySelector('#tasks');
tasks.appendChild(buttonTriangleArea);