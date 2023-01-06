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


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const bornP = 1968;
const agep = 2022 - bornP;
const words1 = 'Pepes age is ';
const sentence1 = words1 +  agep
console.log(sentence1);




/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsius = 25;
const fahrenheiht = 77;
const cToF = (number) => {
    return number * 9 / 5 + 32;
};
const fToC = (number) => {
    return (number - 32) * 5 / 9; 
};
const words2 = '°C '
const words3 = '= '
const words4 = '°F '
const sentence2 = celsius + words2 + words3 + cToF(celsius) + words4;
const sentence3 = fahrenheiht + words4 + words3 + fToC(fahrenheiht) + words2;
console.log(sentence2 + 'also ' + sentence3);




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

function pepesAge(born) {
    const age = 2022 - born;
    document.getElementById('result-1').append('Pepes age is ' + age);
    return 'Pepes age is ' + age;
};


function countCAndF(c, f) {
    const ctof = c * 9 / 5 + 32;
    const ftoc = (f - 32) * 5 / 9;
    document.getElementById('result-2').append(c + '°C = ' + ctof + '°F and ' + f + '°F = ' + f + '°C');
    return c + '°C = ' + ctof + '°F and ' + f + '°F = ' + f + '°C';
};  

/** 
function countCAndF(){
    document.getElementById('output').innerHTML;
};
*/




/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
function divide(a, b) {
    if (b == 0){
        document.getElementById('result-3').append('Nulou se dělit nesmí');
        return 'Nulou se dělit nesmí';
    } else {
        const per = a / b;
        document.getElementById('result-3').append(a + ' je ' + (per*100).toFixed(2) + '%' + 'z  ' + b);
        return a + ' je ' + (per*100).toFixed(2) + '% z ' + b;
    };
};






/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
function whichIsBigger (a, b) {
    if (a == b){
        document.getElementById('result-4').append('Obě čísla jsou stejně veliké');
        return 'Obě čísla jsou stejně veliké';
    } else  if (a > b){
        document.getElementById('result-4').append(`${a} je větší než číslo ${b}`);
        return `${a} je větší než číslo ${b}`;
    } else {
        document.getElementById('result-4').append(`${b} je větší než číslo ${a}`);
        return `${b} je větší než číslo ${a}`;
    };
};






/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const array = []
function till730 () {
    for(let i = 0; i <= 730; i = i + 13){
        array.push(i);
    };
    document.getElementById('result-5').append(array);
    return array
};




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
function contentCircle (a) {
    const res = 3.14 * a ** 2;
    document.getElementById('result-6').append(`Výsledný obsah kružnice je ${res}`);
    return `Výsledný obsah kružnice je ${res}`;
};





/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
function volumeCone (v, r) {
    const res = 1 / 3 * 3.14 * r ** 2 * v;
    document.getElementById('result-7').append(`Výsledný objem kužele je ${res.toFixed(2)}`);
    return `Výsledný objem kužele je ${res.toFixed(2)}`;
}




/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
function triangle (a, b, c) {
    if (a > b + c) {
        document.getElementById('result-8').append(`False`);
        return 'False';
    } else if (b > a + c) {
        document.getElementById('result-8').append(`False`);
        return 'False';
    } else if (c > a + b) {
        document.getElementById('result-8').append(`False`);
        return 'False';
    } else {
        document.getElementById('result-8').append(`True`);
        return 'True';
    };
};





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
function triangleHeron (a, b, c) {
    if (a > b + c) {
        document.getElementById('result-9').append(`False`);
        return 'False';
    } else if (b > a + c) {
        document.getElementById('result-9').append(`False`);
        return 'False';
    } else if (c > a + b) {
        document.getElementById('result-9').append(`False`);
        return 'False';
    } else {
        const s = (a + b + c) / 2;
        const res = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        document.getElementById('result-9').append(`Výsledný obsah trojúhelníku je ${res.toFixed(2)}`);
        return `Výsledný obsah trojúhelníku je ${res.toFixed(2)}`;
    };
    
};
