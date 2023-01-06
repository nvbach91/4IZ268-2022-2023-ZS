// IIFE - immediately invoked function expression
(() => {

    const createPokemon = (pokemonName) => {
        const pokemonElement = document.createElement('li');
        pokemonElement.classList.add('pokemon');
        // https://img.pokemondb.net/sprites/sword-shield/icon/venusaur.png

        const pokemonImageUrl = `https://img.pokemondb.net/sprites/sword-shield/icon/${pokemonName}.png`;

        const pokemonImageElement = document.createElement('img');
        pokemonImageElement.setAttribute('src', pokemonImageUrl);
        pokemonImageElement.setAttribute('alt', `pokemon image of ${pokemonName}`);

        // pokemonElement.innerText = pokemonName;
        const pokemonNameContainer = document.createElement('div');
        pokemonNameContainer.innerText = pokemonName;
        pokemonNameContainer.classList.add('pokemon-name');

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
        pokemonElement.appendChild(pokemonNameContainer);
        pokemonElement.appendChild(pokemonRemoveButton);
        pokemonElement.appendChild(pokemonImageElement);
        return pokemonElement;
    };

    const createPokemonForm = () => {
        const pokemonForm = document.createElement('form');
        const pokemonNameInput = document.createElement('input');
        pokemonNameInput.setAttribute('name', 'name');
        pokemonNameInput.setAttribute('placeholder', 'Pokemon name');

        pokemonNameInput.addEventListener('keypress', () => {
            // zjistit co je aktualne napsano v inputu
            const currentInputValue = pokemonNameInput.value;

            const pokemonElements = document.querySelectorAll('.pokemon');
            // vybrat vsechny pokemon elementy a porovnat jejich nazvy s tim co je aktualne napsano v inputu
            pokemonElements.forEach((pokemonElement) => {
                // pokud je shoda tak nechame elementy viditelne
                if (pokemonElement.querySelector('.pokemon-name').innerText.includes(currentInputValue)) {
                    pokemonElement.classList.remove('hidden');
                } else {
                    // pokud neni shoda, tak elementy schovame
                    pokemonElement.classList.add('hidden');
                }

            });
        });

        // pokemonNameInput.setAttribute('required', true);
        // pokemonNameInput.setAttribute('pattern', '[a-zA-Z]*');
        const pokemonRemoveAllButton = document.createElement('button');
        pokemonRemoveAllButton.innerText = 'Remove all my luvs';
        pokemonRemoveAllButton.setAttribute('type', 'button');
        pokemonRemoveAllButton.addEventListener('click', () => {
            // odebrat vsechno z ul seznamu
            pokemonList.innerHTML = '';
        });

        pokemonForm.addEventListener('submit', (event) => {
            // zakazat defaultni chovani odesilani formulare
            event.preventDefault();
            // ziskat hodnoty z inputu...
            const pokemonName = pokemonNameInput.value;
            const pokemonNames = pokemonName.split(',');
            
            pokemonNames.forEach((name) => {
                const cleanName = name.trim();

                if (cleanName === '') {
                    pokemonFormErrorsContainer.innerText = 'Please enter a pokemon name';
                    return false;
                }
                
                if (!/^[a-zA-Z]*$/.test(cleanName)) {
                    pokemonFormErrorsContainer.innerText = 'Please enter a valid pokemon name';
                    return false;
                }
                
                // dalsi podminky nevalidniho vstupu...

                let isExistingPokemon = false;
                // vybrat vsechny existujici pokemony a podivat se do jejich name
                document.querySelectorAll('.pokemon-name').forEach((element) => {
                    // console.log(element.innerText);
                    if (element.innerText === cleanName) {
                        // nalezena shoda
                        isExistingPokemon = true;
                    }
                });
                // proiterovat tyto name a porovnat cleanName s jednotlivymi existujicimi name
                if (isExistingPokemon) {
                    pokemonFormErrorsContainer.innerText = 'You already have this pokemon';
                    return false;
                }

                pokemonFormErrorsContainer.innerText = '';
                const pokemonElement = createPokemon(cleanName);
                pokemonList.appendChild(pokemonElement);
            });

        });

        const pokemonFormSubmitButton = document.createElement('button');
        pokemonFormSubmitButton.innerText = 'Add';

        pokemonForm.appendChild(pokemonNameInput);
        pokemonForm.appendChild(pokemonFormSubmitButton);
        pokemonForm.appendChild(pokemonRemoveAllButton);

        const pokemonFormErrorsContainer = document.createElement('div');
        pokemonForm.appendChild(pokemonFormErrorsContainer);
        return pokemonForm;
    };

    const bodyElement = document.querySelector('body');
    const appHeadingElement = document.querySelector('#app-heading');
    const pokemonList = document.createElement('ul');

    const pokemonForm = createPokemonForm();

    bodyElement.appendChild(pokemonForm);
    bodyElement.appendChild(pokemonList);
})()
