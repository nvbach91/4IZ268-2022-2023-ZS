(() => {
    const bodyElement = document.querySelector('body');
    const pokemonList = document.createElement('ul');
    const appHeading = document.querySelector('#app-heading');

    const pokemonForm = document.createElement('form');
    pokemonForm.addEventListener('submit', (event) => {
        // zakazat defaultni chovani udalosti submit formulare
        event.preventDefault();
        // ziskat hodnotu inputu, atd...
        const pokemonName = pokemonNameInput.value;
        const pokemonElement = document.createElement('li');
        pokemonElement.innerText = pokemonName;
        pokemonList.appendChild(pokemonElement);
        pokemonNameInput.value = '';
        pokemonElement.addEventListener('click', () => {
            appHeading.innerText = pokemonName;
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
    });

    const pokemonNameInput = document.createElement('input');
    pokemonNameInput.setAttribute('name', 'name');
    pokemonNameInput.setAttribute('placeholder', 'pokemon name');

    const pokemonFormSubmitButton = document.createElement('button');
    pokemonFormSubmitButton.innerText = 'Add';

    const pokemonRemoveAllButton = document.createElement('button');
    pokemonRemoveAllButton.innerText = 'Remove all pokemons';
    pokemonRemoveAllButton.setAttribute('type', 'button');
    pokemonRemoveAllButton.addEventListener('click', () => {
        pokemonList.innerHTML = '';
    });


    pokemonForm.appendChild(pokemonNameInput);
    pokemonForm.appendChild(pokemonFormSubmitButton);
    pokemonForm.appendChild(pokemonRemoveAllButton);

    bodyElement.appendChild(pokemonForm);
    bodyElement.appendChild(pokemonList);
})();