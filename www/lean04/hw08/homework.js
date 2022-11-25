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

console.log('Ahoj světe');

const taskButtonsContainer = document.querySelector('#task-buttons');
const resultContainer = document.querySelector('#result');

const argFields = document.querySelectorAll('.arg');
argFields.forEach((argField) => {
    argField.addEventListener('change', (event) => {
        if (event.target.value === '') {
            argField.value = 0;
        }
    });
});

const highlightArgFields = (n) => {
    for (let i = 0; i < n; i++) {
        argFields[i].style.backgroundColor = 'salmon';
    }
};
const resetHighlight = () => {
    argFields.forEach((argField) => {
        argField.style.backgroundColor = 'white';
    });
};

const addHighlightOnHover = (button, n) => {
    button.addEventListener('mouseover', () => {
        highlightArgFields(n);
    });
    button.addEventListener('mouseout', resetHighlight);
};

const randomizeArgumentsButton = document.querySelector('#randomize-arguments');
randomizeArgumentsButton.addEventListener('click', () => {
    argFields.forEach((argField) => {
        argField.value = (Math.random() * 100).toFixed(2);
    });
});

const getArgs = () => Array.from(document.querySelectorAll('.arg')).map(({ value }) => parseFloat(value));

const renderAndLogResult = (f, formatResult = (x) => x) => {
    const args = getArgs();
    const result = f(...args);
    const formattedResult = formatResult(result, ...args);

    console.log(formattedResult);
    resultContainer.innerHTML = formattedResult;
};

const renderAndLogError = (error) => {
    console.error(error);
    resultContainer.innerHTML = error;
};

const createTaskButton = ({ id, textContent, highlightCount, onClick }) => {
    const taskButton = document.createElement('button');
    taskButton.setAttribute('id', id);
    taskButton.textContent = textContent;
    taskButton.addEventListener('click', onClick);
    if (highlightCount) {
        addHighlightOnHover(taskButton, highlightCount);
    }
    return taskButton;
};

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných
 * používejte smysluplnou angličtinu.
 */
// Solution here

const getAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    if (birthYear > currentYear) {
        throw Error('Birth year cannot be higher than current year.');
    }
    return currentYear - birthYear;
};

const pepeBirthYear = 1990;
const createPepeAgeText = (age) => `Pepe is ${Math.floor(age)} years old.`;
const logPepeAge = (birthYear) => console.log(createPepeAgeText(getAge(birthYear)));
logPepeAge(pepeBirthYear);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here

const celsiusToFahrenheit = (value) => (value * 9) / 5 + 32;
const fahrenheitToCelsius = (value) => ((value - 32) * 5) / 9;

const formatCelsiusToFahrenheit = (cValue, fValue) => `${cValue}°C = ${fValue.toFixed(2)}°F`;
const formatFahrenheitToCelsius = (fValue, cValue) => `${fValue}°F = ${cValue.toFixed(2)}°C`;

const logCelsiusToFahrenheit = (value) => console.log(formatCelsiusToFahrenheit(value, celsiusToFahrenheit(value)));
const logFahrenheitToCelsius = (value) => console.log(formatFahrenheitToCelsius(value, fahrenheitToCelsius(value)));

logCelsiusToFahrenheit(20);
logFahrenheitToCelsius(68);

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

const pepeAgeButton = createTaskButton({
    id: 'task-1',
    textContent: 'Pepe age',
    highlightCount: 1,
    onClick: () => {
        try {
            renderAndLogResult(getAge, createPepeAgeText);
        } catch (error) {
            renderAndLogError(error);
        }
    },
});

const celsiusToFahrenheitButton = createTaskButton({
    id: 'task-1-c-to-f',
    textContent: 'Celsius to Fahrenheit',
    highlightCount: 1,
    onClick: () => {
        renderAndLogResult(celsiusToFahrenheit, (fValue, cValue) => formatCelsiusToFahrenheit(cValue, fValue));
    },
});

