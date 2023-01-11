const App = {
    ingrList : new Array(),
    ingrListElement : document.getElementById('ingredients'),
    recipeList : document.getElementById('recipes'),
    searchInput : document.getElementById('search'),
    recipesByIngr : null,
    recipeData : null,
    //apikey : 'apiKey=980924e981b04a65879a20b9603eb3ca'
    apikey : 'apiKey=a89fda2c8e3946829e0796d67619b10b'
}

App.searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('btnAdd').click();
    }
});

const toggleCheck = () => {
    document.getElementById('check').classList.toggle('hide');
}

//#region RecipesList
const searchRecipe = () => {
    var ingredients = '';
    App.ingrList.forEach(ingr => {
        if (ingredients == '') {
            ingredients = '&ingredients=' + ingr;
        }
        ingredients += ',+' + ingr;
    })

    var ignorePantry = '';
    if (document.getElementById('pantryChkBox').checked) { ignorePantry = '&ignorePantry=true'; }

    var url = 'https://api.spoonacular.com/recipes/findByIngredients?' + App.apikey
        + ingredients + '&number=10' + ignorePantry;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function () {
        clearRecipeList();
        App.recipesByIngr = JSON.parse(xhr.responseText);
        App.recipesByIngr.forEach(recipe => {
            for (var key in recipe) {
                if (key === 'id') findRecipeWithInstruction(recipe[key]);
            }
        });
    });
    xhr.addEventListener('error', function (e) {
        console.error('XHR error', e);
    });
    xhr.send();
}

const clearRecipeList = () => {
    while (App.recipeList.firstChild) {
        App.recipeList.removeChild(App.recipeList.lastChild);
    }
}

const findRecipeWithInstruction = (recipeId) => {
    const xhr2 = new XMLHttpRequest();
    var url = 'https://api.spoonacular.com/recipes/'
        + recipeId + '/information?includeNutrition=false&' + App.apikey;
    xhr2.open('GET', url);
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.addEventListener('load', function () {
        App.recipeData = JSON.parse(xhr2.responseText);
        addRecipe(App.recipeData);
    });
    xhr2.addEventListener('error', function (e) {
        console.error('XHR error', e);
    });
    xhr2.send();
}

const addRecipe = (recipe) => {
    const recipeDiv = document.createElement('div');
    const recipeImg = document.createElement('img');
    const recipeTitle = document.createElement('h3');
    const recipeInstruction = document.createElement('p');
    const recipeSpoonacularDetail = document.createElement('a');

    for (var key in recipe) {
        switch (key) {
            case 'image':
                recipeImg.src = recipe[key];
                break;
            case 'title':
                recipeTitle.innerText = recipe[key];
                break;
            case 'instructions':
                recipeInstruction.innerHTML = recipe[key];
                break;
            case 'spoonacularSourceUrl':
                recipeSpoonacularDetail.href = recipe[key];
                recipeSpoonacularDetail.innerText = " More detail here";
                break;
        }
    }

    recipeTitle.classList.add('m0');
    recipeInstruction.classList.add('m0');
    recipeDiv.classList.add('dish');
    recipeDiv.classList.add('wid100');
    recipeDiv.appendChild(recipeImg);
    recipeDiv.appendChild(recipeTitle);
    if (recipeInstruction.innerHTML == '' || !recipeInstruction.innerHTML) {
        recipeInstruction.innerText = "We don't have instructions for this recipe but you can find";
    }
    recipeDiv.appendChild(recipeInstruction);
    recipeDiv.appendChild(recipeSpoonacularDetail);
    App.recipeList.appendChild(recipeDiv);
}
//#endregion

//#region IngredientsList
const addIngrToList = () => {
    var newIngr = document.getElementById('search').value;
    if (!newIngr || newIngr == '' || newIngr.replace(/\s+/g, '') == ''
        || newIngr.length > 25) return;
        App.ingrList.push(newIngr);
    document.getElementById('search').value = null;
    updateIngrList();
}

const deleteIngrFromList = (ingrName) => {
    App.ingrList.splice(App.ingrList.indexOf(ingrName), 1);
    updateIngrList();
}

const updateIngrList = () => {
    while (App.ingrListElement.firstChild) {
        App.ingrListElement.removeChild(App.ingrListElement.lastChild);
    }

    App.ingrList.forEach(ingrRow => {
        const ingrDelete = document.createElement('button');
        ingrDelete.onclick = () => { deleteIngrFromList(ingrRow); }
        ingrDelete.innerText = ingrRow;
        ingrDelete.classList.add('btn-ingr');

        const redDotDiv = document.createElement('div');
        redDotDiv.classList.add('red-dot-div');
        redDotDiv.innerText = "remove";

        const ingrDiv = document.createElement('div')
        ingrDiv.classList.add('ingr', 'flex');
        ingrDiv.setAttribute('tabindex', '-1');
        ingrDiv.appendChild(ingrDelete);
        ingrDiv.appendChild(redDotDiv);
        App.ingrListElement.appendChild(ingrDiv);
    })

    if (App.ingrList.length != 0) {
        document.getElementById('btnRecipeSearch').classList.remove('hide');
    } else { document.getElementById('btnRecipeSearch').classList.add('hide'); }
}
//#endregion
