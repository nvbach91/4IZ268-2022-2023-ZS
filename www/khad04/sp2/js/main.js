const form = document.querySelector('#search_form');

form.addEventListener('submit', e => {
	e.preventDefault();

	const msg = document.querySelector(".form_msg");
	msg.textContent = '';
	msg.classList.remove('visible');

	const input = document.querySelector('#search_term');
	let inputValue = input.value.toLowerCase();
	addCatBreedToDisplay(inputValue);

	msg.textContent = '';
	form.reset();
	input.focus();
})

const initialBreedsData = localStorage.getItem('catBreeds');
if (initialBreedsData) {
    initialBreedsData.split(',').forEach(breedName => {
        addCatBreedToDisplay(breedName, true);
    })
}

function checkIfHasDuplicates(newBreed) {
	const breedsData = localStorage.getItem('catBreeds') ;
    return breedsData && breedsData.split(',').some(breed => breed.toLowerCase() === newBreed.toLowerCase());
}

function addBreedToLocalStorage(newBreed) {
	const updatedBreedsData = (localStorage.getItem('catBreeds') ? localStorage.getItem('catBreeds') + ',' : '') + newBreed;
    localStorage.setItem('catBreeds', updatedBreedsData);
}

function addCatBreedToDisplay(breedName, initialLoad) {
	const url = `https://api.api-ninjas.com/v1/cats?name=${breedName}`;
	const options = {
		headers: {
			'X-Api-Key': 'lymvppQcIT5/lCWCAng6YA==UiiiNhc3PAs95IvM'
		}
	}
	const msg = document.querySelector(".form_msg");
	const list = initialLoad ? document.querySelector(".initial_cats") : document.querySelector(".cats");

	fetch(url, options)
		.then(response => response.json())
		.then(data => {
			const { name, origin, max_weight: weight, image_link: imageSrc, intelligence } = data[0];

			if (!initialLoad) {
				if (checkIfHasDuplicates(name)) {
					msg.textContent = `You already have ${name} in your list`;
					msg.classList.add('visible');
					return;
				}
				addBreedToLocalStorage(name);
			}

			const li = document.createElement('li');
			const markup = `
				<button><img src="./img/close.png" alt="" class="close-button"></button>
				<h3 class="breed_name">${name}</h3>
				<div class="info" >
					<div class="center_cropped">
						<img src="${imageSrc}" alt="${name}">
					</div>
					<div class="features">
						<div>Origin: ${origin}</div>
						<div>Max weight: ${weight}kg</div>
						<div>Intelligence: ${intelligence}</div>
					</div>
				</div>
			`;
			li.innerHTML = markup;

			li.addEventListener('click', e => {
				if (e.target.className === "close-button") {
					const breedsData = localStorage.getItem('catBreeds');
                    localStorage.setItem('catBreeds', breedsData.split(',').filter(breedName => breedName !== name));
					li.remove()
				}
			});

			list.appendChild(li);
		})
		.catch(() => {
			msg.textContent = 'Please search for a valid cat breed.';
			msg.classList.add('visible');
		})
}