const fahrenheitToCelsiusButton = createTaskButton({
    id: 'task-1-f-to-c',
    textContent: 'Fahrenheit to Celsius',
    highlightCount: 1,
    onClick: () => {
        renderAndLogResult(fahrenheitToCelsius, (cValue, fValue) => formatFahrenheitToCelsius(fValue, cValue));
    },
});

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const ratio = (a, b) => {
    if (b === 0) {
        throw Error('Cannot divide by zero.');
    }
    if (b < a) {
        throw Error('First number must be less than the second number.');
    }
    return ((a / b) * 100).toFixed(2);
};

const ratioButton = createTaskButton({
    id: 'task-2',
    textContent: 'Ratio',
    highlightCount: 2,
    onClick: () => {
        try {
            renderAndLogResult(ratio, (result, a, b) => `${a} out of ${b}: ${result}%`);
        } catch (error) {
            renderAndLogError(error);
        }
    },
});

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const maxNumber = (a, b) => Math.max(a, b);

const maxNumberButton = createTaskButton({
    id: 'task-3',
    textContent: 'Max number',
    highlightCount: 2,
    onClick: () => {
        renderAndLogResult(maxNumber, (result, a, b) => `Max number between ${a} and ${b}: ${result}`);
    },
});

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const multiplesOf13Until730 = () => {
    let current = 13;
    while (current < 730) {
        console.log(current);
        current += 13;
    }
};

const multiplesOf13Button = createTaskButton({
    id: 'task-4',
    textContent: 'Multiples of 13',
    onClick: () => {
        multiplesOf13Until730();
        resultContainer.innerHTML = `Result is shown in console.`;
    },
});

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const areaOfCircle = (radius) => Math.PI * Math.pow(radius, 2);

const areaOfCircleButton = createTaskButton({
    id: 'task-5',
    textContent: 'Area of circle',
    highlightCount: 2,
    onClick: () => {
        renderAndLogResult(
            areaOfCircle,
            (result, radius) => `Area of circle with radius ${radius}: ${result.toFixed(2)}`
        );
    },
});

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const volumeOfCone = (height, radius) => Math.PI * Math.pow(radius, 2) * (height / 3);

const volumeOfConeButton = createTaskButton({
    id: 'task-6',
    textContent: 'Volume of cone',
    highlightCount: 2,
    onClick: () => {
        renderAndLogResult(
            volumeOfCone,
            (result, height, radius) =>
                `Volume of cone with height ${height} and radius ${radius}: ${result.toFixed(2)}`
        );
    },
});

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

const canFormTriangle = (a, b, c) => {
    const areValidTriangleLengths = a + b > c && a + c > b && c + b > a;
    console.log({ a, b, c }, areValidTriangleLengths ? 'Yes' : 'No');
    return areValidTriangleLengths;
};

const canFormTriangleButton = createTaskButton({
    id: 'task-7',
    textContent: 'Can form triangle',
    highlightCount: 3,
    onClick: () => {
        renderAndLogResult(
            canFormTriangle,
            (result, a, b, c) => `Triangle with lengths ${a}, ${b} and ${c} is ${result ? 'possible' : 'not possible'}.`
        );
    },
});

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
    if (canFormTriangle(a, b, c)) {
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return area;
    }
    throw Error('Invalid triangle lengths.');
};

const areaOfTriangleButton = createTaskButton({
    id: 'task-8',
    textContent: 'Area of triangle',
    highlightCount: 3,
    onClick: () => {
        try {
            renderAndLogResult(
                areaOfTriangle,
                (result, a, b, c) => `Area of triangle with lengths ${a}, ${b} and ${c}: ${result.toFixed(2)}`
            );
        } catch (error) {
            renderAndLogError(error);
        }
    },
});

taskButtonsContainer.append(
    pepeAgeButton,
    celsiusToFahrenheitButton,
    fahrenheitToCelsiusButton,
    ratioButton,
    maxNumberButton,
    areaOfCircleButton,
    volumeOfConeButton,
    canFormTriangleButton,
    areaOfTriangleButton
);
