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

console.log('Ahoj světe!');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných
 * používejte smysluplnou angličtinu.
 */

const pepeBirthYear = 2019;
const currentYear = (new Date()).getFullYear();
const pepeAge = currentYear - pepeBirthYear;

switch (true) {
  case pepeAge < 0:
    console.log('Pepa se teprve narodí!');
    break;
  case pepeAge === 0:
    console.log('Pepovi je teprve pár měsíců.');
    break;
  case pepeAge === 1:
    console.log(`Pepovi je ${pepeAge} rok.`);
    break;
  case pepeAge > 1 && pepeAge < 5:
    console.log(`Pepovi jsou ${pepeAge} roky.`);
    break;
  default:
    console.log(`Pepovi je ${pepeAge} let.`);
}

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */

// celsius to fahrenheit

const tempCelsius1 = 24;
const tempFahrenheit1 = (tempCelsius1 * 9 / 5) + 32;

console.log(`${tempCelsius1.toFixed(2)}°C = ${tempFahrenheit1.toFixed(2)}°F`)

// fahrenheit to celsius

const tempFahrenheit2 = 33;
const tempCelsius2 = (tempFahrenheit2 - 32) * 5 / 9;

console.log(`${tempFahrenheit2.toFixed(2)}°F = ${tempCelsius2.toFixed(2)}°C`)

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

function writeToConsole(fn, ...args) {
  const result = fn.call(this, ...args);

  // write result to default console
  console.log(result);

  const resultBox = document.getElementById('task-result');

  const newRow = `${fn.name} > ${result}`;

  // write result to result box in formatted way with fn name
  resultBox.value = resultBox.value ? `${resultBox.value}\n${newRow}` : newRow;

  // scroll down in textarea to see the result
  resultBox.scrollTop = resultBox.scrollHeight;
}

function createButton(id, text, fn, ...args) {
  // create new html element
  const button = document.createElement('button');

  // update all element attributes
  button.type = 'button';
  button.classList.add('btn', 'btn-primary');
  button.id = `task-button-${id}`;
  button.innerText = text;

  // attach event to the button
  button.addEventListener('click', () => writeToConsole(fn, ...args));

  // place the button to the container
  const container = document.getElementById('task-buttons');

  container.appendChild(button);
}

function getPepeAge(pepeBirthYear) {
  const currentYear = (new Date()).getFullYear();
  const pepeAge = currentYear - pepeBirthYear;

  if (pepeAge < 0) {
    return 'Pepa se teprve narodí!';
  }

  if (pepeAge === 0) {
    return 'Pepovi je teprve pár měsíců.';
  }

  if (pepeAge === 1) {
    return `Pepovi je ${pepeAge} rok.`;
  }

  if (pepeAge > 1 && pepeAge < 5) {
    return `Pepovi jsou ${pepeAge} roky.`;
  }

  return `Pepovi je ${pepeAge} let.`;
}

function fahrenheitToCelsius(tempFahrenheit) {
  const tempCelsius = ((tempFahrenheit - 32) * 5 / 9);
  return `${tempFahrenheit.toFixed(2)}°F = ${tempCelsius.toFixed(2)}°C`;
}

function celsiusToFahrenheit(tempCelsius) {
  const tempFahrenheit = ((tempCelsius * 9 / 5) + 32);
  return `${tempCelsius.toFixed(2)}°C = ${tempFahrenheit.toFixed(2)}°F`;
}

writeToConsole(getPepeAge, 2010);
writeToConsole(getPepeAge, 2005);

writeToConsole(fahrenheitToCelsius, 32);
writeToConsole(fahrenheitToCelsius, 45);

writeToConsole(celsiusToFahrenheit, 30);
writeToConsole(celsiusToFahrenheit, 20);

createButton(1, 'Pepes age', getPepeAge, 2009);
createButton(2, 'Fahrenheit to celsius', fahrenheitToCelsius, 35);
createButton(3, 'Celsius to Fahrenheit', celsiusToFahrenheit, 10);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

