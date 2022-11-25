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

console.log("Ahoj světe");

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const pepeBirthYear = 2002;
const currentYear = 2022;
console.log('Pepe is ' + (currentYear - pepeBirthYear) + ' years old.');


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const temperatureC = 0;
const temperatureF = 100;

console.log(temperatureC + '°C = ' + (temperatureC * 9 / 5 + 32).toFixed(1) + '°F');
console.log(temperatureF + '°F = ' + ((temperatureF - 32) * 5 / 9).toFixed(1) + '°C');


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

//pepe
const pepeAge = () => {
    console.log('Pepe is ' + (currentYear - pepeBirthYear) + ' years old.');
};

const buttonPepeAge = document.createElement("button");
buttonPepeAge.innerText = "Uloha 1 (Pepe's age)";
buttonPepeAge.setAttribute("id", "task-1");
buttonPepeAge.addEventListener("click", () => pepeAge());

const tasks = document.querySelector("#tasks");
const result = document.querySelector("#results");

tasks.appendChild(buttonPepeAge);

//c to f
const tempCtoF = () => {
    console.log(temperatureC + '°C = ' + (temperatureC * 9 / 5 + 32).toFixed(1) + '°F');
};

const buttonC = document.createElement("button");
buttonC.innerText = "Uloha 2 (C to F)";
buttonC.setAttribute("id", "task-2");
buttonC.addEventListener("click", () => tempCtoF());

const tasksTemp = document.querySelector("#tasks");
const resultTemp = document.querySelector("#results");

tasks.appendChild(buttonC);

//f to c
const tempFtoC = () => {
    console.log(temperatureF + '°F = ' + ((temperatureF - 32) * 5 / 9).toFixed(1) + '°C');
};

const buttonF = document.createElement("button");
buttonF.innerText = "Uloha 3 (F to C)";
buttonF.setAttribute("id", "task-3");
buttonF.addEventListener("click", () => tempFtoC());

const tasksTemp2 = document.querySelector("#tasks");
const resultTemp2 = document.querySelector("#results");

tasks.appendChild(buttonF);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const ratio = () => {
    const x = 16;
    const y = 44;
    const ratioPercent = (x / y) * 100;
    const ratioPercentResult = document.createElement("div");
    ratioPercentResult.innerText = "The ratio of " + x + " to " + y + " is " + ratioPercent.toFixed(2) + "%";
    result.appendChild(ratioPercentResult);
};

const buttonRatio = document.createElement("button");
buttonRatio.innerText = "Uloha 4 (Ratio)";
buttonRatio.setAttribute("id", "task-4");
buttonRatio.addEventListener("click", () => ratio());

tasks.appendChild(buttonRatio);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const comparator = () => {
    x = 700;
    y = 4;
    let comparator = "";
    if (x > y) {
        comparator = x + " is greater than " + y;
    } else if (x < y) {
        comparator = x + " is smaller than " + y;
    } else {
        comparator = "The numbers are equal";
    }

    const comparatorResult = document.createElement("div");
    comparatorResult.innerText = comparator;
    result.appendChild(comparatorResult);
};

const buttonComparator = document.createElement("button");
buttonComparator.innerText = "Uloha 5 (Comparator)";
buttonComparator.setAttribute("id", "task-5");
buttonComparator.addEventListener("click", () => comparator());

tasks.appendChild(buttonComparator);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const multiple = () => {
    const multiples13 = document.createElement("div");
    for (let i = 13; i < 730; i += 13) {
        multiples13.innerText += i + " ";
    }
    result.appendChild(multiples13);
};

const buttonMultiples13 = document.createElement("button");
buttonMultiples13.innerText = "Úloha 6 (Multiples of 13)";
buttonMultiples13.setAttribute("id", "task-6");
buttonMultiples13.addEventListener("click", () => multiple());

tasks.appendChild(buttonMultiples13);



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circleArea = (r) => {
    const area = document.createElement("div");
    area.innerText = "The area of a circle with a radius of " + r + " is " + (Math.PI * r * r).toFixed(2);
    result.appendChild(area);
};

const buttonCircleArea = document.createElement("button");
buttonCircleArea.innerText = "Úloha 7 (Circle Area)";
buttonCircleArea.setAttribute("id", "task-7");
buttonCircleArea.addEventListener("click", () => circleArea(1));

tasks.appendChild(buttonCircleArea);



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const coneVolume = (h, r) => {
    const volume = document.createElement("div");
    volume.innerText = "The volume of a cone with a radius of " + r + " and a height of " + h + " is " + (1 / 3) * Math.PI * r * r * h;
    result.appendChild(volume);
};

const buttonConeVolume = document.createElement("button");
buttonConeVolume.innerText = "Úloha 8 (Cone Volume)";
buttonConeVolume.setAttribute("id", "task-8");
buttonConeVolume.addEventListener("click", () => coneVolume(100, 1));

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

const triangle = (a, b, c) => {
    const triangle = document.createElement("div");
    result.appendChild(triangle);
    if (a + b > c && a + c > b && b + c > a) {
        triangle.innerText = "a = " + a + ", b = " + b + ", c = " + c + " -> Yes, it's a triangle";
        console.log(true);
        return true;
    } else {
        triangle.innerText = "a = " + a + ", b = " + b + ", c = " + c + " -> No, it's not a triangle";
        console.log(false);
        return false;
    }
};

const buttonTriangle = document.createElement("button");
buttonTriangle.innerText = "Úloha 9 (Triangle or Not)";
buttonTriangle.setAttribute("id", "task-9");
buttonTriangle.addEventListener("click", () => triangle(3, 4, 0));

tasks.appendChild(buttonTriangle);



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

const triangleArea = (a, b, c) => {
    const triangleArea = document.createElement("div");
    if (triangle(a, b, c)) {
        const p = (a + b + c) / 2;
        triangleArea.innerText =
            "Triangle area is " + Math.sqrt(p * (p - a) * (p - b) * (p - c));
        result.appendChild(triangleArea);
    } else {
        triangleArea.innerText =
            "It's not a triangle, can't calculate the area";
    }
    result.appendChild(triangleArea);
};

const buttonTriangleArea = document.createElement("button");
buttonTriangleArea.innerText = "Úloha 10 (Triangle Area)";
buttonTriangleArea.setAttribute("id", "task-10");
buttonTriangleArea.addEventListener("click", () =>
    triangleArea(3, 4, 5)
);

tasks.appendChild(buttonTriangleArea);

