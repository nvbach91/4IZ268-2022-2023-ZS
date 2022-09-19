$(document).ready(() => {

    if (localStorage.getItem('pokemonNames') === null) {
        localStorage.setItem('pokemonNames', '[]');
    }

    const pokemonForm = $('#pokemon-form');
    const pokemonNameInput = $('input[name="pokemon-name"]');
    const pokemonList = $('#pokemons');
    const removeAllButton = $('#remove-all');
    const pokemonCountContainer = $('#pokemon-count');

    removeAllButton.click(() => {
        pokemonList.empty();
        pokemonCountContainer.text('0');
        localStorage.setItem('pokemonNames', '[]');
    });

    pokemonForm.submit((e) => {
        e.preventDefault();
        const inputValue = pokemonNameInput.val().trim();
        const pokemonNames = inputValue.split(/ +/);
        const pokemonCount = parseFloat(pokemonCountContainer.text());
        const existingPokemonNames = [];//['pikachu', 'squirtle', 'charmander'];
        // podivame na stranku, co tam mame za pokemony
        const existingPokemons = $('.pokemon');
        for (let i = 0; i < existingPokemons.length; i++) {
            const existingPokemon = existingPokemons.eq(i);
            const existingPokemonNameContainer = existingPokemon.find('.pokemon-name');
            const existingPokemonName = existingPokemonNameContainer.text();
            existingPokemonNames.push(existingPokemonName);
        }

        renderPokemons(existingPokemonNames, pokemonNames, pokemonCount);
    });

    // const updatePokemonCount = (newCount) => {
    //     pokemonCountContainer.text(newCount);
    // };

    const createPokemon = (pokemon) => {
        const pokemonContainer = $('<div>');
        pokemonContainer.addClass('pokemon');
        
        // const pokemonContainer = $('<div>').addClass('pokemon');

        const pokemonImage = $('<img>')
            .attr('src', pokemon.imageUrl)
            .attr('alt', 'image of a pokemon');

        // const pokemonContainer = $(`
        //     <div class="pokemon">
        //         <div class="pokemon-name">${pokemon.name}</div>
        //         <div class="pokemon-type">${pokemon.type}</div>
        //         <div class="pokemon-height">${pokemon.height}</div>
        //         <img src="${pokemon.imageUrl}" alt="pokemon of a image">
        //     </div>
        // `)

        // name
        // type
        // id
        // remove button
        const pokemonRemoveButton = $('<button>').text('dismiss').click(() => {
            pokemonContainer.remove();
            const newCount = parseFloat(pokemonCountContainer.text()) - 1;
            pokemonCountContainer.text(newCount);
            //..
        });

        pokemonContainer.append(
            pokemonImage,
            //pokemonNameContainer, ...
            pokemonRemoveButton,
        );

        return pokemonContainer;
    };

    const renderPokemons = (existingPokemonNames, pokemonNames, pokemonCount) => {

        
        for (let i = 0; i < pokemonNames.length; i += 1) {
            const pokemonName = pokemonNames[i];
            // porovnam noveho pokemona s existujicimi pokemony
            if (!existingPokemonNames.includes(pokemonName)) {
                // $.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName).done((resp) => {
                //     const pokemonType = resp.types[0].type.name;
                // });
                fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName).then((resp) => {
                    return resp.json();
                }).then((resp) => {
                    const pokemonType = resp.types[0].type.name;
                    const pokemonData = {
                        name: pokemonName,
                        id: resp.id,
                        imageUrl: 'https://www.postavy.cz/foto/' + pokemonName + '-foto.jpg',
                        type: pokemonType,
                        height: resp.height,
                    };
                    const pokemon = createPokemon(pokemonData);
                    // temporaryPokemons.push(pokemon);
                    pokemonList.append(pokemon);
                    pokemonCountContainer.text(pokemonCount + 1);

                    const savedPokemons = JSON.parse(localStorage.getItem('pokemonNames'));
                    if (!savedPokemons.includes(pokemonName)) {
                        savedPokemons.push(pokemonName);
                        localStorage.pokemonNames = JSON.stringify(savedPokemons);
                    }

                });
            } else {
                console.log('pokemon uz existuje');
            }

        }
    };

    const savedPokemons = JSON.parse(localStorage.getItem('pokemonNames'));
    renderPokemons([], savedPokemons);
});