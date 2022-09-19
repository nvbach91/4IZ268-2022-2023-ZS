$(document).ready(() => {

    const pokedexForm = $('#pokedex-form');
    const pokemonNameInput = $('input[name="pokemon-name"]');
    const pokemonContainer = $('#pokemons');

    



    pokedexForm.submit((event) => {
        event.preventDefault();
        // pracujeme s inputy
        const inputValue = pokemonNameInput.val();
        // console.log(`|${pokemonName.trim()}|`);
        const pokemonNames = inputValue.split(' ');
        // ['pikachu', 'squirtle', 'charmander']
        const pokemons = [];

        // zobrazit spinner
        // const spinner = showSpinner();

        // pokud uz mame tohoto pokemona v kolekci, tak nebudeme pridavat
        const existingPokemons = $('.pokemon');
        //['pikachu', 'squirtle', 'charmander']
        const existingPokemonNames = [];
        for (let k = 0; k < existingPokemons.length; k++) {
            const existingPokemon = existingPokemons.eq(k);
            const existingPokemonName = existingPokemon.find('.pokemon-name');
            existingPokemonNames.push(existingPokemonName.text());
        }

        // console.log(existingPokemonNames);

        for (let i = 0; i < pokemonNames.length; i += 1) {
            const pokemonName = pokemonNames[i];

            if (existingPokemonNames.includes(pokemonName)) {
                continue;
            }

            fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName).then((resp) => {
                return resp.json();
            }).then((resp) => {
                // console.log(resp.height);
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
                const existingPokemons = JSON.parse(localStorage.pokemons);
                existingPokemons.push(pokemonData);
                localStorage.setItem('pokemons', JSON.stringify(existingPokemons));

                // spinner.remove();
            });
        }
    });

    const removeAllButton = $('#remove-all');
    removeAllButton.click(() => {
        pokemonContainer.empty();
    });

    
    // const removeAllButton = $('#remove-all').click(() => {
    //     //...
    // });

    const createPokemon = (pokemon) => {
        const pokemonContainer = $('<div>').addClass('pokemon');//.text('abc');
        
        // const pokemonContainer = $(`
        //     <div class="pokemon">
        //         <div class="pokemon-name">${pokemon.name}</div>
        //         <div class="pokemon-id">${pokemon.id}</div>
        //         <div class="pokemon-type">${pokemon.type}</div>
        //         <img class="pokemon-image" src="${pokemon.image}" alt="image of a pokemon">
        //         <button class="remove-pokemon">Dismiss</button>
        //     </div>
        // `);

        const pokemonRemoveButton = $('<button>Dismiss</button>')
            .addClass('remove-pokemon')
            .click(() => {
                pokemonContainer.remove();
            });

            
        // const pokemonRemoveButton = pokemonContainer
        //     .find('button.remove-pokemon')
        //     .click(() => {
        //         pokemonContainer.remove();
        //     });

        const pokemonNameContainer = $('<div>')
            .addClass('pokemon-name')
            .text(pokemon.name);

        const pokemonImage = $('<img>')
            .addClass('pokemon-image')
            .attr('src', pokemon.image)
            .attr('attr', 'image of a pokemon');

        pokemonContainer.append(
            pokemonNameContainer,
            // pokemonIdContainer,
            // pokemonTypeContainer,
            pokemonImage,
            pokemonRemoveButton,
        );

        return pokemonContainer;

    };



    const existingPokemons = JSON.parse(localStorage.pokemons);
    const pokemonContainers = [];
    existingPokemons.forEach((pokemon) => {
        const existingPokemon = createPokemon(pokemon);
        pokemonContainers.push(existingPokemon);
    })
    pokemonContainer.append(pokemonContainers);


    try {
        const somethingBad = JSON.parse(localStorage.somethingBad);
    } catch (e) {
        localStorage.setItem('somethingBad', '{}');
        const somethingBad = JSON.parse(localStorage.somethingBad);
    }
});