// IIFE - immediately invoked function expression
(() => {

    const createPokemon = (pokemonName) => {
        const pokemonElement = $('<li class="pokemon">');
        // https://img.pokemondb.net/sprites/sword-shield/icon/venusaur.png

        const pokemonImageUrl = `https://img.pokemondb.net/sprites/sword-shield/icon/${pokemonName}.png`;

        const pokemonImageElement = $('<img>');
        pokemonImageElement.attr('src', pokemonImageUrl);
        pokemonImageElement.attr('alt', `pokemon image of ${pokemonName}`);

        // pokemonElement.innerText = pokemonName;
        const pokemonNameContainer = $(`<div class="pokemon-name">${pokemonName}</div>`);

        pokemonElement.click(() => {
            // vzit text polozky a nastavit ho jako text headingu
            appHeadingElement.text(pokemonName);
            if (pokemonElement.hasClass('selected')) {
                pokemonElement.removeClass('selected');
            } else {
                pokemonElement.addClass('selected');
            }
        });

        const pokemonRemoveButton = $('<button>Remove</button>');

        pokemonRemoveButton.click(() => {
            pokemonElement.remove();
        });
        pokemonElement.append(
            pokemonNameContainer,
            pokemonRemoveButton,
            pokemonImageElement
        );

        // https://pokeapi.co/api/v2/pokemon/ditto
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((resp) => {
            return resp.json();
        }).then((data) => {
            const currentName = pokemonNameContainer.text();
            pokemonNameContainer.text(`${currentName} (${data.height})`);
        });

        return pokemonElement;
    };

    const createPokemonForm = () => {
        const pokemonForm = $('<form>');
        const pokemonNameInput = $('<input name="name" placeholder="Pokemon name">');

        pokemonNameInput.keypress(() => {
            // zjistit co je aktualne napsano v inputu
            const currentInputValue = pokemonNameInput.val();

            const pokemonElements = $('.pokemon');
            // vybrat vsechny pokemon elementy a porovnat jejich nazvy s tim co je aktualne napsano v inputu
            pokemonElements.each(function () {
                const pokemonElement = $(this);
                // pokud je shoda tak nechame elementy viditelne
                if (pokemonElement.find('.pokemon-name').text().includes(currentInputValue)) {
                    pokemonElement.removeClass('hidden');
                } else {
                    // pokud neni shoda, tak elementy schovame
                    pokemonElement.addClass('hidden');
                    // pokemonElement.toggleClass('hidden');
                }

            });
        });

        // pokemonNameInput.setAttribute('required', true);
        // pokemonNameInput.setAttribute('pattern', '[a-zA-Z]*');
        const pokemonRemoveAllButton = $('<button type="button">Remove all my luvs</button>');
        pokemonRemoveAllButton.click(() => {
            // odebrat vsechno z ul seznamu
            pokemonList.empty();
        });

        pokemonForm.submit((event) => {
            // zakazat defaultni chovani odesilani formulare
            event.preventDefault();
            // ziskat hodnoty z inputu...
            const pokemonName = pokemonNameInput.val();
            const pokemonNames = pokemonName.split(',');
            
            pokemonNames.forEach((name) => {
                const cleanName = name.trim();

                if (cleanName === '') {
                    pokemonFormErrorsContainer.text('Please enter a pokemon name');
                    return false;
                }
                
                if (!/^[a-zA-Z]*$/.test(cleanName)) {
                    pokemonFormErrorsContainer.text('Please enter a valid pokemon name');
                    return false;
                }
                
                // dalsi podminky nevalidniho vstupu...

                let isExistingPokemon = false;
                // vybrat vsechny existujici pokemony a podivat se do jejich name
                $('.pokemon-name').each(function () {
                    const element = $(this);
                    // console.log(element.innerText);
                    if (element.text() === cleanName) {
                        // nalezena shoda
                        isExistingPokemon = true;
                    }
                });
                // proiterovat tyto name a porovnat cleanName s jednotlivymi existujicimi name
                if (isExistingPokemon) {
                    pokemonFormErrorsContainer.text('You already have this pokemon');
                    return false;
                }

                pokemonFormErrorsContainer.text('');
                const pokemonElement = createPokemon(cleanName);
                pokemonList.append(pokemonElement);
            });

        });

        const pokemonFormSubmitButton = $('<button>Add</button>');
        const pokemonFormErrorsContainer = $('<div>');

        pokemonForm.append(
            pokemonNameInput,
            pokemonFormSubmitButton,
            pokemonRemoveAllButton,
            pokemonFormErrorsContainer
        );

        return pokemonForm;
    };

    const bodyElement = $('body');
    const appHeadingElement = $('#app-heading');
    const pokemonList = $('<ul>');

    const pokemonForm = createPokemonForm();

    bodyElement.append(pokemonForm);
    bodyElement.append(pokemonList);

    // const request = fetch('https://jsonplaceholder.typicode.com/todos/1');
    // request.then((resp) => {
    //     return resp.json();
    // }).then((data) => {
    //     appHeadingElement.text(data.title);
    // }).catch((err) => {
    //     console.error(err);
    // });
    

})()
