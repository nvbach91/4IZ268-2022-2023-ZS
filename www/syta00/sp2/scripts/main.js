//document.getElementById('hello').innerText += " recipe";

const ingrList = document.getElementById('ingredients');
const recipeList = document.getElementById('recipes');

const addIngr = () => {
    const ingr = document.createElement('div');
    ingr.classList.add('ingr');
    ingr.innerText = 'ingredient';
    ingrList.appendChild(ingr);
    searchRecipe();
}

const searchRecipe = () => {
    //search recipe by api, if found any:
    addRecipe();
}

const addRecipe = () => {
    const recipe = document.createElement('div');
    recipe.classList.add('dish');
    recipe.classList.add('wid100');
    recipe.innerText = 'Dish';
    recipeList.appendChild(recipe);
}

