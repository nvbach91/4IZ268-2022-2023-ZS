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

const pepesBirthyear = 1969;
console.log(`Pepe is ${(new Date()).getFullYear() - pepesBirthyear} years old`);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */

const celsius = 20;
const fahrenheiht = 68;

console.log(`${celsius}°C = ${celsius * 9 / 5 + 32}°F`);
console.log(`${fahrenheiht}°F = ${(fahrenheiht - 32) * 5 / 9}°C`);

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
function pepesAge(birthyear) {
    return `Pepe is ${(new Date()).getFullYear() - birthyear} years old`;
}

console.log(pepesAge(1942));

function convertTemp(value, targetUnit) {
    let result;
    if (targetUnit === "celsius") {
        result = ((value - 32) * 5 / 9) + "°C";
    } else if (targetUnit === "fahrenheiht") {
        result = (value * 9 / 5 + 32) + "°F";
    } else throw new TypeError("Incorrect target unit. Use 'celsius' or 'fahrenheiht'");
    return result;
}

// console.log(convertTemp(20, "fahrenheiht"))
// console.log(convertTemp(68, "celsius"))
// console.log(convertTemp(42, "yeet"))

function createTestButton(label, onClick) {
    const testBtn = document.createElement("button");
    testBtn.textContent = label;
    testBtn.onclick = onClick;
    testBtn.style.marginRight = "10px";
    document.getElementById("task-buttons").append(testBtn);
}

createTestButton("Test temps", () => {
    console.log(convertTemp(20, "fahrenheiht"));
    console.log(convertTemp(68, "celsius"));
})

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
function div(a, b) {
    if (b === 0) throw new RangeError("Cannot divide by 0");

    const result = ((a / b) * 100).toFixed(2);
    const resultArea = document.createElement("p");
    resultArea.textContent = a + " je " + result + "% z " + b;
    document.getElementById("result").append(resultArea);
}

createTestButton("Test division", () => div(2, 8));

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
function compare(a, b) {
    const resultArea = document.createElement("p")

    if (a > b) resultArea.textContent = a + " je větší než " + b;
    else if (b > a) resultArea.textContent = b + " je větší než " + a;
    else resultArea.textContent = "čísla jsou si rovna";
    document.getElementById("result").append(resultArea);
}

createTestButton("Test compare 2 < 3", () => compare(2, 3));
createTestButton("Test compare 5 > 4", () => compare(5, 4));
createTestButton("Test compare 6 = 6", () => compare(6, 6));

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
function thirteen() {
    for (let i = 13; i < 730; i += 13) {
        console.log(i);
    }
}

createTestButton("Test 13", () => thirteen());

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
function circleSurface(radius) {
    return Math.PI * radius ** 2;
}

createTestButton("Test circle surface", () => console.log(circleSurface(5)));

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
function coneVolume(height, radius) {
    return Math.PI * radius ** 2 * (height / 3);
}

createTestButton("Test cone volume", () => console.log(coneVolume(12, 4)));


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
    return a + b > c && a + c > b && b + c > a;
}

createTestButton("Test triangle, true", () => console.log(isTriangle(3, 4, 5)));
createTestButton("Test triangle, false", () => console.log(isTriangle(1, 2, 3)));

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

function heron(a, b, c) {
    if (!isTriangle(a, b, c)) throw new RangeError("this is not a triangle");

    let semiperimeter = (a + b + c) / 2;
    return Math.sqrt(semiperimeter * (semiperimeter - a) * (semiperimeter - b) * (semiperimeter - c));
}

createTestButton("Test heron", () => console.log(heron(3, 4, 5)));
