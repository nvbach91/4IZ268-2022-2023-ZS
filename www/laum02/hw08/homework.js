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


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
let pepa_birth = 1980;
console.log("Pepovi je " + (new Date().getFullYear() - pepa_birth) + " let")



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsius = 23;
const fahrenheiht_new = (celsius * 9 / 5) + 32
console.log(celsius + " °C je zhruba " + fahrenheiht_new + " °F")

const fahrenheiht = 73.4;
const celsius_new = (fahrenheiht - 32) * 5 / 9
console.log(fahrenheiht + " °F je zhruba " + celsius_new + " °C")


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
const say_age = (bithdate) => { console.log("Pepovi je " + (new Date().getFullYear() - bithdate) + " let") }
const button_task_1 = document.createElement("button");
button_task_1.innerText = "Uloha 1 (Pepe's age)";
button_task_1.setAttribute('id', 'task-1');
button_task_1.addEventListener('click', () => say_age(1970));
const tasks = document.querySelector('#tasks');
tasks.appendChild(button_task_1);

const f_to_c = (f) => { console.log(f + " °F je zhruba " + ((f - 32) * 5 / 9) + " °C") }
const button_task_2 = document.createElement("button");
button_task_2.innerText = "Uloha 2 (Fahrenheiht to Celsius)";
button_task_2.setAttribute('id', 'task-2');
button_task_2.addEventListener('click', () => f_to_c(68));
tasks.appendChild(button_task_2);

const c_to_f = (c) => { console.log(c + " °C je zhruba " + ((c * 9 / 5) + 32) + " °F") }
const button_task_3 = document.createElement("button");
button_task_3.innerText = "Uloha 3 (Fahrenheiht to Celsius)";
button_task_3.setAttribute('id', 'task-3');
button_task_3.addEventListener('click', () => c_to_f(20));
tasks.appendChild(button_task_3);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const divide = (n1, n2) => {
    if (n2 === 0) return("Nelze dělit nulou")
    else return((n1 / n2).toFixed(2) + " %")
}
const button_task_4 = document.createElement("button");
button_task_4.innerText = "Uloha 4 (deleni)";
button_task_4.setAttribute('id', 'task-4');
button_task_4.addEventListener('click', () => document.querySelector("#out-4").innerHTML = divide(10, 5));
tasks.appendChild(button_task_4);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const decide = (n1, n2) => {
    if (n1 > n2) return(n1 + " je větší než" + n2)
    else if (n2 > n1) return(n2 + " je větší než " + n2)
    else return("Čísla " + n1 + " a " + n2 + " se rovnají.")
}
const button_task_5 = document.createElement("button");
button_task_5.innerText = "Uloha 5 (kdo z koho)";
button_task_5.setAttribute('id', 'task-5');
button_task_5.addEventListener('click', () => document.querySelector("#out-5").innerHTML = decide(2, 2));
tasks.appendChild(button_task_5);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const up_to_13 = () => {
    for (let i = 13; i <= 730; i+=13) {
        console.log(i)
      }
}
const button_task_6 = document.createElement("button");
button_task_6.innerText = "Uloha 6 (jupí 13)";
button_task_6.setAttribute('id', 'task-6');
button_task_6.addEventListener('click', up_to_13);
tasks.appendChild(button_task_6);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const circle = (r) => { console.log(Math.PI * r ** 2) }
const button_task_7 = document.createElement("button");
button_task_7.innerText = "Uloha 7 (kroužek)";
button_task_7.setAttribute('id', 'task-7');
button_task_7.addEventListener('click', () => circle(2, 3));
tasks.appendChild(button_task_7);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const valec = (v, r) => { console.log(Math.PI * r ** 2 * v) }
const button_task_8 = document.createElement("button");
button_task_8.innerText = "Uloha 8 (valec)";
button_task_8.setAttribute('id', 'task-8');
button_task_8.addEventListener('click', () => valec(2, 3));
tasks.appendChild(button_task_8);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const check_triangle = (a, b, c) => {
    const possible = "možné";
    if (a + b <= c || a + c <= b || b + c <= a) possible = "nemožné."
    console.log("Pro stranu a = " + a + ", b = " + b + ", a c = " + c + " je sestrojit trojuhelník " + possible);

    return(possible === "možné")
}
const button_task_9 = document.createElement("button");
button_task_9.innerText = "Uloha 9 (trojuhelnik)";
button_task_9.setAttribute('id', 'task-9');
button_task_9.addEventListener('click', () => check_triangle(2, 3, 4));
tasks.appendChild(button_task_9);

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
const heron = (a, b, c) => {
    const out = document.querySelector("#out-10")
    if (!check_triangle(a,b,c)) {
        out.innerHTML = "Není možné sestavit trojuhelnik";
        stop();
    }
    const s = (a + b + c) / 2
    const res =  Math.sqrt( s * (s - a) * (s - b) * (s - c) )
    out.innerHTML = res;
} 
const button_task_10 = document.createElement("button");
button_task_10.innerText = "Uloha 10 (heron)";
button_task_10.setAttribute('id', 'task-10');
button_task_10.addEventListener('click', () => heron(2, 3, 4));
tasks.appendChild(button_task_10);
