
(function CatApp() {


    const form = document.querySelector('#search_form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const msg = document.querySelector(".form_msg");
        msg.textContent = '';
        msg.classList.remove('visible');

        const loader = document.querySelector(".loader");
        loader.textContent = '';
        loader.classList.add('visible');

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
    const favoriteBreedsData = localStorage.getItem('Mycat');
    if (favoriteBreedsData) {
        const fav_cat = JSON.parse(favoriteBreedsData)
        const favorites = document.querySelector(".favorite_cats")
    
        const markup_3 = `
        <li class="full" >
        <button><img src="./img/close.png" alt="" class="close-button_2"></button>
        <h3 class="breed_name_2">${fav_cat.name}</h3>
        <div class="info_2" >
            <div class="center_cropped">
                <img src="${fav_cat.image_link}" alt="${fav_cat.name}">
            </div>
            <div class="features_2">
                <div>Origin: ${fav_cat.origin}</div>
                <div>Max weight: ${fav_cat.weight}kg</div>
                <div>Intelligence: ${fav_cat.intelligence}</div>
            </div>
        </div>
        </li>
    `;
        favorites.innerHTML = markup_3
    }


    function checkIfHasDuplicates(newBreed) {
        const breedsData = localStorage.getItem('catBreeds');
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
        const favorites = document.querySelector(".favorite_cats")

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const { name, origin, intelligence, image_link: imageSrc, weight } = item;
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
     <div class="breed_name_button"><button><img src="./img/close.png" alt="" class="close-button"></button>
     <h3 class="breed_name" >${name}</h3><div/>
     <div class="info" >
       <div>Origin: ${origin} Intelligence: ${intelligence}</div>
       <div class="save">Save</div>
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

                    li.addEventListener('click', e => {
                        if (e.target.className === "breed_name") {
                            const card = li;
                            card.classList.add('full');
                            const markup_2 = `
                            <button><img src="./img/close.png" alt="" class="close-button_2"></button>
                            <h3 class="breed_name_2">${name}</h3>
                            <div class="info_2" >
                                <div class="center_cropped">
                                    <img src="${imageSrc}" alt="${name}">
                                </div>
                                <div class="features_2">
                                    <div>Origin: ${origin}</div>
                                    <div>Max weight: ${weight}kg</div>
                                    <div>Intelligence: ${intelligence}</div>
                                </div>
                            </div>
                        `;
                            card.innerHTML = markup_2;

                        }
                    });

                    li.addEventListener('click', e => {
                        if (e.target.className === "save") {
                            localStorage.setItem('Mycat', JSON.stringify(item));
                            const favorites = document.querySelector(".favorite_cats")
                            const markup_2 = `
                            <li class="full" >
                            <button><img src="./img/close.png" alt="" class="close-button_2"></button>
                            <h3 class="breed_name_2">${name}</h3>
                            <div class="info_2" >
                                <div class="center_cropped">
                                    <img src="${imageSrc}" alt="${name}">
                                </div>
                                <div class="features_2">
                                    <div>Origin: ${origin}</div>
                                    <div>Max weight: ${weight}kg</div>
                                    <div>Intelligence: ${intelligence}</div>
                                </div>
                            </div>
                            </li>
                        `;

                            favorites.innerHTML = markup_2


                        }
                    });


                    list.appendChild(li);

                })

                loader.classList.remove('visible')

            })
            .catch(() => {
                msg.textContent = 'Please search for a valid cat breed.';
                msg.classList.add('visible');
            })
    }



})()



