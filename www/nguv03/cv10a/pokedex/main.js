// IIFE - immediately invoked function expression
(() => {
    const createPokemon = (pokemonName) => {
        const pokemonElement = document.createElement('li');
        pokemonElement.classList.add('pokemon');
        const pokemonNameElement = document.createElement('div');
        pokemonNameElement.innerText = pokemonName;
        pokemonNameElement.classList.add('pokemon-name');
        pokemonElement.appendChild(pokemonNameElement);
        // https://img.pokemondb.net/sprites/sword-shield/icon/charizard.png
        const pokemonImagePrefix = 'https://img.pokemondb.net/sprites/sword-shield/icon/';
        const pokemonImage = document.createElement('img');
        pokemonImage.classList.add('pokemon-image');
        pokemonImage.setAttribute('src', `${pokemonImagePrefix}${pokemonName}.png`);
        pokemonImage.setAttribute('alt', `Pokemon image of ${pokemonName}`);

        pokemonElement.addEventListener('click', () => {
            // vzit text polozky a nastavit ho jako text headingu
            appHeadingElement.innerText = pokemonName;
            if (pokemonElement.classList.contains('selected')) {
                pokemonElement.classList.remove('selected');
            } else {
                pokemonElement.classList.add('selected');
            }
        });

        const pokemonRemoveButton = document.createElement('button');
        pokemonRemoveButton.innerText = 'Remove';
        pokemonRemoveButton.addEventListener('click', () => {
            pokemonElement.remove();
        });
        pokemonElement.appendChild(pokemonRemoveButton);
        pokemonElement.appendChild(pokemonImage);

        return pokemonElement;
    };

    const createRemoveAllButton = () => {
        const pokemonRemoveAllButton = document.createElement('button');
        pokemonRemoveAllButton.innerText = 'Remove all my luvs';
        pokemonRemoveAllButton.setAttribute('type', 'button');
        pokemonRemoveAllButton.addEventListener('click', () => {
            // odebrat vsechno z ul seznamu
            pokemonList.innerHTML = '';
        });
        return pokemonRemoveAllButton;
    };

    const createPokemonForm = () => {
        const pokemonForm = document.createElement('form');
        const pokemonNameInput = document.createElement('input');
        pokemonNameInput.setAttribute('name', 'name');
        pokemonNameInput.setAttribute('placeholder', 'Pokemon name');
        pokemonNameInput.addEventListener('keypress', () => {
            // console.log('key pressed');
            const currentValue = pokemonNameInput.value;
            // projdeme vsechny karty
            const pokemonElements = document.querySelectorAll('.pokemon');
            pokemonElements.forEach((pokemonElement) => {
                const pokemonName = pokemonElement.querySelector('.pokemon-name').innerText;
                if (pokemonName.includes(currentValue)) {
                    pokemonElement.classList.remove('hidden');
                } else {
                    pokemonElement.classList.add('hidden');
                }
            });
            // u karet kterym nevyhovuje podminka, pridame tridu hidden
        });


        pokemonForm.addEventListener('submit', (event) => {
            // zakazat defaultni chovani odesilani formulare
            event.preventDefault();
            // ziskat hodnoty z inputu...
            const pokemonName = pokemonNameInput.value.trim();
            if (pokemonName === '') {
                pokemonFormErrors.innerText = 'Please enter a pokemon name';
                return false;
            }
            if (!/^[a-zA-Z]*$/.test(pokemonName)) {
                pokemonFormErrors.innerText = 'Please enter a valid pokemon name';
                return false;
            }
            let isExistingPokemonName = false;
            const existingPokemonNames = document.querySelectorAll('.pokemon-name');
            existingPokemonNames.forEach((container) => {
                const existingPokemonName = container.innerText;
                if (existingPokemonName === pokemonName) {
                    isExistingPokemonName = true;
                }
            });
            if (isExistingPokemonName) {
                pokemonFormErrors.innerText = `You already have this pokemon ${pokemonName}`;
                return false;
            }
            // console.log(pokemonName);
            const pokemonNames = pokemonName.split(',');
            // console.log(pokemonNames);

            pokemonNames.forEach((name) => {
                const pokemonElement = createPokemon(name.trim());
                pokemonList.appendChild(pokemonElement);
            });
        });

        const pokemonFormSubmitButton = document.createElement('button');
        pokemonFormSubmitButton.innerText = 'Add';

        const pokemonFormErrors = document.createElement('div');

        pokemonForm.appendChild(pokemonNameInput);
        pokemonForm.appendChild(pokemonFormSubmitButton);
        pokemonForm.appendChild(pokemonFormErrors);

        const pokemonRemoveAllButton = createRemoveAllButton();
        pokemonForm.appendChild(pokemonRemoveAllButton);

        return pokemonForm;
    };

    const bodyElement = document.querySelector('body');
    const appHeadingElement = document.querySelector('#app-heading');

    const pokemonList = document.createElement('ul');
    const pokemonForm = createPokemonForm();

    bodyElement.appendChild(pokemonForm);
    bodyElement.appendChild(pokemonList);

})()
