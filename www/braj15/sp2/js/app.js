(() => {

    let ingredientsList = [];
    let ingredientsListElement = $("<ul>");

    const bodyElement = $('body');
    const headerElement = $('header');
    const mainElement = $('main');

    const navElement = $('<nav><h1>FIND YOUR MEAL</h1></nav>')
    navElement.addClass('nav');
    headerElement.append(navElement);

    const formElement = $('<form>');
    formElement.attr('id', 'search-form');
    mainElement.append(formElement);

    const ingredientsInput = $('<input></input>');
    ingredientsInput.attr('id', 'ingredients');
    ingredientsInput.attr('type', 'select');
    ingredientsInput.attr('placeholder', 'Enter ingredient');
    formElement.append(ingredientsInput);

    const submitInput = $('<input>');
    submitInput.attr('type', 'submit');
    submitInput.attr('value', 'Add ingredient');
    formElement.append(submitInput)

    const divContainer = $('<div>');
    divContainer.addClass('container');

    const divFridge = $('<div><h2>Fridge</h2></div>');
    divFridge.attr('id', 'fridge');
    divContainer.append(divFridge);

    const divRecipe = $('<div><h2>Recipe</h2></div>');
    divRecipe.attr('id', 'results');
    divContainer.append(divRecipe);

    const divFavourite = $('<div><h2>Your Favourite Meals</h2></div>');
    divFavourite.attr('id', 'favourite');
    divContainer.append(divFavourite);
    mainElement.append(divContainer);

    const mealContainer = $('<div></div>');
    mealContainer.addClass('meal__container');
    mealContainer.addClass("hidden");


    const divImage = $('<div>');
    divImage.attr('id', 'image');
    mealContainer.append(divImage);

    const recipeContainer = $('<div>');
    recipeContainer.addClass('recipe__container');

    mealContainer.append(recipeContainer);

    const recipeHeading = $('<h3>');
    recipeHeading.attr('id', 'title');
    recipeContainer.append(recipeHeading);

    const recipeStepList = $('<ol>');
    recipeStepList.attr('id', 'recipe');
    recipeContainer.append(recipeStepList);

    const orderSelect = $('<select>');
    orderSelect.attr('id', 'order');
    orderSelect.attr('name', 'order');

    const optionDesc = $('<option>').text("Descending");
    const optionAsc = $('<option>').text("Ascending");
    optionDesc.attr('value', 'DESC');
    optionAsc.attr('value', 'ASCE');

    const labelOption = $('<label>').text("Order by likes:");


    orderSelect.append(optionDesc);
    orderSelect.append(optionAsc);
    formElement.append(labelOption);
    formElement.append(orderSelect);

    mainElement.append(mealContainer);

    mealContainer.append(recipeContainer);

    let apiKey = "1961be2e72ea481d8dbfc63298ff0ecb";
    let mealList = [];

    const inputElement = $("#ingredients");
    const fridgeElement = $("#fridge");

    $(document).ready(() => {

        const savedFridge = JSON.parse(localStorage.getItem("ingredientList"));

        if (savedFridge) {
            localStorage.removeItem("ingredientList", JSON.stringify(ingredientsList));
            savedFridge.forEach(ingredience => {
                let ingredienceLowerCase = ingredience.toLowerCase();
                if (!ingredientsList.includes(ingredienceLowerCase)) {
                    ingredientsList.push(ingredienceLowerCase);
                    searchRecipes(ingredientsList.toString().toLowerCase());
                    createListElement(ingredienceLowerCase);
                    inputElement.val("");
                    localStorage.setItem("ingredientList", JSON.stringify(ingredientsList));
                }
            });
        }
        fridgeElement.append(ingredientsListElement);

        const savedRecipes = JSON.parse(localStorage.getItem('favouriteRecipes'));
        if (savedRecipes) {
            for (let i = 0; i < savedRecipes.length; i++) {
                generateFavouriteRecipe(savedRecipes[i]);
            }
        }

        fridgeElement.append(ingredientsListElement);

        formElement.submit((e) => {
            e.preventDefault();
            fridgeElement.append(ingredientsListElement);
            if (inputElement.val() === "") {
                alert("Do not try to add blank space to your fridge!")
                return;
            }

            if (/\d/.test(inputElement.val())) {
                alert("Please do not insert numbers.")
                return;
            }

            if (inputElement.val().length <= 2) {
                alert("Are you sure this ingredience exists?")
                return;
            }

            let ingredienceString = inputElement.val();
            let individualIngrediences = ingredienceString.split(" ");
            if (ingredientsList.length <= 11) {
                individualIngrediences.forEach(ingredience => {
                    let ingredienceLowerCase = ingredience.toLowerCase();
                    if (!ingredientsList.includes(ingredienceLowerCase)) {
                        ingredientsList.push(ingredienceLowerCase);
                        searchRecipes(ingredientsList.toString().toLowerCase());

                        createListElement(ingredienceLowerCase);
                        inputElement.val("");
                        localStorage.setItem("ingredientList", JSON.stringify(ingredientsList));
                        return;

                    }
                    alert('This ingredient is already in the fridge!');
                });
                return;
            }
            alert("Too many ingredients, remove some to continue.");
        });
    });

    const createListElement = (ingredience_name) => {
        let listElement = $("<li>").text(ingredience_name);
        let listElementButton = $("<button>").text("Remove ingredient");
        listElement.append(listElementButton);
        ingredientsListElement.append(listElement);
        listElement.click(() => {
            ingredientsList.forEach(ingredience => {
                if (`${ingredience}Remove ingredient` == listElement.text()) {
                    ingredientsList.splice(ingredientsList.indexOf(ingredience), 1);
                }
            })
            listElement.remove();
            searchRecipes(ingredientsList.toString());
            localStorage.setItem("ingredientList", JSON.stringify(ingredientsList));
        });
    };

    const searchRecipes = (ingredients) => {
        $("#spinner-container").removeClass("hidden");
        axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
            params: {
                ingredients: ingredients,
                apiKey: apiKey
            }
        })
            .then(function (response) {
                displayResults(response.data);
                $("#spinner-container").addClass("hidden");
            })
            .catch(function (error) {
                alert("WHOOPS! There is a problem with your connection or the API endpoint does not work properly. Please try again later.")
                $("#spinner-container").addClass("hidden");
                console.log(error);
            });

    }

    const findStepsOfRecipe = (recipeID) => {
        $("#spinner-container").removeClass("hidden");
        axios.get(`https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions?apiKey=${apiKey}`)
            .then((response) => {
                let stepContainer = $('#recipe');
                let stepList = [];
                stepContainer.empty();

                response.data[0].steps.forEach((step) => {
                    let recipeStep = $("<li>");
                    recipeStep.text(step.step);
                    stepList.push(recipeStep)
                });

                stepContainer.append(...stepList);
                recipeContainer.append(stepContainer);
                $("#spinner-container").addClass("hidden");
            })
            .catch((error) => {
                $("#spinner-container").addClass("hidden");
                alert("WHOOPS! There is a problem with your connection or the API endpoint does not work properly. Please try again later.");
            });
    };

    let listOfFavourites = [];
    let listOfFavouriteSavedRecipes = [];

    const generateFavouriteRecipe = (recipe) => {
        listOfFavourites.push(recipe.title);
        let favouriteRecipe = $(`<h3 class='favourite-item'>${recipe.title}</h3>`);
        divFavourite.append(favouriteRecipe);

        let recipeObject = {
            title: recipe.title,
            id: recipe.id,
            image: recipe.image
        }
        listOfFavouriteSavedRecipes.push(recipeObject);
        localStorage.setItem("favouriteRecipes", JSON.stringify(listOfFavouriteSavedRecipes));

        favouriteRecipe.click(() => {
            mealContainer.removeClass("hidden");
            divImage.empty();
            recipeHeading.text(recipe.title);
            let foodImage = $(`<img src="${recipe.image}" alt="${recipe.title}">`);
            let recipeID = recipe.id;
            divImage.append(foodImage);
            findStepsOfRecipe(recipeID);
            $('.meal__container button').remove();
            let buttonRemoveFavourite = $('<button>Remove from favourite</button>');
            buttonRemoveFavourite.insertAfter(recipeContainer);

            buttonRemoveFavourite.click(() => {
                favouriteRecipe.remove();
                let toRemove = recipeObject;
                listOfFavouriteSavedRecipes = listOfFavouriteSavedRecipes.filter(recipe => recipe !== toRemove);
                localStorage.removeItem("favouriteRecipes");
                localStorage.setItem("favouriteRecipes", JSON.stringify(listOfFavouriteSavedRecipes));
            });
        });
    }

    const orderItems = (list) => {
        if (orderSelect.val() === "DESC") {
            list.sort((a, b) => b.attr('likes') - a.attr('likes'));
        } else {
            list.sort((a, b) => a.attr('likes') - b.attr('likes'));
        }
        return list;
    }

    const displayResults = (recipes) => {
        divRecipe.empty();
        divRecipe.append("<h2>Recipe</h2>");
        let mealList = [];
        for (let i = 0; i < recipes.length; i++) {
            let meal = $("<h3>").text(`${recipes[i].title} ${recipes[i].likes}`);
            meal.attr('likes', recipes[i].likes);
            meal.val(recipes[i].title);
            meal.attr('class', `meal-item`);

            mealList.push(meal);


            meal.click(() => {
                mealContainer.removeClass("hidden");
                $('.meal__container button').remove();
                divImage.empty();
                recipeHeading.text(meal.val());
                let foodImage = $(`<img src="${recipes[i].image}" alt="${recipes[i].title}">`);
                let recipeID = recipes[i].id;
                divImage.append(foodImage);
                findStepsOfRecipe(recipeID);

                let buttonAddFavourite = $('<button>Add to Favourite</button>');
                buttonAddFavourite.insertAfter(recipeContainer);

                buttonAddFavourite.click(() => {
                    if (!listOfFavourites.includes(recipe.title)) {
                        generateFavouriteRecipe(recipes[i])
                        return;
                    }
                    alert('This item is already in the favourite list');

                });

            })
        }

        $('#order').on("change", () => {
            displayResults(recipes);
        });

        mealList = orderItems(mealList);
        divRecipe.append(...mealList);
    }




})();