function numbersPortion(num1, num2) {
  const portion = num2 === 0 ? 0 : (num1 / num2) * 100;
  return `${num1} je ${portion.toFixed(2)} % z ${num2}.`;
}

writeToConsole(numbersPortion, 20, 40);
writeToConsole(numbersPortion, 20, 0);
writeToConsole(numbersPortion, 100, 20);

createButton(4, '%CENSORED%', numbersPortion, 20, 40);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */

function chooseBiggerNumber(num1, num2) {
  if (num1 > num2) {
    return `${num1} je větší než ${num2}.`;
  }

  if (num2 > num1) {
    return `${num2} je větší než ${num1}.`;
  }

  return `Čísla ${num1} a ${num2} jsou stejná.`;
}

writeToConsole(chooseBiggerNumber, 10, 20);
writeToConsole(chooseBiggerNumber, 0, 0);
writeToConsole(chooseBiggerNumber, 20.0, 20.1);
writeToConsole(chooseBiggerNumber, -45, -50);

createButton('5a', 'Kdo s koho (10, 20)', chooseBiggerNumber, 10, 20)
createButton('5b', 'Kdo s koho (1/3, 1/4)', chooseBiggerNumber, 1 / 3, 1 / 4)
createButton('5c', 'Kdo s koho (0.25, 1/4)', chooseBiggerNumber, 0.25, 1 / 4)

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */

function multiplesOf13() {
  const arr = [];

  for (let x = 0; x <= 730; x++) {
    if (x % 13 === 0) {
      arr.push(x);
    }
  }

  return arr.join(', ');
}

writeToConsole(multiplesOf13);

createButton(6, 'I can clearly see the pattern', multiplesOf13);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function getContentOfTheCircleByRadiusInCm(radius) {
  const content = Math.PI * Math.pow(radius, 2);
  return `Kružnice s poloměrem ${radius} cm má obsah ${content.toFixed(2)} cm2.`
}

writeToConsole(getContentOfTheCircleByRadiusInCm, 10.5);

createButton(7, 'Around and about', getContentOfTheCircleByRadiusInCm, 10.5);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function getVolumeOfConeByRadiusAndHeightInCm(radius, height) {
  const volume = (Math.PI * Math.pow(radius, 2) * height) / 3;
  return `Kužel s poloměrem ${radius} cm a výškou ${height} cm má objem ${volume.toFixed(2)} cm3.`;
}

writeToConsole(getVolumeOfConeByRadiusAndHeightInCm, 10, 30);

createButton(8, 'Another dimension', getVolumeOfConeByRadiusAndHeightInCm, 10, 30);

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function isValidTriangle(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

function formattedIsValidTriangle(a, b, c) {
  const result = isValidTriangle(a, b, c);
  return result
    ? `Trojúhelník lze sestrojit se stranami A: ${a} cm, B: ${b} cm, C: ${c} cm.`
    : `Trojúhelník nelze sestrojit se stranami A: ${a} cm, B: ${b} cm, C: ${c} cm.`;
}

writeToConsole(formattedIsValidTriangle, 5, 6, 30);
writeToConsole(formattedIsValidTriangle, 5, 5, 10);
writeToConsole(formattedIsValidTriangle, 5, 5, 9);

createButton(9, 'Not sure if triangle', formattedIsValidTriangle, 5, 6, 9);

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function calcContentOfTriangle(a, b, c) {
  if (!isValidTriangle(a, b, c)) {
    return 'Ze zadaných argumentů nelze trojúhelník sestrojit.'
  }

  const s = (a + b + c) / 2;

  const content = Math.sqrt(s * (s - a) * (s - b) * (s - c))

  return `Trojúhelník se stranami A: ${a} cm, B: ${b} cm, C: ${c} cm má obsah ${content.toFixed(2)} cm2.`;
}

writeToConsole(calcContentOfTriangle, 5, 5, 20);

createButton(10, 'Heroic performance', calcContentOfTriangle, 10, 20, 25);