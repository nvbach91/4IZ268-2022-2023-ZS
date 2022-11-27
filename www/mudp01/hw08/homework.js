/* HOMEWORK */
const tasks = document.querySelector('#tasks');
const results = document.querySelector("#results");
const result0 = document.createElement("p");

results.appendChild(result0);
const result1 = document.createElement("p");
results.appendChild(result1);
const result2 = document.createElement("p");
results.appendChild(result2);
const result3 = document.createElement("p");
results.appendChild(result3);
const result4 = document.createElement("p");
results.appendChild(result4);
const result5 = document.createElement("p");
results.appendChild(result5);
const result6 = document.createElement("p");
results.appendChild(result6);
const result7 = document.createElement("p");
results.appendChild(result7);
const result8 = document.createElement("p");
results.appendChild(result8);
const result9 = document.createElement("p");
results.appendChild(result9);
const result10 = document.createElement("p");
results.appendChild(result10);
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
var presentYear = 2022; 
const bornYear = 2000;
var pepaAge = presentYear - bornYear;
console.log("Pepovi je " + pepaAge + " let.");



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
var C = 20;
var F = 68;

function getC(Far){
    return ((Far-32)*5)/9;
}

function getF(Cel){
    return ((Cel*9)/5) + 32;
}

console.log(C + "°C = " + getF(C) + "°F");
console.log(F + "°F = " + getC(F) + "°C");


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
const hello = () => {
    console.log("Ahoj světe");  
}

const pepaAgeFunc = (pYear, bYear) => {
    return console.log("Pepovi je " + (pYear-bYear) + " let.");
}

const celToFar = (Cel) => {
    console.log(Cel + "°C = " + getF(C) + "°F");
}

const farToCel = (Far) => {
    console.log(Far + "°F = " + getC(F) + "°C");
}



const buttonPozdrav = document.createElement("button");
buttonPozdrav.innerText = "Pozdrav svět";
buttonPozdrav.setAttribute("id", "task-0");
buttonPozdrav.addEventListener("click", ()=> {
    hello();
})
tasks.appendChild(buttonPozdrav);

const buttonGetPepaAge = document.createElement('button');
buttonGetPepaAge.innerText = "Pepův věk";
buttonGetPepaAge.setAttribute("id", "task-1");
buttonGetPepaAge.addEventListener("click", () => {
    pepaAgeFunc(presentYear, bornYear);
});
tasks.appendChild(buttonGetPepaAge);

const buttonGetFah = document.createElement("button");
buttonGetFah.innerText = "Převeď stupně celsia na stupně fahrenheita";
buttonGetFah.setAttribute("id", "task-2a");
buttonGetFah.addEventListener("click", ()=>{
    celToFar(20);
})
tasks.appendChild(buttonGetFah);

const buttonGetCel = document.createElement("button");
buttonGetCel.innerText = "Převeď stupně fahrenheita na stupně celsia";
buttonGetCel.setAttribute("id", "task-2b");
buttonGetCel.addEventListener("click", ()=>{
    farToCel(68);
})
tasks.appendChild(buttonGetCel);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here



 

const getDivide = (num1, num2) =>{ 
    const br = document.createElement("br");
    if(num1 !== 0 & num2 !== 0){
        results.appendChild(br);
        results.append("Číslo " + num2 + " je " + (num2/num1 * 100).toFixed(2) + "% z " + num1 +".");
    }
    else{
        results.appendChild(br);
        results.append("Nulou dělit nelze!");
        
    }
}

const buttonDivide = document.createElement("button");
buttonDivide.innerText = "Vyděl čísla";
buttonDivide.setAttribute("id", "task-4");
buttonDivide.addEventListener("click", ()=>{
    getDivide(2050,40);
})
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

const compare = (num1, num2) =>{
if(((num1 * 10)/10) > ((num2*10)/10)){
    return " je větší než ";
}if (((num1*10)/10) === ((num2*10)/10)) {
    return " je rovno ";
}
else{
    return " je menší než ";
}
}

const kdoZKoho = ( int1, int2, double1, double2, fraction1, fraction2) => {
    const br = document.createElement("br");
    results.appendChild(br);
    results.append(int1 + compare(int1, int2) + int2 + ". ");
    results.append(double1 + compare(double1, double2) + double2 + ". ");
    results.append(fraction1.toFixed(2) + compare(fraction1, fraction2) + fraction2.toFixed(2) + ". ");
}

