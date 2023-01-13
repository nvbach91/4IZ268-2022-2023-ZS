/*window.onload = () =>{
    App.init();
    loadSessionRecipes();
}*/
/*$(document).ready(() => {
    App.init();
  });*/

const App = {
    ingrList: new Array(),
    ingrListElement: document.getElementById('ingredients'),
    recipeList: document.getElementById('recipes'),
    recipeListInnerDiv: document.createElement('div'),
    searchInput: document.getElementById('search'),
    btnSearch: document.getElementById('btnRecipeSearch'),
    number: 10,
    RECIPES: {
        id: {
            title: '',
            imageUrl: '',
            instructions: '',
            spoonacularSourceUrl: '',
            dishType: '',
        }
    },
    recipesByIngr: null,
    recipeData: null,
    //apikey: 'apiKey=980924e981b04a65879a20b9603eb3ca',
    //apikey: 'apiKey=a89fda2c8e3946829e0796d67619b10b',
    apikey: 'apiKey=34d9ed8b98114154b0bfaecaa5eca37e',
}

App.searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('btnAdd').click();
    }
});

document.getElementById('btnAdd').onclick = () => {
    App.addIngrToList();
}
document.getElementById('lblCheck').onclick = () => {
    App.toggleCheck();
}
App.btnSearch.onclick = () => {
    App.searchRecipe();
}

App.toggleCheck = () => {
    document.getElementById('check').classList.toggle('hide');
}

//#region RecipesList
App.searchRecipe = () => {
    var ingredients = '';
    App.ingrList.forEach(ingr => {
        if (ingredients == '') {
            ingredients = '&ingredients=' + ingr;
        }
        ingredients += ',+' + ingr;
    })

    var numInput = document.getElementById('recipeNumber');
    if (isNaN(numInput.valueAsNumber)) {
        document.getElementById('numberText').innerText = "Number of recipes (1-10) - Type a number!";
        numInput.value = 10;
        return;
    } else if (0 > numInput.valueAsNumber || numInput.valueAsNumber > 10) {
        document.getElementById('numberText').innerText = "Number of recipes (1-10) - Between 1 and 10";
        numInput.value = 10;
        return;
    }
    number = numInput.valueAsNumber;

    var ignorePantry = '';
    if (document.getElementById('pantryChkBox').checked) { ignorePantry = '&ignorePantry=true'; }

    var url = 'https://api.spoonacular.com/recipes/findByIngredients?' + App.apikey
        + ingredients + '&number=' + number + ignorePantry;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function () {
        App.clearRecipeList();
        App.recipesByIngr = JSON.parse(xhr.responseText);
        App.recipesByIngr.forEach(recipe => {
            App.findRecipeWithInstruction(recipe.id);
        });
        App.appendRecipes();
        App.updateRecipeHistory();
    });
    xhr.addEventListener('error', function (e) {
        console.error('XHR error', e);
    });
    xhr.send();
}

App.clearRecipeList = () => {
    App.recipeListInnerDiv.innerHTML = '';
    App.recipeList.innerHTML = '';
}

App.findRecipeWithInstruction = (recipeId) => {
    const xhr2 = new XMLHttpRequest();
    var url = 'https://api.spoonacular.com/recipes/'
        + recipeId + '/information?includeNutrition=false&' + App.apikey;
    xhr2.open('GET', url);
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.addEventListener('load', function () {
        App.recipeData = JSON.parse(xhr2.responseText);
        App.addRecipe(App.recipeData);
        App.saveRecipe(App.recipeData);
    });
    xhr2.addEventListener('error', function (e) {
        console.error('XHR error', e);
    });
    xhr2.send();
}

App.addRecipe = (recipe) => {
    const recipeDiv = document.createElement('div');
    const recipeImg = document.createElement('img');
    const recipeTitle = document.createElement('h3');
    const recipeDishTypes = document.createElement('p');
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
            case 'dishTypes':
                recipeDishTypes.innerText = recipe[key].join(', ');
                break;
        }
    }

    recipeTitle.classList.add('m0');
    recipeInstruction.classList.add('m0');
    recipeDiv.classList.add('dish');
    recipeDiv.classList.add('wid100');
    recipeDishTypes.classList.add('dish-types');
    recipeDiv.appendChild(recipeImg);
    recipeDiv.appendChild(recipeDishTypes);
    recipeDiv.appendChild(recipeTitle);
    if (recipeInstruction.innerHTML == '' || !recipeInstruction.innerHTML) {
        recipeInstruction.innerText = "We don't have instructions for this recipe but you can find";
    }
    recipeDiv.appendChild(recipeInstruction);
    recipeDiv.appendChild(recipeSpoonacularDetail);
    App.recipeListInnerDiv.appendChild(recipeDiv);
}
App.appendRecipes = () => {
    App.recipeList.appendChild(App.recipeListInnerDiv);
}
//#endregion

