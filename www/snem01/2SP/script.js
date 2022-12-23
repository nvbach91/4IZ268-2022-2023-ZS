const formEl = document.querySelector(".user-form");
const recipeResults = document.querySelector(".recipe-results"); //article div with ID of recipe-results
//Edamam API
const endpointURL = "https://api.edamam.com/search?";
const appKey = "d4a9f3291d5864cd92395d39bd8bcfb2";
const appID = "3d3cac63";

const submitBtn = document.querySelector(".search-btn");

//Function to fetch data from Edamam API
function searchHistory(q) {

    console.log(q);
    // get items from local storage, if there are nothing in local storage set to empty array, need JSON parsing it from a string
    const searchedIngredients = JSON.parse(localStorage.getItem('ingredients-list')) || [];

    if (!searchedIngredients.includes(q)) {
        // pushing new values to the array
        searchedIngredients.push(q);
    }

    // reset local history, JSON to put it in back to string in local storage
    localStorage.setItem('ingredients-list', JSON.stringify(searchedIngredients));

    renderSearchHistory();
}

function renderSearchHistory() {

    const searchHistory = document.querySelector(".ingredient-search-history")
    // creating the list wrapper for ingredients to go in
    const ingredientsList = document.createElement('ul');

    // need to make the div empty, so the ingredients don't append to the page on load
    searchHistory.innerHTML = '';

    // need JSON parsing it from a string
    var searchedIngredients = JSON.parse(localStorage.getItem('ingredients-list')) || [];

    // baclwards loop so that the most recent search history is on the top
    for (var i = searchedIngredients.length - 1; i >= 0; i--) {

        // creating li element to append ingredients from local storage to
        var ingredient = document.createElement('li');

        // the ingredients are then set to the index value of the searched ingredients
        ingredient.textContent = searchedIngredients[i];

        // appending the ingredient to the ingredientList
        ingredientsList.appendChild(ingredient);
    }
    // appending ingredientsList to the main div 
    searchHistory.appendChild(ingredientsList);
}

function getAPI(event) {
    event.preventDefault();
    const q = $('#q').val();
    const queryURL = endpointURL + "q=" + q + "&app_id=" + appID + '&app_key=' + appKey + '&from=0&to=4'; // last param specifically calling for 4 recipes
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            displayRecipes(data.hits);
        });
    searchHistory(q);
};

//Display Recipes Function - added async and await to make sure that substitutions are appended to the correct recipe
async function displayRecipes(fourRecipes) {
    console.log(fourRecipes)
    for (let i = 0; i < 4; i++) {
        const card = document.createElement("div");
        const recipeName = document.createElement('a');
        const recipeImage = document.createElement('img');
        const recipeServes = document.createElement('p');
        const healthLabels = document.createElement('p');
        const ingredientCount = document.createElement('p');
        recipeName.innerText = fourRecipes[i].recipe.label;
        recipeServes.innerText = "Servings: " + fourRecipes[i].recipe.yield;
        healthLabels.innerText = fourRecipes[i].recipe.healthLabels[0, 1, 2, 3, 4, 5, 6, 7]; // returns some health labels we did not ask for
        const recipeImageLocation = fourRecipes[i].recipe.image;
        recipeName.innerText = fourRecipes[i].recipe.label;
        recipeName.setAttribute("href", fourRecipes[i].recipe.url);
        recipeName.setAttribute('target', '_blank');
        ingredientList = fourRecipes[i].recipe.ingredientLines;
        recipeServes.innerText = "Servings: " + fourRecipes[i].recipe.yield;
        ingredientCount.innerText = "Ingredient count: " + fourRecipes[i].recipe.ingredientLines.length;
        card.appendChild(recipeName);
        card.appendChild(recipeServes);
        card.appendChild(ingredientCount);
        card.appendChild(recipeImage);
        recipeImage.setAttribute("src", recipeImageLocation);

        recipeResults.appendChild(card);
    }
}

//event listener for submit button
formEl.addEventListener("submit", getAPI);
renderSearchHistory();