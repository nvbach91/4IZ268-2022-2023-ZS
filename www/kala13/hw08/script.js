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
const taskDiv = document.getElementById('tasks');
const results = document.getElementById('result');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných
 * používejte smysluplnou angličtinu.
 */
// Solution here

const buttonOne = document.createElement('button');
buttonOne.textContent = "Úloha 1 - Pepe's age";
buttonOne.addEventListener('click', () => {
    calculateAge(Math.round(getRandomForAge()));
});

function calculateAge(pepesBirthYear) {
    var pepesAge = (new Date()).getFullYear() - pepesBirthYear;
    var text1 = `Pepe se narodil v roce ${pepesBirthYear} a je mu tedy ${pepesAge} let.`
    console.log(text1);
    results.textContent = text1;
}

function getRandomForAge() {
    const max = 2021;
    const min = 1900;
    var random = Math.random() * (max - min) + min;
    return random;
}

taskDiv.appendChild(buttonOne);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here

const buttonTwo = document.createElement('button');
buttonTwo.textContent = "Úloha 2 - WTF 1";
buttonTwo.addEventListener('click', () => {
    calculateTempFromCelsius(Math.round(getRandomForTemp()));
});

const buttonTwoPointOne = document.createElement('button');
buttonTwoPointOne.textContent = "Úloha 2 - WTF 2";
buttonTwoPointOne.addEventListener('click', () => {
    calculateTempFromFahrenheit(Math.round(getRandomForTemp()));
});

function getRandomForTemp() {
    const max = 100;
    const min = 0;
    var random = Math.random() * (max - min) + min;
    return random;
}

function calculateTempFromCelsius(tempFromCelsius) {
    const tempToFahrenheit = (tempFromCelsius * 9 / 5) + 32;
    var text2 = `${tempFromCelsius}°C = ${Math.round(tempToFahrenheit)}°F (aspoň cca)`
    console.log(text2)
    results.textContent = text2;
}

function calculateTempFromFahrenheit(tempFromFahrenheit) {
    const tempToCelsius = (tempFromFahrenheit - 32) * 5 / 9;
    var text2 = `${tempFromFahrenheit}°F = ${Math.round(tempToCelsius)}°C (aspoň cca)`

    console.log(text2)
    results.textContent = text2;
}

taskDiv.appendChild(buttonTwo);
taskDiv.appendChild(buttonTwoPointOne);

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


// Bylo pro mě přehlednější dát to rovnou k daným bodům


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const buttonThree = document.createElement('button');
buttonThree.textContent = "Úloha 4 -  %CENSORED%";
buttonThree.addEventListener('click', () => {
    divideNumbers(getRandomForDividing(), getRandomForDividing());
});

function getRandomForDividing() {
    const max = 999;
    const min = 1;
    var random = Math.random() * (max - min) + min;
    return Math.round(random);
}

const divideNumbers = (a, b) => {
    var result = ((a / b) * 100).toFixed(2);
    var text4 = a + ' je ' + result + '%' + ' z ' + b;;
    console.log(text4)
    results.textContent = text4;
};

taskDiv.appendChild(buttonThree);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const buttonFive = document.createElement('button');
buttonFive.textContent = "Úloha 5 -  Kdo s koho";
buttonFive.addEventListener('click', () => {
    compareNumbers(getRandomForComparing(), getRandomForComparing());
});

function getRandomForComparing() {
    const max = 999;
    const min = 1;
    var random = Math.random() * (max - min) + min;
    return random;
}

const compareNumbers = (a, b) => {
    var text5 = "";
    switch (true) {
        case (a > b):
            text5 = a + ' > ' + b;
            break;
        case (b > a):
            text5 = a + ' < ' + b;
            break;
        case (a === b):
            text5 = a + ' = ' + b;
            break;
        default:
            text5 = 'idk';
    }
    console.log(text5)
    results.textContent = text5;
};

taskDiv.appendChild(buttonFive);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const buttonSix = document.createElement('button');
buttonSix.textContent = "Úloha 6 -  Pattern";
buttonSix.addEventListener('click', () => {
    thirteenSomething();
});

function thirteenSomething() {
    var text6 = '';
    for (var i = 0; i <= 730; i) {
        text6 = text6.concat(i + ' ');
        i += 13;
    };

    console.log(text6)
    results.textContent = text6;
};

taskDiv.appendChild(buttonSix);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const buttonSeven = document.createElement('button');
buttonSeven.textContent = "Úloha 7 -  Around and about";
buttonSeven.addEventListener('click', () => {
    circleSomething(getRandomForR());
});

function getRandomForR() {
    const max = 50;
    const min = 1;
    var random = Math.random() * (max - min) + min;
    return Math.round(random);
}

function circleSomething(r) {
    var text7 = "Při poloměru " + r + " je obsah kružnice roven " + Math.PI * r * r;
    console.log(text7)
    results.textContent = text7;
};

taskDiv.appendChild(buttonSeven);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const buttonEight = document.createElement('button');
buttonEight.textContent = "Úloha 8 -  Another dimension";
buttonEight.addEventListener('click', () => {
    coneSomething(getRandomForCone(), getRandomForCone());
});

function getRandomForCone() {
    const max = 100;
    const min = 1;
    var random = Math.random() * (max - min) + min;
    return Math.round(random);
}

function coneSomething(r, v) {
    var text7 = "Při poloměru " + r + " a výšce " + v + " je objem kuželu roven " + (1 / 3) * Math.PI * r * r * v;;
    console.log(text7)
    results.textContent = text7;
};

taskDiv.appendChild(buttonEight);

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const buttonNine = document.createElement('button');
buttonNine.textContent = "Úloha 9 -  Not sure if triangle";
buttonNine.addEventListener('click', () => {
    triangleSomething(getRandomForCone(), getRandomForCone(), getRandomForCone());
});

function getRandomForTriangle() {
    const max = 100;
    const min = 1;
    var random = Math.random() * (max - min) + min;
    return Math.round(random);
}

function triangleSomething(a, b, c) {
    const sides = [a + b, b + c, c + a];
    var text9 = "Při stranách o délkách " + a + ", " + b + ", " + c + " se ";
    switch (true) {
        case (sides[0] < c || sides[1] < b || sides[2] < a):
            text9 += "nejedná o trouhleník";
            break;
        default:
            text9 += "jedná o trouhleník";;
    }
    console.log(text9)
    results.textContent = text9;
    return text9;
};

taskDiv.appendChild(buttonNine);

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

const buttonTen = document.createElement('button');
buttonTen.textContent = "Úloha 10 -  Heroic performance";
buttonTen.addEventListener('click', () => {
    heronTriangleArea(getRandomForCone(), getRandomForCone(), getRandomForCone());
});

function heronTriangleArea(a, b, c) {
    text10 = "Při stranách o délkách " + a + ", " + b + ", " + c + " se ";
    if ((triangleSomething(a, b, c)).endsWith("nejedná o trouhleník")) {
        text10 += "nejedná o trouhleník";
    } else {
        var s = (a + b + c) / 2;
        text10 += "jedná o trouhleník a obsah je "
        text10 += Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    console.log(text10)
    results.textContent = text10;
};

taskDiv.appendChild(buttonTen);