// IIFE - immediately invoked function expression
(() => {
    const bodyElement = document.querySelector('body');
    const appHeadingElement = document.querySelector('#app-heading');

    const pokemonList = document.createElement('ul');
    const pokemonForm = document.createElement('form');
    const pokemonNameInput = document.createElement('input');
    pokemonNameInput.setAttribute('name', 'name');
    pokemonNameInput.setAttribute('placeholder', 'Pokemon name');
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
        const pokemonElement = document.createElement('li');
        pokemonElement.innerText = pokemonName;
        pokemonList.appendChild(pokemonElement);
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
    });

    const pokemonFormSubmitButton = document.createElement('button');
    pokemonFormSubmitButton.innerText = 'Add';

    pokemonForm.appendChild(pokemonNameInput);
    pokemonForm.appendChild(pokemonFormSubmitButton);
    pokemonForm.appendChild(pokemonRemoveAllButton);

    bodyElement.appendChild(pokemonForm);
    bodyElement.appendChild(pokemonList);
})()
