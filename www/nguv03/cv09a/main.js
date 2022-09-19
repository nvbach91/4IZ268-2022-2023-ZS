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

window.onload = () => {
    const pokedexForm = document.querySelector('#pokedex-form');
    console.log(pokedexForm);
    const pokemonNameInput = document.querySelector('input[name="pokemon-name"]');
    
    const body = document.querySelector('body');
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
        for (let i = 0; i < pokemonNames.length; i += 1) {
            const pokemonName = pokemonNames[i];
            const pokemonData = {
                name: pokemonName,
                type: 'Ligtning',
                id: 1,
                image: 'https://www.postavy.cz/foto/' + pokemonName + '-foto.jpg',
            };
            const pokemon = createPokemon(pokemonData);
            body.appendChild(pokemon);
        }
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