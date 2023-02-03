$(document).ready(() => {
    const formEl = document.querySelector('.user-form');
    const recipeResults = document.querySelector('.recipe-results'); //article div with ID of recipe-results
    //Edamam API
    const endpointURL = 'https://api.edamam.com/search?';
    const appKey = 'd4a9f3291d5864cd92395d39bd8bcfb2';
    const appID = '3d3cac63';

    const submitBtn = document.querySelector('.search-btn');

    let favorites = JSON.parse(localStorage.getItem('Favorite-food')) || '[]';
    const searchedIngredients = JSON.parse(localStorage.getItem('ingredients-list')) || '[]';

    //Function to fetch data from Edamam API
    function searchHistory(q) {
        console.log(q);
        // get items from local storage, if there are nothing in local storage set to empty array, need JSON parsing it from a string
        //!const searchedIngredients = JSON.parse(localStorage.getItem('ingredients-list')) || '[]';
        if (!searchedIngredients.includes(q)) {
            // pushing new values to the array
            searchedIngredients.push(q);
        }
        // reset local history, JSON to put it in back to string in local storage
        localStorage.setItem('ingredients-list', JSON.stringify(searchedIngredients));
        renderSearchHistory();
    }

    const foodFavorite = document.querySelector('.favorite');
    const favoriteListReciepe = document.createElement('ul');
    //Function to load data from local storage
    async function loadFavorite() {
        //!const favorites = JSON.parse(localStorage.getItem('Favorite-food')) || '[]';
        for (let index = 0; index < favorites.length; index++) {
            const buttonDelete = document.createElement('button');
            buttonDelete.innerHTML = '&#10006';

            let food = document.createElement('li');
            food.textContent = favorites[index] /*+ ' / '*/;
            favoriteListReciepe.appendChild(food);
            favoriteListReciepe.appendChild(buttonDelete);

            //allow user delete items from his favorites
            buttonDelete.addEventListener('click', function handleClick(event) {
                function arrayRemove(arr, value) {
                    return arr.filter(function (geeks) {
                        return geeks !== value;
                    });
                }
                const favoritesUpdate = arrayRemove(favorites, favorites[index]);
                favorites = favoritesUpdate;
                localStorage.setItem('Favorite-food', JSON.stringify(favoritesUpdate));

                favoriteListReciepe.removeChild(food);
                favoriteListReciepe.removeChild(buttonDelete);
                console.log(favorites[index] + ' removed');
            });

        }
        foodFavorite.appendChild(favoriteListReciepe);
    }

    //used for display new items in favorites
    const refreshButton = document.querySelector('.refresh');
    /*
    refreshButton.addEventListener('click', function(){
        favorite.innerHTML = "";
        loadFavorite();
    });*/



    //Function to load search history
    function renderSearchHistory() {
        const searchHistory = document.querySelector('.ingredient-search-history');
        // creating the list wrapper for ingredients to go in
        const ingredientsList = document.createElement('ul');
        // need to make the div empty, so the ingredients don't append to the page on load
        searchHistory.innerHTML = '';
        // need JSON parsing it from a string
        //!const searchedIngredients = JSON.parse(localStorage.getItem('ingredients-list')) || '[]';
        // baclwards loop so that the most recent search history is on the top
        for (let i = searchedIngredients.length - 1; i >= 0; i--) {
            // creating li element to append ingredients from local storage to
            const ingredient = document.createElement('li');
            const ingredientValue = document.createElement('button');
            // the ingredients are then set to the index value of the searched ingredients
            ingredientValue.textContent = searchedIngredients[i];

            ingredient.appendChild(ingredientValue);
            // appending the ingredient to the ingredientList
            ingredientsList.appendChild(ingredient);

            ingredientValue.addEventListener('click', function(){
                let textCont = ingredientValue.textContent;
                k.value = textCont;
            })
        }
        // appending ingredientsList to the main div 
        searchHistory.appendChild(ingredientsList);
    }

    const k = document.getElementById('q');
    //Function sending request to API
    function getAPI(event) {
        event.preventDefault();
        //! const q = $('#q').val();
        const q = k.value;
        const alert = document.getElementById('err');
        try {
            if (q === '') {
                throw 'empty';
            } else {
                showSpinner();
                const queryURL = endpointURL + 'q=' + q + '&app_id=' + appID + '&app_key=' + appKey + '&from=0&to=6'; // last param specifically calling for 6 recipes
                fetch(queryURL)
                    .then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        hideSpinner();
                        displayRecipes(data.hits);
                    });
                searchHistory(q);
                alert.innerHTML = '';
            }
        } catch (error) {
            alert.innerHTML = 'Input is ' + error;
        }
    };

    //show that request is processing
    const showSpinner = () => {
        recipeResults.innerText = 'Loading...';
    };
    //hide text after request finished
    const hideSpinner = () => {
        recipeResults.innerText = '';
    };

    //Display Recipes Functions
    function displayRecipes(recipes) {
        console.log(recipes)
        for (let i = 0; i < recipes.length; i++) {
            const favorite = document.createElement('button');
            const ingredients = document.createElement('button');
            const card = document.createElement('div');
            const recipeName = document.createElement('a');
            const recipeImage = document.createElement('img');
            const recipeServes = document.createElement('p');
            const mealType = document.createElement('p');
            const energy = document.createElement('p');
            const dietLabels = document.createElement('p');
            const ingredientCount = document.createElement('p');
            const listIngredients = document.createElement('p');
            recipeName.innerText = recipes[i].recipe.label;
            recipeServes.innerText = 'Servings: ' + recipes[i].recipe.yield;
            mealType.innerText = 'Type of meal: ' + recipes[i].recipe.mealType;
            energy.innerText = 'Energy: ' + recipes[i].recipe.calories.toFixed(2) + "Kcal";
            dietLabels.innerText = 'Diet: ' + recipes[i].recipe.dietLabels;
            const recipeImageLocation = recipes[i].recipe.image;
            recipeName.innerText = recipes[i].recipe.label;
            recipeName.setAttribute('href', recipes[i].recipe.url);
            recipeName.setAttribute('target', '_blank');
            ingredientList = recipes[i].recipe.ingredientLines;
            ingredientCount.innerText = 'Ingredient count: ' + recipes[i].recipe.ingredientLines.length;
            favorite.innerText = 'Add to favorite';
            ingredients.innerText = 'Show ingredients';
            card.appendChild(recipeName);
            card.appendChild(recipeServes);
            card.appendChild(mealType);
            card.appendChild(energy);
            card.appendChild(ingredientCount);
            card.appendChild(dietLabels);
            card.appendChild(recipeImage);
            card.appendChild(favorite);
            card.appendChild(ingredients);
            card.appendChild(listIngredients);
            recipeImage.setAttribute('src', recipeImageLocation);

            recipeResults.appendChild(card);
            //save favorites to local storage
            favorite.addEventListener('click', function handleClick(event) {
                //const favorites = JSON.parse(localStorage.getItem('Favorite-food')) || '[]';
                if (!favorites.includes(recipeName.innerText)) {
                    favorites.push(recipeName.innerText);
                }
                localStorage.setItem('Favorite-food', JSON.stringify(favorites));
           
                favoriteListReciepe.innerHTML = "";
                loadFavorite();
            });

            //one button allow show and hide some content(ingredients)
            let number = 2;
            ingredients.addEventListener('click', function handleClick(event) {
                let x = number % 2;
                switch (x) {
                    case 0:
                        const ingredientList = document.createElement('ul');
                        const list = recipes[i].recipe.ingredients;
                        for (let index = 0; index < list.length; index++) {
                            const ingredient = document.createElement('li');
                            ingredient.textContent = JSON.stringify(list[index].food);
                            ingredientList.appendChild(ingredient);
                        }
                        listIngredients.appendChild(ingredientList);
                        /*const popup = document.querySelector('.pop-up');
                        popup.style.display = 'block';*/
                        break;
                    case 1:
                        const last = listIngredients.lastElementChild;
                        listIngredients.removeChild(last);
                        break;
                }
                number++;
            });
        }
    }

    //event listener for submit button
    formEl.addEventListener('submit', getAPI);

    //functions triggered at loading page
    renderSearchHistory();
    loadFavorite();
});