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
console.log("Ahoj světe");

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných
 * používejte smysluplnou angličtinu.
 */
// Solution here
const pepe_age = 1950;
const currentYear = new Date().getFullYear()
console.log(`Pepův věk je: ${currentYear  - pepe_age}`);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here
const celsius = 20;
const fahrenheiht = (celsius * 9) / 5 + 32;

console.log(`${celsius}°C = ${fahrenheiht}°F`);

const calculate = (celsius, fahrenheiht) => {
  if (celsius) {
    fahrenheiht = (celsius * 9) / 5 + 32;
  }
  if (fahrenheiht) {
    celsius = ((fahrenheiht - 32) * 5) / 9;
  }
};

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

function sayHello(text) {
  console.log(text);
}

function printPepeAge(age) {
  console.log(`Pepův věk je: ${age}`);
}

function calculateTemperature(celsius, fahrenheiht) {
  if (celsius) {
    fahrenheiht = (celsius * 9) / 5 + 32;
  }
  if (fahrenheiht) {
    celsius = ((fahrenheiht - 32) * 5) / 9;
  }

  console.log(`${celsius}°C = ${fahrenheiht}°F`);
}

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
function division(numerator, denominator) {
  if (denominator != 0) {
    divisionResult = ((numerator / denominator) * 100).toFixed(2);
    result = `${numerator} je ${divisionResult}% z ${denominator}`;
    document.getElementById("result").innerHTML = result;
  } else {
    error = "Error, division by 0!";
    document.getElementById("error").innerHTML = error;
  }
}

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
function isBigger(first, second) {
  if (first > second) {
    result5 = `${first} is bigger than ${second}`;
  } else if (first < second) {
    result5 = `${second} is bigger than ${first}`;
  } else if (first === second) {
    result5 = `${second} is equal to ${first}`;
  } else {
    result5 = "INPUT ERROR!";
  }

  document.getElementById("result5").innerHTML = result5;
}

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
function makeCycle() {
  const multiples = [];
  for (let i = 0; i <= 730; i = i + 13) {
    multiples.push(i);
  }
  document.getElementById("multiples").innerHTML = multiples;
}

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function calculateArea(r) {
  const pi = 3.14159265
  const content = (pi * r ** 2).toFixed(2);
  document.getElementById("content").innerHTML = content;
}

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
function calculateVolume(v, r) {
  const pi = 3.14159265
  const volume = ((1 / 3) * pi * r ** 2 * v).toFixed(2);
  document.getElementById("volume").innerHTML = volume;
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

// function isTriangle (a, b, c) => {
//     return (a + b > c) ||( a + c > b) || (b + c > a);
//  };
const isTriangle = (a, b, c) => {
  return a + b > c && a + c > b && b + c > a;
};

const buttonIsTriangle = document.createElement("button");
buttonIsTriangle.innerText = "Uloha 9";

buttonIsTriangle.addEventListener("click", () => {
  document.getElementById("triangle").innerHTML = isTriangle(10, 10, 10);
});

const tasks = document.querySelector("#tasks");
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
const heronCalculation = (a, b, c) => {
  if (!isTriangle(a, b, c)) {
    return "Error: Triangle cannot be constructed!";
  }
  s = (a + b + c) / 2;
  S = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  return S;
};
//   - krok 1.1 - pomocí selektoru vyberte container pro výpis výsledků a uložte ho do proměnné

//   - krok 1.2 - zvalidujte vstupní argumenty pomocí funkce z úlohy č. 9

//     - v případě nevalidních hodnot vypište chybovou hlášku na místo pro výpis výsledků a funkci ukončete
//     - v případě validních hodnot pokračujte s výpočtem
//   - krok 1.3 - spočítejte obsah trojúhelníku podle Heronovy vzorce a výsledek uložte do proměnné
//   - krok 1.4 - vypište výsledek na místo pro výpis výsledků;
//document.getElementById("heron").innerHTML = heronCalculation(1,4,4);
// - krok 2 - vytvořte tlačítko
const buttonHeronCalc = document.createElement("button");
buttonHeronCalc.innerText = "Uloha 10";
// - krok 3 - nabindujte na toto tlačítko callback, ve kterém zavoláte implementovanou funkci pro výpočet a výpis výsledků
buttonHeronCalc.addEventListener("click", () => {
  document.getElementById("heron").innerHTML = heronCalculation(1, 4, 4);
});
// - krok 4 - tlačítko umístěte na stránku
tasks.appendChild(buttonHeronCalc);
// - krok 5 - otestujte řešení klikáním na tlačítko
