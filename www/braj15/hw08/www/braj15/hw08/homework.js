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

const greeting = () => {
    console.log('Hello world');
}


const buttonGreeting = document.createElement('button');
buttonGreeting.innerText = 'Pozdrav';
buttonGreeting.setAttribute('id', 'task-0');
buttonGreeting.addEventListener('click', () => greeting());
const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonGreeting);



/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const pepesAge = (vek) => {
    console.log(`Pepovi je ${vek} let.`)
}

const buttonAge = document.createElement('button');
buttonAge.innerText = 'What is Pepes age?';
buttonAge.setAttribute('id', 'task-1');
buttonAge.addEventListener('click', () => pepesAge(15));
tasks.appendChild(buttonAge);





/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const unitTransfer = (temperatureC, temperatureF) => {
    const transferToC = ((temperatureF - 32)*5)/9;
    const transferToF = ((temperatureC*9)/5)+32;
    console.log(`teplota prevedena na C: ${transferToC} a teplota prevedena na F: ${transferToF}`)
}

const buttonunitTransferTeploty = document.createElement('button');
buttonunitTransferTeploty.innerText = 'unitTransfer';
buttonunitTransferTeploty.setAttribute('id', 'task-2');
buttonunitTransferTeploty.addEventListener('click', () => unitTransfer(15,18));
tasks.appendChild(buttonunitTransferTeploty);






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





/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const results = document.querySelector('#results');


const censored = (x,y) => {
    if (y !== 0) {
        const result = (x/y)*100;
        const resultDivide = document.createElement('div')
        resultDivide.innerText = `${vysledek.toFixed(2)}%`;
        resultDivide.setAttribute('id', 'result-4');
        results.appendChild(resultDivide);
    } 
    else {
        const resultDivide = document.createElement('div')
        resultDivide.innerText = 'Deleni';
        resultDivide.setAttribute('id', 'result-4');
        results.appendChild(resultDivide);
    }
}

const buttonDeleni = document.createElement('button');
buttonDivide.innerText = 'Deleni';
buttonDeleni.setAttribute('id', 'task-3');
buttonDeleni.addEventListener('click', () => censored(21,42));
tasks.appendChild(buttonDeleni);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const whoIsBigger = (x,y) => {
    let who = "";
    if (x > y){
        who = `${x} je vetší než ${y}`;
    }
    else if (x<y){
        who = `${y} je vetší než ${x}`;
    }
    else {
        who = `čísla ${x} a ${y} jsou stejně velká `;
    }
    const whoWon = document.createElement('div')
    whoWon.innerText = kdo;
    whoWon.setAttribute('id', 'result-4');
    results.appendChild(whoWon);
}

const buttonWhoWon = document.createElement('button');
buttonWhoWon.innerText = 'Kdo s koho';
buttonWhoWon.setAttribute('id', 'task-3');
buttonWhoWon.addEventListener('click', () => whoIsBigger(21,42));
tasks.appendChild(buttonWhoWon);




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const multiply = () => {   
    const multipliedContainer = document.createElement('div')
    for (let i = 0; i < 730; i+=13) {      
        multipliedContainer.innerText += `${i} `;       
    }
    
    multipliedContainer.setAttribute('id', 'result-4');
    results.appendChild(multipliedContainer);   
}

const buttonStartMultiply = document.createElement('button');
buttonStartMultiply.innerText = 'Násobky 13';
buttonStartMultiply.setAttribute('id', 'task-4');
buttonStartMultiply.addEventListener('click', () => multiply());
tasks.appendChild(buttonStartMultiply);





/**
 * 7) Around and about. Vytvořte funkci, která vypočte content kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const content = (r) => {
    const contentcircle = 2*3.14*r*r;
    console.log(contentcircle);
    return contentcircle;
}

const buttonContentCircle = document.createElement('button');
buttonContentCircle.innerText = 'content kruhu';
buttonContentCircle.setAttribute('id', 'task-4');
buttonContentCircle.addEventListener('click', () => content(10));
tasks.appendChild(buttonContentCircle);




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem coneVolume, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const coneVolume = (v,r) => {
    const objemKuzelu = (2*3.14*r*r*v)/3
    console.log(objemKuzelu);
}

const buttonConeVolume = document.createElement('button');
buttonConeVolume.innerText = 'Objem kužele';
buttonConeVolume.setAttribute('id', 'task-4');
buttonConeVolume.addEventListener('click', () => coneVolume(10,10));
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

const isTriangle = (a,b,c) => {
    if ((a+b)>=c && (a+c)>=b && (b+c)>=a) {
        console.log(true);
        return true;
    }
    else {
        console.log(false);
        return false;
    }
    
}

const buttonIsTriangle = document.createElement('button');
buttonIsTriangle.innerText = 'isTriangle';
buttonIsTriangle.setAttribute('id', 'task-4');
buttonIsTriangle.addEventListener('click', () => isTriangle(10,10,10));
tasks.appendChild(buttonIsTriangle);



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše content trojúhelníka podle Heronova vzorce, 
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
//   - krok 1.3 - spočítejte content trojúhelníku podle Heronovy vzorce a výsledek uložte do proměnné
//   - krok 1.4 - vypište výsledek na místo pro výpis výsledků
// - krok 2 - vytvořte tlačítko
// - krok 3 - nabindujte na toto tlačítko callback, ve kterém zavoláte implementovanou funkci pro výpočet a výpis výsledků
// - krok 4 - tlačítko umístěte na stránku
// - krok 5 - otestujte řešení klikáním na tlačítko


const heroicPerformance = (a,b,c) => {
    let contentFormula = "";
    if (isTriangle(a,b,c)) {
        const s = (a+b+c)/2;
        contentFormula = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        console.log(contentFormula);
    }
    else {
        console.log("nejedná se o trojuhelnik a nema cenu pocitat")
    }
    const contentHeron = document.createElement('div')
    contentHeron.innerText = contentFormula;
    contentHeron.setAttribute('id', 'result-10');
    results.appendChild(contentHeron);
}

const buttonHeroicPerformance = document.createElement('button');
buttonHeroicPerformance.innerText = 'heroicPerformance';
buttonHeroicPerformance.setAttribute('id', 'task-10');
buttonHeroicPerformance.addEventListener('click', () => heroicPerformance(10,10,10));
tasks.appendChild(buttonHeroicPerformance);