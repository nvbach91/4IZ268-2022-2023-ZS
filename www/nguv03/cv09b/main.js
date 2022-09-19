/*console.log('ahoj svete-');

const sentence = '   kobyla ma  maly bok    kajak je blbej';

console.log(sentence.length);

console.log(sentence.charAt(5));
console.log(sentence.charAt(sentence.length - 1));

console.log(
    sentence.charAt(sentence.indexOf('b'))
);

console.log(sentence.slice(0, 5));
console.log(sentence.slice(5));
console.log(sentence.slice(-5));

console.log(sentence.replace('k', 'xxx'));
console.log(sentence.replace(/[kal]/g, 'x'));
console.log(sentence.replace(/ +/g, '-'));

console.log(sentence.toUpperCase());
console.log(sentence.toUpperCase().toLowerCase());


console.log(sentence.trim());
console.log(sentence.trim().split(/ +/));

const words = ['kobyla', 'ma', 'maly', 'bok'];

console.log(words.join('+'));*/

window.onload = () => {
    const pokemonForm = document.querySelector('#pokemon-form');
    // console.log(pokemonForm);
    const pokemonNameInput = document.querySelector('input[name="pokemon-name"]');
    const pokemonList = document.querySelector('#pokemons');
    pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // 'pikachu squirtle charmander' -> ['pikachu', 'squirtle', 'charmander'];
        const inputValue = pokemonNameInput.value.trim();
        const pokemonNames = inputValue.split(/ +/);
        const temporaryPokemons = [];
        for (let i = 0; i < pokemonNames.length; i += 1) {
            const pokemonName = pokemonNames[i];
            const pokemonData = {
                name: pokemonName,
                imageUrl: 'https://www.postavy.cz/foto/' + pokemonName + '-foto.jpg',
                type: 'lightning',
            };
            const pokemon = createPokemon(pokemonData);
            temporaryPokemons.push(pokemon);
        }
        pokemonList.append(...temporaryPokemons);
    });
};


const createPokemon = (pokemon) => {

    const pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('pokemon');

    const pokemonNameContainer = document.createElement('div');
    pokemonNameContainer.classList.add('pokemon-name');
    pokemonNameContainer.innerText = pokemon.name;

    const pokemonImageContainer = document.createElement('img');
    pokemonImageContainer.classList.add('pokemon-image');
    pokemonImageContainer.setAttribute('src', pokemon.imageUrl);


    const pokemonTypeContainer = document.createElement('div');
    pokemonTypeContainer.classList.add('pokemon-type');
    pokemonTypeContainer.innerText = pokemon.type;

    pokemonContainer.append(
        pokemonNameContainer,
        pokemonTypeContainer,
        pokemonImageContainer,
    );

    return pokemonContainer;

};