//#region IngredientsList
App.addIngrToList = () => {
    var newIngr = document.getElementById('search').value;
    if (!newIngr || newIngr == '' || newIngr.replace(/\s+/g, '') == ''
        || newIngr.length > 25) return;
    App.ingrList.push(newIngr);
    document.getElementById('search').value = null;
    App.updateIngrList();
    App.updateRecipeHistory();
}

App.deleteIngrFromList = (ingrName) => {
    App.ingrList.splice(App.ingrList.indexOf(ingrName), 1);
    App.updateIngrList();
}

App.updateIngrList = () => {
    /*while (App.ingrListElement.firstChild) {
        App.ingrListElement.removeChild(App.ingrListElement.lastChild);
    }*/
    if (App.ingrListElement.hasChildNodes) {
        App.ingrListElement.innerHTML = "";
    }
    const ingrListInnerDiv = document.createElement('div');

    App.ingrList.forEach(ingrRow => {
        const ingrDelete = document.createElement('button');
        ingrDelete.onclick = () => { App.deleteIngrFromList(ingrRow); }
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
        ingrListInnerDiv.appendChild(ingrDiv);
    })
    App.ingrListElement.appendChild(ingrListInnerDiv);

    if (App.ingrList.length != 0) {
        App.btnSearch.classList.remove('hide');
    } else { App.btnSearch.classList.add('hide'); }
}
//#endregion

//#region SessionRecipeHistory
App.updateRecipeHistory = () => {
    //await await1Sec();

    const recipeHistoryList = document.createElement('div');
    recipeHistoryList.classList.add('recipe-history');
    const h2HL = document.createElement('h3');
    h2HL.innerText = "Previous recipe searches:"
    recipeHistoryList.appendChild(h2HL);

    for (var i = 1; i <= localStorage.recipeId; i += number) {
        const rcpHist = document.createElement('button');
        var searchText = localStorage.getItem(i).slice(0, 24) + '..'
        rcpHist.innerText = searchText;
        App.addOnClickToLoadSessionRecipes(rcpHist, i);
        //rcpHist.onclick = () => { loadSessionRecipes(i); }; //JS does a lil trolling
        recipeHistoryList.appendChild(rcpHist);
    }
    var ingrClmn = document.getElementById('ingredientsColumn');
    if (localStorage.recipeId) {
        ingrClmn.removeChild(ingrClmn.lastChild);
        ingrClmn.appendChild(recipeHistoryList);
    }
}

/*async function await1Sec() {
    return new Promise(wait => {
        setTimeout(() => {
            wait('done');
        }, 1000);
    });
} */

App.addOnClickToLoadSessionRecipes = (element, recId) => {
    element.onclick = () => { App.loadSessionRecipes(recId); };
}

App.saveRecipe = (recipeDetail) => {
    //App.addRecipeCount();
    App.RECIPES.id = recipeDetail.id;
        
        /*App.RECIPES.id.title = recipeDetail.title;
    App.RECIPES.id.imageUrl = recipeDetail.image;
    App.RECIPES.id.instructions = recipeDetail.instructions;
    App.RECIPES.id.spoonacularSourceUrl = recipeDetail.spoonacularSourceUrl;
    App.RECIPES.id.dishType = recipeDetail.dishType;*/

    localStorage.setItem('recipes', JSON.stringify(App.RECIPES));
    /*localStorage.setItem(Number(localStorage.recipeId) + 1, recipeDetail.image);
    localStorage.setItem(Number(localStorage.recipeId) + 2, recipeDetail.instructions);
    localStorage.setItem(Number(localStorage.recipeId) + 3, recipeDetail.spoonacularSourceUrl);*/
}

App.addRecipeCount = () => {
    if (localStorage.recipeId) {
        localStorage.recipeId = Number(localStorage.recipeId) + number;
    } else {
        localStorage.recipeId = 1;
    }
}

/*App.loadSessionRecipes = (recipesId) => {
    App.clearRecipeList();
    for (var i = recipesId; i < recipesId + 100; i += 10) {
        var recipe = {
            id: localStorage.key(i),
            title: localStorage.getItem(i),
            image: localStorage.getItem(i + 1),
            instructions: localStorage.getItem(i + 2),
            spoonacularSourceUrl: localStorage.getItem(i + 3),
        }
        App.addRecipe(recipe);
    }
    App.appendRecipes();
}*/
//#endregion