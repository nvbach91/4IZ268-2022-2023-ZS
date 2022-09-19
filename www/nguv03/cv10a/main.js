/*
const sentence = 'lorem  slovo2 slovo3 slovo4';


const sentenceLength = sentence.length;
console.log(sentenceLength);

console.log(sentence.charAt(2));

console.log(sentence.indexOf('i'));

console.log(sentence.slice(0, 4));

console.log(sentence.slice(4));

console.log(sentence.slice(-3));

console.log(sentence.replace('m', 'x'));

console.log(sentence.replace(/\d/g, '+'));
console.log(sentence.replace(/\d/g, ''));

console.log(sentence.toUpperCase().toLowerCase());

console.log(sentence.split(' '));
console.log(sentence.split(/ +/));

const fruits = ['apple', 'is', 'delicious'];
console.log(fruits.join('***'));

console.log(
    '|' + 
    '   abcdef qwelj oqwhe    qwlekjad     \t'.trim() +
    '|'
);

*/

const showSpinner = () => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerText = 'Loading...';
    const body = document.querySelector('body');
    body.appendChild(spinner);

    return spinner;
};

window.onload = () => {
    const pokedexForm = document.querySelector('#pokedex-form');
    // console.log(pokedexForm);
    const pokemonNameInput = document.querySelector('input[name="pokemon-name"]');
    
    const pokemonContainer = document.querySelector('#pokemons');

    const pokemonTypeSelect = document.querySelector('select[name="pokemon-type"]');
    // zachytime udalost submit
    pokedexForm.addEventListener('submit', (e) => {
        // zrusime defaultni chovani formulare pri submitu
        // (formular se nikam neodesle)
        e.preventDefault();
        // pracujeme s inputy
        const inputValue = pokemonNameInput.value;
        // console.log(`|${pokemonName.trim()}|`);
        const pokemonNames = inputValue.split(' ');
        // ['pikachu', 'squirtle', 'charmander']
        const pokemons = [];

        // zobrazit spinner
        const spinner = showSpinner();

        for (let i = 0; i < pokemonNames.length; i += 1) {
            const pokemonName = pokemonNames[i];
            fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName).then((resp) => {
                return resp.json();
            }).then((resp) => {
                console.log(resp.height);
                const pokemonData = {
                    name: pokemonName,
                    // type: pokemonTypeSelect.options[pokemonTypeSelect.selectedIndex].value,
                    type: resp.types[0].type.name,
                    id: resp.id,
                    image: resp.sprites.front_default,
                };
                const pokemon = createPokemon(pokemonData);
                pokemons.push(pokemon);
                pokemonContainer.append(pokemon);

                spinner.remove();
            });
        }
        // pokemonContainer.append(...pokemons);
    });

    const pokemonRemoveAllButton = document.querySelector('#remove-all');
    pokemonRemoveAllButton.addEventListener('click', () => {
        pokemonContainer.innerHTML = '';
    });


};

const createPokemon = (pokemon) => {
    /*
    {
        name: 'Pikachu',
        type: 'Ligtning',
        id: 1,
        image: 'https://www.postavy.cz/foto/pikachu-foto.jpg',
    }
    */
    const pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('pokemon');
    // console.log(pokemonContainer);

    const pokemonNameContainer = document.createElement('div');
    pokemonNameContainer.classList.add('pokemon-name');
    pokemonNameContainer.innerText = pokemon.name;

    const pokemonIdContainer = document.createElement('div');
    pokemonIdContainer.classList.add('pokemon-id');
    pokemonIdContainer.innerText = pokemon.id;

    const pokemonTypeContainer = document.createElement('div');
    pokemonTypeContainer.classList.add('pokemon-type');
    pokemonTypeContainer.innerText = pokemon.type;

    const pokemonImageContainer = document.createElement('img');
    pokemonImageContainer.classList.add('pokemon-image');
    pokemonImageContainer.setAttribute('alt', 'pokemon-image');
    pokemonImageContainer.setAttribute('src', pokemon.image);
    
    const pokemonNameDisplay = document.querySelector('#current-pokemon');
    // nabindovat eventListener click na obrazek
    pokemonImageContainer.addEventListener('click', () => {
        pokemonNameDisplay.innerText = pokemon.name;
    });
        // v callbacku vybereme misto pro zobrazeni jmena pokemona

        // dosadime hodnotu jmena pokemona do tohoto mista



    const pokemonRemoveButton = document.createElement('button');
    pokemonRemoveButton.innerText = 'Dismiss';
    pokemonRemoveButton.addEventListener('click', () => {
        pokemonContainer.remove();
    });

    pokemonContainer.append(
        pokemonNameContainer,
        pokemonIdContainer,
        pokemonTypeContainer,
        pokemonImageContainer,
        pokemonRemoveButton,
    );

    return pokemonContainer;
};