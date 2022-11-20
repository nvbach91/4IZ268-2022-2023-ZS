console.log('Hola světe');
const test = () => {
    console.log('Hola světe');
};

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const task1 = () => {
    console.log("1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných používejte smysluplnou angličtinu.");
};
const Button1 = document.createElement('button');
Button1.innerText = 'Uloha 1 (Pepe s age)';
Button1.setAttribute('id', 'task-1');
Button1.addEventListener('click', task1);
const tasks = document.querySelector('#tasks');
tasks.appendChild(Button1);


const Pepe = {
    name: "Pepe",
    birth: "1950",
};
const sentence1 = (Pepe) => {
    const sentence1 = `I have been thinking about ${Pepe.name} s age, and i think its ${2022 - Pepe.birth}.`;
    console.log(sentence1);
};
sentence1(Pepe);

sentence2 = () =>{
    console.log(sentence1(Pepe);
};

const ButtonR1 = document.createElement('button');
ButtonR1.innerText = 'Reseni Uloha 1 (Pepe s age)';
ButtonR1.setAttribute('id', 'result-1');
ButtonR1.addEventListener('click', sentence2);
const results = document.querySelector('#results');
tasks.appendChild(ButtonR1);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const task2 = () => {
    console.log("WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:z C na F: vynásobit 9, vydělit 5 a přičíst 32. z F na C: odečíst 32, vynásobit 5 a vydělit 9.");
};
const Button2 = document.createElement('button');
Button2.innerText = 'Uloha 2 (WTF (wow, that is fun))';
Button2.setAttribute('id', 'task-2');
Button2.addEventListener('click', task2);
tasks.appendChild(Button2);

const CELSIUS = 20;
const FAHRENHEIT = 68;

const FROMCELSIUSTOFAHRENHEIT = (CELSIUS) => {
  const TemperatureC = CELSIUS;
  const ComputationCTOF = TemperatureC * 9 / 5 + 32;
  const result1 = `${TemperatureC}\xB0C is ${ComputationCTOF} in \xB0F.`;
    console.log(result1);
};
FROMCELSIUSTOFAHRENHEIT(CELSIUS);

const FROMFAHRENHEITTOCELSIUS = (FAHRENHEIT) => {
  const TemperatureF = FAHRENHEIT;
  const ComputationFTOC  = (TemperatureF - 32) * 5 / 9;
  const result2 = `${TemperatureF}\xB0F is ${ComputationFTOC} in \xB0C.`;
    console.log(result2);
};
FROMFAHRENHEITTOCELSIUS(FAHRENHEIT);

const ButtonR2 = document.createElement('button');
ButtonR2.innerText = 'Reseni Uloha 2 (WTF (wow, that is fun))';
ButtonR2.setAttribute('id', 'result-2');
ButtonR2.addEventListener('click', FROMCELSIUSTOFAHRENHEIT);
ButtonR2.addEventListener('click', FROMFAHRENHEITTOCELSIUS);
tasks.appendChild(ButtonR2);


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
const task3 = () => {
    console.log("Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvoříte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. ");
};
const Button3 = document.createElement('button');
Button3.innerText = 'Uloha 3 (Funkce function fonction funktio)';
Button3.setAttribute('id', 'task-3');
Button3.addEventListener('click', task3);
tasks.appendChild(Button3);





console.log("They were already made as functions.");
const Giuseppe = {
    name: "Giuseppe",
    birth: "1998",
};
const Gianna = {
    name: "Gianna",
    birth: "2002",
};
sentence1(Giuseppe);
sentence1(Gianna);

const CELSIUS2 = 0;
const FAHRENHEIT2 = 451;
FROMCELSIUSTOFAHRENHEIT(CELSIUS2);
FROMFAHRENHEITTOCELSIUS(FAHRENHEIT2);
const CELSIUS3 = 100;
const FAHRENHEIT3 = -459;
FROMCELSIUSTOFAHRENHEIT(CELSIUS3);
FROMFAHRENHEITTOCELSIUS(FAHRENHEIT3);

const ButtonR3 = document.createElement('button');
ButtonR3.innerText = 'Reseni Uloha 3 (Funkce function fonction funktio)';
ButtonR3.setAttribute('id', 'result-3');
ButtonR3.addEventListener('click', sentence1);
ButtonR3.addEventListener('click', FROMCELSIUSTOFAHRENHEIT);
ButtonR3.addEventListener('click', FROMFAHRENHEITTOCELSIUS);
tasks.appendChild(ButtonR3);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const task4 = () => {
    console.log("Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!");
};
const Button4 = document.createElement('button');
Button4.innerText = 'Uloha 4 (%CENSORED%)';
Button4.setAttribute('id', 'task-4');
Button4.addEventListener('click', task4);
tasks.appendChild(Button4);

const number_1 = 10;
const number_2 = 100;     


const PERCENTAGeFROM = (number1, number2) => {
    const calculation1 = `${number1} is ${((number1/number2)*100).toFixed(2)}\u0025 from ${number2}`;
    console.log(calculation1);
}
          
PERCENTAGeFROM(number_1, number_2);



const ButtonR4 = document.createElement('button');
ButtonR4.innerText = 'Reseni Uloha 4 (%CENSORED%)';
ButtonR4.setAttribute('id', 'result-4');
ButtonR4.addEventListener('click', PERCENTAGeFROM);
tasks.appendChild(ButtonR4);
/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na stránce. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const task5 = () => {
    console.log("Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného místa na stránce. Pokud se čísla rovnají, vypište, že se rovnají.");
};
const Button5 = document.createElement('button');
Button5.innerText = 'Uloha 5 (Kdo s koho)';
Button5.setAttribute('id', 'task-5');
Button5.addEventListener('click', task5);
tasks.appendChild(Button5);

const number_3 = 0.1;
const number_4 = 0.3;
const number_5 = 2/10;
const number_6 = 4/10;

const BIGGERorEQUAL = (number_1, number_2) => {  
  bigger = 0;
    if (number_1 === number_2) {
    bigger = `The numbers are equal`;
}
    else if (number_1 > number_2){
    bigger = `${number_1} is of the higher value`;
} 
    else {
    bigger = `${number_2} is of the higher value`;
}
  console.log(bigger);
}

BIGGERorEQUAL(number_1, number_2);
BIGGERorEQUAL(number_2, number_1);

BIGGERorEQUAL(number_3, number_4);
BIGGERorEQUAL(number_4, number_3);

BIGGERorEQUAL(number_5, number_6);
BIGGERorEQUAL(number_6, number_5);

BIGGERorEQUAL(number_1, number_1);




const ButtonR5 = document.createElement('button');
ButtonR5.innerText = 'Reseni Uloha 5 (Kdo s koho)';
ButtonR5.setAttribute('id', 'result-5');
ButtonR5.addEventListener('click', BIGGERorEQUAL);
tasks.appendChild(Button_R5);
/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const task6 = () => {
    console.log("I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730, včetě nuly. Používejte for cyklus.");
};
const Button6 = document.createElement('button');
Button6.innerText = 'Uloha 6';
Button6.setAttribute('id', 'task-6');
Button6.addEventListener('click', task6);
tasks.appendChild(Button6);



const number_7 = 13;
const number_8 = 730;

const MULTIPLESwithLIMIT =(number_7, number_8) => {
    const multiples = [0,];
    
    for(let i = number_7; i<= number_8; i= i+number_7){
      multiples.push(i);
    }
    console.log(multiples)
};

MULTIPLESwithLIMIT(number_7,number_8);


const ButtonR6 = document.createElement('button');
ButtonR6.innerText = 'Reseni Uloha 6';
ButtonR6.setAttribute('id', 'result-6');
ButtonR6.addEventListener('click', MULTIPLESwithLIMIT);
tasks.appendChild(ButtonR6);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const task7 = () => {
    console.log("Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.");
};
const Button7 = document.createElement('button');
Button7.innerText = 'Uloha 7';
Button7.setAttribute('id', 'task-7');
Button7.addEventListener('click', task7);
tasks.appendChild(Button7);

const rad = 3;

const volume = (rad) => {
    const volume1 = `The volume of circle with radius ${rad} is ${Math.pow(rad,2)*Math.PI}`;
    console.log(volume1);
};

volume(rad);

const ButtonR7 = document.createElement('button');
ButtonR7.innerText = 'Reseni Uloha 7';
ButtonR7.setAttribute('id', 'result-7');
ButtonR7.addEventListener('click', volume);
tasks.appendChild(ButtonR7);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const task8 = () => {
    console.log("Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.");
};
const Button8 = document.createElement('button');
Button8.innerText = 'Uloha 8';
Button8.setAttribute('id', 'task-8');
Button8.addEventListener('click', task8);
tasks.appendChild(Button8);

const height = 5;
const volumeCone = (rad,height) => {
    const volume3 = `The volume of cone with radius ${rad} and height of ${height} is ${(1/3)*Math.pow(rad,2)*Math.PI*height}`;
    console.log(volume3);
};
volumeCone(rad,height);

const ButtonR8 = document.createElement('button');
ButtonR8.innerText = 'Reseni Uloha 8';
ButtonR8.setAttribute('id', 'result-8');
ButtonR8.addEventListener('click', volumeCone);
tasks.appendChild(ButtonR8);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const task9 = () => {
    console.log("Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false");
};
const Button9 = document.createElement('button');
Button9.innerText = 'Uloha 9';
Button9.setAttribute('id', 'task-9');
Button9.addEventListener('click', task9);
tasks.appendChild(Button9);


const a = 1;
const b = 2;
const c = 3;

const sides = (a,b,c) => {
    if((a+b>c)&&(a+c>b)&&(b+c)>a){
        return true;
}
    else{
    return false};
};

console.log(sides(a,b,c))

const ButtonR9 = document.createElement('button');
ButtonR9.innerText = 'Reseni Uloha 9';
ButtonR9.setAttribute('id', 'result-9');
ButtonR9.addEventListener('click', sides);
tasks.appendChild(ButtonR9);


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

const task10 = () => {
    console.log("Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce, tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().");
};
const Button10 = document.createElement('button');
Button10.innerText = 'Uloha 10';
Button10.setAttribute('id', 'task-10');
Button10.addEventListener('click', task10);
tasks.appendChild(Button10);

const heron = (a,b,c) => {
    if(sides){
        const s = (a+b+c)/2;
        return Math.sqrt(s*(s-a)*(s-b)*(s-c));
    }   
};

console.log(heron(a,b,c));


const ButtonR10 = document.createElement('button');
ButtonR10.innerText = 'Reseni Uloha 10';
ButtonR10.setAttribute('id', 'result-10');
ButtonR10.addEventListener('click', heron);
tasks.appendChild(ButtonR10);















