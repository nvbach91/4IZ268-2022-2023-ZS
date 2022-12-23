(() => {

    let ingredientsList = [];
    let ingredientsListElement = $("<ul>");

    $(document).ready(() => {
        const formElement = $("#search-form");
        const inputElement = $("#ingredients");
        const fridgeElement = $("#fridge");

        formElement.submit(function (e) {
            e.preventDefault();
            createListElement();
            fridgeElement.append(ingredientsListElement);
            ingredientsList.push($("#ingredients").val());
            searchRecipes(ingredientsList.toString());
            inputElement.val("");
        });

    });

    const createListElement = () => {
        let listElement = $("<li>").text($("#ingredients").val());
        ingredientsListElement.append(listElement);
        listElement.click(() => {

            ingredientsList.forEach(ingredience => {
                if (ingredience == listElement.text()) {
                    ingredientsList.splice(ingredientsList.indexOf(ingredience), 1);
                    console.log(ingredientsList);
                }
            })

            listElement.remove();
            searchRecipes(ingredientsList.toString());
        });
    };

    function searchRecipes(ingredients) {
        axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
            params: {
                ingredients: ingredients,  // a comma-separated list of ingredients
                apiKey: "3b85b10dc713484398143741bbfcd892"
            }
        })
            .then(function (response) {
                displayResults(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const findStepsOfRecipe = (recipeID) => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions?apiKey=3b85b10dc713484398143741bbfcd892`)
            .then((response) => {
                let stepContainer = $('#recipe');
                stepContainer.empty();
                response.data[0].steps.forEach((step) => {
                    let recipeStep = $("<li>");
                    recipeStep.text(step.step);
                    stepContainer.append(recipeStep);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const displayResults = (recipes) => {

        let resultContainer = $("#results");
        // let recipeContainer = $(".recipe__container");
        let imgContiner = $("#image");
        let mealTitle = $("#title");
        resultContainer.empty();
        resultContainer.append("<h2>Recipe</h2>")

        for (let i = 0; i < recipes.length; i++) {
            let meal = $("<h3>").text(recipes[i].title);
            meal.val(recipes[i].title);
            resultContainer.append(meal);
            meal.click(() => {
                imgContiner.empty();
                mealTitle.text(meal.val());
                let foodImage = $(`<img src=${recipes[i].image}></img>`);
                let recipeID = recipes[i].id;
                imgContiner.append(foodImage);
                findStepsOfRecipe(recipeID);
            })
        }

    }
})();