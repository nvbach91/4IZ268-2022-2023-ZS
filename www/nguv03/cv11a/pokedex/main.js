// IIFE - immediately invoked function expression
(() => {
    const createPokemon = (pokemonName) => {
        const pokemonElement = $('<li class="pokemon">');
        const pokemonNameElement = $(`<div class="pokemon-name">${pokemonName}</div>`);
        pokemonElement.append(pokemonNameElement);
        // https://img.pokemondb.net/sprites/sword-shield/icon/charizard.png
        const pokemonImagePrefix = 'https://img.pokemondb.net/sprites/sword-shield/icon/';
        const pokemonImage = $('<img class="pokemon-image">');
        pokemonImage.attr('src', `${pokemonImagePrefix}${pokemonName}.png`);
        pokemonImage.attr('alt', `Pokemon image of ${pokemonName}`);

        pokemonElement.click(() => {
            // vzit text polozky a nastavit ho jako text headingu
            appHeadingElement.text(pokemonName);
            if (pokemonElement.hasClass('selected')) {
                pokemonElement.removeClass('selected');
            } else {
                pokemonElement.addClass('selected');
            }
        });

        const pokemonRemoveButton = $('<button>Remove</button>').click(() => {
            pokemonElement.remove();
        });
        pokemonElement.append(pokemonRemoveButton, pokemonImage);

        const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        fetch(apiURL).then((resp) => {
            return resp.json();
        }).then((data) => {
            const pokemonData = data;
            const pokemonHeight = pokemonData.height;
            const currentPokemonName = pokemonNameElement.text();
            pokemonNameElement.text(`${currentPokemonName} (height: ${pokemonHeight})`);
        });

        return pokemonElement;
    };

    const createRemoveAllButton = () => {
        const pokemonRemoveAllButton = $('<button type="button">Remove all my luvs</button>');
        pokemonRemoveAllButton.click(() => {
            // odebrat vsechno z ul seznamu
            pokemonList.empty();
        });
        return pokemonRemoveAllButton;
    };

    const createPokemonForm = () => {
        const pokemonForm = $('<form>');
        const pokemonNameInput = $('<input name="name" placeholder="Pokemon name">');
        pokemonNameInput.keypress(() => {
            // console.log('key pressed');
            const currentValue = pokemonNameInput.val();
            // projdeme vsechny karty
            const pokemonElements = $('.pokemon');
            pokemonElements.each(function () {
                const pokemonElement = $(this);
                const pokemonName = $('.pokemon-name').text();
                if (pokemonName.includes(currentValue)) {
                    pokemonElement.removeClass('hidden');
                } else {
                    pokemonElement.addClass('hidden');
                    // pokemonElement.toggleClass('hidden')
                }
            });
            // u karet kterym nevyhovuje podminka, pridame tridu hidden
        });


        pokemonForm.submit((event) => {
            // zakazat defaultni chovani odesilani formulare
            event.preventDefault();
            // ziskat hodnoty z inputu...
            const pokemonName = pokemonNameInput.val().trim();
            if (pokemonName === '') {
                pokemonFormErrors.text('Please enter a pokemon name');
                return false;
            }
            if (!/^[a-zA-Z, ]*$/.test(pokemonName)) {
                pokemonFormErrors.text('Please enter a valid pokemon name');
                return false;
            }
            let isExistingPokemonName = false;
            const existingPokemonNames = $('.pokemon-name');
            existingPokemonNames.each(function () {
                const container = $(this);
                const existingPokemonName = container.text();
                if (existingPokemonName === pokemonName) {
                    isExistingPokemonName = true;
                }
            });
            if (isExistingPokemonName) {
                pokemonFormErrors.text(`You already have this pokemon ${pokemonName}`);
                return false;
            }
            // console.log(pokemonName);
            const pokemonNames = pokemonName.split(',');
            // console.log(pokemonNames);

            pokemonNames.forEach((name) => {
                const pokemonElement = createPokemon(name.trim());
                pokemonList.append(pokemonElement);
            });
        });

        const pokemonFormSubmitButton = $('<button>Add</button>');
        const pokemonFormErrors = $('<div>');
        const pokemonRemoveAllButton = createRemoveAllButton();

        pokemonForm.append(
            pokemonNameInput,
            pokemonFormSubmitButton,
            pokemonRemoveAllButton,
            pokemonFormErrors,
        );
        return pokemonForm;
    };

    const bodyElement = $('body');
    const appHeadingElement = $('#app-heading');

    const pokemonList = $('<ul>');
    const pokemonForm = createPokemonForm();

    bodyElement.append(pokemonForm);
    bodyElement.append(pokemonList);


    /*
        const names = ['abc', 'def', 'ghi'];
        const nameHtml = `
            <ul>
                ${names.map((name) => `<li>${name}</li>`).join('')}
            </ul>
        `;
        const nameElements = $(nameHtml);
    */
/*
    const apiURL = 'https://jsonplaceholder.typicode.com/todos/1';
    const fetchRequest = fetch(apiURL);
    fetchRequest.then((resp) => {
        return resp.json();
    }).then((data) => {
        const todoItem = data;
        const todo = `${todoItem.title} is ${todoItem.completed ? 'completed' : 'not completed'}`;
        console.log(todo);
    });

    console.log('abcd');
    console.log('abcd');
    console.log('def');
*/
})()
