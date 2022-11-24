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

const pepaBirthYear = 2001;
const thisYear = 2022;
const word1 = "Pepovi je ";
const pepasAge = thisYear - pepaBirthYear;
const sentence = word1 + pepasAge;

console.log(sentence);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here

const oneFahrenheiht = 68;
const oneCelcius = ((oneFahrenheiht - 32) * 5) / 9;
console.log(oneFahrenheiht + " = " + oneCelcius);

const twoCelsius = 20;
const twoFahrenheiht = (twoCelsius * 9) / 5 + 32;
console.log(twoCelsius + " = " + twoFahrenheiht);

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

const fcePepesAge = () => {
  console.log(sentence);
};

const buttonPepesAge = document.createElement("button");
buttonPepesAge.innerText = "Uloha 1 (Pepe's age)";
buttonPepesAge.setAttribute("id", "task-1");
buttonPepesAge.addEventListener("click", () => fcePepesAge());

const tasks = document.querySelector("#tasks");
const result = document.querySelector("#results");

tasks.appendChild(buttonPepesAge);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const censored = (a, b) => {
  const censoredA = (a / b) * 100;
  const censoredAResult = document.createElement("div");
  censoredAResult.innerText = a + " z/ze " + b + " je " + censoredA + "%";
  result.appendChild(censoredAResult);
};

const buttonCensored = document.createElement("button");
buttonCensored.innerText = "Uloha 4 (%CENSORED%)";
buttonCensored.setAttribute("id", "task-4");
buttonCensored.addEventListener("click", () => censored(21, 42));

tasks.appendChild(buttonCensored);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const whosIsBigger = (a, b) => {
  let WhoIsBigger = "";
  if (a > b) {
    WhoIsBigger = a + " je větší než " + b;
  } else if (b > a) {
    WhoIsBigger = b + " je větší než " + a;
  } else {
    WhoIsBigger = "Čísla se rovnají!";
  }

  const WhoIsBiggerResult = document.createElement("div");
  WhoIsBiggerResult.innerText = WhoIsBigger;
  result.appendChild(WhoIsBiggerResult);
};

const buttonWhoIsBigger = document.createElement("button");
buttonWhoIsBigger.innerText = "Uloha 5 (Kdo z koho)";
buttonWhoIsBigger.setAttribute("id", "task-5");
buttonWhoIsBigger.addEventListener("click", () => whosIsBigger(1 / 5, 1 / 6));

tasks.appendChild(buttonWhoIsBigger);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const multiplesOfThirteen = () => {
  const multiples13 = document.createElement("div");
  for (let i = 13; i < 730; i += 13) {
    multiples13.innerText += i + " ";
  }
  result.appendChild(multiples13);
};

const buttonMultiples13 = document.createElement("button");
buttonMultiples13.innerText = "Úloha 6 (Násobky třinácti)";
buttonMultiples13.setAttribute("id", "task-6");
buttonMultiples13.addEventListener("click", () => multiplesOfThirteen());

tasks.appendChild(buttonMultiples13);
/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const areaOfCircle = (r) => {
  const area = document.createElement("div");
  area.innerText = (2 * Math.PI * r * r).toFixed(2);
  result.appendChild(area);
};

const buttonAreaOfCircle = document.createElement("button");
buttonAreaOfCircle.innerText = "Úloha 7 (Obsah kruhu)";
buttonAreaOfCircle.setAttribute("id", "task-7");
buttonAreaOfCircle.addEventListener("click", () => areaOfCircle(10));

tasks.appendChild(buttonAreaOfCircle);
/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const volumeOfCone = (v, r) => {
  const volumeOfCone = document.createElement("div");
  volumeOfCone.innerText = ((1 / 3) * Math.PI * r * r * v).toFixed(2);
  result.appendChild(volumeOfCone);
};

const buttonVolumeOfCone = document.createElement("button");
buttonVolumeOfCone.innerText = "Úloha 8 (Objem kužele)";
buttonVolumeOfCone.setAttribute("id", "task-8");
buttonVolumeOfCone.addEventListener("click", () => volumeOfCone(10, 5));

tasks.appendChild(buttonVolumeOfCone);

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const isTriangle = (a, b, c) => {
  const isTriangle = document.createElement("div");
  result.appendChild(isTriangle);
  if (a + b > c && a + c > b && b + c > a) {
    isTriangle.innerText = `a=${a}, b=${b}, c=${c} = Ano`;
    console.log(true);
    return true;
  } else {
    isTriangle.innerText = `a=${a}, b=${b}, c=${c} = Ne`;
    console.log(false);
    return false;
  }
};

const buttonTriangle = document.createElement("button");
buttonTriangle.innerText = "Úloha 9 (Not sure if triangle)";
buttonTriangle.setAttribute("id", "task-9");
buttonTriangle.addEventListener("click", () => isTriangle(10, 10, 5));

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

const areaOfTriangle = (a, b, c) => {
  const areaOfTriangle = document.createElement("div");
  if (isTriangle(a, b, c)) {
    const s = (a + b + c) / 2;
    areaOfTriangle.innerText =
      "Obsah trojúhelníku = " +
      Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);
    result.appendChild(areaOfTriangle);
  } else {
    areaOfTriangle.innerText =
      "Nejedná se o trojúhelník, nemá to cenu počítat!";
  }
  result.appendChild(areaOfTriangle);
};

const buttonAreaOfTriangle = document.createElement("button");
buttonAreaOfTriangle.innerText = "Úloha 10 (Heroic performance)";
buttonAreaOfTriangle.setAttribute("id", "task-10");
buttonAreaOfTriangle.addEventListener("click", () => areaOfTriangle(10, 10, 5));

tasks.appendChild(buttonAreaOfTriangle);
