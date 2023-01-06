/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "task-buttons"). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result").
 * 
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 */
console.log('Ahoj světe')


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const pepesAge = 2022 - 2000;
//console.log('Pepe is ' + PepesAge + ' years old.');
const sentence = `Pepe is ${pepesAge} years old.`;
console.log(sentence);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const c = 20;
const f = 59;
const calculateF = c * 9 / 5 + 32;
const calculateC = (f - 32 ) * 5 / 9;
console.log(c + '°C = ' + calculateF + '°F resp. ' + calculateF + '°F = ' + c + '°C');
console.log(f + '°F = ' + calculateC + '°C resp. ' + calculateC + '°C = ' + f + '°F');

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
function pepesAgefun(born) {
    const age = 2022 - born;
    document.getElementById('result1').append('Pepes age is ' + age);
    return 'Pepes age is ' + age;
};


function countCAndF(cel, fah) {
    const cToF = cel * 9 / 5 + 32;
    const fToC = (fah - 32) * 5 / 9;
    document.getElementById('result2').append(cel + '°C = ' + cToF + '°F and ' + fah + '°F = ' + fToC + '°C');
    return cel + '°C = ' + cToF + '°F and ' + fah + '°F = ' + fToC + '°C';
};  

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
function divideByZero(x, y) {
    if (y == 0){
        document.getElementById('result3').append('Nulou se nedá dělit.');
        return 'Nulou se nedá dělit.';
    } else {
        const per = x / y;
        document.getElementById('result3').append(x + ' je ' + (per*100).toFixed(2) + '%' + 'z  ' + y);
        return x + ' je ' + (per*100).toFixed(2) + '% z ' + y;
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
function whichIsBigger (x, y) {
    if (x == y){
        document.getElementById('result4').append('Obě čísla jsou si rovny.');
        return 'Obě čísla jsou si rovny.';
    } else  if (x > y){
        document.getElementById('result4').append(`${x} je větší než číslo ${y}.`);
        return `${x} je větší než číslo ${y}.`;
    } else {
        document.getElementById('result4').append(`${y} je větší než číslo ${x}.`);
        return `${y} je větší než číslo ${x}.`;
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
function multiplesOf13 () {
    for(let i = 0; i <= 730; i = i + 13){
        array.push(i);
    };
    document.getElementById('result5').append(array);
    return array
};

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
function contentCircle (x) {
    const res = 3.14 * x ** 2;
    document.getElementById('result6').append(`Obsah kružnice je ${res}`);
    return `Obsah kružnice je ${res}`;
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
    document.getElementById('result7').append(`Objem kužele je ${res.toFixed(2)}`);
    return `Objem kužele je ${res.toFixed(2)}`;
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
function triangle (x, y, z) {
    if (x > y + z) {
        document.getElementById('result8').append(`False`);
        return 'False';
    } else if (y > x + z) {
        document.getElementById('result8').append(`False`);
        return 'False';
    } else if (z > x + y) {
        document.getElementById('result8').append(`False`);
        return 'False';
    } else {
        document.getElementById('result8').append(`True`);
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
function heronsFormula (x, y, z) {
    if (x > y + z) {
        document.getElementById('result9').append(`False`);
        return 'False';
    } else if (y > x + z) {
        document.getElementById('result9').append(`False`);
        return 'False';
    } else if (z > x + y) {
        document.getElementById('result9').append(`False`);
        return 'False';
    } else {
        const s = (x + y + z) / 2;
        const res = Math.sqrt(s*(s-x)*(s-y)*(s-z));
        document.getElementById('result9').append(`Obsah trojúhelníku je ${res.toFixed(2)}`);
        return `Obsah trojúhelníku je ${res.toFixed(2)}`;
    };
    
};