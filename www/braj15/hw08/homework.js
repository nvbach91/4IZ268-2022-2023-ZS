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
    console.log('Ahoj světe');
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

const pepuvVek = (vek) => {
    console.log(`Pepovi je ${vek} let.`)
}

const buttonAge = document.createElement('button');
buttonAge.innerText = 'Jaky je Pepuv vek?';
buttonAge.setAttribute('id', 'task-1');
buttonAge.addEventListener('click', () => pepuvVek(15));
tasks.appendChild(buttonAge);





/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const prevod = (teplotaC, teplotaF) => {
    const prevedenoNaC = ((teplotaF - 32)*5)/9;
    const prevedenoNaF = ((teplotaC*9)/5)+32;
    console.log(`teplota prevedena na C: ${prevedenoNaC} a teplota prevedena na F: ${prevedenoNaF}`)
}

const buttonPrevodTeploty = document.createElement('button');
buttonPrevodTeploty.innerText = 'Prevod teploty';
buttonPrevodTeploty.setAttribute('id', 'task-2');
buttonPrevodTeploty.addEventListener('click', () => prevod(15,18));
tasks.appendChild(buttonPrevodTeploty);






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
        const vysledek = (x/y)*100;
        const vysledekDeleni = document.createElement('div')
        vysledekDeleni.innerText = `${vysledek.toFixed(2)}%`;
        vysledekDeleni.setAttribute('id', 'result-4');
        results.appendChild(vysledekDeleni);
    } 
    else {
        const vysledekDeleni = document.createElement('div')
        vysledekDeleni.innerText = 'Deleni';
        vysledekDeleni.setAttribute('id', 'result-4');
        results.appendChild(vysledekDeleni);
    }
}

const buttonDeleni = document.createElement('button');
buttonDeleni.innerText = 'Deleni';
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

const kdoSKoho = (x,y) => {
    let kdo = "";
    if (x > y){
        kdo = `${x} je vetší než ${y}`;
    }
    else if (x<y){
        kdo = `${y} je vetší než ${x}`;
    }
    else {
        kdo = `čísla ${x} a ${y} jsou stejně velká `;
    }
    const kdoVyhral = document.createElement('div')
    kdoVyhral.innerText = kdo;
    kdoVyhral.setAttribute('id', 'result-4');
    results.appendChild(kdoVyhral);
}

const buttonKdoVyhral = document.createElement('button');
buttonKdoVyhral.innerText = 'Kdo s koho';
buttonKdoVyhral.setAttribute('id', 'task-3');
buttonKdoVyhral.addEventListener('click', () => kdoSKoho(21,42));
tasks.appendChild(buttonKdoVyhral);




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const nasobky = () => {   
    const nasobky13 = document.createElement('div')
    for (let i = 0; i < 730; i+=13) {      
        nasobky13.innerText += `${i} `;       
    }
    
    nasobky13.setAttribute('id', 'result-4');
    results.appendChild(nasobky13);   
}

const buttonSpustNasobeni = document.createElement('button');
buttonSpustNasobeni.innerText = 'Násobky 13';
buttonSpustNasobeni.setAttribute('id', 'task-4');
buttonSpustNasobeni.addEventListener('click', () => nasobky());
tasks.appendChild(buttonSpustNasobeni);





/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const obsah = (r) => {
    const obsahKruznice = 2*3.14*r*r;
    console.log(obsahKruznice);
    return obsahKruznice;
}

const buttonObsahKruhu = document.createElement('button');
buttonObsahKruhu.innerText = 'Obsah kruhu';
buttonObsahKruhu.setAttribute('id', 'task-4');
buttonObsahKruhu.addEventListener('click', () => obsah(10));
tasks.appendChild(buttonObsahKruhu);




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const kuželu = (v,r) => {
    const objemKuzelu = (2*3.14*r*r*v)/3
    console.log(objemKuzelu);
}

const buttonObjemKuzelu = document.createElement('button');
buttonObjemKuzelu.innerText = 'Objem kužele';
buttonObjemKuzelu.setAttribute('id', 'task-4');
buttonObjemKuzelu.addEventListener('click', () => kuželu(10,10));
tasks.appendChild(buttonObjemKuzelu);




/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const notSureIfTriangle = (a,b,c) => {
    if ((a+b)>=c && (a+c)>=b && (b+c)>=a) {
        console.log(true);
        return true;
    }
    else {
        console.log(false);
        return false;
    }
    
}

const buttonNotSureIfTriangle = document.createElement('button');
buttonNotSureIfTriangle.innerText = 'notSureIfTriangle';
buttonNotSureIfTriangle.setAttribute('id', 'task-4');
buttonNotSureIfTriangle.addEventListener('click', () => notSureIfTriangle(10,10,10));
tasks.appendChild(buttonNotSureIfTriangle);



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


const heroicPerformance = (a,b,c) => {
    let obsahVzorec = "";
    if (notSureIfTriangle(a,b,c)) {
        const s = (a+b+c)/2;
        obsahVzorec = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        console.log(obsahVzorec);
    }
    else {
        console.log("nejedná se o trojuhelnik a nema cenu pocitat")
    }
    const obsahHeron = document.createElement('div')
    obsahHeron.innerText = obsahVzorec;
    obsahHeron.setAttribute('id', 'result-10');
    results.appendChild(obsahHeron);
}

const buttonHeroicPerformance = document.createElement('button');
buttonHeroicPerformance.innerText = 'heroicPerformance';
buttonHeroicPerformance.setAttribute('id', 'task-10');
buttonHeroicPerformance.addEventListener('click', () => heroicPerformance(10,10,10));
tasks.appendChild(buttonHeroicPerformance);