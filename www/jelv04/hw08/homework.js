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
console.log('Ahoj, světe!');
const tasks = document.querySelector('#tasks');
const results = document.querySelector('#results');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const name = 'Pepe';
const birthyear = 1969;
const agecount = (a) => {
    return 2022 - a
};
const age = agecount(birthyear);
console.log(name + ' is ' + age + ' years old!');



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const CtoF = (C) => {
    return C * 9 / 5 + 32
};

const FtoC = (F) => {
    return (F-32) * 5 / 9
};
const celsius = 100;
const fahrenheiht = 32;
const testCtoF = CtoF(celsius);
const testFtoC = FtoC(fahrenheiht);

console.log(celsius + '°C = ' + testCtoF + '°F');
console.log(fahrenheiht + '°F = ' + testFtoC + '°C');


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

const age_fun = () =>{
    answer = name + ' is ' + age + ' years old!'
    results.textContent = answer
};


const convert_a = () => {
    answer = celsius + '°C = ' + testCtoF + '°F'
    results.textContent = answer
};

const convert_b = () => {
    answer = fahrenheiht + '°F = ' + testFtoC + '°C'
    results.textContent = answer
};

const button_one = document.createElement('button');
button_one.textContent = "Task one: Pepe's age";
button_one.addEventListener('click', age_fun);
tasks.appendChild(button_one);

const button_two_a = document.createElement('button');
button_two_a.textContent = "Task two: Celsius to Fahrenheit";
button_two_a.addEventListener('click', convert_a);

const button_two_b = document.createElement('button');
button_two_b.textContent = "Task two: Fahrenheit to Celsius";
button_two_b.addEventListener('click', convert_b);

tasks.appendChild(button_two_a);
tasks.appendChild(button_two_b);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const x = 56;
const y = 357;
const button_three = document.createElement('button');
button_three.textContent = "Task four: %CENSORED%";
button_three.addEventListener('click', () => {
    z = ((x/y)*100).toFixed(2)
    answer = x + ' je ' + z + '% z ' + y
    results.textContent = answer
});
tasks.appendChild(button_three);




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const button_four = document.createElement('button');
button_four.textContent = 'Task five: Kdo s koho!';
button_four.addEventListener('click', () => {
    if (x>y) {
        answer = x + ' je větší než ' + y
    }
    if (y>x){
        answer = x + ' je menší než ' + y
    }
    if (y===x){
        answer = 'Čísla ' + x + ' a ' + y + ' jsou stejná!'
    }
    results.textContent = answer
});

tasks.appendChild(button_four);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const button_five = document.createElement('button');
button_five.textContent = 'Task six: I can clerly see the pattern!';
button_five.addEventListener('click', () => {
    var answer = ''
    for (var i = 0; i <= 730; i){
        answer = answer.concat(i + ' ')
        i += 13
    }
    results.textContent = answer
});

tasks.appendChild(button_five);




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const button_six = document.createElement('button');
button_six.textContent = 'Task seven: Around and about';
button_six.addEventListener('click', () => {
    answer = 'Kružnice o poloměru ' + x + ' má obsah ' + (Math.PI * x * x)
    results.textContent = answer
});

tasks.appendChild(button_six);



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const button_seven = document.createElement('button');
button_seven.textContent = 'Task eight: Another dimension';
button_seven.addEventListener('click', () => {
    answer = 'Kužel o poloměru ' + x + ' a výšce ' + y + ' má objem ' + (Math.PI * x * x * y / 3)
    results.textContent = answer
});

tasks.appendChild(button_seven);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const z = 400

const yesno = () => {
    if ((x+y)>z && (x+z)>y && (y+z)>x){
        result = 'lze'
    } else{
        result = 'nelze'
    }
    return result
}

const button_eight = document.createElement('button');
button_eight.textContent = 'Task nine: Triangle';
button_eight.addEventListener('click', () => {
    answer = 'Z délek ' + x + ', ' + y + ', ' + z + ' ' + yesno() + ' udělat trojúhelník.' 
    results.textContent = answer
});

tasks.appendChild(button_eight);



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



const button_nine = document.createElement('button');
button_nine.textContent = 'Task ten: Heroic performance';
button_nine.addEventListener('click', () => {
    if(yesno === 'nelze'){
        answer = 'Není trojúhelník! Výpočet nemá smysl'
    } else{
        const s = (x + y + z) / 2;
        const area =  Math.sqrt(s * (s-x) * s * (s-y) * s * (s-z));
        answer = 'Z délek ' + x + ', ' + y + ', ' + z + ' vznikne trojúhelník s obsahem ' + area
    }
    
    results.textContent = answer
});

tasks.appendChild(button_nine);