const buttonKdoZKoho = document.createElement("button");
buttonKdoZKoho.innerHTML = "Kdo z koho?";
buttonKdoZKoho.setAttribute("id", "task-5");
buttonKdoZKoho.addEventListener("click", () =>{
    kdoZKoho(1, 1, 0.1, 0.11, 5/7, 9/7);
})
tasks.appendChild(buttonKdoZKoho);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const multiple = 13;

const getPattern = () =>{
    const br = document.createElement("br");
    results.appendChild(br);
    for(let a = 0; a <=730; a = a + multiple){
        results.append(a + ", ");
    }
}

const buttonNasobky = document.createElement("button");
buttonNasobky.innerText = "Násobky";
buttonNasobky.setAttribute("id", "task-6");
buttonNasobky.addEventListener("click", ()=>{
    getPattern();
})
tasks.appendChild(buttonNasobky);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here



const getCircumference = (r) =>{
    const br = document.createElement("br");
    results.appendChild(br);
    results.append(2*r*Math.PI);
    
}

const buttonObsahKruznice = document.createElement("button");
buttonObsahKruznice.innerText = "Obsah kružnice";
buttonObsahKruznice.setAttribute("id", "task-7");
buttonObsahKruznice.addEventListener("click",() =>{
    getCircumference(4);
})
tasks.appendChild(buttonObsahKruznice);



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getObjemKuzelu = (r,v) =>{
    const br = document.createElement("br");
    results.appendChild(br);
    results.append((1/3)*Math.PI*Math.pow(r,2)*v);
}

const buttonObjemKuzelu = document.createElement("button");
buttonObjemKuzelu.innerText = "Objem kuželu";
buttonObjemKuzelu.setAttribute("id", "task-8");
buttonObjemKuzelu.addEventListener("click", ()=>{
    getObjemKuzelu(4,8) ;
})
tasks.appendChild(buttonObjemKuzelu);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
let hypotenuse;
let short1;
let short2; 

const getHypotenuse = (a,b,c,) =>{
    let potencialHypotenuse = {};

    if(a>b){
        potencialHypotenuse = a;
        short1 = b;
    } else{
        potencialHypotenuse = b;
        short1 = a;
    }

    if(potencialHypotenuse>c){
        hypotenuse = potencialHypotenuse;
        short2 = c;
    }else{
        hypotenuse = c;
        short2 = potencialHypotenuse;
    }
}

const isItTriangle = () => {
    if(hypotenuse < (short1 + short2)){
        return true;
    }else{
        return false;
    }
}

const buttonIsItTriangle = document.createElement("button");
buttonIsItTriangle.innerText = "Je to trojúhelník?";
buttonIsItTriangle.setAttribute("id", "task-9");
buttonIsItTriangle.addEventListener("click", () => {
    getHypotenuse(3, 7, 10);
    const br = document.createElement("br");
    results.appendChild(br);
    results.append("c = " + hypotenuse + ", a = " + short1 + ", b = " + short2 + " => " + isItTriangle());
})
tasks.appendChild(buttonIsItTriangle);



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

const getObsah = (a,b,c) =>{
    getHypotenuse(a,b,c);
    if(isItTriangle())
    {
        let s  = (short1 + short2 + hypotenuse)/2;
        let S = s*(s-short1)*(s-short2)*(s-hypotenuse);
        let br = document.createElement("br");
        results.appendChild(br);
        results.append("S = " + S);    
    }
    else
    {
        let br = document.createElement("br");
        results.appendChild(br);
        results.append("Nevalidní data!")
        console.log("c = " + hypotenuse + ", a = " + short1 + ", b = " + short2 + " => " + isItTriangle())
    }
}

const buttonObsahTrojuhelniku = document.createElement("button");
buttonObsahTrojuhelniku.innerText = "Obsah Trojúhelníku";
buttonObsahTrojuhelniku.setAttribute("id", "task-10");
buttonObsahTrojuhelniku.addEventListener("click", () =>{
    getObsah(10,15,12);
})
tasks.appendChild(buttonObsahTrojuhelniku);
