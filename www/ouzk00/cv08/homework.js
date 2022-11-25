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

const pepeBirthYear = 1984;

const currentDate = new Date().getFullYear();
const pepeAge = currentDate - pepeBirthYear;
const pepeSentence = `Pepe is ${pepeAge} years old.`;

console.log(pepeSentence);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here

const temperatureCelsius = 0;
const temperatureFahrenheit = 0;

const convertToFahrenheit = (temperatureCelsius * 9) / 5 + 32;
const convertToCelsius = ((temperatureFahrenheit - 32) * 5) / 9;

console.log(`${temperatureCelsius}°C = ${convertToFahrenheit}°F`);
console.log(`${temperatureFahrenheit}°F = ${convertToCelsius}°C`);

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

const calculateAge = (birthYear) => {
  const age = new Date().getFullYear() - birthYear;
  console.log(`Pepe is currently ${age} years old.`);
};

const toFahrenheit = (celsius) => {
  const inFahrenheit = (celsius * 9) / 5 + 32;
  console.log(`${celsius}°C = ${inFahrenheit}°F`);
};

const toCelsius = (fahrenheit) => {
  const inCelsius = ((fahrenheit - 32) * 5) / 9;
  console.log(`${fahrenheit}°C = ${inCelsius}°F`);
};

const buttonPepeAge = document.querySelector("#task-1");
buttonPepeAge.innerText = "Pepes age";
buttonPepeAge.addEventListener("click", () => {
  calculateAge(2000);
});

const buttonToFahrenheit = document.querySelector("#task-2");
buttonToFahrenheit.innerText = "°C to °F";
buttonToFahrenheit.addEventListener("click", () => {
  toFahrenheit(0);
});

const buttonToCelsius = document.querySelector("#task-3");
buttonToCelsius.innerText = "°F to °C";
buttonToCelsius.addEventListener("click", () => {
  toCelsius(0);
});

const tasks = document.querySelector("#tasks");
tasks.appendChild(buttonPepeAge);
tasks.appendChild(buttonToFahrenheit);
tasks.appendChild(buttonToCelsius);

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
  if (b === 0) {
    return "Cannot divide by zero.";
  } else {
    return ((a / b) * 100).toFixed(2);
  }
}

const buttonDivide = document.querySelector("#task-4");
buttonDivide.innerText = "Divide";
buttonDivide.addEventListener("click", () => {
  console.log(`${divide(73, 79)}%`);
  document.getElementById("results").innerHTML = `${divide(73, 79)}%`;
});

tasks.appendChild(buttonDivide);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

function compare(x, y) {
  if (x === y) {
    return `Both numbers are equal to ${x}.`;
  }
  if (x > y) {
    return `${x} is bigger than ${y}`;
  }
  if (x < y) {
    return `${x} is smaller than ${y}`;
  }
  return `Sorry, those are not numbers.`;
}

const buttonCompareEqual = document.querySelector("#task-5");
buttonCompareEqual.innerText = "a = b";
buttonCompareEqual.addEventListener("click", () => {
  console.log(`${compare(20, 20)}%`);
  document.getElementById("results").innerHTML = compare(20, 20);
});

const buttonCompareLesser = document.querySelector("#task-6");
buttonCompareLesser.innerText = "a < b";
buttonCompareLesser.addEventListener("click", () => {
  console.log(`${compare(10, 20)}%`);
  document.getElementById("results").innerHTML = compare(10, 20);
});

const buttonCompareGreater = document.querySelector("#task-7");
buttonCompareGreater.innerText = "a > b";
buttonCompareGreater.addEventListener("click", () => {
  console.log(`${compare(30, 20)}%`);
  document.getElementById("results").innerHTML = compare(30, 20);
});

tasks.appendChild(buttonCompareEqual);
tasks.appendChild(buttonCompareLesser);
tasks.appendChild(buttonCompareGreater);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const thirteen = () => {
  let result = "";
  for (let i = 0; i * 13 <= 730; i++ * 13) {
    result += i * 13 + " ";
  }
  return result;
};

const buttonThirteen = document.querySelector("#task-8");
buttonThirteen.innerText = "Thirteens";
buttonThirteen.addEventListener("click", () => {
  console.log(thirteen());
  document.getElementById("results").innerHTML = thirteen();
});

tasks.appendChild(buttonThirteen);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function calculateCircleArea(circleRadius) {
  circleArea = circleRadius * circleRadius * 3.14;
  return circleArea;
}

const buttonCircleArea = document.querySelector("#task-9");
buttonCircleArea.innerText = "Circle Area";
buttonCircleArea.addEventListener("click", () => {
  console.log(calculateCircleArea(5));
  document.getElementById("results").innerHTML = calculateCircleArea(5);
});

tasks.appendChild(buttonCircleArea);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function calculateConeVolume(coneHeight, coneRadius) {
  coneVolume = (1 / 3) * 3.14 * coneRadius * coneRadius * coneHeight;
  return coneVolume;
}

const buttonConeVolume = document.querySelector("#task-10");
buttonConeVolume.innerText = "Cone Volume";
buttonConeVolume.addEventListener("click", () => {
  console.log(calculateConeVolume(2, 3));
  document.getElementById("results").innerHTML = calculateConeVolume(2, 3);
});

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

function triangleOrNot(sideA, sideB, sideC) {
  if (sideA < sideB + sideC && sideA > sideB && sideA > sideC) return true;
  if (sideB < sideA + sideC && sideB > sideA && sideB > sideC) return true;
  if (sideC < sideA + sideB && sideC > sideA && sideC > sideB) return true;
  if (sideA === sideB && sideB === sideC) return true;
  else return false;
}

function trueToYes() {
  if (triangleOrNot === true) return "Yes.";
  else return "No.";
}

function isItATriangle(sideA, sideB, sideC) {
  return `Side A = ${sideA}, side B = ${sideB} and side C = ${sideC}. Is it a triangle? ${trueToYes()}`;
}

const buttonIsItATriangle = document.querySelector("#task-11");
buttonIsItATriangle.innerText = "Is it a triangle?";
buttonIsItATriangle.addEventListener("click", () => {
  console.log(isItATriangle(8, 1, 1));
  document.getElementById("results").innerHTML = isItATriangle(8, 1, 1);
});

tasks.appendChild(buttonIsItATriangle);

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function heronsFormula(sideA, sideB, sideC) {
  if (triangleOrNot(sideA, sideB, sideC) === false) {
    return "This is not a triangle.";
  }
  if (triangleOrNot(sideA, sideB, sideC) === true) {
    const triangleSemiPerimeter = (sideA + sideB + sideC) / 2;
    result = Math.sqrt(
      triangleSemiPerimeter *
        (triangleSemiPerimeter - sideA) *
        (triangleSemiPerimeter - sideB) *
        (triangleSemiPerimeter - sideC)
    );
    return result;
  }
}

const buttonHeronsFormula = document.querySelector("#task-12");
buttonHeronsFormula.innerText = "Herons formula";
buttonHeronsFormula.addEventListener("click", () => {
  console.log(heronsFormula(2, 3, 4));
  document.getElementById("results").innerHTML = heronsFormula(2, 3, 4);
});

tasks.appendChild(buttonHeronsFormula);

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
